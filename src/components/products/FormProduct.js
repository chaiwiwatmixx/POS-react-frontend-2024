import InputSelect from "./InputSelect";

const FormProduct = ({
  product,
  inputChange,
  inputChangeFile,
  addProduct,
  image,
  pictureExample,
  imgRealExample,
  // selectedOption,
  // setSelectedOption,
}) => {
  const BACKEND_URL = `${process.env.REACT_APP_BACKEND_URL}/uploads`;
  const imageUrl = imgRealExample ? `${BACKEND_URL}/${imgRealExample}` : "";
  return (
    <div className="w-3/5 bg-white mt-4" style={{ borderRadius: "8px" }}>
      <form
        onSubmit={addProduct}
        className="modal-body grid grid-cols-12 gap-4 gap-y-3"
      >
        <div className="col-span-12">
          <label className="form-label">Upload image</label>
          <input
            className="form-control flex-1"
            type="file"
            name="image"
            onChange={(e) => inputChangeFile(e)}
          />
          {/* show image */}
          {pictureExample !== null ? (
            <div className="w-48">
              <img src={pictureExample} alt="product" />
            </div>
          ) : imgRealExample !== null ? (
            <div className="w-48">
              <img src={imageUrl} alt="product" />
            </div>
          ) : (
            <div>
              <p>You haven't added any product photos</p>
            </div>
          )}
        </div>
        <div className="col-span-12">
          <label className="form-label">Product name</label>
          <input
            type="text"
            className="form-control flex-1"
            placeholder="Product name"
            name="productName"
            value={product?.productName}
            onChange={inputChange}
          />
        </div>
        <div className="col-span-12">
          <label className="form-label">Category</label>
          <input
            type="text"
            className="form-control flex-1"
            placeholder="Category"
            name="category"
            value={product?.category}
            onChange={inputChange}
          />
        </div>
        <div className="col-span-12">
          <label className="form-label">Amount</label>
          <input
            type="text"
            className="form-control flex-1"
            placeholder="Amount"
            name="amount"
            value={product?.amount}
            onChange={inputChange}
          />
        </div>
        <div className="col-span-12">
          <label className="form-label">Price</label>
          <input
            type="text"
            className="form-control flex-1"
            placeholder="Price"
            name="price"
            value={product?.price}
            onChange={inputChange}
          />
        </div>
        <div className="col-span-12">
          <label className="form-label">Cost</label>
          <input
            type="text"
            className="form-control flex-1"
            placeholder="Cost"
            name="cost"
            value={product?.cost}
            onChange={inputChange}
          />
        </div>
        <div className="col-span-12">
          <label className="form-label">Description</label>
          <textarea
            className="form-control flex-1"
            name="description"
            value={product?.description}
            onChange={inputChange}
            rows="4"
            cols="50"
          ></textarea>
        </div>
        <div className="col-span-12">
          <button type="submit" className="btn btn-primary w-32 mr-4">
            Save
          </button>
          <button type="button" className="btn btn-outline-secondary w-32">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;