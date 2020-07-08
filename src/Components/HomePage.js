import React, { Component } from "react";

export default class HomePage extends Component {
  render() {
    return (
      <div className="content overflow-auto">
        <div className="text-content">
          <p> Welcome to Parliamentary Questions Data Portal</p>
          <p>
            {" "}
            This site is a repository of Parliamentary Questions raised in the
            Lok Sabha between 1999 and 2019 (from the Thirteenth to the
            Sixteenth Lok Sabha).
          </p>
          <p>
            {" "}
            The data presented here originally from{" "}
            <a href="http://loksabhaph.nic.in/Questions/Qtextsearch.aspx">
              Lok Sabha's repository of digitized parliamentary questions{" "}
            </a>
            published by the Lok Sabha Secretariat and maintained by National
            Informatics Centre (NIC). We have cleaned and treated the data and
            organized it in a tabular format (which you can see under the
            “Browse Data” tab).
          </p>
          <p>
            We have added features to make it simple and fast to search the full
            text of parliamentary questions (which can be sorted by
            relevancy/date) and making it possible to download the raw data.
            Further, the data has also been treated in-house in order to add
            information about the Lok Sabha Members (constituency name, state,
            gender etc.) from the data shared by the{" "}
            <a href="https://eci.gov.in/">Election Commission of India</a> in
            the Statistical Reports. This allows users to query the questions
            using the parliamentarian's profile information.
          </p>
          <p>
            {" "}
            The parliamentary questions data is free and open for anyone to use.
            We encourage students, researchers, media persons, policy makers and
            others to engage with our data. Should you have any query and/or
            notice an error, please send us a message or write us at{" "}
            <a href="mailto:tcpd-contact@ashoka.edu.in">
              tcpd-contact@ashoka.edu.in
            </a>
            .
          </p>
          <p>
            {" "}
            For more information, please see the documentation tab, which
            includes a detailed codebook containing all the variables in the
            data. Should you use any information from this data, please be sure
            to cite the Trivedi Center for Political Data at Ashoka University.
          </p>
          {/* <img
            src={require("../Assets/Images/ambedkar-statue-at-parliament.png")}
          ></img> */}
        </div>
      </div>
    );
  }
}
