import { IoMdSearch } from "react-icons/io";

import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { setProducts } from "../../../redux/features/products/ProductsSlice";

function SearchBox() {
  const [searchInput, setSearchInput] = useState("");

  const dispatch = useDispatch();

  const allProducts = useSelector(
    (store: RootState) => store.products.allProducts
  );

  const searchHandler = () => {
    if (searchInput) {
      const searchInputValue = searchInput.toLowerCase().trim();

      const filteredProducts = allProducts.filter((item) => {

        const filteredByName = item.name.toLowerCase().includes(searchInputValue);

        const filteredByIngredients = item.ingredients.some((ingredient) =>
          ingredient.toLowerCase().includes(searchInputValue)
        );

        const filteredByCategory = item.category.toLowerCase().includes(searchInputValue);

        return filteredByName || filteredByIngredients || filteredByCategory;
      });

      dispatch(setProducts(filteredProducts));
    } else {
      dispatch(setProducts(allProducts));
    }
  };

  return (
    <div className="mt-5 w-11/12 mx-auto flex items-center">
      <input
        className="w-2/5 p-1 bg-transparent border-b border-gray-400"
        type="text"
        placeholder="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />
      <button className="text-xl" onClick={searchHandler}>
        <IoMdSearch />
      </button>
    </div>
  );
}

export default SearchBox;
