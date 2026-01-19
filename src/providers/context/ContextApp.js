import { createContext } from "react";

export const SnackbarContext = createContext({ 
  showMessage: () => {}
})