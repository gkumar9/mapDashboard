import React, { Component } from "react";

// import IRRIGATION_PUMP from "../../pins/strop1.png";
import MANDI from "../../pins/pin1.png";
import OFFICE from "../../pins/pin2.png";
import MARKET from "../../pins/pin3.png";
import PROCESSING_CENTRES from "../../pins/pin4.png";
// import MINIGRID from "./pins/strop4.png";
// import agroassetsicon from "./pins/Filter Icon.png";
const $ = require("jquery");
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { classdisabledapply: true, classdisabledreset: true };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlefilterReset = this.handlefilterReset.bind(this);
    this.handlefilterApply = this.handlefilterApply.bind(this);
    this.handlestatefilter = this.handlestatefilter.bind(this);
  }
  handleFilterChange(e) {
    this.props.onChangeFilter(e.target.value);
    this.setState({ classdisabledapply: false, classdisabledreset: false });
  }
  handlefilterReset() {
    this.props.onFilterReset();
    this.setState({ classdisabledapply: true, classdisabledreset: true });
  }
  handlefilterApply() {
    this.props.onFilterApply();
    this.setState({ classdisabledapply: true, classdisabledreset: false });
  }
  handlestatefilter(filteredstates) {
    this.props.onChangeStates(filteredstates);
    this.setState({ classdisabledapply: false, classdisabledreset: false });
  }
  componentDidMount() {
    function myFunction(x) {
      if (x.matches) {
        // If media query matches
        $("#filter").addClass("navbar-fixed-bottom");
      } else {
        $("#filter").removeClass("navbar-fixed-bottom");
      }
    }

    var x = window.matchMedia("(max-width: 770px)");
    myFunction(x); // Call listener function at run time
    x.addListener(myFunction); // Attach listener function on state changes
  }
  render() {
    return (
      <div className="container ">
        <nav id="filter" className="navbar navbar-default">
          <div className="container-fluid" style={{ paddingLeft: "0" }}>
            <div
              className="navbar-header"
              data-toggle="collapse"
              data-target="#navbar2"
              aria-expanded="false"
              aria-controls="navbar"
            >
              <button
                type="button"
                className="navbar-toggle collapsed"
                data-toggle="collapse"
                data-target="#navbar2"
                aria-expanded="false"
                aria-controls="navbar"
              >
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar top-bar" />
                <span className="icon-bar middle-bar" />
                <span className="icon-bar bottom-bar" />
              </button>
              <div className="filterIcon">
                <img
                  alt="filterIcon"
                  style={{
                    transform: "rotate(90deg)",
                    width: "7%",
                    marginTop: "-8px"
                  }}
                  src="https://img.icons8.com/ios/32/000000/sorting-options.png"
                />{" "}
                <span style={{ fontSize: "20px", margin: "5px" }}>Filters</span>
              </div>
            </div>
            <div id="navbar2" className="navbar-collapse collapse">
              <ul className="nav navbar-nav">
                <li style={{ width: "125px" }} className="filterItem">
                  <input
                    style={{ margin: "18px 11px 0px 0px" }}
                    type="checkbox"
                    name="MANDI"
                    value="MANDI"
                    checked={this.props.filter.MANDI}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    src={MANDI}
                    style={{ width: "14%" }}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Mandi</span>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>

                <li style={{ width: "136px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="MARKET"
                    value="MARKET"
                    checked={this.props.filter.MARKET}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{
                      width: "14%",
                      marginLeft: "7px",
                      filter: "opacity(0.8)"
                    }}
                    src={MARKET}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Market</span>
                </li>

                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "136px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="OFFICE"
                    value="OFFICE"
                    checked={this.props.filter.OFFICE}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{
                      width: "14%",
                      marginLeft: "7px",
                      filter: "opacity(0.8)"
                    }}
                    src={OFFICE}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Office</span>
                </li>

                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "156px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="PROCESSING_CENTRES"
                    value="PROCESSING_CENTRES"
                    checked={this.props.filter.PROCESSING_CENTRES}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{
                      width: "12%",
                      marginLeft: "7px",
                      filter: "opacity(0.8)"
                    }}
                    src={PROCESSING_CENTRES}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Processing center</span>
                </li>

                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li
                  style={{ width: "110px" }}
                  className="filterItem statefilter"
                >
                  <div className="dropdown">
                    <button
                      style={{
                        width: "-webkit-fill-available",
                        borderRadius: "0",
                        backgroundColor: "transparent"
                      }}
                      className="btn btn-default dropdown-toggle"
                      type="button"
                      id="dropdownMenu1"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="true"
                    >
                      {this.props.selectedstate === "" ? (
                        <span>All states</span>
                      ) : (
                        this.props.selectedstate
                      )}
                      <span className="caret" />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenu1"
                    >
                      {this.props.states.map(item => {
                        if (item !== null) {
                          return (
                            <li
                              onClick={this.handlestatefilter.bind(this, item)}
                              key={
                                item.slice(0, 1) + item.slice(1).toLowerCase()
                              }
                            >
                              <a>
                                {item.slice(0, 1) + item.slice(1).toLowerCase()}
                              </a>
                            </li>
                          );
                        } else {
                          return null;
                        }
                      })}
                    </ul>
                  </div>
                </li>
              </ul>
              <div className="filterbutton">
                {this.state.classdisabledreset === true ? (
                  <button
                    type="button"
                    className="btn btn-default filterbuttonreset disabled"
                    aria-disabled="true"
                  >
                    Reset
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-default filterbuttonreset"
                    onClick={this.handlefilterReset}
                  >
                    Reset
                  </button>
                )}
                {this.state.classdisabledapply === true ? (
                  <button
                    type="button"
                    className="btn btn-primary filterbuttonapply disabled"
                    aria-disabled="true"
                  >
                    Apply
                  </button>
                ) : (
                  <button
                    type="button"
                    className="btn btn-primary filterbuttonapply"
                    onClick={this.handlefilterApply}
                  >
                    Apply
                  </button>
                )}
              </div>
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Filter;
