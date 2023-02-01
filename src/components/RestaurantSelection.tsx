import { Actions } from "@/services/app.reducer";
import { useAppState } from "@/services/AppState";
import { Menu } from "@/services/models/order.model";
import { useEffect, useMemo } from "react";

export default function RestaurantSelection() {
  const { state, dispatch } = useAppState();

  const restaurants = useMemo(() => {
    return state.menu.filter((menu: Menu) => menu[state.order.category].length > 0)
  }, [state.order.category, state.menu]);

  const onSelectRestaurant = (restaurant: string) => {
    const set = () => {
      dispatch({ type: Actions.UpdateOrder, payload: { restaurant } });
      dispatch({ type: Actions.Update, payload: { view: 'meals' } });
    }

    if (state.order.restaurant !== restaurant) {
      if (!state.order.restaurant) {
        set();
      } else {
        if (Object.keys(state.order.dishes).length > 0) {
          const proceed = confirm('This will clear your cart, are you sure to proceed?');
          if (proceed) {
            dispatch({ type: Actions.UpdateOrder, payload: { dishes: {} } });
            set();
          }
        } else {
          set();
        }
      }
    }
  }

  return (
    <div className="p-2 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {
        restaurants.map((item: Menu) => {
          return (
            <div
              key={'restaurant.selection.' + item.restaurant}
              className="rounded overflow-hidden shadow-lg cursor-pointer hover:border-cyan-500"
              onClick={() => onSelectRestaurant(item.restaurant)}>
              <div className="p-5 bg-gray-300 h-48"></div>

              <div className="px-6 py-4 h-32">
                <div className="font-bold text-xl mb-2">{item.restaurant}</div>
                <p className="text-gray-700 text-base">
                  {item[state.order.category].map(a => a.name).join(' | ')}
                </p>
              </div>
              <div className="px-6 pt-4 pb-2">
                <small className="inline-block py-1 px-3 bg-gray-200 rounded-lg text-xs font-semibold text-red-700 mb-2">
                  Delivery Time: 15-30 minutes
                </small>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}