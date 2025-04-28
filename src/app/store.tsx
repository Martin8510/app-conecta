import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "../features/auth/presentacion";
import { userReducer } from "../features/user/presentacion";
import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
  Provider,
} from "react-redux";
import React from "react";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    // otros reducers...
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Inferir los tipos `RootState` y `AppDispatch` del store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Exporta los hooks tipados
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Componente Provider que puedes usar en main.tsx o App.tsx
interface ReduxProviderProps {
  children: React.ReactNode;
}

export const ReduxProvider: React.FC<ReduxProviderProps> = ({ children }) => {
  return <Provider store={store}>{children}</Provider>;
};
