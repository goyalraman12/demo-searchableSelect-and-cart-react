import { useEffect, useState } from "react";
import SearchableSelect from "../SearchableSelect";
import NoProducts from "./NoProducts";
import CartItem from "./CartItem";

import { CartItemType, FruitItemType, OptionType } from "../../types";
import styles from "./Products.module.css";

const Products = () => {
  const [fruitItems, setFruitItems] = useState<FruitItemType[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const [fruitCartItems, setFruitCartItems] = useState<CartItemType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://fruityvice.com/api/fruit/all");
        const data: FruitItemType[] = await response.json();
        setFruitItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const addHandler = (option: OptionType | null) => {
    console.log(option);

    if (!!option) {
      setFruitCartItems((prev: CartItemType[]) => {
        const tempPrev = JSON.parse(JSON.stringify(prev));
        const iIndex = tempPrev.findIndex(
          (el: CartItemType) => el?.id === option?.value
        );
        debugger;
        if (iIndex > -1) {
          tempPrev[iIndex].qty = +1;
        } else {
          tempPrev.push({
            id: option?.value,
            name: option?.label,
            qty: 1,
          });
        }
        return tempPrev;
      });
    }
  };

  const plusMinusHandler = (id: number, flag: "plus" | "minus") => {
    console.log(id);

    setFruitCartItems((prev: CartItemType[]) => {
      const tempPrev = JSON.parse(JSON.stringify(prev));
      const iIndex = tempPrev.findIndex((el: CartItemType) => el.id === id);
      if (flag === "plus") {
        tempPrev[iIndex].qty = tempPrev[iIndex].qty + 1;
        return tempPrev;
      } else {
        if (tempPrev[iIndex].qty > 1) {
          tempPrev[iIndex].qty = tempPrev[iIndex].qty - 1;
          return tempPrev;
        }
        tempPrev.splice(iIndex, 1);
        return tempPrev;
      }
    });
  };

  const Cart = () => {
    if (!fruitCartItems?.length) return <NoProducts />;
    return (
      <>
        {fruitCartItems?.map((fruit: CartItemType) => (
          <CartItem
            key={fruit?.id}
            fruit={fruit}
            plusMinusHandler={plusMinusHandler}
          />
        ))}
        ;
      </>
    );
  };

  return (
    <div className="w-75 mx-auto">
      <h2>Add Products</h2>
      <div className={styles.searchContainer}>
        <SearchableSelect
          fieldlabel="Product"
          options={fruitItems?.map((fruit: FruitItemType) => ({
            value: fruit.id,
            label: fruit.name,
          }))}
          selectedOption={selectedOption}
          setSelectedOption={setSelectedOption}
          addHandler={addHandler}
        />
        <button
          onClick={() => {
            addHandler(selectedOption);
          }}
        >
          Add
        </button>
      </div>

      <div className={styles.cartContainer}>
        <Cart />
      </div>
    </div>
  );
};

export default Products;
