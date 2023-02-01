import { ActionType, Dish, Order, Store } from "./models/order.model";

export enum Actions {
  Update = "UPDATE",
  UpdateDish = "ADD_DISH",
  RemoveDish = "REMOVE_DISH",
  UpdateOrder = "UPDATE_ORDER"
}

function AppStateReducer(state: Store, { type, payload }: ActionType): Store {
  let newState: Store = { ...state };

  switch (type) {
    case Actions.Update:
      newState = { ...state, ...payload };
      break;
    case Actions.UpdateOrder:
      newState = {
        ...newState,
        order: {
          ...newState.order,
          ...payload
        }
      };
      break;
    case Actions.UpdateDish:
      if (newState.order.dishes.hasOwnProperty(payload.name)) {
        newState.order.dishes[payload.name] += payload.servings;

        /** should we delete ?? */
        if (state.order.dishes[payload.name] === 0) {
          delete state.order.dishes[payload.name];
        }
      } else {
        newState.order.dishes[payload.name] = 1;
      }

      break;
    case Actions.RemoveDish:
      delete newState.order.dishes[payload.name];
      break;
    default:
      newState = state;
      break;
  }

  return newState;
}

export default AppStateReducer;