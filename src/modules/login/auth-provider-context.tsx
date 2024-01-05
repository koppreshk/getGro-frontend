import { createContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { clearCookies, useCookieStorage } from "./hooks/use-cookie-storage";

type User = {
    user: null | { email: string, auth: string }
    login: (_data: { email: string, auth: string, rememberMe?: boolean }) => void,
    logout: () => void
};

export const AuthContext = createContext<User>({
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (_data: { email: string, auth: string, rememberMe?: boolean }) => { },
    logout: () => { }
});

interface IAuthProviderProps {
    children?: React.ReactNode
}

export const AuthProvider = (props: IAuthProviderProps) => {
    const { children } = props;
    const [user, setUser] = useCookieStorage("GET_GRO_AUTH", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = useCallback((data: { email: string, auth: string, rememberMe?: boolean }) => {
        setUser(data, 14, data.rememberMe);
        navigate("/dashboard", { replace: true });
    }, [navigate, setUser]);

    // call this function to sign out logged in user
    const logout = useCallback(() => {
        clearCookies();
        navigate("/login", { replace: true });
    }, [navigate]);

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [login, logout, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

