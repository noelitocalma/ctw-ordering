import { MealCategories, MealCategory, MenuRaw } from "../models/order.model";

export default function useApi() {
  /**
   * GET the data from Github JSON file 
   * and group it per restaurant and also group the dishes per meal category
   */
  const get = async () => {
    const data = await fetch('https://raw.githubusercontent.com/G123-jp/react_assignment/master/data/dishes.json')
      .then((response) => response.json())
      .then(({ dishes }) => dishes);


    const restaurants: string[] = Array.from(new Set(data.map((d: MenuRaw) => d['restaurant'])))
    const dishes = restaurants.map((restaurant: string) => {
      const _dishes = data.filter((d: MenuRaw) => d.restaurant === restaurant);

      return {
        restaurant,
        dishes: _dishes,
        ...MealCategories.reduce((a: any, c: string) => (
          a[c] = _dishes.filter((d: MenuRaw) => d.availableMeals.includes(c)), a
        ), {})
      }
    });

    return { menu: dishes, loading: false };
  };


  /**
   * GET the current time and set a default meal category
   * e.g. breakfast | lunch | dinner
   */
  const getMealType = (): MealCategory => {
    const time = new Date().getHours();
    switch (true) {
      case time >= 6 && time <= 10:
        return 'breakfast';
      case time >= 11 && time <= 15:
        return 'lunch';
      case time >= 16 && time <= 22:
        return 'dinner';
      default:
        return 'breakfast';
    }
  }
  return {
    get,
    getMealType
  }
}