import React, { useEffect, useState } from "react";

function Search({ products, setFilteredProducts }) {
  const [search, setSearch] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.productName.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products, setFilteredProducts]);


  return (
    <div className="w-full sm:w-auto mt-3 sm:mt-0 sm:ml-auto md:ml-0">
      <div className="w-56 relative text-gray-700 dark:text-gray-300">
        <input
          type="text"
          className="form-control w-56 box pr-10 placeholder-theme-13"
          placeholder="Search..."
          value={search}
          onChange={handleSearch}
        />
        <i
          className="w-4 h-4 absolute my-auto inset-y-0 mr-3 right-0"
          data-feather="search"
        ></i>
      </div>
    </div>
  );
}

export default Search;
