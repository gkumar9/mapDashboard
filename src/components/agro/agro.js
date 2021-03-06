import React, { Component } from "react";
import Agromap from "./agromaps";
import Header from "../../Header.jsx";
import Sidebar from "../../Sidebar.js";
import Filter from "./filter.js";
import axios from "axios";
import config from "../../config.js";
import Swal from "sweetalert2";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      states: [],
      agroallpins: [],
      filteredstate: "",
      filteredpins: [],
      filter: {
        MANDI: true,
        MARKET: true,
        OFFICE: true,
        PROCESSING_CENTRES: true,
        CUSTOMER: true
      }
    };
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handlestatefilter = this.handlestatefilter.bind(this);
  }
  handleReset() {
    let newfilter = {
      MANDI: true,
      MARKET: true,
      OFFICE: true,
      PROCESSING_CENTRES: true,
      CUSTOMER: true
    };
    this.setState(prevState => ({
      ...prevState,
      filter: newfilter,
      filteredstate: "",
      filteredpins: prevState.agroallpins
    }));
  }
  handleApply() {
    let filterpins = [];

    this.state.agroallpins.map((item, key) => {
      if (this.state.filteredstate === "") {
        if (this.state.filter[item.agroAssetType]) {
          filterpins.push(item);
        }
      } else {
        if (item.state === this.state.filteredstate) {
          if (this.state.filter[item.agroAssetType]) {
            filterpins.push(item);
          }
        }
      }
    });

    this.setState(prevState => ({
      ...prevState,
      filteredpins: filterpins
    }));
  }
  handleFilterChange(filtervalue) {
    this.setState(prevState => ({
      ...prevState,
      filter: {
        ...prevState.filter,
        [filtervalue]: !prevState.filter[filtervalue]
      }
    }));
  }
  handlestatefilter(filtered) {
    let tempfilter = this.state.filter;
    this.setState({
      filteredstate: filtered,
      filter: tempfilter
    });
  }

  async componentDidMount() {
    if (
      this.state.agroallpins.length === 0 &&
      this.state.states.length === 0 &&
      this.state.filteredpins.length === 0
    ) {
      axios({
        url: config.agroallassets,
        method: "POST",
        data: {
          temp: "temp"
        },
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(res => {
          let tempstate = this.state.states;
          if (res.data.data !== null) {
            res.data.data.list.map(itemmap => {
              let check = false;
              tempstate.map(itemstate => {
                if (itemmap.state === itemstate) {
                  check = true;
                }
              });
              if (check === false) {
                tempstate.push(itemmap.state);
              }
            });
            this.setState({
              agroallpins: res.data.data.list,
              filteredpins: res.data.data.list,
              states: tempstate
            });
          } else if (res.data.error !== undefined) {
            if (res.data.error.errorCode === 153) {
              window.location.href = "../login.html?redirect=maps";
            } else {
              Swal({
                type: "error",
                title: "Oops...",
                text: res.data.error.errorMsg
              });
            }
          }
        })
        .catch(e => {
          // console.log( Error(e))
          if (e.response !== undefined && e.response.status === 401) {
            window.location.reload();
          } else if (e.response !== undefined && e.response.status === 403) {
            Swal({
              type: "error",
              title: "Forbidden"
            });
          } else {
            Swal({
              type: "error",
              title: "Oops...",
              text: e
            });
          }
        });
    }
  }

  render() {
    return (
      <div className="gauravwwwagro ">
        <Header  kc={this.props.kc}/>
        <div className="mainbody">
          <Sidebar kc={this.props.kc} history={this.props.history} />
          <div className="main">
            <Filter
              states={this.state.states}
              selectedstate={this.state.filteredstate}
              onChangeStates={this.handlestatefilter}
              filter={this.state.filter}
              onChangeFilter={this.handleFilterChange}
              onFilterReset={this.handleReset}
              onFilterApply={this.handleApply}
            />
            <Agromap
              datapins={this.state.filteredpins}
              // additionalmarkers={this.state.additionalmarkers}
              filter={this.state.filter}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
