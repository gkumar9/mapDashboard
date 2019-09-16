import React, { Component } from "react";
import { Link } from "react-router-dom";
import DRINKING_WATER_PUMP from "../../pins/strop3.png";
// import ROOFTOP from "../../pins/strop2.png";
import IRRIGATION_PUMP from "../../pins/strop1.png";
import PATVAN from "../../pins/strop5patvan.png";
import MINIGRID from "../../pins/strop4.png";
const $ = require("jquery");
class Filter extends Component {
  constructor(props) {
    super(props);
    this.state = { classdisabledapply: true, classdisabledreset: true };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handlefilterReset = this.handlefilterReset.bind(this);
    this.handlefilterApply = this.handlefilterApply.bind(this);
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

  componentDidMount() {
    function myFunction(x) {
      if (x.matches) {
        // If media query matches
        $("#filter").addClass("navbar-fixed-bottom");
      } else {
        $("#filter").removeClass("navbar-fixed-bottom");
      }
    }

    // eslint-disable-next-line no-undef
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
                <li style={{ width: "150px" }} className="filterItem">
                  <input
                    style={{ margin: "18px 11px 0px 0px" }}
                    type="checkbox"
                    name="SolarIrrigationPump"
                    value="SolarIrrigationPump"
                    checked={this.props.filter.SolarIrrigationPump}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    src={IRRIGATION_PUMP}
                    style={{ width: "14%" }}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Irrigation Pump</span>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>

                <li style={{ width: "190px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="SolarDrinkingWaterPump"
                    value="SolarDrinkingWaterPump"
                    checked={this.props.filter.SolarDrinkingWaterPump}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{
                      width: "12%",
                      marginLeft: "7px",
                      filter: "opacity(0.8)"
                    }}
                    src={DRINKING_WATER_PUMP}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Drinking Water Pump</span>
                </li>

                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "155px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="SolarIrrigationService"
                    value="SolarIrrigationService"
                    checked={this.props.filter.SolarIrrigationService}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{
                      width: "14%",
                      marginLeft: "7px",
                      filter: "opacity(0.8)"
                    }}
                    src={PATVAN}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Irrigation Service</span>
                </li>

                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "156px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="SolarMiniGrid"
                    value="SolarMiniGrid"
                    checked={this.props.filter.SolarMiniGrid}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{
                      width: "14%",
                      marginLeft: "7px",
                      filter: "opacity(0.8)"
                    }}
                    src={MINIGRID}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Minigrid</span>
                </li>
              </ul>
              <div className="filterbutton">
                <Link to="/farmeredit">
                  <button
                    type="button"
                    className="btn btn-primary "
                    aria-label="Right Align"
                    id="drillUp"
                    style={{
                      // display: "none",
                      // borderColor: "darkgray",
                      marginTop: "8px",
                      marginRight: "10px",
                      borderRadius: "0px",
                      float: "right",
                      outline: "none",
                      color: "white",
                      backgroundColor: "#b12d28",
                      // background-color: ;
                      borderColor: "transparent"
                    }}
                  >
                    View Farmers
                  </button>
                </Link>
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
