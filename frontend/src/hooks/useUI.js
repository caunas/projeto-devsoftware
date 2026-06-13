import { useContext } from "react";
import { UIContext } from "../contexts/ui/UIContextValue";

export function useUI() {
  return useContext(UIContext);
}
