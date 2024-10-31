import { useDispatch } from "react-redux";
import { addAllProducts } from "../redux/features/products/ProductsSlice";

const useFetchData = () => {
  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const res = await fetch("/api/products");
      const result = await res.json();

      dispatch(addAllProducts(result.data));
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  return fetchData; 
};

export default useFetchData;
