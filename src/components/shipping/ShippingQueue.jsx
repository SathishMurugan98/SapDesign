/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import { SHIPPING } from '../Commen';
import { Link } from 'react-router-dom';

export default class ShippingQueue extends Component {

  componentDidMount() {
    this.props.parentCallback({ "header": "Shipping Queue", "sidebar": "shipping" });
  }

  sendingDatas = (teamside) => {
    sessionStorage.setItem("@shipping_team", teamside)
  }

  render() {
    return (
      <div id="content">
        <div style={{ marginTop: "100px" }}></div>
        <div className='card-content p-2'>
          <div className='row'>
            <div className='col-3'>
              <div className='card p-2'>
                <div className='card'>
                  <div className='card p-2 team-card tcard-1'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5 className='col-8'>East Team</h5>
                      <h5 className='col-2 card-count'
                        style={{ background: SHIPPING.east.color }}>{SHIPPING.east.count}</h5>

                      <Link to="/ongoingorders"
                        onClick={() => this.sendingDatas("EAST")}>
                        <h5 className='col'>
                          <i title='info' className="card-info fa-solid fa-circle-info"></i>
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
                {SHIPPING.east.datas.map((item, index) => (
                  <div id="card_block" className='card card-cont p-3' key={index}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex card-det'>
                        <img src={item.img} className='avatar' alt="" />
                        <div>
                          <h6 className='col'>{item.uid}</h6>
                          <span>{item.count}</span>
                        </div>
                      </div>
                      <div className='text-center card-det'>
                        <h6 className='col' style={{ color: "#FFA600" }}>East</h6>
                        <span>{item.price}</span>
                      </div>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between card-det'>
                      {item.status === "Paid" ? (
                        <span style={{ color: "#0DA300", fontWeight: "600" }}>Paid</span>
                      ) : (
                        <span style={{ color: "#EF1515", fontWeight: "600" }}>Unpaid</span>
                      )}
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>


            <div className='col-3'>
              <div className='card p-2'>
                <div className='card'>
                  <div className='card p-2 team-card tcard-3'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5 className='col-8'>South Team</h5>
                      <h5 className='col-2 card-count'
                        style={{ background: SHIPPING.south.color }}>{SHIPPING.south.count}</h5>
                      <Link to="/ongoingorders"
                        onClick={() => this.sendingDatas("SOUTH")}>
                        <h5 className='col'>
                          <i title='info' className="card-info fa-solid fa-circle-info"></i>
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
                {SHIPPING.south.datas.map((item, index) => (
                  <div id="card_block" className='card card-cont p-3' key={index}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex card-det'>
                        <img src={item.img} className='avatar' alt="" />
                        <div>
                          <h6 className='col'>{item.uid}</h6>
                          <span>{item.count}</span>
                        </div>
                      </div>
                      <div className='text-center card-det'>
                        <h6 className='col' style={{ color: "#FF5630" }}>South</h6>
                        <span>{item.price}</span>
                      </div>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between card-det'>
                      {item.status === "Paid" ? (
                        <span style={{ color: "#0DA300", fontWeight: "600" }}>Paid</span>
                      ) : (
                        <span style={{ color: "#EF1515", fontWeight: "600" }}>Unpaid</span>
                      )}

                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='col-3'>
              <div className='card p-2'>
                <div className='card'>
                  <div className='card p-2 team-card tcard-4'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5 className='col-8'>North Team</h5>
                      <h5 className='col-2 card-count'
                        style={{ background: SHIPPING.north.color }}>{SHIPPING.north.count}</h5>
                      <Link to="/ongoingorders"
                        onClick={() => this.sendingDatas("NORTH")}>
                        <h5 className='col'>
                          <i title='info' className="card-info fa-solid fa-circle-info"></i>
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
                {SHIPPING.north.datas.map((item, index) => (
                  <div id="card_block" className='card card-cont p-3' key={index}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex card-det'>
                        <img src={item.img} className='avatar' alt="" />
                        <div>
                          <h6 className='col'>{item.uid}</h6>
                          <span>{item.count}</span>
                        </div>
                      </div>
                      <div className='text-center card-det'>
                        <h6 className='col' style={{ color: "#377DFF" }}>North</h6>
                        <span>{item.price}</span>
                      </div>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between card-det'>
                      {item.status === "Paid" ? (
                        <span style={{ color: "#0DA300", fontWeight: "600" }}>Paid</span>
                      ) : (
                        <span style={{ color: "#EF1515", fontWeight: "600" }}>Unpaid</span>
                      )}
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className='col-3'>
              <div className='card p-2'>
                <div className='card'>
                  <div className='card p-2 team-card tcard-2'>
                    <div className='d-flex justify-content-between align-items-center'>
                      <h5 className='col-8'>West Team</h5>
                      <h5 className='col-2 card-count'
                        style={{ background: SHIPPING.west.color }}>{SHIPPING.west.count}</h5>
                      <Link to="/ongoingorders"
                        onClick={() => this.sendingDatas("WEST")}>
                        <h5 className='col'>
                          <i title='info' className="card-info fa-solid fa-circle-info"></i>
                        </h5>
                      </Link>
                    </div>
                  </div>
                </div>
                {SHIPPING.west.datas.map((item, index) => (
                  <div id="card_block" className='card card-cont p-3' key={index}>
                    <div className='d-flex justify-content-between align-items-center'>
                      <div className='d-flex card-det'>
                        <img src={item.img} className='avatar' alt="" />
                        <div>
                          <h6 className='col'>{item.uid}</h6>
                          <span>{item.count}</span>
                        </div>
                      </div>
                      <div className='text-center card-det'>
                        <h6 className='col' style={{ color: "#377DFF" }}>West</h6>
                        <span>{item.price}</span>
                      </div>
                    </div>
                    <hr />

                    <div className='d-flex justify-content-between card-det'>
                      {item.status === "Paid" ? (
                        <span style={{ color: "#0DA300", fontWeight: "600" }}>Paid</span>
                      ) : (
                        <span style={{ color: "#EF1515", fontWeight: "600" }}>Unpaid</span>
                      )}
                      <span>{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
