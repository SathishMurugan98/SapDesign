import React, { Component } from 'react'
import $ from "jquery";
import "react-datepicker/dist/react-datepicker.css";
import { getPagination, TableDetails, REPORTS } from "./Commen";
import ApexCharts from "react-apexcharts";

export default class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: new Date(2022, 5, 1),
      toDate: new Date(2022, 11, 25),
      series: [],
    }
  }

  componentDidMount() {
    this.props.parentCallback({ "header": "Reports", "sidebar": "report" });
    this.getChartData()
    this.getTableDetails();
  }

  getChartData = () => {
    let data1 = [];
    for (let i = 0; i < REPORTS.length; i++) {
      data1.push([REPORTS[i].millisec, REPORTS[i].totOrder + 100])
    }
    this.setState({
      series: [
        { name: 'Tot.Order Item ', data: data1 },
      ]
    });
  }



  getTableDetails = () => {
    $("#table_det thead").empty()
    $("#table_det tbody").empty()
    $("#table_det thead").append(
      "<tr>" +
      "<th>SNO</th>" +
      "<th>Date</th>" +
      "<th>Ordered Product Sales</th>" +
      "<th>Units Ordered</th>" +
      " <th style='background: #c9e7fe75;'>Total Order Items</th>" +
      "<th>Average Selling Price</th>" +
      " <th>Sessions</th>" +
      "</tr>"
    );

    for (let i = 0; i < REPORTS.length; i++) {
      $("#table_det tbody").append(
        "<tr class=row_" + (i + 1) + ">" +
        "<td>" + (i + 1) + "</td>" +
        "<td>" + REPORTS[i].date + "</td>" +
        "<td>" + REPORTS[i].orderProduct + "</td>" +
        "<td>" + REPORTS[i].unitsOrder + "</td>" +
        "<td style='background: #c9e7fe75;'>" + REPORTS[i].totOrder + "</td>" +
        "<td>" + REPORTS[i].avgSelling + "</td>" +
        "<td>" + REPORTS[i].session + "</td>" +
        "</tr>"
      )
    }
    getPagination(this, "#table_det");
  }

  render() {
    const { series } = this.state;
    return (
      <div id="content" style={{ padding: "20px 35px" }}>
        <div className="p-2" style={{ marginTop: "85px" }}>
          <div id="card_block" className='card card-content p-2'>
            <div className="row" style={{ padding: "0 10px" }}>
              <div className='col-6'>
                <h4>Total Order Items Report</h4>
              </div>
            </div>
            <div className='mt-1'>
              {series.length !== 0 && (
                <ApexCharts
                  options={{
                    chart: {
                      id: "area-datetime",
                      type: "area",
                      height: 380,
                      curve: "smooth",
                      zoom: {
                        autoScaleYaxis: true,
                      },
                    },
                    stroke: {
                      width: 3,
                    },
                    dataLabels: {
                      enabled: false,
                    },
                    markers: {
                      size: 0,
                    },
                    xaxis: {
                      type: "datetime",
                      tickAmount: 1,
                      labels: {
                        datetimeUTC: false,
                      },
                    },
                    yaxis: {
                      labels: {
                        formatter: function (val) {
                          return val.toFixed(0)
                        }
                      }
                    },
                    tooltip: {
                      x: {
                        format: "yyyy-MM-dd",
                      },
                    },
                    // colors: ["#0000ff"]
                  }}
                  series={series}
                  type="area"
                  height={250}
                />
              )}
            </div>
          </div>

          <TableDetails />
        </div>
      </div>
    )
  }
}
