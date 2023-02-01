import { Actions } from "../app.reducer";

export interface MenuRaw {
  id: string;
  name: string;
  restaurant: string;
  availableMeals: string[];
}

export interface Menu {
  restaurant: string;
  breakfast: MenuRaw[];
  lunch: MenuRaw[];
  dinner: MenuRaw[];
  dishes: MenuRaw[];
}

export type Dish = { [key: string]: number };

export const MealCategories = ['breakfast', 'lunch', 'dinner'];
export type MealCategory = 'breakfast' | 'lunch' | 'dinner';
export interface Order {
  category: MealCategory;
  guest: number;
  restaurant: string;
  dishes: Dish
}

export interface Store {
  order: Order;
  loading: boolean;
  cart: boolean;
  view: 'restaurant' | 'meals';
  menu: Menu[];
}

export type ActionType =
  | { type: Actions.UpdateOrder, payload: Partial<Order> }
  | { type: Actions.Update, payload: Partial<Store> }
  | { type: Actions.UpdateDish, payload: { name: string, servings: number } }
  | { type: Actions.RemoveDish, payload: { name: string } }

export type ContextType = {
  state: Store;
  dispatch: React.Dispatch<ActionType>;
}