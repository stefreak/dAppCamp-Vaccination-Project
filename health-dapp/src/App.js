import './App.css';
import React from "react";
import QRScanner from './components/QRScanner';
import QRPreview from './components/QRPreview';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.onScan.bind(this);
    this.getComponent.bind(this);
    this.state = {raw_qr_data: ""}
  }

  onScan(content) {
    console.log("On scan")
    this.setState({raw_qr_data: content})
  }

  getComponent() {
    if (this.state.raw_qr_data.length) {
      return <QRPreview raw_qr_data={this.state.raw_qr_data}></QRPreview>
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
