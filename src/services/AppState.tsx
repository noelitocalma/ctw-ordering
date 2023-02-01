import React, { createContext, ReactNode, useContext, useEffect, useMemo, useReducer } from 'react';
import useApi from './api/data';
import AppStateReducer, { Actions } from './app.reducer';
import { ContextType, Order, Store } from './models/order.model';

const DEFAULTS: Store = {
  menu: [],
  loading: false,
  view: 'restaurant',
  cart: false,
  order: {
    category: 'breakfast',
    guest: 0,
    restaurant: '',
    dishes: {}
  }
};

export const AppContext = createContext<ContextType>({ state: DEFAULTS, dispatch: () => null })
export const useAppState = () => useContext(AppContext)
export function AppState({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(AppStateReducer, DEFAULTS);
  const API = useApi();

  useEffect(() => {
    (async () => {
      dispatch({ type: Actions.Update, payload: { ...(await API.get()) } });
    })();

    dispatch({
      type: Actions.UpdateOrder,
      payload: {
        category: API.getMealType()
      }
    });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  )
}

export default {
  AppState,
  useAppState,
}