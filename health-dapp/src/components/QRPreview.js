import React from "react";
//import CBOR from "cbor";

// function decodeWebToken(raw_str) {
//     const newToken = CBOR.decode(Buffer.from(raw_str, "base64"));
//     const newPayload = CBOR.decode(newToken.value[2]);
//     if (!(newPayload instanceof Map)) {
//         return newPayload;
//     }
// }

class QRPreview extends React.Component {
    render() {
        //var decoded_data = decodeWebToken(this.props.raw_qr_data);
        //console.log(decoded_data);
        return (
            <div>{this.props.qr_data}</div>
        )
    }
}

export default QRPreview;
