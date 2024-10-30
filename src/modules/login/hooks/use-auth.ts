import { useContext } from "react";
import { AuthContext } from "../auth-provider-context";

export const useAuth = () => {
    return useContext(AuthContext);
};