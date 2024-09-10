import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createOrder,
  deleteBill,
  payBill,
  SET_EDIT_ORDER,
} from "../../redux/orderState";
import { confirmAlert } from "react-confirm-alert";
const feather = require("feather-icons");

const Order = ({ openModal }) => {
  const dispatch = useDispatch();
  const { detail, showOrder, editOrder, orderDb } = useSelector(
    (state) => state.order
  );
  console.log("showOrder = ", showOrder);
  console.log("showOrder length = ", showOrder.length);
  console.log("detail = ", detail);

  //map order list
  // const orderList = orderDb.order ? orderDb.order : showOrder;

  useEffect(() => {
    feather.replace();
  }, []);

  // saveEditData
  const saveEditData = (order) => {
    dispatch(SET_EDIT_ORDER(order));
    openModal();
  };
  // sum totalCharge
  const totalCharge = function (showOrder) {
    let totalCharge = 0;
    if (Array.isArray(showOrder)) {
      for (let order of showOrder) {
        totalCharge += order.price;
      }
    }
    return totalCharge;
  };

  // saveOrdertoDb
  const saveToDb = (id) => {
    const totalPay = totalCharge(showOrder);

    const formData = {
      order: showOrder,
      totalPay: totalPay,
    };

    dispatch(createOrder({ id, formData }));
  };

  // delete product
  const DeleteProduct = async (id) => {
    await dispatch(deleteBill(id));
  };
  // confirmDelete
  const confirmDelete = (id) => {
    confirmAlert({
      title: "Confirm Delete Order",
      message: "Are you sure Delete Order.",
      buttons: [
        {
          label: "Delete",
          onClick: () => DeleteProduct(id),
        },
        {
          label: "Cancle",
        },
      ],
    });
  };

  // payment
  const payment = async (id) => {
    await dispatch(payBill(id));
  };
  // confirmPayment
  const confirmPayment = (id, totalPay) => {
    confirmAlert({
      title: `Confirm Payment ${totalPay} ฿`,
      message: "Are you sure Payment Order.",
      buttons: [
        {
          label: "Pay",
          onClick: () => payment(id),
        },
        {
          label: "Cancle",
        },
      ],
    });
  };

  return (
    <div className="col-span-12 lg:col-span-4">
      <div className="intro-y pr-1">
        <div className="box p-2">
          <div className="pos__tabs nav nav-tabs justify-center" role="tablist">
            {" "}
            <a
              id="ticket-tab"
              data-toggle="tab"
              data-target="#ticket"
              href="javascript:;"
              className="flex-1 py-2 rounded-md text-center active"
              role="tab"
              aria-controls="ticket"
              aria-selected="true"
            >
              Ticket
            </a>{" "}
            <a
              id="details-tab"
              data-toggle="tab"
              data-target="#details"
              href="javascript:;"
              className="flex-1 py-2 rounded-md text-center"
              role="tab"
              aria-controls="details"
              aria-selected="false"
            >
              Details
            </a>{" "}
          </div>
        </div>
      </div>
      <div className="tab-content">
        {/* <!-- Ticket list --> */}
        <div
          id="ticket"
          className="tab-pane active"
          role="tabpanel"
          aria-labelledby="ticket-tab"
        >
          <div className="pos__ticket box p-2 mt-5">
            <div className="flex items-center border-b border-gray-200 dark:border-dark-5 pb-5">
              <div>
                <div className="text-gray-600">Table</div>
                <div className="mt-1">{detail.table}</div>
              </div>
              <i data-feather="mic" className="w-4 h-4 text-gray-600 ml-auto"></i>
            </div>
            {showOrder.length >= 1
              ? showOrder.map((order) => (
                  <a
                    // href="javascript:;"
                    // data-toggle="modal"
                    // data-target="#add-item-modal"
                    onClick={() => saveEditData(order)}
                    className="flex items-center p-3 cursor-pointer transition duration-300 ease-in-out bg-white dark:bg-dark-3 hover:bg-gray-200 dark:hover:bg-dark-1 rounded-md"
                  >
                    <div className="pos__ticket__item-name truncate mr-1">
                      {order.productName}
                    </div>
                    <div className="text-gray-600">x {order.quantity}</div>
                    <i
                      data-feather="edit"
                      className="w-4 h-4 text-gray-600 ml-2"
                    ></i>
                    <div className="ml-auto font-medium">{order.price} ฿</div>
                  </a>
                ))
              : ""}
          </div>
          <div className="flex mt-5">
            <button
              onClick={() => saveToDb(detail._id)}
              className="btn btn-primary w-72 shadow-md mx-auto"
            >
              Send Order
            </button>
          </div>
          {/* <!-- Total Charge --> */}
          <div className="box p-5 mt-5">
            <div className="flex mt-4 pt-4 border-t border-gray-200 dark:border-dark-5">
              <div className="mr-auto font-medium text-base">Total Charge</div>
              <div className="font-medium text-base">
                {totalCharge(showOrder)} ฿
              </div>
            </div>
          </div>
          <div className="flex mt-5">
            <button
              onClick={() => confirmDelete(detail._id)}
              className="btn w-32 border-gray-400 dark:border-dark-5 text-gray-600 dark:text-gray-300"
            >
              Clear Items
            </button>
            <button
              onClick={() => confirmPayment(detail._id, totalCharge(showOrder))}
              className="btn btn-primary w-32 shadow-md ml-auto"
            >
              Charge
            </button>
          </div>
        </div>
        {/* <!-- Details --> */}
        <div
          id="details"
          className="tab-pane"
          role="tabpanel"
          aria-labelledby="details-tab"
        >
          <div className="box p-5 mt-5">
            <div className="flex items-center border-b border-gray-200 dark:border-dark-5 pb-5">
              <div>
                <div className="text-gray-600">Time</div>
                <div className="mt-1">{detail.dateTime}</div>
              </div>
              <i data-feather="clock" className="w-4 h-4 text-gray-600 ml-auto"></i>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
              <div>
                <div className="text-gray-600">Bill Nember</div>
                <div className="mt-1">{detail.orderNumber}</div>
              </div>
              <i
                data-feather="clipboard"
                className="w-4 h-4 text-gray-600 ml-auto"
              ></i>
            </div>
            <div className="flex items-center border-b border-gray-200 dark:border-dark-5 py-5">
              <div>
                <div className="text-gray-600">People</div>
                <div className="mt-1">{detail.peopleNumber}</div>
              </div>
              <i data-feather="users" className="w-4 h-4 text-gray-600 ml-auto"></i>
            </div>
            <div className="flex items-center pt-5">
              <div>
                <div className="text-gray-600">Table</div>
                <div className="mt-1">{detail.table}</div>
              </div>
              <i
                data-feather="archive"
                className="w-4 h-4 text-gray-600 ml-auto"
              ></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
