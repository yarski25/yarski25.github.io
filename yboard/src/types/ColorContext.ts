import { createContext } from "react";

type ColorContextSchema = {
  toggleColorMode: () => void;
};

export const ColorContext = createContext<ColorContextSchema>(
  {} as ColorContextSchema
);
