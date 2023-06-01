import React, { Component } from 'react'
import $ from "jquery";
import "animate.css";
import moment from "moment";
import { INVENTORY, DataLoading } from './Commen';

export default class Inventory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deleteId: "",
      productName: "",
      available: "",
      price: "",
      loading: false,
      funcType: "",
      productIndex: "",
      productImage: null,
    }
  }
  componentDidMount() {
    this.props.parentCallback({ "header": "Manage Inventory", "sidebar": "inventory" });
    $("#search").on("keyup", function () {
      var value = $(this).val().toLowerCase();
      $("#inventory_table tbody tr").filter(function () {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  }

  toggleDeleteModal = () => {
    let modal = document.querySelector("#delete_modal");
    modal.classList.toggle("show-modal");
  }

  deleteRecord = () => {
    this.setState({ loading: true });
    this.toggleDeleteModal();
    this.timeout = setTimeout(() => {
      INVENTORY.splice(this.state.deleteId, 1);
      this.setState({ loading: false })
    }, 2000)
  }

  handleImage = (e) => {
    e.preventDefault();
    this.setState({ productImage: URL.createObjectURL(e.target.files[0]) })
  };

  productBtn = (type, ind) => {
    if (type === "add") {
      $("#add_edit_title").text("Add Records");
      $("#product_image").show();
      this.setState({
        productImage: null, productName: "",
        available: "", price: "", funcType: "add",
        productIndex: "",
      });
    } else {
      $("#add_edit_title").text("Edit Records");
      $("#product_image").hide();
      let data = INVENTORY[ind];
      this.setState({
        productName: data.details,
        available: data.available, price: data.price,
        funcType: "edit"
      });
    }
    let modal = document.querySelector("#add_edit_modal");
    modal.classList.toggle("show-modal");
  }


  validation = (type) => {
    const { productName, price, available, productImage } = this.state;
    let err = { "border": "1px solid #f37f88", "box-shadow": "0px 0px 3px 0px #f37f88" };
    let pre = { "border": "1px solid #a3c3ff", "box-shadow": "0px 0px 3px 0px #a3c3ff" }
    if (!productName) {
      $("#productName").css(err)
    } else {
      $("#productName").css(pre)
    }
    if (!price) {
      $("#price").css(err)
    } else {
      $("#price").css(pre)
    }
    if (!available) {
      $("#available").css(err)
    } else {
      $("#available").css(pre)
    }
    if (type === "add") {
      if (!productImage) {
        $("#product_image").css(err)
      } else {
        $("#product_image").css(pre)
      }
      if (productName && price && available && productImage) {
        return true;
      } else {
        return false;
      }
    } else {
      if (productName && price && available) {
        return true;
      } else {
        return false;
      }
    }

  }


  submitBtn = (type, ind) => {
    $("#search").val("");
    const { productName, price, available, productImage } = this.state;
    if (type === "add") {
      if (this.validation("add")) {
        this.setState({ loading: true })
        let hsnNo = parseInt(Math.random() * (900000000 - 100000000) + 100000000);
        let currentDate = moment().format('YYYY-MM-DD hh:mm:ss');
        let data = {
          "image": productImage,
          "HSN": hsnNo,
          "details": productName,
          "date": currentDate,
          "available": available,
          "price": price
        }
        this.productBtn("add", "");
        $("#product_image").val(null)
        this.timeout = setTimeout(() => {
          INVENTORY.unshift(data);
          this.setState({ loading: false })
        }, 2000)
      }

    } else {
      this.setState({ loading: true })
      let currentDate = moment().format('YYYY-MM-DD hh:mm:ss');
      let data = {
        "image": INVENTORY[ind].image,
        "HSN": INVENTORY[ind].HSN,
        "details": productName,
        "date": currentDate,
        "available": available,
        "price": price
      }
      this.productBtn("edit", ind);
      $("#product_image").val(null)
      this.timeout = setTimeout(() => {
        INVENTORY.splice(ind, 1);
        INVENTORY.unshift(data);
        this.setState({ loading: false })
      }, 2000)
    }
  }

  render() {
    const { loading, available, price, productName, funcType, productIndex } = this.state;
    return (
      <div id="content">
        <div className="row" id="invent_container"
          style={{
            overflow: loading ? "hidden" : "auto",
            height: loading ? "82vh" : "auto"
          }}>
          <div className="d-flex p-3 justify-content-between align-items-center">
            <div>
              <input type="text" placeholder="Search.."
                id="search" />
            </div>
            <div>
              <button className="search_btn add-product"
                onClick={() => this.productBtn("add", "")} >
                <i className="fa-solid fa-circle-plus"></i>
                Add Product
              </button>
            </div>
          </div>

          <table id="inventory_table" className="table table-hover">
            <thead>
              <tr>
                <th>S.no</th>
                <th>Image</th>
                <th>HSN</th>
                <th>Product</th>
                <th>Date Created</th>
                <th>Available</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                INVENTORY.map((item, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td><img src={item.image} className="inventory-img" alt="" /></td>
                    <td>{item.HSN}</td>
                    <td>{item.details}</td>
                    <td>{item.date}</td>
                    <td>{item.available}</td>
                    <td>{item.price}</td>
                    <td>
                      <span title="edit">
                        <i className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            this.setState({ productIndex: index })
                            this.productBtn("edit", index)
                          }}>
                        </i>
                      </span>
                      <span title="delete">
                        <i className="fa-solid fa-trash"
                          onClick={() => {
                            this.setState({ deleteId: index })
                            this.toggleDeleteModal()
                          }}>
                        </i>
                      </span>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>

        <div className='modals-box' id="delete_modal">
          <div className="modals-content">
            <form>
              <div className="modal-header">
                <h4 className="modal-title">Delete Records</h4>
                <button type="button" className="btn btn-danger" onClick={this.toggleDeleteModal}>x</button>
              </div>
              <div className="modal-body">
                <p style={{ color: "#524f4f" }}>Are you sure you want to delete these Records?</p>
                <p className="text-warning"><small>This action cannot be undone.</small></p>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-danger"
                  value="Delete"
                  onClick={this.deleteRecord} />
              </div>
            </form>
          </div>
        </div>

        <div className='modals-box' id="add_edit_modal">
          <div className="modals-content" style={{ width: "27%" }}>
            <form>
              <div className="modal-header">
                <h4 className="modal-title" id="add_edit_title" />
                <button type="button" className="btn btn-danger"
                  onClick={() => this.productBtn(funcType, productIndex)}>x</button>
              </div>
              <div className="modal-body">
                <input className="form-control mt-2 p-2" type="text"
                  placeholder="Product Name"
                  id="productName"
                  value={productName}
                  onChange={(e) => this.setState({ productName: e.target.value })}
                  aria-label="Product Name">
                </input>
                <input className="form-control mt-3 p-2" type="number"
                  placeholder="Available"
                  id="available"
                  value={available}
                  onChange={(e) => this.setState({ available: e.target.value })}
                  aria-label="Available">
                </input>
                <input className="form-control mt-3 p-2" type="number"
                  placeholder="Price"
                  id="price"
                  value={price}
                  onChange={(e) => this.setState({ price: e.target.value })}
                  aria-label="Price">
                </input>
                <input className="form-control mt-3 p-2" type="file"
                  placeholder="Upload Image"
                  accept="image/*"
                  id="product_image"
                  onChange={this.handleImage}
                  aria-label="image">
                </input>
              </div>
              <div className="modal-footer">
                <input type="button" className="btn btn-primary"
                  value="Submit"
                  onClick={() => this.submitBtn(funcType, productIndex)} />
              </div>
            </form>
          </div>
        </div>
        {loading && (<div
          style={{
            top: "0%",
            left: "0%",
            zIndex: 1,
          }} className="loading-frame">
          <DataLoading />
        </div>)}
      </div>
    )
  }
}
