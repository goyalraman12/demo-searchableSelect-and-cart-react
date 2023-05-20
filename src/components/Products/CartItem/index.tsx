import { Minus, Plus } from "../../../assets";
import { CartItemType } from "../../../types";
import classes from "./CartItem.module.css";

interface CartItemPropsType {
  fruit: CartItemType;
  plusMinusHandler: (id: number, flag: "plus" | "minus") => void;
}

const CartItem = (props: CartItemPropsType) => {
  const { fruit, plusMinusHandler } = props;
  return (
    <li className={classes.container}>
      <h4 className={classes.name}>{fruit.name}</h4>
      <div className={classes.itemDetails}>
        <img
          src={Minus}
          alt="Minus Icon"
          onClick={() => {
            plusMinusHandler(fruit.id, "minus");
          }}
        />
        <div className={classes.itemCount}>{fruit.qty}</div>
        <img
          src={Plus}
          alt="Plus Icon"
          onClick={() => {
            plusMinusHandler(fruit.id, "plus");
          }}
        />
      </div>
    </li>
  );
};

export default CartItem;
