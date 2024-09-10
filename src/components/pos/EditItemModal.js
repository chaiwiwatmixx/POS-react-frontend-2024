import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  selectOrderFront,
  selectShowOrder,
  SET_EDIT_DELETE_ORDER,
  SET_EDIT_ORDER_END,
  SET_ORDER_SHOW,
} from "../../redux/orderState";

const EditItemModal = ({ modalIsOpen, closeModal }) => {
  const dispatch = useDispatch();

  // get product info
  const { editOrder } = useSelector((state) => state.order);
  const { productName, price, _id, unofficialPrice } = editOrder;
  console.log("editOrder = ", editOrder);

  const [quantity, setQuantity] = useState(0);
  // const [foodList, setfoodList] = useState({});

  // set quantity state from  quantity redux
  useEffect(() => {
    if (editOrder) {
      setQuantity(editOrder.quantity);
    }
  }, [editOrder]);

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

  // handel clickCancel
  const clickCancel = () => {
    closeModal();
  };

  // handelQuantity
  const handelQuantity = (num) => {
    if (quantity <= 0 && num === 0) {
      return;
    }
    const count = num === 1 ? quantity + 1 : quantity - 1;
    setQuantity(count);
  };

  // saveOrder
  const saveEidtOrder = (quantity, id, unofficialPrice) => {
    const price = unofficialPrice * quantity;
    dispatch(SET_EDIT_ORDER_END({ quantity, id, price }));
    closeModal();
  };

  // deleteOrder
  const deleteOrder = (id) => {
    dispatch(SET_EDIT_DELETE_ORDER(id));
    closeModal();
  };

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="AddItemMadal"
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h2 className="font-medium text-base mr-auto">{productName}</h2>
            <button
              onClick={() => deleteOrder(_id)}
              type="button"
              className="btn btn-primary"
            >
              Cancel Item
            </button>
          </div>
          <div className="modal-body grid grid-cols-12 gap-4 gap-y-3">
            <div className="col-span-12">
              <label for="pos-form-4" className="form-label">
                Quantity
              </label>
              <div className="flex mt-2 flex-1">
                <button
                  onClick={() => handelQuantity(0)}
                  type="button"
                  className="btn w-12 border-gray-300 bg-gray-200 dark:bg-dark-1 text-gray-600 dark:text-gray-300 mr-1"
                >
                  -
                </button>
                <input
                  id="pos-form-4"
                  type="text"
                  className="form-control w-24 text-center"
                  placeholder="Item quantity"
                  value={quantity}
                />
                <button
                  onClick={() => handelQuantity(1)}
                  type="button"
                  className="btn w-12 border-gray-300 bg-gray-200 dark:bg-dark-1 text-gray-600 dark:text-gray-300 ml-1"
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-span-12">
              <label for="pos-form-5" className="form-label">
                Price :
              </label>
              <span className=" font-bold"> {unofficialPrice} ฿</span>
              {/* <span classNameName="text-">Price : 50 ฿</span> */}
            </div>
          </div>
          <div className="modal-footer text-right">
            <button
              type="button"
              data-dismiss="modal"
              className="btn btn-outline-secondary w-24 mr-1"
              onClick={() => clickCancel()}
            >
              Close
            </button>
            <button
              onClick={() => saveEidtOrder(quantity, _id, unofficialPrice)}
              type="button"
              className="btn btn-primary w-24"
            >
              Edit Item
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditItemModal;
