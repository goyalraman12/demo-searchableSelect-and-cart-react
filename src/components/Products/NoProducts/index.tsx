import { NoProductsImage } from "../../../assets";
import classes from "./NoProducts.module.css";

const NoProducts = () => {
  return (
    <div className={classes.container}>
      <div className={classes.textCenter}>
        <img src={NoProductsImage} alt="No Products" />
        <div>No products have been added.</div>
      </div>
    </div>
  );
};

export default NoProducts;
