import { Actions } from "@/services/app.reducer";
import { useAppState } from "@/services/AppState";
import { Dish, MenuRaw } from "@/services/models/order.model";

export default function AddRemoveButton({ item }: { item: MenuRaw }) {
  const { state, dispatch } = useAppState();

  const onSelectMeal = (name: string, servings: number) => {
    dispatch({ type: Actions.UpdateDish, payload: { name, servings } });
  }

  const onRemove = (name: string) => {
    const proceed = confirm('Are you sure?');
    if (proceed) {
      dispatch({ type: Actions.RemoveDish, payload: { name } });
    }
  }
  return (
    <div>
      {!state.order.dishes[item.name]
        ? <button className="bg-cyan-600 text-white rounded-md text-xs px-2 py-1" onClick={() => onSelectMeal(item.name, 1)}>Add to cart</button>
        : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <button className="bg-red-600 text-white rounded-tl-md rounded-bl-md text-xs px-2 py-1" onClick={() => onSelectMeal(item.name, -1)}>-</button>
              <span className="px-3 bg-gray-200">{state.order.dishes[item.name] || 0}</span>
              <button className="bg-cyan-600 text-white rounded-tr-md rounded-br-md text-xs px-2 py-1" onClick={() => onSelectMeal(item.name, 1)}>+</button>
            </div>

            <button className="bg-red-600 text-white rounded-md text-xs px-2 py-1" onClick={() => onRemove(item.name)}>Remove</button>
          </div>
        )
      }
    </div>
  )
}