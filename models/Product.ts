import { Schema, model, models } from "mongoose";

const productSchema = new Schema({
  name: { type: String, required: true },
  ingredients: { type: [String], required: true },
  isVegan: { type: Boolean, required: true },
  category: { type: String, required: true },
  weight: { type: String, required: true },
  calory: { type: String, required: true },
  price: { type: String, required: true },
  image: { type: String, default: "/images/dafault-image.png" },
});

const Products = models.Products || model("Products", productSchema);
export default Products;
