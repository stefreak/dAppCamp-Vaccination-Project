import React from "react";

class QRPreview extends React.Component {
    render() {
        return (
            <div>{this.props.raw_qr_data}</div>
        )
    }
}

export default QRPreview;
