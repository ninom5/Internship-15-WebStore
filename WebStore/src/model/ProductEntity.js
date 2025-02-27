import { v4 as uuidv4 } from "uuid";

class Product {
  constructor(title, price, category, description, image, rating) {
    this.id = uuidv4();
    this.title = title;
    this.price = price;
    this.category = category;
    this.description = description;
    this.image = image;
    this.rating = rating;
  }
}

export default Product;
