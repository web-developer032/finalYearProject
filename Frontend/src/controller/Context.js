import { createContext } from "react";

const StoreContext = createContext();

export const Provider = StoreContext.Provider;
export const Consumer = StoreContext.Consumer;

export default StoreContext;
