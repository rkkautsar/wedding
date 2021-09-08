import { createContext } from "react";

interface StoryContextT {
  setCurrentIndex: (_: number) => any;
  isInvited?: boolean;
}

export const StoryContext = createContext<StoryContextT>({
  setCurrentIndex: () => {},
  isInvited: false,
});
