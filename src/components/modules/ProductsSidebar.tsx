"use client";
import { CgClose } from "react-icons/cg";
import { FaHamburger } from "react-icons/fa";
import { LuVegan } from "react-icons/lu";
import { FiEdit } from "react-icons/fi";

import { MouseEvent, useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { addToIngredients, deleteAllIngredients, removeIngredient} from "../../../redux/features/ingredients/ingredientsSlice";
import { addAllProducts, addToProducts, updateProduct,} from "../../../redux/features/products/ProductsSlice";
import { resetEditProduct } from "../../../redux/features/editProducts/editProductSlice";
import { resetDisplayProduct } from "../../../redux/features/displayProducts/displayProductSlice";
import { RootState } from "../../../redux/store";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import useFetchData from "../../../utils/fetchDataFunc";

import { Drawer } from "vaul";


interface FormDataType {
  name: string;
  ingredients: string[];
  isVegan: boolean;
  category: string;
  weight: string;
  calory: string;
  price: string;
  image?: string;
}

type AddProductsSidebarProps = {
  isOpenModal?: boolean;
  setIsOpenModal?: any;
};

const ProductsSidebar: React.FC<AddProductsSidebarProps> = ({ isOpenModal, setIsOpenModal}) => {

  const dispatch = useDispatch();
  const fetchData = useFetchData();
  
  const [ingredientInput, setIngredientInput] = useState("");

  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    ingredients: [],
    isVegan: false,
    category: "",
    weight: "",
    calory: "",
    price: "",
    image: "",
  });

  const editProduct = useSelector(
    (store: RootState) => store.editProduct.editProductValue
  );
  // console.log(editProduct)

  const ingredients = useSelector(
    (store: RootState) => store.ingredients.ingredientsValue
  );

  useEffect(() => {
    if (editProduct) {
      setFormData(editProduct);
    } else {
      setFormData({
        name: "",
        ingredients: [],
        isVegan: false,
        category: "",
        weight: "",
        calory: "",
        price: "",
        image: "",
      });
    }
  }, [editProduct]);

  useEffect(() => {
    setFormData((prev) => ({ ...prev, ingredients }));
  }, [ingredients]);

  const modalHandler = () => {
    if (isOpenModal) {
      dispatch(resetEditProduct());
      dispatch(resetDisplayProduct());
    }
    setIsOpenModal(!isOpenModal);
  };

  const addIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (ingredientInput) {
      dispatch(addToIngredients(ingredientInput));
      setIngredientInput("");
    }
  };

  const deleteIngredient = (e: MouseEvent<HTMLButtonElement>, item: string) => {
    e.preventDefault();
    dispatch(removeIngredient(item));
  };

  const resetForm = () => {
    setFormData({
      name: "",
      ingredients: [],
      isVegan: false,
      category: "",
      weight: "",
      calory: "",
      price: "",
      image: "",
    });
    dispatch(deleteAllIngredients());
  };

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const res = await fetch("/api/products", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    // console.log(result);

    if (result.status === 400) {
      return toast.error(result.message);
    }

    if (result.status === 201) {
      toast.success(result.message);
    }
    dispatch(addToProducts(result.newData));
    dispatch(addAllProducts(result.allProducts));
    resetForm();
    setIsOpenModal(!isOpenModal);
  };

  const editHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "PATCH",
      body: JSON.stringify(formData),
      headers: { "Content-Type": "application/json" },
    });

    const result = await res.json();
    // console.log(result)

    if (result.status === 400) {
      return toast.error(result.message);
    }

    if (result.status === 200) {
      toast.success(result.message);
    }
    dispatch(updateProduct(result.data));
    dispatch(resetEditProduct());
    fetchData()
    setIsOpenModal(!isOpenModal);
  };

  return (
    <>
      <Drawer.Root
        direction="right"
        open={isOpenModal}
        onOpenChange={modalHandler}
      >
        <Drawer.Trigger>
          <div className="w-64 h-64 border-2 rounded-xl border-neutral-500 border-dashed flex items-center justify-center">
            <span>+ Add new product</span>
          </div>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay className="fixed inset-0 bg-black/40" />
          <Drawer.Content
            className="right-2 top-2 bottom-2 fixed z-10 outline-none w-1/4 flex"
            // The gap between the edge of the screen and the drawer is 8px in this case.
            style={
              {
                "--initial-transform": "calc(100% + 8px)",
              } as React.CSSProperties
            }
          >
            {isOpenModal && (
              <div className="bg-neutral-100 h-full w-full grow p-5 flex flex-col rounded-[16px]">
                <div className="max-w-md mx-auto">

                  <Drawer.Title>
                    <div className="flex items-end justify-between text-2xl mb-4">
                      {editProduct.name ? (
                        <p>Edit Product</p>
                      ) : (
                        <p>Add new product</p>
                      )}
                      <button onClick={modalHandler}>
                        <CgClose />
                      </button>
                    </div>
                  </Drawer.Title>

                  <form className="flex flex-col gap-6 sidebar">

                    <div className="flex flex-col gap-1">
                      <label htmlFor="name">Name of the product</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="p-2 h-8"
                        value={formData.name}
                        onChange={changeHandler}
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="ingredients">Ingredients</label>
                      <div className="w-full border flex flex-wrap gap-2 p-1 rounded-lg">
                        {formData.ingredients?.map((item, index) => (
                          <div
                            key={index}
                            className="flex gap-1 items-center bg-neutral-200 p-2 rounded-md min-w-max"
                          >
                            <p className="text-xs">{item}</p>
                            <button onClick={(e) => deleteIngredient(e, item)}>
                              <CgClose />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="flexItems">
                        <input
                          type="text"
                          id="ingredients"
                          name="ingredients"
                          className="p-2 h-8 w-full"
                          value={ingredientInput}
                          onChange={(e) => setIngredientInput(e.target.value)}
                        />
                        <button
                          className="p-2 h-8 w-12 rounded-lg text-xs bg-neutral-300 border border-neutral-400"
                          onClick={addIngredient}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="vegans"
                        name="isVegan"
                        className="w-6 h-6"
                        checked={formData.isVegan}
                        onChange={changeHandler}
                      />
                      <label
                        htmlFor="vegans"
                        className="flex items-center gap-1"
                      >
                        <LuVegan className="text-green-500" /> Suitable for
                        vegans
                      </label>
                    </div>

                    <div className="flex flex-col gap-2">
                      <h3 className="text-lg">Categories</h3>
                      <div className="text-sm flex gap-3">
                        <div className="flex gap-1">
                          <input
                            type="radio"
                            id="main"
                            value="main"
                            name="category"
                            checked={formData.category === "main"}
                            onChange={changeHandler}
                          />
                          <label htmlFor="main" >Main course</label>
                        </div>
                        <div className="flex gap-1">
                          <input
                            type="radio"
                            id="side"
                            value="side"
                            name="category"
                            checked={formData.category === "side"}
                            onChange={changeHandler}
                          />
                          <label htmlFor="side">Side dishe</label>
                        </div>
                        <div className="flex gap-1">
                          <input
                            type="radio"
                            id="drink"
                            value="drink"
                            name="category"
                            checked={formData.category === "drink"}
                            onChange={changeHandler}
                          />
                          <label htmlFor="drink">Drink</label>
                        </div>
                        <div className="flex gap-1">
                          <input
                            type="radio"
                            id="other"
                            value="other"
                            name="category"
                            checked={formData.category === "other"}
                            onChange={changeHandler}
                          />
                          <label htmlFor="other">Other</label>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="weight">Weight in grams</label>
                        <input
                          type="text"
                          id="weight"
                          name="weight"
                          className="p-2 h-8 max-w-40 text-center"
                          value={formData.weight}
                          onChange={changeHandler}
                        />
                      </div>

                      <div className="flex flex-col gap-2">
                        <label htmlFor="calories">Calories</label>
                        <input
                          type="text"
                          id="calories"
                          name="calory"
                          className="p-2 h-8 max-w-40 text-center"
                          value={formData.calory}
                          onChange={changeHandler}
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="price">Price of the product</label>
                      <input
                        type="text"
                        id="price"
                        name="price"
                        className="px-10 h-8 w-full"
                        value={formData.price}
                        onChange={changeHandler}
                      />
                      <span className="relative -top-7 left-5">$</span>
                    </div>

                    {editProduct.name ? (
                      <button onClick={editHandler}>
                        <span className="inline-flex items-center gap-2 text-white bg-black p-2 w-full justify-center rounded-xl">
                          <FiEdit />
                          Edit product
                        </span>
                      </button>
                    ) : (
                      <button onClick={submitHandler}>
                        <span className="inline-flex items-center gap-2 text-white bg-black p-2 w-full justify-center rounded-xl">
                          +<FaHamburger />
                          Add product to the menu
                        </span>
                      </button>
                    )}
                  </form>

                </div>
              </div>
            )}
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="light"
      />
    </>
  );
};

export default ProductsSidebar;
