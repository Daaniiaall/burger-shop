"use client"
import { FaHamburger } from "react-icons/fa";
import { FaBowlFood } from "react-icons/fa6";
import { RiDrinks2Fill } from "react-icons/ri";
import { PiBowlFoodFill } from "react-icons/pi";
import { HiDotsVertical } from "react-icons/hi";

import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../../redux/features/products/ProductsSlice";
import { useState } from "react";

function Categories() {
  const [isActive , setIsActive] = useState("")
  const dispatch = useDispatch();

  const AllProducts = useSelector(
    (store: RootState) => store.products.allProducts
  );

  const filterProductsByCategory = ( category: string) => {
    const filteredProducts = AllProducts.filter(
      (product) => product.category === category
    );
    // console.log(filteredProducts);
    dispatch(setProducts(filteredProducts));
    setIsActive(category)
  };

  const clickHandler = () => {
    dispatch(setProducts(AllProducts))
    setIsActive("")
  }

  const active = "border-b-2 border-neutral-900";

  return (
    <div className="categories">
      <div className="flex gap-3">
        <button onClick={() => filterProductsByCategory("main")} className={isActive === "main" ? active : ""}>
          <FaHamburger /> Main courses
        </button>
        <button onClick={() => filterProductsByCategory("side")} className={isActive === "side" ? active : ""}>
          <FaBowlFood /> Side dishes
        </button>
        <button onClick={() => filterProductsByCategory("drink")} className={isActive === "drink" ? active : ""}>
          <RiDrinks2Fill /> Drinks
        </button>
        <button onClick={() => filterProductsByCategory("other")} className={isActive === "other" ? active : ""}>
          <PiBowlFoodFill /> Other
        </button>
      </div>
      <button onClick={clickHandler}>
        <HiDotsVertical />
      </button>
    </div>
  );
}

export default Categories;
