import { useContext } from "react";
import { AuthDetails } from "@/types";
import { AuthContext } from "@/AuthContext";


export const useAuthContext = (): AuthDetails => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
