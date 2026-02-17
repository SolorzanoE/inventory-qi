import { createContext } from "react";

export const SnackbarContext = createContext({ 
  /**
   * 
   * @param {string} message 
   * @param {"success" | "warning" | "error"} type 
   * @returns 
   */
  showMessage: (message, type) => {}
})