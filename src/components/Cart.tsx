import { Actions } from "@/services/app.reducer";
import { useAppState } from "@/services/AppState";
import { MenuRaw } from "@/services/models/order.model";
import AddRemoveButton from "./AddRemoveButton";

export default function Cart() {
  const { state, dispatch } = useAppState();

  const closeCart = () => {
    dispatch({ type: Actions.Update, payload: { cart: false } });
  }

  const onChangeNumberOfGuest = (value: number) => {
    dispatch({ type: Actions.UpdateOrder, payload: { guest: value } });
  }

  const onPlaceOrder = () => {
    const totalNumberOfDishes = Object.values(state.order.dishes).reduce((a, c) => a + c);

    if (!state.order.guest) {
      alert('Please enter number of guest');
      return;
    }

    if (totalNumberOfDishes < state.order.guest) {
      alert(`Please order more ${totalNumberOfDishes} servings is not enough for ${state.order.guest} people`);
      return;
    }

    console.log(state.order)
  }

  return <>
    <div className="fixed top-0 right-0 bottom-0 left-0 z-40 bg-gray-500 opacity-70 p-3 "></div>

    <div className="fixed flex flex-col top-0 right-0 bottom-0 bg-white p-3 z-50"
      style={{
        width: 375
      }}>
      <section className="flex items-center border-b-[1px] pb-2 mb-2 border-gray-300 justify-between">
        <span>Cart</span>
        <span className="cursor-pointer bg-red-500 py-1 px-3 text-white rounded-xl text-xs" onClick={closeCart}>Close</span>
      </section>

      <section className="flex flex-col mb-3">
        <span className="text-sm mb-2">Number of Guest</span>
        <input
          placeholder="Enter number of guest"
          className="border rounded-md h-8 p-2 outline-none"
          type="number"
          onChange={(e) => onChangeNumberOfGuest(e.target.valueAsNumber)}
        />
        {state.order.guest > 10 && <small className="text-red-500 italic">Maximum of 10 guest.</small>}
      </section>

      <section className="flex-1">
        {Object.keys(state.order.dishes).length <= 0 && <span>Please order now :)</span>}
        {
          Object.keys(state.order.dishes).map((name: string) => {
            return (
              <div key={'cart.item.' + name} className="rounded overflow-hidden shadow-lg mb-4 p-3">
                <div className="flex items-center justify-between">
                  <span>{name}</span>
                  <span>$9.99</span>
                </div>

                <div className="mt-2">
                  <AddRemoveButton item={{ name } as MenuRaw} />
                </div>
              </div>
            )
          })
        }
      </section>

      <section>
        <button className="bg-cyan-500 rounded-lg p-2 w-full text-center text-white" onClick={onPlaceOrder}>
          Place Order
        </button>
      </section>
    </div>
  </>
}