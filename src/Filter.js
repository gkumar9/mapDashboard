import React, { Component } from "react";
import DRINKING_WATER_PUMP from "./pins/strop3.png";
import ROOFTOP from "./pins/strop2.png";
import IRRIGATION_PUMP from "./pins/strop1.png";
import PATVAN from "./pins/strop5patvan.png";
import MINIGRID from "./pins/strop4.png";
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
  render() {
    return (
      <div className="container ">
        <nav id="filter" className="navbar navbar-default">
          <div className="container-fluid">
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
                <li style={{ width: "147px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="red"
                    value="IRRIGATION_PUMP"
                    checked={this.props.filter.IRRIGATION_PUMP}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    src={IRRIGATION_PUMP}
                    style={{ width: "14%" }}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Irrigation pump</span>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "100px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="red"
                    value="PATVAN"
                    checked={this.props.filter.PATVAN}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    src={PATVAN}
                    alt="logo"
                    style={{ width: "21%" }}
                    className="filterImg responsive"
                  />
                  <span className="filterText">Patvan</span>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "148px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="red"
                    value="DRINKING_WATER_PUMP"
                    checked={this.props.filter.DRINKING_WATER_PUMP}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{ width: "15%" }}
                    src={DRINKING_WATER_PUMP}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Drinking water</span>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "118px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="red"
                    value="MINIGRID"
                    checked={this.props.filter.MINIGRID}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{ width: "19%" }}
                    src={MINIGRID}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Minigrid</span>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li style={{ width: "103px" }} className="filterItem">
                  <input
                    type="checkbox"
                    name="red"
                    value="ROOFTOP"
                    checked={this.props.filter.ROOFTOP}
                    onChange={this.handleFilterChange}
                  />
                  <img
                    style={{ width: "22%" }}
                    src={ROOFTOP}
                    alt="logo"
                    className="filterImg responsive"
                  />
                  <span className="filterText">Rooftop</span>
                </li>
                <li>
                  <a>
                    <span className="verticalLine" />
                  </a>
                </li>
                <li
                  style={{ width: "177px" }}
                  className="filterItem statefilter"
                >
                  <div className="dropdown">
                    <button
                      style={{
                        width: "-webkit-fill-available",
                        borderRadius: "0"
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
                      {this.props.states.map((item) => {
                        if(item!==null){
                          return (
                           <li
                            onClick={this.handlestatefilter.bind(this, item)}
                            key={item.slice(0,1)+item.slice(1).toLowerCase()}
                          >
                            <a>{item.slice(0,1)+item.slice(1).toLowerCase()}</a>
                          </li>
                         
                        );
                        }
                        else{
                          return(null)
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
