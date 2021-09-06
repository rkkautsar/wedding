import { createContext } from "react";

export const StoryContext = createContext<{
  setCurrentIndex: (_: number) => any;
}>({
  setCurrentIndex: () => {},
});
