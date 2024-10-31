import { IoMdSettings } from "react-icons/io";
import { FaLeaf } from "react-icons/fa";

import { useState } from "react";
import Image from "next/image";

import { Product } from "../../../redux/features/products/ProductsSlice";
import { useDispatch } from "react-redux";
import { setEditProducts } from "../../../redux/features/editProducts/editProductSlice";

import DetailsProductModal from "./DetailsProductModal";

type ProductCardprops = {
  product: Product;
  isOpenModal: boolean;
  setIsOpenModal: any;
};

const ProductsCard: React.FC<ProductCardprops> = ({ product, isOpenModal, setIsOpenModal }) => {
  
  const [imageUrl, setImageUrl] = useState(product.image);

  const dispatch = useDispatch();

  const imageError = () => {
    setImageUrl("/images/default-image.png");
  };

  const editHandler = () => {
    setIsOpenModal(!isOpenModal);
    dispatch(setEditProducts(product));
  };

  return (
    <div className="bg-white w-64 max-h-max p-4 rounded-xl">
      <Image
        src={imageUrl || "/images/default-image.png"}
        alt={product.name}
        width={10000}
        height={10000}
        onError={imageError}
        className="mx-auto -top-8 relative h-1/3 w-1/2 rounded-full"
      />

      {product.isVegan ? (
        <div className="flex justify-end relative -top-20 right-5 text-xl text-green-600 ">
          <FaLeaf />
        </div>
      ) : null}

      <div className="h-2/3">
        <h4 className="text-center font-semibold">{product.name}</h4>

        <span className="flex justify-center text-neutral-600 text-sm">
          {product.weight}g
        </span>

        <p className="text-xs text-center my-2 max-h-max">
          {product.ingredients.join(" , ")}
        </p>

        <div className="flex justify-between mt-4">
          <p className="text-xl">${product.price}</p>

          <div className="flex items-center gap-1">
            <button
              className="border border-neutral-400 p-1 rounded-md text-md"
              onClick={editHandler}
            >
              <IoMdSettings />
            </button>

            <DetailsProductModal product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCard;
