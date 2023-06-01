/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from "react";
import $ from "jquery";
import { Link } from "react-router-dom";
import "../styles.css";

export default class Leftsidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            flag: false,
            side: this.props,
        };
    }
    componentDidMount() {
        $(document).ready(function () {
            $("#sidebarCollapse").on("click", function () {
                $("#sidebar").toggleClass("active");
                $(this).toggleClass("active");
            });
        });

        $(".menu").removeClass("active");
        $("." + this.value + "link li").addClass("active");
        this.setState({ flag: true });
    }
    optionChange = (e) => {
        e.preventDefault();
        $(".menu").removeClass("active");
        $("." + this.value + "-link li").addClass("active");
    };

    render() {
        this.value = this.props.data.sidebar
        $(".menu").removeClass("active");
        $("." + this.value + "-link li").addClass("active");
        return (
            <div>
                <nav id="sidebar">
                    <div className="sidebar-header">
                        <img src="./images/Logo.svg" alt="Logo" />
                    </div>
                    <ul className="components"
                        onClick={(e) => this.optionChange(e)}>
                        <Link to="/home" className="home-link">
                            <li className="menu">
                                <a href="#" id="home">
                                    <i className="fa-solid fa-house"></i>Home
                                </a>
                            </li>
                        </Link>

                        <Link to="/orders" className="orders-link">
                            <li className="menu">
                                <a href="#" id="orders">
                                    <i className="fa-solid fa-boxes-packing"></i>Orders
                                </a>
                            </li>
                        </Link>

                        <Link to="/shipping" className="shipping-link">
                            <li className="menu">
                                <a href="#" id="shipping">
                                    <i className="fa-solid fa-truck-fast"></i>Shipping Queue
                                </a>
                            </li>
                        </Link>

                        <Link to="/inventory" className="inventory-link">
                            <li className="menu">
                                <a href="#" id="inventory">
                                    <i className="fa-solid fa-rectangle-list"></i>Inventory
                                </a>
                            </li>
                        </Link>

                        <Link to="/messages" className="message-link">
                            <li className="menu">
                                <a href="#" id="message">
                                    <i className="fa-solid fa-comments"></i>Messages
                                </a>
                            </li>
                        </Link>

                        <Link to="/report" className="report-link">
                            <li className="menu">
                                <a href="#" id="report">
                                    <i className="fa-solid fa-chart-column"></i>Report
                                </a>
                            </li>
                        </Link>

                        {/*<Link to="/setting" className="setting-link">
                            <li className="menu">
                                <a href="#" id="setting">
                                    <i className="fa-solid fa-gear"></i>Settings
                                </a>
                            </li>
                        </Link>

                        <Link to="/help" className="help-link">
                            <li className="menu">
                                <a href="#" id="help">
                                    <i className="fa-solid fa-handshake-angle"></i>Help
                                </a>
                            </li>
                        </Link> */}
                    </ul>
                </nav>
            </div>
        )
    }
}
