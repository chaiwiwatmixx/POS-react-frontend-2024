import React, { useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createBill, getBills } from "../../redux/orderState";
import { selectUsername } from "../../redux/authState";

const NewOrderModal = ({ modalIsOpen, closeModal }) => {
  // get data from redux
  const dispatch = useDispatch();
  const username = useSelector(selectUsername);

  // state Bill data
  const [openBill, setOpenBill] = useState({
    table: "",
    peopleNumber: "",
  });
  const { table, peopleNumber } = openBill;

  // create dateTime data
  const dateTime = new Date().toLocaleString("en-US", {
    timeZone: "Asia/Bangkok",
  });

  // handel change input
  const inputChange = (e) => {
    const { name, value } = e.target;
    setOpenBill({ ...openBill, [name]: value });
  };

  // handel clickCancel
  const clickCancel = () => {
    closeModal();
    setOpenBill({ table: "", peopleNumber: "" });
  };

  // save
  const save = async (e) => {
    e.preventDefault();

    // check data
    if (!username || !table || !peopleNumber || !dateTime) {
      return toast.error("Please fill in complete information");
    }

    // check data is number
    const checkNum = /^[0-9]+$/;
    if (!checkNum.test(table) || !checkNum.test(peopleNumber)) {
      return toast.error("price ,people number / Must be numbers only");
    }

    const formData = {
      username: username,
      table: table,
      peopleNumber: peopleNumber,
      dateTime: dateTime,
    };

    await dispatch(createBill(formData));
    closeModal();
    setOpenBill({ table: "", peopleNumber: "" });
  };

  // style modal
  const customStyles = {
    content: {
      boxSizing: "border-box",
      margin: 0,
      padding: 0,
      top: "30%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "35%",
      maxWidth: "600px",
      zIndex: 1001,
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.50)",
      zIndex: 1000,
    },
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="New Order Modal"
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal-dialog">
        <form onSubmit={save} className="modal-content">
          <div className="modal-header">
            <h2 className="font-medium text-base mr-auto">New Order</h2>
          </div>
          <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label htmlFor="pos-form-2" className="form-label">
                Table
              </label>
              <input
                id="pos-form-2"
                type="text"
                className="form-control flex-1"
                placeholder="Customer table"
                name="table"
                value={table}
                onChange={inputChange}
              />
            </div>
            <div className="col-span-12">
              <label htmlFor="pos-form-3" className="form-label">
                Number of People
              </label>
              <input
                id="pos-form-3"
                type="text"
                className="form-control flex-1"
                placeholder="People"
                name="peopleNumber"
                value={peopleNumber}
                onChange={inputChange}
              />
            </div>
          </div>
          <div className="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              className="btn btn-outline-secondary w-32 mr-1"
              onClick={clickCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary w-32">
              Create Ticket
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default NewOrderModal;
