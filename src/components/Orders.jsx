import React, { Component } from 'react';
import { DataLoading, ORDERS } from "./Commen";
import $ from "jquery";

class Orders extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      orderData: [],
      total: ORDERS.length,
      startingPage: 0,
      filter: "All",
    }
  }
  componentDidMount() {
    this.pageStart = 0
    this.pageEnd = 0
    this.start = 1
    this.props.parentCallback({ "header": "Manage Orders", "sidebar": "orders" });
    this.getOrderData("increase", "All", true);
    this.setState({ startingPage: this.state.startingPage + 1 });
    $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#table_det tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });

    this.selectorChange(".btn-1");
  }

  selectorChange = (bt) => {
    const colors = ["#2c09f0", "#2dbe09", "#db7b04", "#d90000"]

    let btSub = bt.substring(5, 6);
    for (let i = 1; i <= 4; i++) {
      let btn = document.querySelector('.btn-' + i).style;
      btn.setProperty('--width', '0px');
      btn.setProperty('--left', '55px');
      $(".orders-btn.btn-" + i + " span").css({ color: "#525050", fontWeight: 500 });
    }


    let btn = document.querySelector(bt).style;
    btn.setProperty('--width', '85%');
    btn.setProperty('--left', '10px');
    $(".orders-btn.btn-" + btSub + " span").css({ color: colors[btSub - 1], fontWeight: 600 });
  }

  getOrderData = (type, filter, loading) => {
    clearTimeout(this.timeout);
    this.last = this.state.total % 25 === 0 ? this.state.total / 25 : parseInt(this.state.total / 25) + 1
    let startingPage = this.state.startingPage;
    if (type === "increase") {
      if (startingPage < this.last) {
        startingPage = loading === true ? 1 : this.state.startingPage + 1;
        this.pageStart = ((startingPage - 1) * 25) + 1;
        this.pageEnd = startingPage * 25;
        this.setState({ startingPage: startingPage })
      } else {
        startingPage = 1;
        this.pageStart = ((startingPage - 1) * 25) + 1;
        this.pageEnd = startingPage * 25;
        this.setState({ startingPage: startingPage })
      }
    } else {
      if (startingPage > 1) {
        startingPage = loading === true ? 1 : this.state.startingPage - 1;
        this.pageStart = ((startingPage - 1) * 25) + 1;
        this.pageEnd = startingPage * 25;
        this.setState({ startingPage: startingPage })
      }
    }
    let data = [];
    let filterData = [];

    if (filter === "All") {
      filterData = ORDERS;
      this.selectorChange(".btn-1");
    } else if (filter === "Delivered") {
      this.selectorChange(".btn-2");
      for (let i = 0; i < ORDERS.length; i++) {
        if (ORDERS[i].status === "Delivered")
          filterData.push(ORDERS[i])
      }
    } else if (filter === "Pending") {
      this.selectorChange(".btn-3");
      for (let i = 0; i < ORDERS.length; i++) {
        if (ORDERS[i].status === "Pending")
          filterData.push(ORDERS[i])
      }
    } else if (filter === "Cancelled") {
      this.selectorChange(".btn-4");
      for (let i = 0; i < ORDERS.length; i++) {
        if (ORDERS[i].status === "Cancelled")
          filterData.push(ORDERS[i])
      }
    }

    let dataCheck = filterData.length;
    for (let i = this.pageStart - 1; i < this.pageEnd; i++) {
      if (i < dataCheck) {
        let dt = filterData[i];
        dt.id = i + 1;
        data.push(dt)
      } else {
        break;
      }
    }
    if (startingPage === 1) {
      $(".fa-angles-right").css("color", "#095aff");
      $(".fa-angles-left").css("color", "#808080");
    } else if (startingPage === this.last) {
      $(".fa-angles-right").css("color", "#808080");
      $(".fa-angles-left").css("color", "#095aff");
    } else {
      $(".fa-angles-right").css("color", "#095aff");
      $(".fa-angles-left").css("color", "#095aff");
    }
    this.setState({
      orderData: data,
      filter: filter, total: filterData.length
    });
    this.timeout = setTimeout(async () => {
      this.setState({ loading: false });
    }, 2 * 1000);
  }

  render() {
    const { orderData, loading, filter, total } = this.state;
    return (
      <div id="content">
        <div className="row" id="invent_container">
          <div className="frame mt-2">
            <button className="orders-btn btn-1"
              onClick={() => {
                this.setState({ loading: true })
                this.getOrderData("increase", "All", true)
              }}><span>All Orders</span></button>
            <button className="orders-btn btn-2"
              onClick={() => {
                this.setState({ loading: true })
                this.getOrderData("increase", "Delivered", true)
              }}><span>Delivered</span></button>
            <button className="orders-btn btn-3" onClick={() => {
              this.setState({ loading: true })
              this.getOrderData("increase", "Pending", true)
            }}><span>Pending</span></button>
            <button className="orders-btn btn-4" onClick={() => {
              this.setState({ loading: true })
              this.getOrderData("increase", "Cancelled", true)
            }}><span>Cancelled</span></button>
          </div>

          <div className="d-flex pt-3 justify-content-between align-items-center">
            <div>
              <input type="text" placeholder="Search.." id="search" />
              {/*<button className="search_btn download-btn"
                onClick={() => this.downloadPDF()} >
                <i className="fa-solid fa-cloud-arrow-down"></i>
                Download
              </button>*/}
            </div>
            <div className="orders-pagination">
              <span>{this.pageStart}-{this.pageEnd} of {total}</span>
              <span>
                <i className="fa-solid fa-angles-left"
                  onClick={() => {
                    this.getOrderData("decrease", filter, false)
                  }}></i>
                <text>{this.state.startingPage}</text>
                <i className="fa-solid fa-angles-right"
                  onClick={() => {
                    this.getOrderData("increase", filter, false)
                  }}></i>
              </span>
            </div>
          </div>

          <div className="table_det">
            <table className="table table-striped text-center"
              style={{ marginTop: "15px" }} id="table_det">
              <thead>
                <tr>
                  <th>S.no</th>
                  <th>Order ID</th>
                  <th>Ordered at</th>
                  <th>Shipped at</th>
                  <th>Payment Mode</th>
                  <th>Amount</th>
                  <th>Delivery Executive</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <div
                    style={{
                      top: "0%",
                      left: "0%",
                      zIndex: 1,
                    }} className="loading-frame">
                    <DataLoading />
                  </div>
                ) : orderData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.id}</td>
                    <td>{item.order_id}</td>
                    <td>{item.order_at}</td>
                    <td>{item.shipped_at}</td>
                    <td>{item.payment}</td>
                    <td>{item.amount}</td>
                    <td>{item.delivery}</td>
                    {item.status === "Delivered" && (<td style={{ color: "#00c520", fontWeight: 600 }}>{item.status}</td>)}
                    {item.status === "Cancelled" && (<td style={{ color: "#D90000", fontWeight: 600 }}>{item.status}</td>)}
                    {item.status === "Pending" && (<td style={{ color: "#db7b04", fontWeight: 600 }}>{item.status}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Orders