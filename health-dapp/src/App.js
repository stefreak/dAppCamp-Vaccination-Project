import './App.css';
import base45 from "base45";
import pako from "pako";
import React from "react";
import { Cborwebtoken } from "@netnexus/node-cborwebtoken";
import cbor from "cbor";
import QRScanner from './components/QRScanner';
import QRPreview from './components/QRPreview';
import proof_valid_eu_green_certificate from './zokrates_green_certificate';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onScan.bind(this);
    this.getComponent.bind(this);
    this.state = {qr_data: ""}
  }

  onScan(content) {
    if (content.substring(0, 4) !== "HC1:") {
      console.log("Not a vaccine passport: " + content)
      return
    }

    const decoded_data = base45.decode(content.substring(4));
    const compressed_bytes = new Uint8Array(decoded_data);

    // returns Uint8Array by default
    const raw_cbor = pako.inflate(compressed_bytes)
    //const raw_cbor = pako.inflate(compressed_bytes, {to: "string"})

    console.log({raw_cbor})

    const token = cbor.decode(raw_cbor);

    // See https://github.com/netnexus/node-cborwebtoken/blob/efa5790a639f34d41c3210c578325a43a2761aba/src/index.ts#L42
    const cwt = new Cborwebtoken()
    cwt.claims["hcert"] = -260
    const newPayload = cbor.decode(token.value[2]);
    var payload;
    if (!(newPayload instanceof Map)) {
      payload = newPayload;
    } else {
      payload = cwt.revertClaims(newPayload);
    }
    console.log(JSON.stringify(payload))
    console.log({payload, token})

    proof_valid_eu_green_certificate(decoded_data);

    this.setState({qr_data: JSON.stringify(payload)})
  }

  getComponent() {
    if (this.state.qr_data.length) {
      return <QRPreview qr_data={this.state.qr_data}></QRPreview>
    }
    else {
      return <QRScanner onScan={(c) => this.onScan(c)}></QRScanner>
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        {this.getComponent()}
        </header>
      </div>
    );
  }
}

export default App;
