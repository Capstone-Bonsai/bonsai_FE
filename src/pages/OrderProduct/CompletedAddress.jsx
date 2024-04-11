import React, { Component } from "react";
import "@goongmaps/goong-js/dist/goong-js.css";
import "@goongmaps/goong-geocoder/dist/goong-geocoder.css";
import GoongGeocoder from "@goongmaps/goong-geocoder/dist/goong-geocoder.min.js";
import "es6-promise/dist/es6-promise.auto.min.js"; 

class CompletedAddress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
    };
  }

  componentDidMount() {
    const { setAddress } = this.props;

    const geocoder = new GoongGeocoder({
      accessToken: "qCgg1TpZVaJhATWQbBWf9NdM2qJ7Zd9w3BZz8Wfe",
    });
    geocoder.addTo("#my-geocoder");

    geocoder.on("result", (e) => {
      const { formatted_address } = e.result.result;
      this.setState({ result: formatted_address });
      setAddress(formatted_address);
      console.log(formatted_address ?? "");
    });

    geocoder.on("clear", () => {
      this.setState({ result: "" });
      setAddress("");
    });
  }

  render() {
    return <div id="my-geocoder" className="w-full flex"></div>;
  }
}
export default CompletedAddress;
