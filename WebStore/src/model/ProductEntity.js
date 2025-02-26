import { v4 as uuidv4 } from "uuid";

class Product {
  constructor(title, price, category, description) {
    this.id = uuidv4();
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description;
  }
}

export default Product;
