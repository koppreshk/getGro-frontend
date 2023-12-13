import { createContext, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "./hooks/use-local-storage";

type User = {
    user: null | { userName: string, password: string }
    login: (_data: { userName: string, password: string }) => Promise<any>,
    logout: () => void
};

export const AuthContext = createContext<User>({
    user: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    login: (_data: { userName: string, password: string }) => new Promise((res) => res('')),
    logout: () => { }
});

interface IAuthProviderProps {
    children?: React.ReactNode
}

export const AuthProvider = (props: IAuthProviderProps) => {
    const { children } = props;
    const [user, setUser] = useLocalStorage("user", null);
    const navigate = useNavigate();

    // call this function when you want to authenticate the user
    const login = useCallback(async (data: { userName: string, password: string }) => {
        setUser(data);
        navigate("/dashboard", { replace: true });
    }, [navigate, setUser]);

    // call this function to sign out logged in user
    const logout = useCallback(() => {
        setUser(null);
        navigate("/login", { replace: true });
    }, [navigate, setUser]);

    const value = useMemo(() => ({
        user,
        login,
        logout
    }), [login, logout, user]);

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

