import React, { Component } from "react";
import Pdf from "../Assets/Documents/qh_codebook.pdf";

export default class Documentation extends Component {
  render() {
    return (
      <div className="content overflow-auto">
        <div className="text-content">
          <h2>Documentation</h2>
          <p>
            Please refer to the{" "}
            <a href={Pdf} target="_blank">
              Parliamentary Questions Codebook
            </a>{" "}
            to understand the fields in this dataset.
          </p>
          <h3>TPCD-IPD: TCPD Indian Parliament Dataset (Question Hour)</h3>
          <p>
            If a variable(s) drawn from the TCDP-IPD dataset plays an important
            role in your project (published or unpublished), please use all the
            suggested citations below:{" "}
          </p>
          <p>
            <strong>Data:</strong> "TPCD-IPD: TCPD Indian Parliament Dataset
            (Question Hour) 1.0". Trivedi Centre for Political Data, Ashoka
            University
          </p>
          <p>
            <strong>Codebook:</strong> Bhogale, Saloni. "TPCD-IPD: TCPD Indian
            Parliament Codebook (Question Hour)". 2019. Trivedi Centre for
            Political Data, Ashoka University.{" "}
          </p>
        </div>
      </div>
    );
  }
}
