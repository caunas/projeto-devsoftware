import { useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContextValue";

export function useAuth(){
  return useContext(AuthContext);
}
