"use client";

import { LuVegan } from "react-icons/lu";
import { CgClose } from "react-icons/cg";
import { IoEye } from "react-icons/io5";

import { useState } from "react";
import Image from "next/image";

import { useDispatch } from "react-redux";
import { setDisplayProduct } from "../../../redux/features/displayProducts/displayProductSlice";
import { Product } from "../../../redux/features/products/ProductsSlice";

import { Drawer } from "vaul";

type DetailsProductModalProps = {
  product: Product;
};

const DetailsProductModal: React.FC<DetailsProductModalProps> = ({product}) => {

  const [isOpenDetailsModal, setIsOpenDetailsModal] = useState(false);
  const dispatch = useDispatch();

  const [imageUrl, setImageUrl] = useState(product.image);

  const imageError = () => {
    setImageUrl("/images/default-image.png");
  };

  const modalHandler = () => {
    setIsOpenDetailsModal(!isOpenDetailsModal);
  };

  const displayHandler = () => {
    setIsOpenDetailsModal(!isOpenDetailsModal);
    dispatch(setDisplayProduct(product));
  };

  return (
    <Drawer.Root
      direction="right"
      open={isOpenDetailsModal}
      onOpenChange={modalHandler}
    >
      <Drawer.Trigger>
        <div
          className="border border-neutral-400 p-1 rounded-md text-md"
          onClick={displayHandler}
        >
          <IoEye />
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className="right-2 top-2 bottom-2 fixed z-10 outline-none w-1/4 flex"
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={
            { "--initial-transform": "calc(100% + 8px)" } as React.CSSProperties
          }
        >
          {isOpenDetailsModal && (
            <div className="bg-neutral-100 h-full w-full grow p-5 flex flex-col rounded-[16px]">
              <div className="max-w-md mx-auto">

                <Drawer.Title className="font-medium mb-2 text-zinc-900">
                  <div className="flex items-end justify-between text-2xl mb-4">
                    <p className="text-xl">Product Details</p>
                    <button onClick={modalHandler}>
                      <CgClose />
                    </button>
                  </div>
                </Drawer.Title>
                
                <div className="productDetails">
                  <Image
                    src={imageUrl || "/images/default-image.png"}
                    width={10000}
                    height={10000}
                    alt={product.name}
                    onError={imageError}
                    className="mx-auto h-1/3 w-1/3 relative rounded-full"
                  />
                  <div className="text-center">
                    {product.isVegan ? (
                      <span className="!text-lg !text-lime-600 flexItems justify-center">
                        <LuVegan /> This item is suitable for vegans
                      </span>
                    ) : (
                      <span className="!text-lg !text-red-800">
                        This item is not suitable for vegans
                      </span>
                    )}
                  </div>
                  <div className="flexItems">
                    <h3>Product Name:</h3>
                    <span>{product.name}</span>
                  </div>
                  <div>
                    <h3>Ingredients:</h3>
                    <ul>
                      {product.ingredients.map((item, index) => (
                        <li
                          key={index}
                          className="list-disc list-inside text-sm "
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flexItems">
                    <h3>Weight:</h3>
                    <span>{product.weight}g</span>
                  </div>
                  <div className="flexItems">
                    <h3>Calories:</h3>
                    <span>{product.calory} kc</span>
                  </div>
                  <div className="flexItems">
                    <h3>Price:</h3>
                    <span>{product.price} $</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default DetailsProductModal;
