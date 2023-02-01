import { Actions } from "@/services/app.reducer";
import { useAppState } from "@/services/AppState";
import { MealCategories, MealCategory } from "@/services/models/order.model";

export default function MealCategorySelection() {
  const { state, dispatch } = useAppState();

  const onSelectCategory = (category: MealCategory) => {
    dispatch({ type: Actions.UpdateOrder, payload: { category } });
    dispatch({ type: Actions.Update, payload: { view: 'restaurant' } });
  }

  return (
    <nav className="z-20 flex shrink-0 grow-0 justify-around gap-4 border-t border-gray-200 bg-white/50 p-2.5 shadow-lg backdrop-blur-lg  fixed left-4 top-2/4 -translate-y-2/4 min-h-[auto] min-w-[64px] flex-col rounded-lg border">
      {
        MealCategories.map((category: string, index: number) => (
          <div
            onClick={() => onSelectCategory(category as MealCategory)}
            className={"flex h-16 w-16 flex-col items-center justify-center gap-1 light:text-gray-100 rounded-md cursor-pointer " + (state.order.category === category ? 'bg-gray-400 text-white' : ' hover:bg-gray-100  ')}
            key={'selection.meal.' + category}>
            <small className="text-xs font-medium capitalize">{category}</small>
          </div>
        ))
      }
    </nav>
  )
}