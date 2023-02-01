import { Actions } from "@/services/app.reducer";
import { useAppState } from "@/services/AppState";
import { Dish, Menu, MenuRaw } from "@/services/models/order.model";
import { useEffect, useMemo } from "react"
import AddRemoveButton from "./AddRemoveButton";

export default function MealSelection() {
  const { state } = useAppState();
  const meals = useMemo(() => {
    const restaurant = state.menu.find((menu: Menu) => menu.restaurant === state.order.restaurant);
    return restaurant ? restaurant[state.order.category] : [];
  }, [state.order.restaurant]);

  return (
    <div>
      <div className="p-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
        {
          meals.map((item: MenuRaw) => {
            return (
              <div
                key={'meal.selection.' + item.id}
                className="rounded overflow-hidden shadow-lg cursor-pointer hover:border-cyan-500">
                <div className="p-5 bg-gray-300 h-48"></div>
                <div className="px-6 py-4 h-32">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <h4>$9.99</h4>
                </div>

                <div className="px-6 py-4">
                  <AddRemoveButton item={item} />
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}