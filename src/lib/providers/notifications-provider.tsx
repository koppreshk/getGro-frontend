import { AlertColor, Snackbar, Alert } from "@mui/material";
import React, { useContext } from "react";

interface INotificationProviderProps {
    children?: React.ReactNode;
}

interface IShowNotificationArgs {
    message: string;
    type?: AlertColor; // AlertColor is a type from material-ui which consisits of 'success' | 'info' | 'warning' | 'error';
}

const defaultContextValues = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    showNotification: (_args: IShowNotificationArgs) => { /*NOOP */ }
};

const NotificationContext = React.createContext(defaultContextValues);

export const NotificationProvider = React.memo((props: INotificationProviderProps) => {
    const { children } = props;
    const [isOpen, triggerNotification] = React.useState(false);
    const [messageAndType, setMessageAndType] = React.useState<{ message: string, type: AlertColor }>({ message: '', type: 'success' });

    const openNotification = React.useCallback(() => {
        triggerNotification(true);
    }, []);

    const closeNotifications = React.useCallback(() => triggerNotification(false), []);

    const showNotification = React.useCallback((args: IShowNotificationArgs) => {
        const { message, type } = args;
        openNotification();
        setMessageAndType({ message, type: type ? type : 'success' })
    }, [openNotification]);

    return (
        <NotificationContext.Provider value={{ showNotification: showNotification }}>
            <Snackbar
                open={isOpen}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                autoHideDuration={3000}
                onClose={closeNotifications}>
                <Alert severity={messageAndType.type} onClose={closeNotifications}>{messageAndType.message}</Alert>
            </Snackbar>
            {children}
        </NotificationContext.Provider>
    )
});

export const useNotifications = () => useContext(NotificationContext);