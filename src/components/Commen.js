// import random

// datas =[]
// status = ["Paid", "Unpaid"]
// for i in range(1, 5):
//     uid = random.randint(100, 300)
// count = random.randint(10, 30)
// pri = random.randint(1000, 3000)
// time = random.randint(3, 30)
// sts = random.randint(0, 1)
// datas.append({
//     "id": i,
//     "uid": "#ODT" + str(uid),
//     "count": str(count) + " item",
//     "price": "₹" + str(pri),
//     "time": str(time) + "min ago",
//     "img": "../images/shipping/img" + str(i),
//     "status": status[sts],
// })
// print(datas)
import React from "react";
import $ from "jquery";
import "./styles.css";
import Lottie from "react-lottie";
import animeLoading from "../assets/loading2.json";

export const DataLoading = () => {
    return (
        <Lottie
            options={{
                loop: true,
                autoplay: true,
                animationData: animeLoading,
                rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice'
                }
            }}
            width={200}
            height={200}
        />
    )
}


export function getPagination(this_key, table) {
    var lastPage = 1;
    $("#maxRows").on("change", function () {
        lastPage = 1;
        $("#prev").css({ background: "#686868", color: "#FFF" });
        $("#prev1").css({ background: "#686868", color: "#FFF" });
        var trnum = 0;
        var maxRows = parseInt($(this).val());
        if (maxRows === 5000) {
            $(".pagination").hide();
        } else {
            $(".pagination").show();
        }
        $(table + " tr:gt(0)").each(function () {
            trnum++;
            if (trnum > maxRows) {
                $(this).hide();
            }
            if (trnum <= maxRows) {
                $(this).show();
            }
        });
        var tableCount = $(table + " tbody tr").length;
        if (tableCount > maxRows) {
            $("#prev").css({ background: "#006287", color: "#FFF" });
        } else {
            $(".pagination").hide();
        }
        $('.pagination [data-page="1"]').addClass("active");
        $(".pagination .moving").on("click", function (evt) {
            evt.stopImmediatePropagation();
            evt.preventDefault();
            var pageNum = $(this).attr("data-page");
            var maxRows = parseInt($("#maxRows").val());
            var rowCount = $(table + " tbody tr").length;
            if (pageNum === "prev") {
                if (lastPage === 1) {
                    return;
                }
                pageNum = --lastPage;
            }

            let nxtCheck = 0;
            if (rowCount % maxRows === 0) {
                nxtCheck = parseInt(rowCount / maxRows);
            } else {
                nxtCheck = parseInt(rowCount / maxRows) + 1;
            }
            if (pageNum === "next") {

                if (lastPage === nxtCheck) {
                    return;
                }
                pageNum = lastPage + 1;
            }
            lastPage = pageNum;
            if (lastPage === nxtCheck) {
                $("#prev1").css({ background: "#006287", color: "#FFF" });
                $("#prev").css({ background: "#686868", color: "#FFF" });
            } else if (lastPage === 1) {
                $("#prev").css({ background: "#006287", color: "#FFF" });
                $("#prev1").css({ background: "#686868", color: "#FFF" });
            } else {
                $("#prev").css({ background: "#006287", color: "#FFF" });
                $("#prev1").css({ background: "#006287", color: "#FFF" });
            }
            var trIndex = 0;
            $(".pagination .moving").removeClass("active");
            $('.pagination [data-page="' + lastPage + '"]').addClass("active");
            $(table + " tr:gt(0)").each(function () {
                trIndex++;
                if (
                    trIndex > maxRows * pageNum ||
                    trIndex <= maxRows * pageNum - maxRows
                ) {
                    $(this).hide();
                } else {
                    $(this).show();
                }
            });
        });
    })
        .val(25)
        .change();
}

export function TableDetails() {
    return (
        <div id="common_table">
            <div className="table_det">
                <div id="rangeDropdown">
                    <select name="state" id="maxRows">
                        <option value="25">25</option>
                        <option value="50">50</option>
                        <option value="75">75</option>
                        <option value="100">100</option>
                    </select>
                </div>
                <table className="table table-striped text-center" id="table_det">
                    <thead></thead>
                    <tbody></tbody>
                </table>
            </div>
            <div className='row card-content p-2'>
                <div className='d-flex justify-content-end'>
                    <div className="row justify-content-between">
                        <div className="pagination">
                            <div className='col'>
                                <button
                                    id="prev1"
                                    className="moving"
                                    data-page="prev"
                                    style={{ marginRight: "30px" }}>
                                    Prev
                                </button>
                            </div>
                            <div className='col'>
                                <button className="moving" data-page="next" id="prev">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const chartOption = {
    chart: {
        height: 350,
        type: 'area',
    },
    stroke: {
        curve: 'smooth',
        width: 2.5,
    },
    labels: [
        "08 AM",
        "09 AM",
        "10 AM",
        "11 AM",
        "12 PM",
        "01 PM",
        "02 PM",
        "03 PM",
        "04 PM",
        "05 PM",
        "06 PM",
        "07 PM",
        "08 PM",
    ],
    markers: {
        size: 0
    },
    dataLabels: {
        enabled: false
    },
    tooltip: {
        shared: true,
        intersect: false,
        y: {
            formatter: function (y) {
                if (typeof y !== "undefined") {
                    return y.toFixed(0);
                }
                return y;
            }
        }
    },
    colors: ["#FF8F00", "#1400FE"],
}

export const barOptions = (categories) => {
    let opt = {
        chart: {
            type: 'bar',
            height: 350
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '45%',
                borderRadius: 3,
                endingShape: 'rounded'
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 2,
            colors: ['transparent']
        },
        xaxis: {
            categories: categories,
        },
        yaxis: {
            show: true,
        },
        fill: {
            opacity: 1
        },
        legend: {
            show: false,
        },
        tooltip: {
            y: {
                formatter: function (val) {
                    return val
                }
            }

        },
        colors: ["#23BCFD"],
    }
    return opt;
}

export const ALL_ORDERS = {
    "daily": {
        "count": 264,
        "categories": [
            "08 AM",
            "09 AM",
            "10 AM",
            "11 AM",
            "12 PM",
            "01 PM",
            "02 PM",
            "03 PM",
            "04 PM",
            "05 PM",
            "06 PM",
            "07 PM",
            "08 PM",
        ],
        "data": [
            {
                "data": [
                    25,
                    21,
                    25,
                    18,
                    22,
                    15,
                    14,
                    28,
                    26,
                    16,
                    27,
                    27
                ]
            }
        ]
    },
    "weekly": {
        "count": 541,
        "categories": [
            "SUN",
            "MON",
            "TUE",
            "WED",
            "THUS",
            "FRI",
            "SAT"
        ],
        "data": [
            {
                "data": [
                    75,
                    64,
                    67,
                    84,
                    90,
                    88,
                    73
                ]
            }
        ]
    },
    "monthly": {
        "count": 5193,
        "categories": [
            "01 Oct",
            // "02 Oct",
            "03 Oct",
            // "04 Oct",
            "05 Oct",
            // "06 Oct",
            "07 Oct",
            // "08 Oct",
            "09 Oct",
            // "10 Oct",
            "11 Oct",
            // "12 Oct",
            "13 Oct",
            // "14 Oct",
            "15 Oct",
            // "16 Oct",
            "17 Oct",
            // "18 Oct",
            "19 Oct",
            // "20 Oct",
            "21 Oct",
            // "22 Oct",
            "23 Oct",
            // "24 Oct",
            "25 Oct",
            // "26 Oct",
            "27 Oct",
            // "28 Oct",
            "29 Oct",
            // "30 Oct"
        ],
        "data": [
            {
                "data": [
                    169,
                    // 171,
                    153,
                    // 167,
                    178,
                    // 166,
                    176,
                    // 164,
                    165,
                    // 187,
                    175,
                    // 174,
                    160,
                    // 181,
                    185,
                    // 166,
                    200,
                    // 165,
                    173,
                    // 168,
                    181,
                    // 160,
                    162,
                    // 177,
                    182,
                    // 187,
                    180,
                    // 173,
                    190,
                    // 173
                ]
            }
        ]
    },
    "yearly": {
        "count": 5193,
        "categories": [
            "JAN",
            "FEB",
            "MAR",
            "APR",
            "MAY",
            "JUN",
            "JUL",
            "AUG",
            "SEP",
            "OCT",
            "NOV",
            "DEC"
        ],
        "data": [
            {
                "data": [
                    214,
                    209,
                    204,
                    203,
                    230,
                    222,
                    226,
                    194,
                    229,
                    219,
                    223,
                    211
                ]
            }
        ]
    }
}

export const OVERALL_PROGRESS = {
    "today": [17, 2, 2, 4],
    "weekly": [189, 16, 10, 12],
    "monthly": [240, 22, 12, 28]
}

export const NOTIFICATION = {
    "data": [
        {
            "id": 1,
            "name": "SK",
            "bgcol": "#302CEC",
            "uid": "#ODN213",
            "message": " is successfully delivered and payment received.",
            "time": "2m ago"
        },
        {
            "id": 2,
            "name": "SB",
            "bgcol": "#B18DFE",
            "uid": "#ODN123",
            "message": " is successfully dispatched and on the way to customer place.",
            "time": "15m ago"
        },
        {
            "id": 3,
            "name": "SE",
            "bgcol": "#2EDCD1",
            "uid": "#ODN095",
            "message": " has a ticket raised by the customer",
            "time": "47m ago"
        },
        {
            "id": 4,
            "name": "AJ",
            "bgcol": "#9CAB40",
            "uid": "#ODN431",
            "message": " is successfully delivered and payment received.",
            "time": "1h ago"
        },
        {
            "id": 5,
            "name": "SK",
            "bgcol": "#D7913F",
            "uid": "#ODN041",
            "message": " is successfully dispatched and on the way to customer place.",
            "time": "1h ago"
        },
        {
            "id": 6,
            "name": "VS",
            "bgcol": "#D73F3F",
            "uid": "#ODN213",
            "message": " has a ticket raised by the customer",
            "time": "2h ago"
        },
        {
            "id": 7,
            "name": "MN",
            "bgcol": "#3FD797",
            "uid": "#ODN213",
            "message": " is successfully delivered and payment received.",
            "time": "4h ago"
        },
        {
            "id": 8,
            "name": "EL",
            "bgcol": "#3FBBD7",
            "uid": "#ODN213",
            "message": " is successfully delivered and payment received.",
            "time": "5h ago"
        },
    ]
}

export const ORDERS = [
    {
        "id": 1,
        "order_id": "#ODN270",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 773,
        "delivery": "Abdul",
        "status": "Delivered"
    },
    {
        "id": 2,
        "order_id": "#ODN538",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 753,
        "delivery": "Sivangi",
        "status": "Cancelled"
    },
    {
        "id": 3,
        "order_id": "#ODN428",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 850,
        "delivery": "Sivangi",
        "status": "Pending"
    },
    {
        "id": 4,
        "order_id": "#ODN566",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 656,
        "delivery": "Sagar",
        "status": "Delivered"
    },
    {
        "id": 5,
        "order_id": "#ODN232",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 702,
        "delivery": "Anand",
        "status": "Delivered"
    },
    {
        "id": 6,
        "order_id": "#ODN475",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 837,
        "delivery": "Sivangi",
        "status": "Pending"
    },
    {
        "id": 7,
        "order_id": "#ODN512",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 664,
        "delivery": "Sangeeth",
        "status": "Cancelled"
    },
    {
        "id": 8,
        "order_id": "#ODN221",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 850,
        "delivery": "Abdul",
        "status": "Pending"
    },
    {
        "id": 9,
        "order_id": "#ODN516",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 721,
        "delivery": "Sagar",
        "status": "Delivered"
    },
    {
        "id": 10,
        "order_id": "#ODN464",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 628,
        "delivery": "Sathish",
        "status": "Cancelled"
    },
    {
        "id": 11,
        "order_id": "#ODN247",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 831,
        "delivery": "Anand",
        "status": "Pending"
    },
    {
        "id": 12,
        "order_id": "#ODN532",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 736,
        "delivery": "Kumar",
        "status": "Delivered"
    },
    {
        "id": 13,
        "order_id": "#ODN459",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 693,
        "delivery": "Kumar",
        "status": "Pending"
    },
    {
        "id": 14,
        "order_id": "#ODN395",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 696,
        "delivery": "Anand",
        "status": "Pending"
    },
    {
        "id": 15,
        "order_id": "#ODN210",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 633,
        "delivery": "Sathish",
        "status": "Delivered"
    },
    {
        "id": 16,
        "order_id": "#ODN219",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 826,
        "delivery": "Sanjeev",
        "status": "Cancelled"
    },
    {
        "id": 17,
        "order_id": "#ODN305",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 641,
        "delivery": "Anand",
        "status": "Pending"
    },
    {
        "id": 18,
        "order_id": "#ODN305",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 871,
        "delivery": "Akhila",
        "status": "Delivered"
    },
    {
        "id": 19,
        "order_id": "#ODN408",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 720,
        "delivery": "Sagar",
        "status": "Cancelled"
    },
    {
        "id": 20,
        "order_id": "#ODN311",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 887,
        "delivery": "Akhila",
        "status": "Delivered"
    },
    {
        "id": 21,
        "order_id": "#ODN390",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 804,
        "delivery": "Sangeeth",
        "status": "Pending"
    },
    {
        "id": 22,
        "order_id": "#ODN349",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 879,
        "delivery": "Sanjeev",
        "status": "Delivered"
    },
    {
        "id": 23,
        "order_id": "#ODN333",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 748,
        "delivery": "Kumar",
        "status": "Cancelled"
    },
    {
        "id": 24,
        "order_id": "#ODN509",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 883,
        "delivery": "Yashas",
        "status": "Pending"
    },
    {
        "id": 25,
        "order_id": "#ODN484",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 850,
        "delivery": "Yashas",
        "status": "Cancelled"
    },
    {
        "id": 26,
        "order_id": "#ODN526",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 873,
        "delivery": "Sivangi",
        "status": "Cancelled"
    },
    {
        "id": 27,
        "order_id": "#ODN576",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 900,
        "delivery": "Yashas",
        "status": "Cancelled"
    },
    {
        "id": 28,
        "order_id": "#ODN275",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 831,
        "delivery": "Abdul",
        "status": "Delivered"
    },
    {
        "id": 29,
        "order_id": "#ODN505",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 665,
        "delivery": "Sagar",
        "status": "Cancelled"
    },
    {
        "id": 30,
        "order_id": "#ODN463",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 640,
        "delivery": "Abdul",
        "status": "Cancelled"
    },
    {
        "id": 31,
        "order_id": "#ODN551",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 612,
        "delivery": "Sangeeth",
        "status": "Cancelled"
    },
    {
        "id": 32,
        "order_id": "#ODN529",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 756,
        "delivery": "Sangeeth",
        "status": "Cancelled"
    },
    {
        "id": 33,
        "order_id": "#ODN441",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 710,
        "delivery": "Sivangi",
        "status": "Cancelled"
    },
    {
        "id": 34,
        "order_id": "#ODN202",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 710,
        "delivery": "Vishal",
        "status": "Pending"
    },
    {
        "id": 35,
        "order_id": "#ODN522",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 628,
        "delivery": "Kumar",
        "status": "Delivered"
    },
    {
        "id": 36,
        "order_id": "#ODN534",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 900,
        "delivery": "Vishal",
        "status": "Delivered"
    },
    {
        "id": 37,
        "order_id": "#ODN241",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 703,
        "delivery": "Akhila",
        "status": "Cancelled"
    },
    {
        "id": 38,
        "order_id": "#ODN375",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 882,
        "delivery": "Sangeeth",
        "status": "Delivered"
    },
    {
        "id": 39,
        "order_id": "#ODN513",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 898,
        "delivery": "Sangeeth",
        "status": "Cancelled"
    },
    {
        "id": 40,
        "order_id": "#ODN290",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 884,
        "delivery": "Sagar",
        "status": "Pending"
    },
    {
        "id": 41,
        "order_id": "#ODN367",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 621,
        "delivery": "Kumar",
        "status": "Delivered"
    },
    {
        "id": 42,
        "order_id": "#ODN361",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 777,
        "delivery": "Anand",
        "status": "Pending"
    },
    {
        "id": 43,
        "order_id": "#ODN235",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 753,
        "delivery": "Abdul",
        "status": "Pending"
    },
    {
        "id": 44,
        "order_id": "#ODN513",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 766,
        "delivery": "Sivangi",
        "status": "Delivered"
    },
    {
        "id": 45,
        "order_id": "#ODN558",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 843,
        "delivery": "Sagar",
        "status": "Pending"
    },
    {
        "id": 46,
        "order_id": "#ODN202",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 898,
        "delivery": "Kumar",
        "status": "Delivered"
    },
    {
        "id": 47,
        "order_id": "#ODN541",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 622,
        "delivery": "Sivangi",
        "status": "Cancelled"
    },
    {
        "id": 48,
        "order_id": "#ODN349",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 664,
        "delivery": "Sanjeev",
        "status": "Cancelled"
    },
    {
        "id": 49,
        "order_id": "#ODN418",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 808,
        "delivery": "Akhila",
        "status": "Cancelled"
    },
    {
        "id": 50,
        "order_id": "#ODN386",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 877,
        "delivery": "Sanjeev",
        "status": "Delivered"
    },
    {
        "id": 51,
        "order_id": "#ODN508",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 703,
        "delivery": "Kumar",
        "status": "Pending"
    },
    {
        "id": 52,
        "order_id": "#ODN425",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 623,
        "delivery": "Vishal",
        "status": "Delivered"
    },
    {
        "id": 53,
        "order_id": "#ODN370",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 896,
        "delivery": "Sivangi",
        "status": "Delivered"
    },
    {
        "id": 54,
        "order_id": "#ODN395",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 677,
        "delivery": "Akhila",
        "status": "Cancelled"
    },
    {
        "id": 55,
        "order_id": "#ODN204",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 733,
        "delivery": "Sathish",
        "status": "Pending"
    },
    {
        "id": 56,
        "order_id": "#ODN584",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 641,
        "delivery": "Vishal",
        "status": "Pending"
    },
    {
        "id": 57,
        "order_id": "#ODN560",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 869,
        "delivery": "Akhila",
        "status": "Pending"
    },
    {
        "id": 58,
        "order_id": "#ODN446",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 642,
        "delivery": "Yashas",
        "status": "Pending"
    },
    {
        "id": 59,
        "order_id": "#ODN348",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 719,
        "delivery": "Akhila",
        "status": "Delivered"
    },
    {
        "id": 60,
        "order_id": "#ODN588",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 665,
        "delivery": "Sivangi",
        "status": "Pending"
    },
    {
        "id": 61,
        "order_id": "#ODN233",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 889,
        "delivery": "Akhila",
        "status": "Cancelled"
    },
    {
        "id": 62,
        "order_id": "#ODN571",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 887,
        "delivery": "Akhila",
        "status": "Cancelled"
    },
    {
        "id": 63,
        "order_id": "#ODN371",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 816,
        "delivery": "Abdul",
        "status": "Delivered"
    },
    {
        "id": 64,
        "order_id": "#ODN570",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 843,
        "delivery": "Sivangi",
        "status": "Delivered"
    },
    {
        "id": 65,
        "order_id": "#ODN525",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 776,
        "delivery": "Abdul",
        "status": "Delivered"
    },
    {
        "id": 66,
        "order_id": "#ODN342",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 705,
        "delivery": "Kumar",
        "status": "Delivered"
    },
    {
        "id": 67,
        "order_id": "#ODN346",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 783,
        "delivery": "Yashas",
        "status": "Pending"
    },
    {
        "id": 68,
        "order_id": "#ODN599",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 607,
        "delivery": "Sathish",
        "status": "Delivered"
    },
    {
        "id": 69,
        "order_id": "#ODN270",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 829,
        "delivery": "Sanjeev",
        "status": "Cancelled"
    },
    {
        "id": 70,
        "order_id": "#ODN411",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 642,
        "delivery": "Sanjeev",
        "status": "Pending"
    },
    {
        "id": 71,
        "order_id": "#ODN256",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 898,
        "delivery": "Akhila",
        "status": "Delivered"
    },
    {
        "id": 72,
        "order_id": "#ODN409",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 763,
        "delivery": "Vishal",
        "status": "Cancelled"
    },
    {
        "id": 73,
        "order_id": "#ODN454",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 896,
        "delivery": "Vishal",
        "status": "Delivered"
    },
    {
        "id": 74,
        "order_id": "#ODN582",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 659,
        "delivery": "Sathish",
        "status": "Delivered"
    },
    {
        "id": 75,
        "order_id": "#ODN452",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 825,
        "delivery": "Akhila",
        "status": "Pending"
    },
    {
        "id": 76,
        "order_id": "#ODN368",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 722,
        "delivery": "Kumar",
        "status": "Cancelled"
    },
    {
        "id": 77,
        "order_id": "#ODN531",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 742,
        "delivery": "Kumar",
        "status": "Delivered"
    },
    {
        "id": 78,
        "order_id": "#ODN267",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 709,
        "delivery": "Sathish",
        "status": "Delivered"
    },
    {
        "id": 79,
        "order_id": "#ODN256",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 713,
        "delivery": "Sangeeth",
        "status": "Pending"
    },
    {
        "id": 80,
        "order_id": "#ODN598",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 658,
        "delivery": "Vishal",
        "status": "Delivered"
    },
    {
        "id": 81,
        "order_id": "#ODN454",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 820,
        "delivery": "Vishal",
        "status": "Delivered"
    },
    {
        "id": 82,
        "order_id": "#ODN475",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 824,
        "delivery": "Akhila",
        "status": "Delivered"
    },
    {
        "id": 83,
        "order_id": "#ODN366",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 696,
        "delivery": "Anand",
        "status": "Delivered"
    },
    {
        "id": 84,
        "order_id": "#ODN387",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 632,
        "delivery": "Anand",
        "status": "Delivered"
    },
    {
        "id": 85,
        "order_id": "#ODN519",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 727,
        "delivery": "Anand",
        "status": "Delivered"
    },
    {
        "id": 86,
        "order_id": "#ODN201",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 774,
        "delivery": "Kumar",
        "status": "Cancelled"
    },
    {
        "id": 87,
        "order_id": "#ODN487",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 842,
        "delivery": "Anand",
        "status": "Pending"
    },
    {
        "id": 88,
        "order_id": "#ODN358",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 619,
        "delivery": "Vishal",
        "status": "Cancelled"
    },
    {
        "id": 89,
        "order_id": "#ODN322",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 681,
        "delivery": "Kumar",
        "status": "Delivered"
    },
    {
        "id": 90,
        "order_id": "#ODN386",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 882,
        "delivery": "Sangeeth",
        "status": "Delivered"
    },
    {
        "id": 91,
        "order_id": "#ODN273",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 822,
        "delivery": "Vishal",
        "status": "Pending"
    },
    {
        "id": 92,
        "order_id": "#ODN428",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 795,
        "delivery": "Kumar",
        "status": "Pending"
    },
    {
        "id": 93,
        "order_id": "#ODN360",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 881,
        "delivery": "Anand",
        "status": "Cancelled"
    },
    {
        "id": 94,
        "order_id": "#ODN461",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 771,
        "delivery": "Vishal",
        "status": "Cancelled"
    },
    {
        "id": 95,
        "order_id": "#ODN528",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 829,
        "delivery": "Abdul",
        "status": "Cancelled"
    },
    {
        "id": 96,
        "order_id": "#ODN349",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 777,
        "delivery": "Abdul",
        "status": "Delivered"
    },
    {
        "id": 97,
        "order_id": "#ODN358",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Credit Card",
        "amount": 642,
        "delivery": "Sanjeev",
        "status": "Pending"
    },
    {
        "id": 98,
        "order_id": "#ODN257",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 641,
        "delivery": "Sivangi",
        "status": "Cancelled"
    },
    {
        "id": 99,
        "order_id": "#ODN291",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "UPI",
        "amount": 787,
        "delivery": "Akhila",
        "status": "Pending"
    },
    {
        "id": 100,
        "order_id": "#ODN100",
        "order_at": "2022-12-26 10:00:23",
        "shipped_at": "2022-12-28 11:00:23",
        "payment": "Debit Card",
        "amount": 896,
        "delivery": "Sivangi",
        "status": "Delivered"
    }
]

export const INVENTORY = [
    {
        "id": "1",
        "status": "Active",
        "image": '../images/inventory/img1.jpg',
        "img_name": "img1.jpg",
        "HSN": "101202021",
        "details": "coke",
        "date": "2022-10-15 08:16:22",
        "available": "120",
        "price": "50"
    },
    {
        "id": "2",
        "status": "completed",
        "image": '../images/inventory/img2.jpg',
        "img_name": "img2.jpg",
        "HSN": "101202022",
        "details": "icecream",
        "date": "2022-10-16 18:12:09",
        "available": "10",
        "price": "150"
    },
    {
        "id": "3",
        "status": "active",
        "image": '../images/inventory/img4.jpg',
        "img_name": "img4.jpg",
        "HSN": "101202023",
        "details": "Burger",
        "date": "2022-10-23 12:08:33",
        "available": "80",
        "price": "180"
    },
    {
        "id": "4",
        "status": "active",
        "image": '../images/inventory/img3.jpg',
        "img_name": "img3.jpg",
        "HSN": "101202024",
        "details": "icecream",
        "date": "2022-10-26 12:08:33",
        "available": "5",
        "price": "80"
    },
    {
        "id": "5",
        "status": "active",
        "image": '../images/inventory/img6.jpg',
        "img_name": "img6.jpg",
        "HSN": "101202025",
        "details": "pizza",
        "date": "2022-11-02 11:19:27",
        "available": "170",
        "price": "250"
    },
    {
        "id": "6",
        "status": "completed",
        "image": '../images/inventory/img7.jpg',
        "img_name": "img7.jpg",
        "HSN": "101202026",
        "details": "Ferrero rocher",
        "date": "2022-10-16 18:12:09",
        "available": "100",
        "price": "320"
    },
    {
        "id": "7",
        "status": "completed",
        "image": '../images/inventory/img8.jpg',
        "img_name": "img8.jpg",
        "HSN": "101202027",
        "details": "Brownies",
        "date": "2022-10-23 12:08:33",
        "available": "80",
        "price": "180"
    },
    {
        "id": "8",
        "status": "active",
        "image": '../images/inventory/img11.jpg',
        "img_name": "img11.jpg",
        "HSN": "101202028",
        "details": "Jamun fruit",
        "date": "2022-10-26 14:22:57",
        "available": "200",
        "price": "80"
    },

    {
        "id": "9",
        "status": "Active",
        "image": '../images/inventory/img12.jpg',
        "img_name": "img12.jpg",
        "HSN": "101202029",
        "details": "Shampoo",
        "date": "2022-11-15 15:19:11",
        "available": "280",
        "price": "350"
    },
    {
        "id": "10",
        "status": "completed",
        "image": '../images/inventory/img13.jpg',
        "img_name": "img13.jpg",
        "HSN": "101202030",
        "details": "soap",
        "date": "2022-10-06 03:17:00",
        "available": "7",
        "price": "180"
    },
    {
        "id": "11",
        "status": "active",
        "image": '../images/inventory/img14.jpg',
        "img_name": "img14.jpg",
        "HSN": "101202031",
        "details": "Channa",
        "date": "2022-10-23 17:08:12",
        "available": "800",
        "price": "240"
    },
    {
        "id": "12",
        "status": "active",
        "image": '../images/inventory/img15.jpg',
        "img_name": "img15.jpg",
        "HSN": "101202032",
        "details": "Pen",
        "date": "2022-11-27 05:09:03",
        "available": "500",
        "price": "30"
    },
    {
        "id": "13",
        "status": "completed",
        "image": '../images/inventory/img16.jpg',
        "img_name": "img16.jpg",
        "HSN": "101202033",
        "details": "Lays",
        "date": "2022-09-02 11:19:27",
        "available": "700",
        "price": "20"
    },
    {
        "id": "14",
        "status": "active",
        "image": '../images/inventory/img17.jpg',
        "img_name": "img17.jpg",
        "HSN": "101202034",
        "details": "Almond",
        "date": "2022-11-06 09:23:11",
        "available": "170",
        "price": "850"
    },
    {
        "id": "15",
        "status": "completed",
        "image": '../images/inventory/img18.jpg',
        "img_name": "img18.jpg",
        "HSN": "101202035",
        "details": "Peanuts",
        "date": "2022-09-05 14:17:03",
        "available": "400",
        "price": "210"
    },
]

export const SHIPPING = {
    "east": {
        "color": "#FFA600",
        "count": "05",
        "datas": [
            {
                "id": 1,
                "uid": "#ODT117",
                "count": "20 item",
                "price": "₹2294",
                "time": "11min ago",
                "img": "../images/shipping/img1.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            },
            {
                "id": 2,
                "uid": "#ODT157",
                "count": "17 item",
                "price": "₹1126",
                "time": "4min ago",
                "img": "../images/shipping/img2.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832163",
                "pickup_time": "02:25 PM",
                "eta_time": "06:25 PM"
            },
            {
                "id": 3,
                "uid": "#ODT273",
                "count": "21 item",
                "price": "₹2437",
                "time": "11min ago",
                "img": "../images/shipping/img3.png",
                "status": "Unpaid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832146",
                "pickup_time": "03:25 PM",
                "eta_time": "07:25 PM"
            },
            {
                "id": 4,
                "uid": "#ODT197",
                "count": "16 item",
                "price": "₹2558",
                "time": "28min ago",
                "img": "../images/shipping/img4.png",
                "status": "Unpaid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832233",
                "pickup_time": "04:25 PM",
                "eta_time": "08:25 PM"
            },
            {
                "id": 5,
                "uid": "#ODT207",
                "count": "12 item",
                "price": "₹2573",
                "time": "23min ago",
                "img": "../images/shipping/img5.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832257",
                "pickup_time": "05:25 PM",
                "eta_time": "09:25 PM"
            }
        ],
        "pickup_partner_Det": {
            "name": "Kumaran",
            "img": "../images/shipping/img1.png",
            "phone_no": "+91-9047180229",
            "vehicle_no": "KA-59-CH-7340",
            "delivery_team": "East Team"
        },
        "delivery_det": {
            "tot_orders": "05",
            "delivered": "03",
            "pending": "02",
            "name": "Sam",
            "phone_no": "9876543105",
        }
    },
    "south": {
        "color": "#FF5630",
        "count": "04",
        "datas": [
            {
                "id": 1,
                "uid": "#ODT186",
                "count": "26 item",
                "price": "₹2264",
                "time": "21min ago",
                "img": "../images/shipping/img11.png",
                "status": "Unpaid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            },
            {
                "id": 2,
                "uid": "#ODT291",
                "count": "16 item",
                "price": "₹1810",
                "time": "14min ago",
                "img": "../images/shipping/img12.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            },
            {
                "id": 3,
                "uid": "#ODT173",
                "count": "25 item",
                "price": "₹2247",
                "time": "10min ago",
                "img": "../images/shipping/img13.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            },
            {
                "id": 4,
                "uid": "#ODT224",
                "count": "25 item",
                "price": "₹2660",
                "time": "28min ago",
                "img": "../images/shipping/img14.png",
                "status": "Unpaid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            }
        ],
        "pickup_partner_Det": {
            "name": "Russo",
            "img": "../images/shipping/img2.png",
            "phone_no": "+91-9047180229",
            "vehicle_no": "KA-60-CH-2440",
            "delivery_team": "South Team"
        },
        "delivery_det": {
            "tot_orders": "04",
            "delivered": "02",
            "pending": "02",
            "name": "Bianchi",
            "phone_no": "8876543100",
        }
    },
    "north": {
        "color": "#38CB89",
        "count": "03",
        "datas": [
            {
                "id": 1,
                "uid": "#ODT212",
                "count": "15 item",
                "price": "₹2342",
                "time": "22min ago",
                "img": "../images/shipping/img6.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            },
            {
                "id": 2,
                "uid": "#ODT102",
                "count": "12 item",
                "price": "₹2135",
                "time": "13min ago",
                "img": "../images/shipping/img7.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            },
            {
                "id": 3,
                "uid": "#ODT225",
                "count": "13 item",
                "price": "₹2748",
                "time": "12min ago",
                "img": "../images/shipping/img8.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            }
        ],
        "pickup_partner_Det": {
            "name": "Marco",
            "img": "../images/shipping/img6.png",
            "phone_no": "+91-9047180229",
            "vehicle_no": "KA-59-CH-2440",
            "delivery_team": "North Team"
        },
        "delivery_det": {
            "tot_orders": "03",
            "delivered": "02",
            "pending": "01",
            "name": "Mohammed",
            "phone_no": "8876543100",
        }
    },
    "west": {
        "color": "#377DFF",
        "count": "02",
        "datas": [
            {
                "id": 1,
                "uid": "#ODT123",
                "team": "West",
                "count": "15 item",
                "price": "₹1791",
                "time": "4min ago",
                "img": "../images/shipping/img9.png",
                "status": "Paid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            },
            {
                "id": 2,
                "uid": "#ODT203",
                "team": "West",
                "count": "23 item",
                "price": "₹2471",
                "time": "30min ago",
                "img": "../images/shipping/img10.png",
                "status": "Unpaid",
                "dates": "2022-12-27",
                "invoice_id": "GC-KA-9-832277",
                "pickup_time": "01:25 PM",
                "eta_time": "05:25 PM"
            }
        ],
        "pickup_partner_Det": {
            "name": "Francesca",
            "img": "../images/shipping/img4.png",
            "phone_no": "+91-9047180229",
            "vehicle_no": "KA-60-CH-2440",
            "delivery_team": "West Team"
        },
        "delivery_det": {
            "tot_orders": "02",
            "delivered": "01",
            "pending": "01",
            "name": "Lucy",
            "phone_no": "8876543100",
        }
    },

}

export const MAP_DETAILS = {
    "east": {
        "polyline1": [
            [
                13.11294108464196,
                77.68125254194081
            ],
            [
                13.113848638800576,
                77.68105840565693
            ],
            [
                13.114340229238394,
                77.68131078282681
            ],
            [
                13.114510394930491,
                77.68128166238483
            ],
            [
                13.11462383866008,
                77.68085456255915
            ],
            [
                13.114935808645455,
                77.68083514893118
            ],
            [
                13.115238324617167,
                77.68034010140542
            ],
            [
                13.11656182761611,
                77.68054394450536
            ],
            [
                13.117091226821444,
                77.68079632167309
            ],
            [
                13.118679413790161,
                77.68088368062485
            ],
            [
                13.119246622295819,
                77.68119429868062
            ],
            [
                13.12045666273309,
                77.68137872815049
            ],
            [
                13.120768625317652,
                77.68174758709029
            ],
            [
                13.121402002681208,
                77.68299005930947
            ],
            [
                13.12152488989652,
                77.68351421912712
            ]
        ],
        "polyline2": [
            [
                13.12152488989652,
                77.68351421912712
            ],
            [
                13.121638330389587,
                77.68467903683239
            ],
            [
                13.121704503985626,
                77.68514496391401
            ],
            [
                13.121505983143052,
                77.68527115249793
            ],
            [
                13.121194021494361,
                77.68533910019784
            ],
            [
                13.121194021494361,
                77.68583910019784
            ],
            [
                13.121194021494361,
                77.68583910019784
            ],
            [
                13.120967140045678,
                77.68711544719667
            ],
            [
                13.120815222841145,
                77.68719585303467
            ],
            [
                13.120380191244749,
                77.68706447280891
            ],
            [
                13.119420560001757,
                77.68737978535103
            ],
            [
                13.118934345408988,
                77.68758999371335
            ],
            [
                13.118486515327902,
                77.688338861001
            ]
        ],
        "markers": [
            [
                13.11482,
                77.68170
            ],
            [
                13.11729,
                77.68046
            ],
            [
                13.12160,
                77.68229
            ],
            [
                13.12176,
                77.68565
            ],
            [
                13.11930,
                77.68823
            ]
        ],
        "scooter": [
            13.073256432766712,
            77.78918886891375
        ]
    },
    "south": {
        "polyline1": [
            [
                13.112873,
                77.681270
            ],
            [
                13.113871,
                77.681059
            ],
            [
                13.114339166772979,
                77.68129980682932
            ],
            [
                13.114510669859243,
                77.68131581554388
            ],
            [
                13.114650990477188,
                77.68086757152531
            ],
            [
                13.114947222629539,
                77.68081954537979
            ],
            [
                13.115087542998438,
                77.68059542337045
            ],
            [
                13.115243454425098,
                77.68034728828928
            ],
            [
                13.115812530294761,
                77.68038731007744
            ],
            [
                13.116599879667945,
                77.68056340594126
            ],
            [
                13.117067607581873,
                77.68078752850386
            ],
            [
                13.117496360315684,
                77.6808195459347
            ],
            [
                13.11763667922905,
                77.6800831450467
            ],
            [
                13.119250340985573,
                77.67871439991717
            ],
            [
                13.119546567596814,
                77.67870639555991
            ],
            [
                13.119705398199358,
                77.67833730795479
            ]
        ],
        "polyline2": [
            [
                13.119705398199358,
                77.67833730795479
            ],
            [
                13.119942027564917,
                77.67752740284357
            ],
            [
                13.119933263518575,
                77.67699646504946
            ],
            [
                13.120126072470583,
                77.67657351460286
            ],
            [
                13.120126072470583,
                77.67657351460286
            ],
            [
                13.120161128627544,
                77.67579060632795
            ],
            [
                13.120301353572728,
                77.67460274441999
            ],
            [
                13.12037146583161,
                77.67422478870265
            ],
            [
                13.12072202682505,
                77.67358586355908
            ],
            [
                13.121090115329793,
                77.67271296582953
            ],
            [
                13.121554607179604,
                77.67278495739515
            ]
        ],
        "markers": [
            [
                13.11499,
                77.68176
            ],
            [
                13.11888,
                77.67997
            ],
            [
                13.12031,
                77.67654
            ],
            [
                13.12185,
                77.67286
            ]
        ]
    },
    "north": {
        "polyline1": [
            [
                13.112873,
                77.681270
            ],
            [
                13.113871,
                77.681059
            ],
            [
                13.114339166772979,
                77.68129980682932
            ],
            [
                13.114510669859243,
                77.68131581554388
            ],
            [
                13.114650990477188,
                77.68086757152531
            ],
            [
                13.114947222629539,
                77.68081954537979
            ],
            [
                13.115087542998438,
                77.68059542337045
            ],
            [
                13.115243454425098,
                77.68034728828928
            ],
            [
                13.115812530294761,
                77.68038731007744
            ],
            [
                13.116599879667945,
                77.68056340594126
            ],
            [
                13.117067607581873,
                77.68078752850386
            ],
            [
                13.117496360315684,
                77.6808195459347
            ],
            [
                13.11763667922905,
                77.6800831450467
            ],
            [
                13.119250340985573,
                77.67871439991717
            ],
            [
                13.119546567596814,
                77.67870639555991
            ],
            [
                13.119705398199358,
                77.67833730795479
            ],
            [
                13.119942027564917,
                77.67752740284357
            ],
            [
                13.119933263518575,
                77.67699646504946
            ],
            [
                13.120126072470583,
                77.67657351460286
            ],
            [
                13.120126072470583,
                77.67657351460286
            ],
            [
                13.120161128627544,
                77.67579060632795
            ],
            [
                13.120301353572728,
                77.67460274441999
            ],
            [
                13.12037146583161,
                77.67422478870265
            ],
            [
                13.12072202682505,
                77.67358586355908
            ],
            [
                13.121090115329793,
                77.67271296582953
            ]
        ],
        "polyline2": [
            [
                13.121554607179604,
                77.67278495739515
            ]
        ],
        "markers": [
            [
                13.11499,
                77.68176
            ],
            [
                13.11944,
                77.67954
            ],
            [
                13.121220,
                77.673996
            ]
        ]
    },
    "west": {
        "polyline1": [
            [
                13.112873,
                77.681270
            ],
            [
                13.113871,
                77.681059
            ],
            [
                13.114339166772979,
                77.68129980682932
            ],
            [
                13.114510669859243,
                77.68131581554388
            ],
            [
                13.114650990477188,
                77.68086757152531
            ],
            [
                13.114947222629539,
                77.68081954537979
            ],
            [
                13.115087542998438,
                77.68059542337045
            ],
            [
                13.115243454425098,
                77.68034728828928
            ],
            [
                13.115812530294761,
                77.68038731007744
            ],
            [
                13.116599879667945,
                77.68056340594126
            ],
            [
                13.117067607581873,
                77.68078752850386
            ],
            [
                13.117496360315684,
                77.6808195459347
            ],
            [
                13.117262373694828,
                77.68177157960957
            ],
            [
                13.116966137779713,
                77.68306431193048
            ],
            [
                13.116743960609753,
                77.68359661347529
            ],
            [
                13.116107051609234,
                77.6842657925585
            ]
        ],
        "polyline2": [
            [
                13.116107051609234,
                77.6842657925585
            ],
            [
                13.115322021966179,
                77.68496538887382
            ],
            [
                13.114448113761298,
                77.6859082998883
            ],
            [
                13.113811198814702,
                77.68685123405146
            ]
        ],
        "markers": [
            [
                13.11499,
                77.68176
            ],
            [
                13.11482,
                77.68650
            ]
        ]
    }
}

export const REPORTS = [
    {
        "id": 72,
        "date": "2022-08-11",
        "millisec": 1660176000000,
        "orderProduct": 4026,
        "unitsOrder": 67,
        "totOrder": 474,
        "avgSelling": 502,
        "session": 562
    },
    {
        "id": 73,
        "date": "2022-08-12",
        "millisec": 1660262400000,
        "orderProduct": 5263,
        "unitsOrder": 73,
        "totOrder": 735,
        "avgSelling": 589,
        "session": 316
    },
    {
        "id": 74,
        "date": "2022-08-13",
        "millisec": 1660348800000,
        "orderProduct": 5304,
        "unitsOrder": 84,
        "totOrder": 662,
        "avgSelling": 769,
        "session": 576
    },
    {
        "id": 75,
        "date": "2022-08-14",
        "millisec": 1660435200000,
        "orderProduct": 6131,
        "unitsOrder": 62,
        "totOrder": 427,
        "avgSelling": 536,
        "session": 242
    },
    {
        "id": 76,
        "date": "2022-08-15",
        "millisec": 1660521600000,
        "orderProduct": 5099,
        "unitsOrder": 83,
        "totOrder": 502,
        "avgSelling": 753,
        "session": 452
    },
    {
        "id": 77,
        "date": "2022-08-16",
        "millisec": 1660608000000,
        "orderProduct": 4084,
        "unitsOrder": 82,
        "totOrder": 669,
        "avgSelling": 642,
        "session": 303
    },
    {
        "id": 78,
        "date": "2022-08-17",
        "millisec": 1660694400000,
        "orderProduct": 4196,
        "unitsOrder": 87,
        "totOrder": 583,
        "avgSelling": 723,
        "session": 646
    },
    {
        "id": 79,
        "date": "2022-08-18",
        "millisec": 1660780800000,
        "orderProduct": 5627,
        "unitsOrder": 87,
        "totOrder": 763,
        "avgSelling": 698,
        "session": 307
    },
    {
        "id": 80,
        "date": "2022-08-19",
        "millisec": 1660867200000,
        "orderProduct": 5628,
        "unitsOrder": 68,
        "totOrder": 423,
        "avgSelling": 585,
        "session": 674
    },
    {
        "id": 81,
        "date": "2022-08-20",
        "millisec": 1660953600000,
        "orderProduct": 5872,
        "unitsOrder": 63,
        "totOrder": 711,
        "avgSelling": 755,
        "session": 787
    },
    {
        "id": 82,
        "date": "2022-08-21",
        "millisec": 1661040000000,
        "orderProduct": 6580,
        "unitsOrder": 76,
        "totOrder": 739,
        "avgSelling": 913,
        "session": 391
    },
    {
        "id": 83,
        "date": "2022-08-22",
        "millisec": 1661126400000,
        "orderProduct": 4318,
        "unitsOrder": 69,
        "totOrder": 727,
        "avgSelling": 654,
        "session": 633
    },
    {
        "id": 84,
        "date": "2022-08-23",
        "millisec": 1661212800000,
        "orderProduct": 6752,
        "unitsOrder": 68,
        "totOrder": 581,
        "avgSelling": 877,
        "session": 698
    },
    {
        "id": 85,
        "date": "2022-08-24",
        "millisec": 1661299200000,
        "orderProduct": 4004,
        "unitsOrder": 84,
        "totOrder": 490,
        "avgSelling": 959,
        "session": 329
    },
    {
        "id": 86,
        "date": "2022-08-25",
        "millisec": 1661385600000,
        "orderProduct": 6222,
        "unitsOrder": 72,
        "totOrder": 426,
        "avgSelling": 691,
        "session": 266
    },
    {
        "id": 87,
        "date": "2022-08-26",
        "millisec": 1661472000000,
        "orderProduct": 4778,
        "unitsOrder": 72,
        "totOrder": 617,
        "avgSelling": 598,
        "session": 336
    },
    {
        "id": 88,
        "date": "2022-08-27",
        "millisec": 1661558400000,
        "orderProduct": 4051,
        "unitsOrder": 85,
        "totOrder": 581,
        "avgSelling": 685,
        "session": 507
    },
    {
        "id": 89,
        "date": "2022-08-28",
        "millisec": 1661644800000,
        "orderProduct": 4000,
        "unitsOrder": 87,
        "totOrder": 742,
        "avgSelling": 792,
        "session": 318
    },
    {
        "id": 90,
        "date": "2022-08-29",
        "millisec": 1661731200000,
        "orderProduct": 6815,
        "unitsOrder": 67,
        "totOrder": 663,
        "avgSelling": 643,
        "session": 755
    },
    {
        "id": 91,
        "date": "2022-08-30",
        "millisec": 1661817600000,
        "orderProduct": 5137,
        "unitsOrder": 62,
        "totOrder": 539,
        "avgSelling": 506,
        "session": 624
    },
    {
        "id": 92,
        "date": "2022-08-31",
        "millisec": 1661904000000,
        "orderProduct": 6074,
        "unitsOrder": 75,
        "totOrder": 597,
        "avgSelling": 508,
        "session": 282
    },
    {
        "id": 93,
        "date": "2022-09-01",
        "millisec": 1661990400000,
        "orderProduct": 6651,
        "unitsOrder": 92,
        "totOrder": 513,
        "avgSelling": 960,
        "session": 221
    },
    {
        "id": 94,
        "date": "2022-09-02",
        "millisec": 1662076800000,
        "orderProduct": 6725,
        "unitsOrder": 73,
        "totOrder": 536,
        "avgSelling": 647,
        "session": 702
    },
    {
        "id": 95,
        "date": "2022-09-03",
        "millisec": 1662163200000,
        "orderProduct": 5223,
        "unitsOrder": 76,
        "totOrder": 579,
        "avgSelling": 505,
        "session": 292
    },
    {
        "id": 96,
        "date": "2022-09-04",
        "millisec": 1662249600000,
        "orderProduct": 4665,
        "unitsOrder": 68,
        "totOrder": 705,
        "avgSelling": 759,
        "session": 508
    },
    {
        "id": 97,
        "date": "2022-09-05",
        "millisec": 1662336000000,
        "orderProduct": 6184,
        "unitsOrder": 95,
        "totOrder": 644,
        "avgSelling": 602,
        "session": 705
    },
    {
        "id": 98,
        "date": "2022-09-06",
        "millisec": 1662422400000,
        "orderProduct": 4875,
        "unitsOrder": 90,
        "totOrder": 653,
        "avgSelling": 657,
        "session": 751
    },
    {
        "id": 99,
        "date": "2022-09-07",
        "millisec": 1662508800000,
        "orderProduct": 6141,
        "unitsOrder": 67,
        "totOrder": 488,
        "avgSelling": 800,
        "session": 707
    },
    {
        "id": 100,
        "date": "2022-09-08",
        "millisec": 1662595200000,
        "orderProduct": 5588,
        "unitsOrder": 70,
        "totOrder": 610,
        "avgSelling": 834,
        "session": 210
    },
    {
        "id": 101,
        "date": "2022-09-09",
        "millisec": 1662681600000,
        "orderProduct": 6166,
        "unitsOrder": 75,
        "totOrder": 692,
        "avgSelling": 856,
        "session": 733
    },
    {
        "id": 102,
        "date": "2022-09-10",
        "millisec": 1662768000000,
        "orderProduct": 6765,
        "unitsOrder": 71,
        "totOrder": 527,
        "avgSelling": 936,
        "session": 608
    },
    {
        "id": 103,
        "date": "2022-09-11",
        "millisec": 1662854400000,
        "orderProduct": 6823,
        "unitsOrder": 89,
        "totOrder": 646,
        "avgSelling": 727,
        "session": 321
    },
    {
        "id": 104,
        "date": "2022-09-12",
        "millisec": 1662940800000,
        "orderProduct": 6606,
        "unitsOrder": 75,
        "totOrder": 520,
        "avgSelling": 517,
        "session": 355
    },
    {
        "id": 105,
        "date": "2022-09-13",
        "millisec": 1663027200000,
        "orderProduct": 6444,
        "unitsOrder": 75,
        "totOrder": 419,
        "avgSelling": 963,
        "session": 504
    },
    {
        "id": 106,
        "date": "2022-09-14",
        "millisec": 1663113600000,
        "orderProduct": 4226,
        "unitsOrder": 86,
        "totOrder": 564,
        "avgSelling": 842,
        "session": 662
    },
    {
        "id": 107,
        "date": "2022-09-15",
        "millisec": 1663200000000,
        "orderProduct": 6324,
        "unitsOrder": 86,
        "totOrder": 576,
        "avgSelling": 693,
        "session": 625
    },
    {
        "id": 108,
        "date": "2022-09-16",
        "millisec": 1663286400000,
        "orderProduct": 4577,
        "unitsOrder": 95,
        "totOrder": 453,
        "avgSelling": 798,
        "session": 395
    },
    {
        "id": 109,
        "date": "2022-09-17",
        "millisec": 1663372800000,
        "orderProduct": 4746,
        "unitsOrder": 77,
        "totOrder": 591,
        "avgSelling": 535,
        "session": 538
    },
    {
        "id": 110,
        "date": "2022-09-18",
        "millisec": 1663459200000,
        "orderProduct": 5796,
        "unitsOrder": 66,
        "totOrder": 770,
        "avgSelling": 655,
        "session": 613
    },
    {
        "id": 111,
        "date": "2022-09-19",
        "millisec": 1663545600000,
        "orderProduct": 4535,
        "unitsOrder": 82,
        "totOrder": 634,
        "avgSelling": 681,
        "session": 529
    },
    {
        "id": 112,
        "date": "2022-09-20",
        "millisec": 1663632000000,
        "orderProduct": 5910,
        "unitsOrder": 81,
        "totOrder": 737,
        "avgSelling": 697,
        "session": 712
    },
    {
        "id": 113,
        "date": "2022-09-21",
        "millisec": 1663718400000,
        "orderProduct": 6137,
        "unitsOrder": 70,
        "totOrder": 732,
        "avgSelling": 651,
        "session": 522
    },
    {
        "id": 114,
        "date": "2022-09-22",
        "millisec": 1663804800000,
        "orderProduct": 4870,
        "unitsOrder": 72,
        "totOrder": 543,
        "avgSelling": 519,
        "session": 570
    },
    {
        "id": 115,
        "date": "2022-09-23",
        "millisec": 1663891200000,
        "orderProduct": 4045,
        "unitsOrder": 87,
        "totOrder": 574,
        "avgSelling": 738,
        "session": 587
    },
    {
        "id": 116,
        "date": "2022-09-24",
        "millisec": 1663977600000,
        "orderProduct": 5380,
        "unitsOrder": 60,
        "totOrder": 603,
        "avgSelling": 865,
        "session": 299
    },
    {
        "id": 117,
        "date": "2022-09-25",
        "millisec": 1664064000000,
        "orderProduct": 5339,
        "unitsOrder": 69,
        "totOrder": 608,
        "avgSelling": 749,
        "session": 369
    },
    {
        "id": 118,
        "date": "2022-09-26",
        "millisec": 1664150400000,
        "orderProduct": 6066,
        "unitsOrder": 72,
        "totOrder": 527,
        "avgSelling": 962,
        "session": 386
    },
    {
        "id": 119,
        "date": "2022-09-27",
        "millisec": 1664236800000,
        "orderProduct": 5529,
        "unitsOrder": 64,
        "totOrder": 668,
        "avgSelling": 513,
        "session": 534
    },
    {
        "id": 120,
        "date": "2022-09-28",
        "millisec": 1664323200000,
        "orderProduct": 6773,
        "unitsOrder": 70,
        "totOrder": 603,
        "avgSelling": 696,
        "session": 388
    },
    {
        "id": 121,
        "date": "2022-09-29",
        "millisec": 1664409600000,
        "orderProduct": 5734,
        "unitsOrder": 76,
        "totOrder": 767,
        "avgSelling": 816,
        "session": 437
    },
    {
        "id": 122,
        "date": "2022-09-30",
        "millisec": 1664496000000,
        "orderProduct": 5678,
        "unitsOrder": 92,
        "totOrder": 724,
        "avgSelling": 707,
        "session": 340
    },
    {
        "id": 123,
        "date": "2022-10-01",
        "millisec": 1664582400000,
        "orderProduct": 5955,
        "unitsOrder": 95,
        "totOrder": 494,
        "avgSelling": 613,
        "session": 512
    },
    {
        "id": 124,
        "date": "2022-10-02",
        "millisec": 1664668800000,
        "orderProduct": 6476,
        "unitsOrder": 62,
        "totOrder": 554,
        "avgSelling": 739,
        "session": 269
    },
    {
        "id": 125,
        "date": "2022-10-03",
        "millisec": 1664755200000,
        "orderProduct": 4233,
        "unitsOrder": 64,
        "totOrder": 508,
        "avgSelling": 837,
        "session": 479
    },
    {
        "id": 126,
        "date": "2022-10-04",
        "millisec": 1664841600000,
        "orderProduct": 4068,
        "unitsOrder": 93,
        "totOrder": 730,
        "avgSelling": 922,
        "session": 240
    },
    {
        "id": 127,
        "date": "2022-10-05",
        "millisec": 1664928000000,
        "orderProduct": 4111,
        "unitsOrder": 76,
        "totOrder": 731,
        "avgSelling": 850,
        "session": 720
    },
    {
        "id": 128,
        "date": "2022-10-06",
        "millisec": 1665014400000,
        "orderProduct": 4874,
        "unitsOrder": 68,
        "totOrder": 402,
        "avgSelling": 564,
        "session": 349
    },
    {
        "id": 129,
        "date": "2022-10-07",
        "millisec": 1665100800000,
        "orderProduct": 5050,
        "unitsOrder": 92,
        "totOrder": 610,
        "avgSelling": 593,
        "session": 598
    },
    {
        "id": 130,
        "date": "2022-10-08",
        "millisec": 1665187200000,
        "orderProduct": 5507,
        "unitsOrder": 73,
        "totOrder": 448,
        "avgSelling": 697,
        "session": 327
    },
    {
        "id": 131,
        "date": "2022-10-09",
        "millisec": 1665273600000,
        "orderProduct": 6019,
        "unitsOrder": 79,
        "totOrder": 411,
        "avgSelling": 770,
        "session": 303
    },
    {
        "id": 132,
        "date": "2022-10-10",
        "millisec": 1665360000000,
        "orderProduct": 4888,
        "unitsOrder": 60,
        "totOrder": 749,
        "avgSelling": 643,
        "session": 509
    },
    {
        "id": 133,
        "date": "2022-10-11",
        "millisec": 1665446400000,
        "orderProduct": 6444,
        "unitsOrder": 94,
        "totOrder": 552,
        "avgSelling": 912,
        "session": 743
    },
    {
        "id": 134,
        "date": "2022-10-12",
        "millisec": 1665532800000,
        "orderProduct": 6931,
        "unitsOrder": 92,
        "totOrder": 660,
        "avgSelling": 566,
        "session": 782
    },
    {
        "id": 135,
        "date": "2022-10-13",
        "millisec": 1665619200000,
        "orderProduct": 4438,
        "unitsOrder": 67,
        "totOrder": 452,
        "avgSelling": 700,
        "session": 466
    },
    {
        "id": 136,
        "date": "2022-10-14",
        "millisec": 1665705600000,
        "orderProduct": 5378,
        "unitsOrder": 89,
        "totOrder": 792,
        "avgSelling": 653,
        "session": 475
    },
    {
        "id": 137,
        "date": "2022-10-15",
        "millisec": 1665792000000,
        "orderProduct": 6887,
        "unitsOrder": 73,
        "totOrder": 698,
        "avgSelling": 888,
        "session": 489
    },
    {
        "id": 138,
        "date": "2022-10-16",
        "millisec": 1665878400000,
        "orderProduct": 5375,
        "unitsOrder": 64,
        "totOrder": 403,
        "avgSelling": 815,
        "session": 311
    },
    {
        "id": 139,
        "date": "2022-10-17",
        "millisec": 1665964800000,
        "orderProduct": 4082,
        "unitsOrder": 82,
        "totOrder": 647,
        "avgSelling": 845,
        "session": 405
    },
    {
        "id": 140,
        "date": "2022-10-18",
        "millisec": 1666051200000,
        "orderProduct": 6869,
        "unitsOrder": 94,
        "totOrder": 753,
        "avgSelling": 755,
        "session": 514
    },
    {
        "id": 141,
        "date": "2022-10-19",
        "millisec": 1666137600000,
        "orderProduct": 4121,
        "unitsOrder": 68,
        "totOrder": 401,
        "avgSelling": 921,
        "session": 279
    },
    {
        "id": 142,
        "date": "2022-10-20",
        "millisec": 1666224000000,
        "orderProduct": 4786,
        "unitsOrder": 63,
        "totOrder": 547,
        "avgSelling": 535,
        "session": 283
    },
    {
        "id": 143,
        "date": "2022-10-21",
        "millisec": 1666310400000,
        "orderProduct": 4520,
        "unitsOrder": 62,
        "totOrder": 690,
        "avgSelling": 726,
        "session": 339
    },
    {
        "id": 144,
        "date": "2022-10-22",
        "millisec": 1666396800000,
        "orderProduct": 5375,
        "unitsOrder": 69,
        "totOrder": 662,
        "avgSelling": 918,
        "session": 545
    },
    {
        "id": 145,
        "date": "2022-10-23",
        "millisec": 1666483200000,
        "orderProduct": 5389,
        "unitsOrder": 73,
        "totOrder": 486,
        "avgSelling": 731,
        "session": 314
    },
    {
        "id": 146,
        "date": "2022-10-24",
        "millisec": 1666569600000,
        "orderProduct": 5192,
        "unitsOrder": 60,
        "totOrder": 649,
        "avgSelling": 633,
        "session": 600
    },
    {
        "id": 147,
        "date": "2022-10-25",
        "millisec": 1666656000000,
        "orderProduct": 4226,
        "unitsOrder": 73,
        "totOrder": 466,
        "avgSelling": 596,
        "session": 389
    },
    {
        "id": 148,
        "date": "2022-10-26",
        "millisec": 1666742400000,
        "orderProduct": 6547,
        "unitsOrder": 85,
        "totOrder": 403,
        "avgSelling": 685,
        "session": 484
    },
    {
        "id": 149,
        "date": "2022-10-27",
        "millisec": 1666828800000,
        "orderProduct": 6762,
        "unitsOrder": 81,
        "totOrder": 786,
        "avgSelling": 977,
        "session": 273
    },
    {
        "id": 150,
        "date": "2022-10-28",
        "millisec": 1666915200000,
        "orderProduct": 6105,
        "unitsOrder": 86,
        "totOrder": 644,
        "avgSelling": 885,
        "session": 731
    },
    {
        "id": 151,
        "date": "2022-10-29",
        "millisec": 1667001600000,
        "orderProduct": 5832,
        "unitsOrder": 62,
        "totOrder": 793,
        "avgSelling": 748,
        "session": 750
    },
    {
        "id": 152,
        "date": "2022-10-30",
        "millisec": 1667088000000,
        "orderProduct": 6093,
        "unitsOrder": 61,
        "totOrder": 544,
        "avgSelling": 512,
        "session": 764
    },
    {
        "id": 153,
        "date": "2022-10-31",
        "millisec": 1667174400000,
        "orderProduct": 4621,
        "unitsOrder": 74,
        "totOrder": 744,
        "avgSelling": 644,
        "session": 440
    },
    {
        "id": 154,
        "date": "2022-11-01",
        "millisec": 1667260800000,
        "orderProduct": 6972,
        "unitsOrder": 74,
        "totOrder": 481,
        "avgSelling": 799,
        "session": 723
    },
    {
        "id": 155,
        "date": "2022-11-02",
        "millisec": 1667347200000,
        "orderProduct": 4671,
        "unitsOrder": 92,
        "totOrder": 679,
        "avgSelling": 864,
        "session": 775
    },
    {
        "id": 156,
        "date": "2022-11-03",
        "millisec": 1667433600000,
        "orderProduct": 6244,
        "unitsOrder": 86,
        "totOrder": 579,
        "avgSelling": 798,
        "session": 592
    },
    {
        "id": 157,
        "date": "2022-11-04",
        "millisec": 1667520000000,
        "orderProduct": 5248,
        "unitsOrder": 61,
        "totOrder": 427,
        "avgSelling": 534,
        "session": 578
    },
    {
        "id": 158,
        "date": "2022-11-05",
        "millisec": 1667606400000,
        "orderProduct": 4157,
        "unitsOrder": 78,
        "totOrder": 553,
        "avgSelling": 775,
        "session": 434
    },
    {
        "id": 159,
        "date": "2022-11-06",
        "millisec": 1667692800000,
        "orderProduct": 4557,
        "unitsOrder": 91,
        "totOrder": 615,
        "avgSelling": 945,
        "session": 409
    },
    {
        "id": 160,
        "date": "2022-11-07",
        "millisec": 1667779200000,
        "orderProduct": 6912,
        "unitsOrder": 92,
        "totOrder": 489,
        "avgSelling": 928,
        "session": 429
    },
    {
        "id": 161,
        "date": "2022-11-08",
        "millisec": 1667865600000,
        "orderProduct": 6952,
        "unitsOrder": 92,
        "totOrder": 701,
        "avgSelling": 628,
        "session": 388
    },
    {
        "id": 162,
        "date": "2022-11-09",
        "millisec": 1667952000000,
        "orderProduct": 5222,
        "unitsOrder": 64,
        "totOrder": 594,
        "avgSelling": 697,
        "session": 365
    },
    {
        "id": 163,
        "date": "2022-11-10",
        "millisec": 1668038400000,
        "orderProduct": 4186,
        "unitsOrder": 77,
        "totOrder": 660,
        "avgSelling": 600,
        "session": 756
    },
    {
        "id": 164,
        "date": "2022-11-11",
        "millisec": 1668124800000,
        "orderProduct": 5913,
        "unitsOrder": 66,
        "totOrder": 745,
        "avgSelling": 895,
        "session": 792
    },
    {
        "id": 165,
        "date": "2022-11-12",
        "millisec": 1668211200000,
        "orderProduct": 5781,
        "unitsOrder": 82,
        "totOrder": 475,
        "avgSelling": 575,
        "session": 552
    },
    {
        "id": 166,
        "date": "2022-11-13",
        "millisec": 1668297600000,
        "orderProduct": 6053,
        "unitsOrder": 73,
        "totOrder": 408,
        "avgSelling": 711,
        "session": 647
    },
    {
        "id": 167,
        "date": "2022-11-14",
        "millisec": 1668384000000,
        "orderProduct": 4681,
        "unitsOrder": 60,
        "totOrder": 404,
        "avgSelling": 884,
        "session": 572
    },
    {
        "id": 168,
        "date": "2022-11-15",
        "millisec": 1668470400000,
        "orderProduct": 6684,
        "unitsOrder": 73,
        "totOrder": 642,
        "avgSelling": 515,
        "session": 568
    },
    {
        "id": 169,
        "date": "2022-11-16",
        "millisec": 1668556800000,
        "orderProduct": 5036,
        "unitsOrder": 91,
        "totOrder": 734,
        "avgSelling": 988,
        "session": 378
    },
    {
        "id": 170,
        "date": "2022-11-17",
        "millisec": 1668643200000,
        "orderProduct": 6174,
        "unitsOrder": 85,
        "totOrder": 698,
        "avgSelling": 922,
        "session": 210
    },
    {
        "id": 171,
        "date": "2022-11-18",
        "millisec": 1668729600000,
        "orderProduct": 4120,
        "unitsOrder": 65,
        "totOrder": 420,
        "avgSelling": 864,
        "session": 514
    },
    {
        "id": 172,
        "date": "2022-11-19",
        "millisec": 1668816000000,
        "orderProduct": 6544,
        "unitsOrder": 91,
        "totOrder": 546,
        "avgSelling": 584,
        "session": 305
    },
    {
        "id": 173,
        "date": "2022-11-20",
        "millisec": 1668902400000,
        "orderProduct": 6047,
        "unitsOrder": 87,
        "totOrder": 450,
        "avgSelling": 511,
        "session": 388
    }
]

export const MESSAGE = [
    {
        "id": 1,
        "uid": "#ODT117",
        "name": "Sathishkumar",
        "time": "10.40 AM",
        "img": "../images/messages/img1.jpg",
        "status": "online",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 2,
        "uid": "#ODT157",
        "name": "Vimala Das",
        "time": "10.28 AM",
        "img": "../images/messages/img2.jpg",
        "status": "offline",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 3,
        "uid": "#ODT273",
        "name": "Hemendra Gandhi",
        "time": "10.02 AM",
        "img": "../images/messages/img3.jpg",
        "status": "offline",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 4,
        "uid": "#ODT197",
        "name": "Aniruddh Wadhwa",
        "time": "9.50 AM",
        "img": "../images/messages/img4.jpg",
        "status": "online",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 5,
        "uid": "#ODT207",
        "name": "Anshu Sachar",
        "time": "9.30 AM",
        "img": "../images/messages/img5.jpg",
        "status": "offline",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 6,
        "uid": "#ODT666",
        "name": "Ananya George",
        "time": "9.13 AM",
        "img": "../images/messages/img6.jpg",
        "status": "online",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 7,
        "uid": "#ODT567",
        "name": "Riddhi Sampath",
        "time": "8:54 AM",
        "img": "../images/messages/img7.jpg",
        "status": "offline",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 8,
        "uid": "#ODT777",
        "name": "Riddhi Sampath",
        "time": "8:24 AM",
        "img": "../images/shipping/img1.png",
        "status": "online",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 8,
        "uid": "#ODT478",
        "name": "Sampath",
        "time": "8:24 AM",
        "img": "../images/shipping/img2.png",
        "status": "online",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    },
    {
        "id": 9,
        "uid": "#ODT900",
        "name": "Kumaran",
        "time": "8:24 AM",
        "img": "../images/shipping/img3.png",
        "status": "offline",
        "content": "Hi, I would like to...",
        "msg": [
            {
                "sender": "customer",
                "customer": "Hi, I would like to place an order for delivery.",
                "time": "10mins"
            },
            {
                "sender": "owner",
                "owner": "Great, what would you like to order?",
                "time": "10mins"
            },
            {
                "sender": "customer",
                "customer": "Can I get a large pepperoni pizza and a Caesar salad?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": " Sure, that will be $20. Would you like to add anything else to your order?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "No, that's all. Can you deliver it to 123 Main St?",
                "time": "9mins"
            },
            {
                "sender": "owner",
                "owner": "Yes, we can deliver it to that address. What is your phone number for the delivery driver to contact you?",
                "time": "9mins"
            },
            {
                "sender": "customer",
                "customer": "My phone number is 555-555-5555.",
                "time": "8mins"
            },
            {
                "sender": "owner",
                "owner": "Thank you for your order. It will be delivered in about 30 minutes.",
                "time": "8mins"
            }
        ]
    }
]

