import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import feather from "feather-icons";
import SearchAndCategory from "../../components/pos/SearchAndCategory";
import FoodList from "../../components/pos/FoodList";
import Order from "../../components/pos/Order";
import Bill from "../../components/pos/Bill";
import Chaseback from "../../components/chaseBack/Chaseback";
import { useDispatch, useSelector } from "react-redux";
import { selectLoginStatus } from "../../redux/authState";
import { getAllProduct } from "../../redux/product/productState";
import NewOrderModal from "../../components/pos/NewOderModal";
import AddItemModal from "../../components/pos/AddItemModal";
import EditItemModal from "../../components/pos/EditItemModal";

const Pos = () => {
  const dispatch = useDispatch();

  // check login status
  Chaseback("/login");
  const loginStatus = useSelector(selectLoginStatus);

  // get products from redux
  const { products, loading, error, message } = useSelector(
    (state) => state.product
  );

  // state product By Category
  const [productByCategory, setProductByCategory] = useState(null);

  // modal manage
  const [modals, setModals] = useState({
    newOrderModal: false,
    addItemModal: false,
    editItemModal: false,
  });

  const openModal = (modalName) => {
    setModals({ ...modals, [modalName]: true });
  };

  const closeModal = (modalName) => {
    setModals({ ...modals, [modalName]: false });
  };

  // get product from api redux
  useEffect(() => {
    feather.replace();
    const getProducts = async () => {
      if (loginStatus === true) {
        dispatch(getAllProduct());
      }
    };
    getProducts();
  }, [loginStatus]);

  return (
    <>
      <div className="intro-y flex flex-col sm:flex-row items-center mt-8">
        <h2 className="text-lg font-medium mr-auto">Point of Sale</h2>
        {/* <!-- new Order --> */}
        <Bill openModal={() => openModal("newOrderModal")} />
      </div>
      <div className="pos intro-y grid grid-cols-12 gap-5 mt-5">
        {/* <!-- BEGIN: Item List --> */}
        <div className="intro-y col-span-12 lg:col-span-8">
          {/* search and  select */}
          <SearchAndCategory
            products={products}
            setProductByCategory={setProductByCategory}
          />
          {/* <!-- pagination --> */}
          {/* <!-- food list --> */}
          <FoodList
            products={products}
            productByCategory={productByCategory}
            openModal={() => openModal("addItemModal")}
          />
        </div>
        {/* <!-- BEGIN: Order --> */}
        <Order openModal={() => openModal("editItemModal")} />
      </div>
      {/* <!-- BEGIN: New Order Modal --> */}
      <NewOrderModal
        modalIsOpen={modals.newOrderModal}
        closeModal={() => closeModal("newOrderModal")}
      />
      {/* <!-- BEGIN: Add Item Modal --> */}
      <AddItemModal
        modalIsOpen={modals.addItemModal}
        closeModal={() => closeModal("addItemModal")}
      />
      <EditItemModal
        modalIsOpen={modals.editItemModal}
        closeModal={() => closeModal("editItemModal")}
      />
    </>
  );
};

export default Pos;

// seaech
//category
// food list
// orderlist
// charge

// แสดงสินค้าทั้งหมด => กรอกด้วยช่องค้นหา
// แสดงสินค้าตามประเภท => กรอกด้วยช่องค้นหา
// เปิดบิลเชื่อมกับโต๊ะ
// สั่งอาหารเชื่อมกับโต๊ะ
// กดเปลี่ยนโต๊ะ
// ชำระเงิน

// ---------------process-----------------
// ดึงข้อมูลจาก api มาแสดง category ✅
// ดึงข้อมูลจาก api มาแสดง สินค้า ✅
// แสดงสินค้าตาม seaech ✅
// แสดงสินค้าตาม category / เชื่อมด้วย seaech ✅
// ฟังชั่นเปิดบิลเชื่อมกับโต๊ะ (เพิ่มข้อมูลโต๊ะใน api) ✅
// ดึงข้อมูลจาก api มาแสดง เลขโต๊ะ / รายการที่สั่ง ✅
// ฟังชั่นเปลี่ยนโต๊ะ ดึงข้อมูลจาก api เลขโต๊ะมาแสดง / เมื่อกดเปลี่ยนจะเชื่องโยงกับหน้ารายการอาหาร / และเชื่อมโยงกับการสั่งอาหารเชื่อมโต๊ะ ✅
// ดึงข้อมูลจาก api มาแสดง รายละเอียดเพิ่มเติม (เพิ่มข้อมูลรายละเอียดเพิ่มเติมใน api) ✅
// คำนวนราคาที่ต้องจ่ายจาก ราคารายการอาหารทั้งหมด ✅
// ฟังชั่นจ่ายเงิน เมื่อจ่ายเงินจะเครียร์รายการอาหารของโต๊ะนั้น ออกจากหน้าหลัก / และบันทึกสถาณะจ่ายเงินลง api
// ฟังชั่นยกเลิก เมื่อยกเลิกจะเครียร์รายการอาหารของโต๊ะนั้น ออกจากหน้าหลัก

// ****order food***
// ทำ api ใหม่ ✅
// ทำ modal ✅
// รับข้อมูลจาก modal มาแสดงหน่้าโชว์ รายการสั่ง ✅
// ลบข้อมูล และ แก้ไขใน หน้ารายการสั่ง ✅
// ปุ่มบันทึกข้อมูลลง databast ✅
// ทำ slice api ✅
// ดึงข้อมูลอาหาร มาใส่หน้ารวมรายการสั่ง ✅
// ข้อมูลจาก database กับ ข้อมูลส่วนดำเนินการหน้าบ้านคนละส่วน ทำให้สามารถเชื่อมเข้าหากันได้ ✅
// เพิ่มสินค้าเข้า order list ✅
// แก้ไขสินค้า order list ✅
// **** จ่ายเงิน ***
// สร้าง api จ่ายเงิน เพื่อบันทึก สถาณะจ่ายเงิน D
// เมื่อจ่ายเงินจะเครียร์รายการอาหารของโต๊ะนั้น
// ยกเลิกออเดอร์เครียร์รายการอาหารของโต๊ะนั้น

