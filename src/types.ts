export interface OptionType {
  value: string | number;
  label: string;
}

export interface FruitItemType {
  name: string;
  id: number | string;
  family: string;
  order: string;
  genus: string;
  nutritions: NutritionType;
}

export interface NutritionType {
  calories: number;
  fat: number;
  sugar: number;
  carbohydrates: number;
  protein: number;
}

export interface CartItemType {
  id: number ;
  name: string;
  qty: number;
}
