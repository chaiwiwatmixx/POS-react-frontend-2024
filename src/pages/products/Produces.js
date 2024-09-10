import { useState } from "react";
import Chaseback from "../../components/chaseBack/Chaseback";
import FormProduct from "../../components/products/FormProduct";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  createProduct,
  selectProducts,
} from "../../redux/product/productState";
import { useNavigate } from "react-router-dom";

const initialState = {
  productName: "",
  description: "",
  category: "",
  amount: "",
  price: "",
  cost: "",
};

const Produces = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const stateData = useSelector((state) => state.products);
  const products = useSelector(selectProducts);
  Chaseback("/login");
  console.log("Products in Produces component:", products);
  console.log("stateData in Product page = ", stateData);

  const [product, setProduct] = useState(initialState);
  const [image, setImage] = useState(null);
  const [pictureExample, setPictureExample] = useState(null);
  const { productName, description, category, amount, price, cost } = product;
  // const [selectedOption, setSelectedOption] = useState("");

  const inputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const inputChangeFile = (e) => {
    setImage(e.target.files[0]);
    setPictureExample(URL.createObjectURL(e.target.files[0]));
  };

  const addProduct = async (e) => {
    e.preventDefault();
    if (!productName || !price || !amount) {
      return toast.error("Please fill in complete information");
    }

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
    formData.append("image", image);

    console.log("FormData in in Product page = ", formData);
    await dispatch(createProduct(formData));
    navigate("/dashboard");
  };

  return (
    <div>
      {/* button add product */}
      <h1 className="text-2xl font-bold mt-4">Add Product</h1>
      <FormProduct
        product={product}
        inputChange={inputChange}
        inputChangeFile={inputChangeFile}
        addProduct={addProduct}
        image={image}
        pictureExample={pictureExample}
        // selectedOption={selectedOption}
        // setSelectedOption={setSelectedOption}
      />
    </div>
  );
};

export default Produces;
