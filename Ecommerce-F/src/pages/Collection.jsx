import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant"); // ✅ fixed spelling
  const [filteredProducts, setFilteredProducts] = useState([]);

  const toggleCategory = (e) => {
    const value = e.target.value;
    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleSubCategory = (e) => {
    const value = e.target.value;
    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFiltersAndSort = () => {
    let productsCopy = [...products];

    // 🔍 Search filter
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // 🏷️ Category filter
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    // 📂 Sub-category filter
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }

    // ↕️ Sort
    switch (sortType) {
      case "low-high":
        productsCopy.sort((a, b) => a.price - b.price);
        break;
      case "high-low":
        productsCopy.sort((a, b) => b.price - a.price);
        break;
      default:
        break; // relevant = no sorting
    }

    setFilteredProducts(productsCopy);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [category, subCategory, search, showSearch, products, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Left Filter Section */}
      <div className="min-w-40">
        <p
          onClick={() => setShowFilter(!showFilter)}
          className="my-2 text-xl flex items-center cursor-pointer gap-2"
        >
          FILTER
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt="Toggle filter"
          />
        </p>

        {/* Category Filter */}
        <div
          className={`border border-gray-400 pl-5 py-2 mt-4 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-2 text-sm font-medium">CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            {["Men", "Women", "Kids"].map((cat) => (
              <label key={cat} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-3"
                  value={cat}
                  checked={category.includes(cat)} // ✅ controlled checkbox
                  onChange={toggleCategory}
                />
                {cat}
              </label>
            ))}
          </div>
        </div>

        {/* Sub-category Filter */}
        <div
          className={`border border-gray-400 pl-5 py-2 my-4 ${
            showFilter ? "" : "hidden"
          } sm:block`}
        >
          <p className="mb-2 text-sm font-medium">TYPE</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            {["Topwear", "Bottomwear", "Winterwear"].map((subCat) => (
              <label key={subCat} className="flex gap-2 items-center">
                <input
                  type="checkbox"
                  className="w-3"
                  value={subCat}
                  checked={subCategory.includes(subCat)} // ✅ controlled checkbox
                  onChange={toggleSubCategory}
                />
                {subCat}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Right Products Section */}
      <div className="flex-1">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTION" />

          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortType(e.target.value)}
            className="border-2 border-gray-300 text-sm font-semibold px-2"
          >
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low-High</option>
            <option value="high-low">Sort by: High-Low</option>
          </select>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductItem
                key={item._id} // ✅ better key
                id={item._id}
                name={item.name}
                image={item.image}
                price={item.price}
              />
            ))
          ) : (
            <p className="col-span-full text-center text-gray-500">
              No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Collection;
