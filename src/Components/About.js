import React, { Component } from "react";

export default class About extends Component {
  render() {
    return (
      <div className="content overflow-auto">
        <div className="text-content">
          <h2>About</h2>
          <p>
            Parliamentary Questions Portal is a project of the{" "}
            <a href="http://tcpd.ashoka.edu.in">
              Trivedi Center for Political Data
            </a>
            , a research center led by faculty members in the Political Science
            and Computer Science Departments at{" "}
            <a href="http://ashoka.edu.in">Ashoka University</a>.
          </p>
          <p>
            The applications's interface has been developed with open source
            tools such as <a href="https://www.elastic.co/"> elasticsearch </a>{" "}
            and <a href="http://www.searchkit.co/">searchkit</a> in ReactJS. All
            data is originally from{" "}
            <a href="http://loksabha.nic.in/">Lok Sabha's Website</a> and has
            been cleaned and treated in-house by adding information about the
            Lok Sabha MPs (constituency names, states, gender etc.) from the
            data shared by the{" "}
            <a href="https://eci.gov.in/">Election Commission of India</a> in
            the Statistical Reports. In case of any discrepancies, the versions
            maintained by the Lok Sabha should be considered the authoritative
            version. The application's software itself is open source under a
            Apache 2.0 license and is available from{" "}
            <a href="https://github.com/tcpd/qhsearchui">our Github page</a>.
          </p>
          <p>
            See more about the{" "}
            <a href="https://tcpd.ashoka.edu.in/team/">TCPD team</a>. You can
            write to us at tcpd-contact@ashoka.edu.in.
          </p>
        </div>
      </div>
    );
  }
}
