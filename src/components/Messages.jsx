import React, { Component } from 'react';
import 'animate.css';
import $ from "jquery";
import { MESSAGE } from './Commen';

export default class Messages extends Component {

  constructor(props) {
    super(props)
    this.state = {
      initialMsg: MESSAGE[0].msg,
      msgData: MESSAGE[0],
      loading: true,
    }
  }

  componentDidMount() {
    this.props.parentCallback({ "header": "Messages", "sidebar": "message" });
    this.getChatting(this.state.msgData);
  }

  sendMessage = (e) => {
    e.preventDefault();
    let msg = $("#messages").val();
    const obj = { "sender": "owner", "owner": msg, "time": "5sec" }
    MESSAGE[0].msg.push(obj);
    this.setState({ initialMsg: [...this.state.initialMsg, obj] })
    $("#messages").val("")
    $(".msg-content").animate({
      scrollTop: $(
        '.msg-content').get(0).scrollHeight
    }, 500);
  }

  getChatting = (item) => {
    clearTimeout(this.timeout1);
    clearTimeout(this.timeout2);
    this.setState({ msgData: item });
    this.setState({ initialMsg: item.msg, loading: true });
    $(".msg-content").addClass("msg-loading");
    this.timeout1 = setTimeout(() => {
      $(".msg-content").removeClass("msg-loading");
      this.setState({ loading: false });
      this.timeout2 = setTimeout(() => {
        $(".msg-content").animate({
          scrollTop: $(
            '.msg-content').get(0).scrollHeight
        }, 2000);
      }, 1300)
    }, 1000)

  }

  render() {
    const { initialMsg, msgData, loading } = this.state;
    return (
      <div id="content" style={{ padding: "20px", paddingBottom: "0px" }}>
        <div className="p-2" style={{ marginTop: "85px" }}>
          <div className='card card-content msg-card'>
            <div className='msg-left-card'>
              {MESSAGE.map((item, index) => (
                <div className='msg-user-card'
                  key={index}
                  onClick={() => this.getChatting(item)}>
                  <div className='d-flex'>
                    <div className='msg-avatar'>
                      <img src={item.img} alt="" />
                      <p className="msg-status"
                        style={{ "top": "5px", "background": item.status === "offline" ? "#ff4848" : "#00CE21" }} />
                    </div>
                    <div className='user-cont'>
                      <span className='msg-left-name'>{item.name}</span><br />
                      <span className='msg-left-short-msg'>{item.content}</span>
                      <span className='msg-left-short-msg msg-left-timing'>{item.time}</span><br />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className='msg-right-card'>
              <div className='msg-header'>
                <div className="container">
                  <div className="row" style={{ "alignItems": "center" }}>
                    <div className="col-6">
                      <div className='msg-avatar'>
                        <img src={msgData.img} alt="" />
                        <p className="msg-status"
                          style={{ "top": "5px", "background": msgData.status === "offline" ? "#ff4848" : "#00CE21" }} />
                        <span className='msg-name'>{msgData.name}</span>
                      </div>
                    </div>
                    <div className="col-6" style={{ "textAlign": "end" } }>
                      <span className='msg-name'>Order ID :</span>
                      <span className='msg-name msg-orderID'>{msgData.uid}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="msg-content msg-loading">
                {
                  !loading ? (
                    initialMsg.length > 0 && initialMsg.map((item, index) => (
                      item.sender === "customer" ? (
                        <div
                          key={index}
                          className="bubble you animate__animated animate__fadeInLeft">
                          <p className='msg-customer'>{item.customer}</p>
                          <p className='msg-cust-timing'>{item.time}</p>
                        </div>
                      ) : (
                        <div
                          key={index}
                            className="bubble me animate__animated animate__fadeInRight">
                          <p className='msg-owner'>{item.owner}</p>
                          <p className='msg-owner-timing'>{item.time}</p>
                        </div>
                      )
                    ))
                  ) : (
                    <div class="spinner-border text-primary" role="status">
                      <span class="visually-hidden">Loading...</span>
                    </div>
                  )
                }
              </div>

              <div className='msg-header msg-footer'>
                <form className="row" style={{ justifyContent: "center", alignItems: 'center' }}>
                  <div className="col-10">
                    <input type="text" className="form-control"
                      autoComplete="off"
                      id="messages" placeholder="Send a message..." />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary"
                      onClick={this.sendMessage}>
                      <i className="fa-solid fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
