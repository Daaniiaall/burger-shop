"use client";

import { useEffect, useState } from "react";

import { RootState } from "../../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addAllProducts, setProducts} from "../../../redux/features/products/ProductsSlice";

import SearchBox from "../modules/SearchBox";
import Categories from "../modules/Categories";
import ProductsCard from "../modules/ProductsCard";
import ProductsSidebar from "../modules/ProductsSidebar";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ProductsPage() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const dispatch = useDispatch();
  
  const products = useSelector(
    (store: RootState) => store.products.productsValue
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/products");
        const result = await res.json();
        // console.log(result)
        dispatch(setProducts(result.data));
        dispatch(addAllProducts(result.data));
      } catch (error) {
        console.error("Error connecting to the database:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <SearchBox />

      <Categories />

      {products.length === 0 && (
        <div className=" mt-8 w-11/12 mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {Array.from({ length: 9 }).map((_, index) => (
            <div className="flex" key={index}>
              <Skeleton style={{ borderRadius: 10 , backgroundColor:"white" }} height={185} width={256} />
            </div>
          ))}
        </div>
      )}

      <div className=" mt-8 w-11/12 mx-auto grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
        {products.map((product) => (
          <ProductsCard
            key={product._id}
            product={product}
            isOpenModal={isOpenModal}
            setIsOpenModal={setIsOpenModal}
          />
        ))}
        <ProductsSidebar 
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
        />
      </div>
    </div>
  );
}

export default ProductsPage;
