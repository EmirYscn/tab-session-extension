import React, { createContext } from "react";
import { LocalStorageOptions } from "../../services/storage";

export type OptionsContextType = {
  options: LocalStorageOptions;
  setOptions: React.Dispatch<React.SetStateAction<LocalStorageOptions>>;
};

// Create Context
export const OptionsContext = createContext<OptionsContextType | undefined>(
  undefined
);
