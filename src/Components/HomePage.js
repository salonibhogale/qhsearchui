import React, { Component } from "react";

export default class HomePage extends Component {
  render() {
    return (
      <div className="content overflow-auto">
        <div className="text-content">
          <p> Welcome to Parliamentary Questions Data Portal</p>
          <p>
            {" "}
            In a democracy like India, elections serve as a test of citizen’s
            preferences. Once elected, the Parliament becomes an arena for the
            winning candidates to perform this duty. This typically involves
            attending parliamentary sessions, serving as members of committees,
            voting on legislation, participating in debates and other
            proceedings in the parliament as a legislator, in addition to
            serving their constituents as a public representative.
          </p>
          <p>
            {" "}
            The first hour of a day’s proceedings in both the Upper and Lower
            House of the Indian Parliament is devoted to the ‘Question Hour’.
            During this time, MPs across parties raise questions on{" "}
            <a href="http://loksabhaph.nic.in/Questions/QuestionsHome.aspx">
              every aspect of administration and government activity{" "}
            </a>
            . Each question is posed to a relevant ministry, and it is the
            prerogative of the Ministers associated with their respective
            ministries to provide adequate information and clarifications on
            matters of public concern.
          </p>
          <p>
            {" "}
            Parliamentary questions thus become a powerful way to make the
            administration accountable to the elected representatives, and
            remain of great interest to activists, researchers and publicly
            spirited citizens.
          </p>
          <p>
            {" "}
            This site is a repository of Parliamentary Questions raised in the
            Lok Sabha (Lower House of the Indian Parliament) between 1999 and
            2019.
          </p>

          <p>
            {" "}
            The Lok Sabha’s website provides a repository of digitized
            parliamentary questions published by the Lok Sabha Secretariat and
            maintained by National Informatics Centre (NIC). We provide here an
            interface to quickly search, explore and download the text of
            parliamentary questions. Further, the data has also been treated
            in-house in order to add information about the Members (constituency
            name, state, gender etc.) from the data shared by the{" "}
            <a href="https://eci.gov.in/">Election Commission of India</a> in
            the Statistical Reports. Thus, it is possible to query the questions
            for relevant information using the parliamentarian's profile
            information. You can explore these features in the{" "}
            <a href="http://lokdhaba.ashoka.edu.in:3003/browse-data">
              Browse/Download Data
            </a>{" "}
            section.
          </p>
          <p>
            For more information, visit the{" "}
            <a href="http://lokdhaba.ashoka.edu.in:3003/docs">Documentation </a>
            page, which includes a detailed codebook containing all the
            variables along with the steps to cite the data, and the{" "}
            <a href="http://lokdhaba.ashoka.edu.in:3003/about">About </a> page
            to read more about us.
          </p>
          <p>
            The parliamentary questions data is free and open for anyone to use.
            We encourage students, researchers, media persons, policy makers and
            others to engage with our data. The questions may be used
            individually to obtain official statements on a variety of topics
            over time or in aggregate, as a large dataset amenable to research
            on Indian public institutions and text analysis.
          </p>
          <p>
            {" "}
            Should you have any feedback, please fill out{" "}
            <a href="https://forms.gle/Fqt6TdpnCDo7Vw2q8">this form </a>. In
            case you have any query and/or notice an error, write to us at{" "}
            <a href="mailto:tcpd-contact@ashoka.edu.in">
              tcpd-contact@ashoka.edu.in
            </a>
          </p>

          {/* <img
            src={require("../Assets/Images/ambedkar-statue-at-parliament.png")}
          ></img> */}
        </div>
      </div>
    );
  }
}
