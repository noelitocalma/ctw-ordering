import Cart from '@/components/Cart';
import MealCategorySelection from '@/components/MealCategorySelection';
import MealSelection from '@/components/MealSelection';
import RestaurantSelection from '@/components/RestaurantSelection';
import { Actions } from '@/services/app.reducer';
import { useAppState } from '@/services/AppState'
import { useEffect } from 'react';

export default function Home() {
  const { state, dispatch } = useAppState();

  useEffect(() => {
    console.log({ state })
  }, [state]);

  useEffect(() => {
    console.log(state.view)
  }, [state.view])

  const onBack = () => {
    dispatch({ type: Actions.Update, payload: { view: 'restaurant' } });
  }

  const showCart = () => {
    dispatch({ type: Actions.Update, payload: { cart: !state.cart } });
  }

  return (
    <div className="pl-32 relative flex w-screen h-screen pattern">
      <section>
        <MealCategorySelection />
      </section>
      <section className="flex-1 bg-gray-100 p-5 overflow-auto flex flex-col">
        <div className='flex justify-between'>
          <div className="p-2 font-bold flex items-center gap-4">
            {
              state.view === 'meals'
                ? <>
                  <span className="cursor-pointer bg-white py-1 px-3 rounded-xl text-xs" onClick={onBack}>Back</span>
                  <span>|</span>
                  <span>{state.order.restaurant}</span>
                </>
                : <span>Restaurants</span>
            }
          </div>

          <div className="p-2 font-bold cursor-pointer" onClick={showCart}>
            View Selected Meal(s): {Object.keys(state.order.dishes).length}
          </div>
        </div>
        <hr className="mb-3" />
        <div className="flex-1">
          {
            state.loading
              ? <div className="flex items-center h-full w-full justify-center">please wait...</div>
              : (state.view === 'restaurant' ? <RestaurantSelection /> : <MealSelection />)
          }
        </div>

        {state.cart && <Cart />}
      </section>
    </div>
  )
}
