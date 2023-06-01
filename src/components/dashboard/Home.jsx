import React, { Component } from 'react';
import "../styles.css";
import $ from "jquery";
import {
    chartOption, barOptions, ALL_ORDERS,
    OVERALL_PROGRESS, NOTIFICATION
} from "../Commen";
import ApexCharts from "react-apexcharts";
import Chart from "react-apexcharts";
import { Link } from 'react-router-dom';

class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            options: [],
            barSeries: [],
            shipmentSeries: [{
                name: 'TODAY',
                data: [30, 44, 51, 42, 31, 43, 25, 56, 40, 21, 30, 29]
            }, {
                name: 'YESTERDAY',
                data: [19, 67, 44, 28, 60, 20, 39, 39, 64, 15, 40, 14]
            }],
            overall_progress: OVERALL_PROGRESS.today,
        }
    }

    componentDidMount() {
        this.props.parentCallback({ "header": "Overview", "sidebar": "home" });
        this.getOrder_Option("btn2", "MONTHLY");
    }

    getOrder_Option = async (id, filter) => {
        $(".button").removeClass("active");
        $("#" + id).addClass("active");
        let data = null;
        if (filter === "DAILY") {
            filter = ALL_ORDERS.daily.categories;
            data = ALL_ORDERS.daily.data;
        }
        else if (filter === "MONTHLY") {
            filter = ALL_ORDERS.monthly.categories;
            data = ALL_ORDERS.monthly.data;
        }
        else if (filter === "YEARLY") {
            filter = ALL_ORDERS.yearly.categories;
            data = ALL_ORDERS.yearly.data;
        };
        let value = await barOptions(filter);
        this.options = value;
        this.setState({ barSeries: data });
    }

    getOverallProgress = () => {
        let filter = $("#graph_choose").val();
        let data = null;
        if (filter === "today") {
            data = OVERALL_PROGRESS.today;
        }
        else if (filter === "weekly") {
            data = OVERALL_PROGRESS.weekly;
        }
        else if (filter === "monthly") {
            data = OVERALL_PROGRESS.monthly;
        };
        this.setState({ overall_progress: data });
    }

    render() {
        const { barSeries, shipmentSeries, overall_progress } = this.state;
        return (
            <div id="content">
                <div className="row" style={{ marginTop: "85px" }}>
                    <div className="col-9">
                        <div className="row">
                            <div className='card-content'>
                                <div className="row">
                                    <div className="col">
                                        <div className='mulcard'>
                                            <p className='card-title'>Total Order Items</p>
                                            <p className='card-value'>14</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='mulcard'>
                                            <p className='card-title'>Units Ordered</p>
                                            <p className='card-value'>32</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='mulcard'>
                                            <p className='card-title'>Shipment Delivered</p>
                                            <p className='card-value'>04</p>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div className='mulcard'>
                                            <p className='card-title'>Product Sales</p>
                                            <p className='card-value'>₹5641.28</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div id="card_block" 
                            className='card card-content p-2'>
                                <div className="row" style={{ padding: "0 10px" }}>
                                    <div className='col-6'>
                                        <h4>All Orders</h4>
                                    </div>
                                    <div className='col-6 d-flex justify-content-end'>
                                        <div className='col-3'>
                                            <button id="btn1"
                                                onClick={() => this.getOrder_Option("btn1", "DAILY")}
                                                className='button'
                                                type="button">
                                                &nbsp;&nbsp;&nbsp;Daily&nbsp;&nbsp;&nbsp;
                                            </button>
                                        </div>
                                        <div className='col-3'>
                                            <button id="btn2"
                                                onClick={() => this.getOrder_Option("btn2", "MONTHLY")}
                                                className='button active'
                                                type="button">Monthly</button>
                                        </div>
                                        <div className='col-3'>
                                            <button id="btn3"
                                                onClick={() => this.getOrder_Option("btn3", "YEARLY")}
                                                className='button'
                                                type="button">Yearly</button>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    {this.options !== undefined && (
                                        <ApexCharts options={this.options}
                                            series={barSeries}
                                            type="bar"
                                            height={300}
                                        />)
                                    }
                                </div>
                            </div>

                            <div id="card_block" className='card card-content p-2'>
                                <div className="row" style={{ padding: "0 10px" }}>
                                    <div className='col-6'>
                                        <h4>Compare Shipments</h4>
                                    </div>
                                </div>
                                <div className='mt-4'>
                                    <ApexCharts options={chartOption}
                                        series={shipmentSeries}
                                        type="area"
                                        height={300}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-3">
                        <div id="card_block" className='card card-content p-2'>
                            <div style={{ padding: "0 10px" }}>
                                <div>
                                    <h5>Overall Progress</h5>
                                    <div className='d-flex justify-content-end'>
                                        <select id="graph_choose"
                                            className="anal-graph-choose"
                                            onChange={() => this.getOverallProgress()}>
                                            <option value="today">Today</option>
                                            <option value="weekly">Weekly</option>
                                            <option value="monthly">Monthly</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {overall_progress.length > 0 && (
                                <div>
                                    <Chart options={{
                                        dataLabels: {
                                            enabled: false
                                        },
                                        fill: {
                                            type: "gradient"
                                        },
                                        labels: ['Delivery', 'On the way', "Dispatch", "Issue"],
                                        chart: {
                                            offsetX: -20
                                        },
                                        legend: {
                                            position: 'bottom'
                                        },
                                    }}
                                        width="300"
                                        series={overall_progress}
                                        type="donut"
                                    />
                                </div>
                            )}
                        </div>

                        <div id="card_block"
                            className='card card-content p-2'>
                            <div style={{ padding: "0 10px" }}>
                                <div className='noti-header'>
                                    <div style={{
                                        display: "flex",
                                        alignItems: "center",
                                    }}>
                                        <i className="fa-regular fa-bell pt-0" style={{ fontSize: "23px" }}></i>
                                        <h5 className='p-1'>Notification</h5>
                                    </div>
                                    <i className="fa-solid fa-gear"
                                        style={{ fontSize: "23px", cursor: "pointer" }}></i>
                                </div>

                                {NOTIFICATION.data.map((item, index) => (
                                    index < 6 && (
                                        <div className='noti-content' key={index}>
                                            <div className='row'>
                                                <div style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                }}>
                                                    <div className='col-2 noti-profile'
                                                        style={{ background: item.bgcol }}>{item.name}</div>
                                                    <span className='col-9 noti-msg'>
                                                        <b>{item.uid}</b> {item.message}<br />
                                                        <span className='noti-time'>{item.time}</span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                ))}

                                <Link to="/messages">
                                    <div style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                    }}>
                                        <h5 className='pt-2'>
                                            See More &nbsp;
                                            <i className="fa-solid fa-arrow-right"></i>
                                        </h5>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Home