import React, { Component, Fragment } from 'react'
import $ from "jquery";
import "../styles.css";
import MapView from './MapView';
import { SHIPPING, MAP_DETAILS } from "../Commen";


export default class OnGoingOrders extends Component {
    side = null; mapdetails = null;
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            orderSummary: [],
        }
    }

    componentDidMount() {
        this.props.parentCallback({ "header": "On Going Orders", "sidebar": "shipping" });
        let team = sessionStorage.getItem("@shipping_team");
        if (team === "EAST") {
            this.side = SHIPPING.east;
            this.mapdetails = MAP_DETAILS.east;
        }
        else if (team === "SOUTH") {
            this.side = SHIPPING.south;
            this.mapdetails = MAP_DETAILS.south;
        }
        else if (team === "WEST") {
            this.side = SHIPPING.west;
            this.mapdetails = MAP_DETAILS.west;
        }
        else if (team === "NORTH") {
            this.side = SHIPPING.north;
            this.mapdetails = MAP_DETAILS.north;
        }
        this.setState({ flag: true, orderSummary: this.side.datas[0] });
    }
    orderBtnChange = (e, item) => {
        $(".orderid-btn").removeClass("active");
        $("#" + e.target.id).addClass("active");
        this.setState({ flag: true, orderSummary: item });
    }
    render() {
        const { orderSummary } = this.state;
        return (
            <div id="content">
                {this.side !== null && (
                    <Fragment>
                        <div className="d-flex ongoing-btn-group p-2"
                            style={{ marginTop: "85px" }}>
                            {this.side.datas.map((item, index) => (
                                <div
                                    key={index}
                                    id={"ongoing_btn" + index}
                                    className={index === 0 ? "orderid-btn active" : "orderid-btn"}
                                    onClick={(e) => this.orderBtnChange(e, item)}>
                                    Order Id : {item.uid}
                                </div>
                            ))}

                        </div>
                        <div className="ongoing-btn-group p-2">
                            <div className="row">
                                <div className="col-7">
                                    <div id="card_block" className="card">
                                        <div className="card-body">
                                            <h5>Order Summary</h5>
                                            <div className='row mt-4'>
                                                <div className='col-6'>
                                                    <div className='d-flex ongoing-card-cont'>
                                                        <h6 className='col-5'>Order ID </h6>
                                                        <h6 className="card-text"> : </h6>
                                                        <h6 className='col-7'>{orderSummary.uid}</h6>
                                                    </div>
                                                    <div className='d-flex ongoing-card-cont'>
                                                        <h6 className='col-5'>Invoice ID </h6>
                                                        <h6 className="card-text"> : </h6>
                                                        <h6 className='col-7'>{orderSummary.invoice_id}</h6>
                                                    </div>
                                                    <div className='d-flex ongoing-card-cont'>
                                                        <h6 className='col-5'>Date of order</h6>
                                                        <h6 className="card-text"> : </h6>
                                                        <h6 className='col-7'>{orderSummary.dates}</h6>
                                                    </div>
                                                    <div className='d-flex ongoing-card-cont'>
                                                        <h6 className='col-5'>Order Value</h6>
                                                        <h6 className="card-text"> : </h6>
                                                        <h6 className='col-7'>{orderSummary.price}</h6>
                                                    </div>
                                                </div>

                                                <div className='col-6'>
                                                    <div className='d-flex ongoing-card-cont'>
                                                        <h6 className='col-5'>Pickup Time </h6>
                                                        <h6 className="card-text"> : </h6>
                                                        <h6 className='col-7'>{orderSummary.pickup_time}</h6>
                                                    </div>
                                                    <div className='d-flex ongoing-card-cont'>
                                                        <h6 className='col-5'>ETA  </h6>
                                                        <h6 className="card-text"> : </h6>
                                                        <h6 className='col-7'>{orderSummary.eta_time}</h6>
                                                    </div>
                                                    <div className='d-flex justify-content-center'>
                                                        <button type="button"
                                                            className="btn btn-outline-primary btn-sm">
                                                            View Invoice
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-5">
                                    <div id="card_block"  className="card">
                                        <div className="card-body">
                                            <h5>Pickup Partner Details</h5>
                                            <div className='row mt-4'>
                                                <div className='d-flex'>
                                                    <div>
                                                        <div className='pickup-avatar'>
                                                            <img src={this.side.pickup_partner_Det.img}
                                                                alt="" className='avatar' />
                                                        </div>
                                                        <div>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-solid fa-star"></i>
                                                            <i className="fa-regular fa-star-half-stroke"></i>
                                                        </div>
                                                    </div>
                                                    <div className='row'>
                                                        <div className='d-flex ongoing-card-cont'>
                                                            <h6 className='col-5'>Name  </h6>
                                                            <h6 className="card-text">: </h6>
                                                            <h6 className='col-7'>{this.side.pickup_partner_Det.name}</h6>
                                                        </div>
                                                        <div className='d-flex ongoing-card-cont'>
                                                            <h6 className='col-5'>Phone No </h6>
                                                            <h6 className="card-text">: </h6>
                                                            <h6 className='col-7'>{this.side.pickup_partner_Det.phone_no}</h6>
                                                        </div>
                                                        <div className='d-flex ongoing-card-cont'>
                                                            <h6 className='col-5'>Vehicle No </h6>
                                                            <h6 className="card-text">: </h6>
                                                            <h6 className='col-7'>{this.side.pickup_partner_Det.vehicle_no}</h6>
                                                        </div>
                                                        <div className='d-flex ongoing-card-cont'>
                                                            <h6 className='col-5'>Delivery Team </h6>
                                                            <h6 className="card-text">: </h6>
                                                            <h6 className='col-7'>{this.side.pickup_partner_Det.delivery_team}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="ongoing-btn-group p-2">
                            <div className="row">
                                <div className="col-7">
                                    <div id="card_block" className="card">
                                        <div className="card-body">
                                            {this.mapdetails !== null && (
                                                <MapView teamOrder={this.mapdetails} />
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="col-5">
                                    <div id="card_block" className="card">
                                        <div className="card-body">
                                            <h5>Delivery Details</h5>
                                            <div className='row mt-4'>
                                                <div className='d-flex'>
                                                    <div
                                                        style={{
                                                            color: "#FFF",
                                                            background: "#4f85ff"
                                                        }}
                                                        id="ongoing_btn"
                                                        className="orderid-btn">
                                                        Total Orders - {this.side.delivery_det.tot_orders}
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: "#FFF",
                                                            background: "#0a7d05"
                                                        }}
                                                        id="ongoing_btn"
                                                        className="orderid-btn">
                                                        Delivered - {this.side.delivery_det.delivered}
                                                    </div>
                                                    <div
                                                        style={{
                                                            color: "#FFF",
                                                            background: "#ffa308"
                                                        }}
                                                        id="ongoing_btn"
                                                        className="orderid-btn">
                                                        Pending - {this.side.delivery_det.pending}
                                                    </div>
                                                </div>
                                            </div>
                                            <hr className='mt-4'/>

                                            <h5>Upcoming Customer</h5>
                                            <div className='container mt-4'>
                                                <div className="row align-items-center justify-content-between">
                                                    <div className="col-2">
                                                        <div className="noti-profile">SK</div>
                                                    </div>
                                                    <div className='col-10'>
                                                        <div className="d-flex align-items-center justify-content-between ongoing-card-cont">
                                                            <h6 className="col-3">Name </h6>
                                                            <h6 className="card-text">: </h6>
                                                            <h6 className="col-7">{this.side.delivery_det.name}</h6>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between ongoing-card-cont">
                                                            <h6 className="col-3">Phone No </h6>
                                                            <h6 className="card-text">: </h6>
                                                            <h6 className="col-7">{this.side.delivery_det.phone_no}</h6>
                                                        </div>
                                                        <div className="d-flex align-items-center justify-content-between ongoing-card-cont">
                                                            <h6 className="col-3">Price </h6>
                                                            <h6 className="card-text">: </h6>
                                                            <h6 className="col-7">₹2294</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
                )}
            </div>
        )
    }
}
