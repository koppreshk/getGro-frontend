import { Button, ButtonProps, CircularProgress } from "@mui/material"

interface LoadingButtonProps extends ButtonProps {
    isLoading: boolean;
}

export const LoadingButton = (props: LoadingButtonProps) => {
    const { children, isLoading, endIcon, ...rest } = props
    return (
        <Button
            {...rest}
            disabled={isLoading}
            endIcon={isLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : endIcon}>
            {children}
        </Button>
    )
}