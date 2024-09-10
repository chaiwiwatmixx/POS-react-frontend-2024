import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProduct,
  selectProduct,
  updateProduct,
} from "../../redux/product/productState";
import FormProduct from "../../components/products/FormProduct";
import { toast } from "react-toastify";

const EditProduct = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // get product in redux state
  const editData = useSelector(selectProduct);

  const [product, setProduct] = useState("");
  const [image, setImage] = useState(null);
  const [imgRealExample, setImgRealExample] = useState(null);
  const [pictureExample, setPictureExample] = useState(null);
  const { productName, description, category, amount, price, cost } = product;

  // get product in redux state
  useEffect(() => {
    dispatch(getProduct(id));
  }, [id]);

  // set state product and image
  useEffect(() => {
    if (editData) {
      setProduct(editData);
      setImgRealExample(editData.image || null);
    }
  }, [editData]);

  const inputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const inputChangeFile = (e) => {
    setImage(e.target.files[0]);
    setPictureExample(URL.createObjectURL(e.target.files[0]));
  };

  // save product
  const addProduct = async (e) => {
    e.preventDefault();

    // check is number
    const checkNum = /^[0-9]+$/;
    if (
      !checkNum.test(price) ||
      !checkNum.test(cost) ||
      !checkNum.test(amount)
    ) {
      return toast.error("price ,cost ,amount / Must be numbers only");
    }

    const formData = new FormData();
    formData.append("productName", productName);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("amount", amount);
    formData.append("price", price);
    formData.append("cost", cost);
    if (image) {
      formData.append("image", image);
    }

    // send api and save to redux state
    await dispatch(updateProduct({ id, formData }));
    navigate("/dashboard");
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mt-4">Add Product</h1>
      <FormProduct
        product={product}
        image={image}
        imgRealExample={imgRealExample}
        pictureExample={pictureExample}
        inputChange={inputChange}
        inputChangeFile={inputChangeFile}
        addProduct={addProduct}
      />
    </div>
  );
};

export default EditProduct;

//นำข้อมูลสินค้ามาใส่้ในฟอร์ม
//แก้ไขค่าใหม่ได้
//บันทึก

//ดึงข้อมูลจาก api โดยใช้ redux จากไอดี
//เก็บข้อมูลที่ดึงมาใส่ state
//นำข้อมูลสินค้ามาใส่้ในฟอร์ม
// เตรียมฟังชั่นจัดการ ส่งเข้่่าฟอร์ม (handelchange / submit)
//ส่งข้อมูลเข้าฟอร์ม เพื่อดำเนินการ
