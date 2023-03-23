import React, { Component } from "react";
import Popup from "./Shared/Popup.js";
import Checkbox from "./Shared/Checkbox.js";
import "bootstrap/dist/css/bootstrap.min.css";
import ShowMore from "react-show-more";
import { Button } from "react-bootstrap";
import * as _ from "lodash";
import ReactTooltip from "react-tooltip";
import { get } from "lodash";

import {
  SearchkitManager,
  SearchkitProvider,
  SearchBox,
  RefinementListFilter,
  HierarchicalMenuFilter,
  HitsStats,
  SortingSelector,
  NoHits,
  ResetFilters,
  GroupedSelectedFilters,
  Layout,
  TopBar,
  InitialLoader,
  LayoutBody,
  LayoutResults,
  ActionBar,
  ActionBarRow,
  SideBar,
  Pagination,
  Hits,
} from "searchkit";

const host = "https://lokdhaba.ashoka.edu.in/es/questions3";
const downloadUrl = "https://lokdhaba.ashoka.edu.in/downloads/QH/";
// const host = "http://localhost:9300/questions3";
const searchkit = new SearchkitManager(host);

searchkit.translateFunction = (key) => {
  return {
    "pagination.next": "Next Page",
    "pagination.previous": "Previous Page",
  }[key];
};

var filename = "TCPD_QH.tsv";

class GetQuestionsTable extends React.Component {
  render() {
    const { hits } = this.props;
    return (
      <div className="sk-item-list-option__text">
        <table
          className="sk-table sk-table-striped"
          align="center"
          table-layout="auto"
          style={{ display: "block", width: "1125px", overflow: "auto" }}
        >
          <thead>
            <tr>
              <th>
                {" "}
                <div className="demonstration">
                  <a data-for="main" data-tip="Hello" data-iscapture="true">
                    Date
                  </a>
                  <ReactTooltip
                    place="top"
                    type="dark"
                    effect="float"
                    id="main"
                  />
                </div>
              </th>
              <th>Ministry</th>
              <th>Subject</th>
              <th>
                <div className="question">Question</div>
              </th>
              <th>
                <div className="answer">Answer</div>
              </th>
              <th>Link</th>
              <th>
                <div className="member_info">Member</div>
              </th>
              <th>
                <div className="state_info">State</div>
              </th>
              <th>
                <div className="constituency_info">Constituency</div>
              </th>
              <th>Party</th>
            </tr>
          </thead>
          <tbody>
            {hits.map((hit) => (
              <tr key={hit._id}>
                <td>{hit._source.date_str}</td>

                <td>{hit._source.ministry}</td>

                <td>
                  <div
                    className="sk-item-list-option__text"
                    dangerouslySetInnerHTML={{
                      __html: get(
                        hit,
                        "highlight.subject",
                        hit._source.subject
                      ),
                    }}
                  ></div>
                </td>

                <td>
                  <ShowMore lines={5} more=">" less="<">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: get(
                          hit,
                          "highlight.Question",
                          hit._source.Question
                        ),
                      }}
                    ></div>
                  </ShowMore>
                </td>
                <td>
                  <ShowMore lines={5} more=">" less="<">
                    <div
                      dangerouslySetInnerHTML={{
                        __html:
                          _.get(hit, "highlight.clean_answers", false) ||
                          hit._source.clean_answers,
                      }}
                    ></div>
                  </ShowMore>
                </td>
                <td>
                  <a href={hit._source.Q_Link} target="_blank">
                    {"Link"}
                  </a>
                </td>

                <td>
                  {hit._source.member
                    .toString()
                    .split(",")
                    .map((item, i) => {
                      return <p key={i}>{item}</p>;
                    })}
                </td>
                <td>
                  {hit._source.state
                    .toString()

                    .split(",")
                    .map((item, i) => {
                      return <p key={i}>{item}</p>;
                    })}
                </td>

                <td>
                  {hit._source.constituency
                    .toString()
                    .split(",")
                    .map((item, i) => {
                      return <p key={i}>{item}</p>;
                    })}
                </td>
                <td>
                  {hit._source.party
                    .toString()
                    .split(",")
                    .map((item, i) => {
                      return <p key={i}>{item}</p>;
                    })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

// to display the hitstats correctly: '139 results found in 27ms'
export class FormattedHitsStats extends HitsStats {
  render() {
    var timeTaken = this.searchkit.getTime();
    var hitsCount = this.searchkit.getHitsCount();
    var checkdata = hitsCount;
    if (checkdata >= 10000) {
      checkdata = "More than 10,000";
    }

    var props = {
      bemBlocks: this.bemBlocks,
      translate: this.translate,
      timeTaken: timeTaken,
      hitsCount: hitsCount,
      resultsFoundLabel: this.translate("hitstats.results_found", {
        timeTaken: timeTaken,
        hitCount: checkdata.toLocaleString(),
      }),
    };
    return React.createElement(this.props.component, props);
  }
}

export default class BrowseData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTermsAndConditionsPopup: false,
      isDataDownloadable: false,
      buttonText: "Download not ready",
      downloadUrl : ""
    };
  }

  getAllData(query) {
    let target_assembly = "ALL";
    console.log(query.query);
    if('post_filter' in query.query) {
      console.log("post_filter", query.query.post_filter);
      let tar_filters = query.query.post_filter.term;
      if('ls_no' in tar_filters) { 
        target_assembly = tar_filters['ls_no'];
      }
    }
    this.setState({ isDataDownloadable: true });
    this.setState({ buttonText: "Download Ready" });
    let tar_file = `TCPD_QH.tsv.gz`;
    if(target_assembly !== "ALL") {
      tar_file = `TCPD_QH_LS_${target_assembly}.tsv.gz`;
    }
    const final_url = downloadUrl + tar_file;
    this.setState({ downloadUrl : final_url});
    let d_button = document.querySelector("#downloadUrl");
    d_button.setAttribute("href", final_url);
  }

  showTermsAndConditionsPopup = () => {
    this.setState({ showTermsAndConditionsPopup: true });
  };

  CloseTermsAndConditionsPopup = () => {
    let d_button = document.querySelector("#downloadUrl");
    d_button.click();
    this.setState({ showTermsAndConditionsPopup: false });
    this.setState({ isDataDownloadable: false });
    this.setState({ buttonText: "Download not Ready" });
  };

  CancelTermsAndConditionsPopup = () => {
    this.setState({ isDataDownloadable: false });
    this.setState({ showTermsAndConditionsPopup: false });
    this.setState({ buttonText: "Download not Ready" });
  };

  onAcceptTermsAndConditions = (key, checked) => {
    if (checked) {
      this.setState({ buttonText: "Fetching Data" });
      this.setState({isDataDownloadable : false});
      this.getAllData(searchkit.query);
    }
    else {
      this.setState({isDataDownloadable : false});
      this.setState({buttonText : "Download not Ready"});
    }
  };
  render() {

    var showTermsAndConditionsPopup = this.state.showTermsAndConditionsPopup;
    var isDataDownloadable = this.state.isDataDownloadable;
    var buttonText = this.state.buttonText;
    var modalBody = (
      <div className="sk-item-list-option__text">
        <p>
          Parliamentary Questions portal is an online web interface provided by
          the Trivedi Centre for Political Data. In these terms of use of the
          data provided by the Centre, 'Data' includes all texts and
          compilations of data and other material presented within the
          application. The users are free to download, display or include the
          data in other products for non-commercial purposes at no cost subject
          to the following limitations:
        </p>
        <ul>
          <li>
            The user must include the{" "}
            <a href="http://qh.lokdhaba.ashoka.edu.in/docs">citation </a> for
            data they use. The user must not claim or imply that the Trivedi
            Centre for Political Data endorses the user's use of the data or use
            of the Centre's logo(s) or trademarks(s) in conjunction with the
            same.
          </li>
          <li>
            The Centre makes no warranties with respect to the data and the user
            must agree that the Centre shall not be held responsible or liable
            to the user for any errors, omissions, misstatements and/or
            misrepresentations of the data though the user is encouraged to
            report the same to us (following the procedure elaborated upon
            within the 'Contact us' tab).
          </li>
          <li>
            The Centre may record visits to the application without collecting
            the personal information of the users. The records shall be used for
            statistical reports only.
          </li>
          <li>
            The user must agree that the use of data presented within the
            application can be seen as the acknowledgement of unconditionally
            accepting the Terms of Use presented by the Centre.
          </li>
        </ul>

        <hr></hr>
        <h5>Download Format</h5>
        <ul>
          <li>Due to the massive size of the dataset, the download files are compressed to GZIP files</li>
          <li>The volume of the data does not permit manipulation using most spreadsheet softwares (such as MS Excel). These softwares have limits on the number of characters allowed inside a single cell, and our dataset breaks this limit.</li>
          <li>The data is served in TSV (Tab-separated values) files, with separator `\t`. This is to ensure that the dataset is parsed correctly by the software (we had encountered issues with using our standard CSV files).</li>
        </ul>
        <Checkbox
          id={"dd_accept_condition"}
          label={
            <div className="sk-item-list-option__text">
              {" "}
              I accept the terms and conditions mentioned here.{" "}
            </div>
          }
          checked={this.state.isDataDownloadable}
          onChange={this.onAcceptTermsAndConditions}
        />
      </div>
    );
    var buttonClass = isDataDownloadable
      ? "btn-default"
      : "btn-default disabled";

    const modalFooter = (
      <div>
        <Button
          className="btn-default"
          variant="primary"
          onClick={this.CancelTermsAndConditionsPopup}
        >
          Cancel
        </Button>
        <a id="downloadUrl"></a>
        <Button
          className={buttonClass}
          variant="primary"
          onClick={this.CloseTermsAndConditionsPopup}
        >
          {this.state.buttonText}
        </Button>
      </div>
    );
    return (
      <div className="browse-data">
        <SearchkitProvider searchkit={searchkit}>
          <Layout size="l">
            <TopBar>
              <div className="my-logo">
                Lok Sabha Parliamentary Questions (1999 - 2019)
              </div>
              <SearchBox
                translations={{
                  "searchbox.placeholder":
                    "search subject, question and answer text",
                }}
                autofocus={true}
                queryOptions={{ analyzer: "standard" }}
                queryFields={["Question", "clean_answers", "subject"]}
              />
            </TopBar>

            <LayoutBody>
              <SideBar>
                <div className="sk-item-list-option__text">
                  <i>
                    The panel on the right shows results for selected
                    attributes. A single question can be attributed multiple MPs
                    and their respective profile information.
                  </i>
                </div>
                <br></br>
                <HierarchicalMenuFilter
                  fields={["ls_no", "year"]}
                  title="Select by Lok Sabha Term"
                  id="ls_no"
                  orderKey="_term"
                />
                <HierarchicalMenuFilter
                  fields={["starred_unstarred"]}
                  title="by Question Type"
                  id="starred_unstarred"
                />
                <RefinementListFilter
                  field="ministry"
                  title="by Ministry"
                  id="ministry"
                  size={5}
                  operator="OR"
                />
                <RefinementListFilter
                  id="member"
                  title="by Names of associated MPs"
                  field="member"
                  size={5}
                  operator="OR"
                />
                <RefinementListFilter
                  field="gender"
                  title="by Genders of associated MPs"
                  id="gender"
                  operator="OR"
                />
                <RefinementListFilter
                  field="constituency_type"
                  title="by Constituency Type of associated MPs"
                  id="constituency_type"
                  operator="OR"
                />
                <RefinementListFilter
                  id="party"
                  title="by Parties of associated MPs"
                  field="party"
                  size={5}
                  operator="OR"
                />
                <RefinementListFilter
                  id="state"
                  title="by States of associated MPs"
                  field="state"
                  size={5}
                  operator="OR"
                />
                <RefinementListFilter
                  id="constituency"
                  title="by Constituencies of associated MPs"
                  field="constituency"
                  size={5}
                  operator="OR"
                />
              </SideBar>
              <LayoutResults>
                <ActionBar>
                  <ActionBarRow>
                    <HitsStats component={FormattedHitsStats} />
                    <SortingSelector
                      options={[
                        {
                          label: "Relevance",
                          field: "_score",
                          order: "desc",
                          defaultOption: true,
                        },
                        {
                          label: "by Date",
                          field: "date",
                          order: "asc",
                        },
                      ]}
                    />
                  </ActionBarRow>

                  <ActionBarRow>
                    <GroupedSelectedFilters />
                    <ResetFilters />

                    <div>
                      <Button
                        size="btn-default"
                        variant="primary"
                        onClick={this.showTermsAndConditionsPopup}
                      >
                        {" "}
                        Download Data
                      </Button>
                      {showTermsAndConditionsPopup && (
                        <Popup
                          id="tems_and_conditions_popup"
                          show={showTermsAndConditionsPopup}
                          body={modalBody}
                          heading={<p>Terms and Conditions</p>}
                          footer={modalFooter}
                          handleClose={this.CloseTermsAndConditionsPopup}
                        />
                      )}
                    </div>
                  </ActionBarRow>
                </ActionBar>
                <Hits
                  hitsPerPage={30}
                  highlightFields={["subject", "Question", "clean_answers"]}
                  sourceFilter={[
                    "ls_no",
                    "Question",
                    "starred_unstarred",
                    "member",
                    "gender",
                    "party",
                    "ministry",
                    "date",
                    "date_str",
                    "state",
                    "ID",
                    "subject",
                    "subject.english",
                    "constituency",
                    "constituency_type",
                    "clean_answers",
                    "year",
                    "Q_Link",
                  ]}
                  customHighlight={{
                    number_of_fragments: 0,
                    matched_fields: ["field", "field.keyword"],
                  }}
                  listComponent={GetQuestionsTable}
                />

                <NoHits
                  translations={{
                    "NoHits.NoResultsFound":
                      'If you are expecting a result for "{query}" and think that there may be an issue with the search engine, log your query in the feedback form link on the Home page.',
                  }}
                />
                <InitialLoader />
                <Pagination showNumbers={true} />
              </LayoutResults>
            </LayoutBody>
          </Layout>
        </SearchkitProvider>
      </div>
    );
  }
}
