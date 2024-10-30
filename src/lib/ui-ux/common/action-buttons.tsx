import { KeyboardArrowLeft } from "@mui/icons-material";
import { Button, ButtonProps, CircularProgress } from "@mui/material"
import { Trans } from "react-i18next";

interface LoadingButtonProps extends ButtonProps {
    isLoading: boolean;
}

export const LoadingButton = (props: LoadingButtonProps) => {
    const { children, isLoading, disabled, endIcon, ...rest } = props
    return (
        <Button
            {...rest}
            disabled={isLoading || disabled}
            endIcon={isLoading ? <CircularProgress size={24} sx={{ color: "#fff" }} /> : endIcon}>
            {children}
        </Button>
    )
}

export const BackButton = (props: Omit<LoadingButtonProps, 'isLoading'>) => {
    const { children, ...rest } = props
    return (
        <Button
            {...rest}
            startIcon={<KeyboardArrowLeft />}>
            <Trans i18nKey="back" />
            {children}
        </Button>
    )
}

export const CancelButton = (props: Omit<LoadingButtonProps, 'isLoading'>) => {
    const { children, variant = "outlined", ...rest } = props;
    return (
        <Button
            {...rest}
            variant={variant}>
            <Trans i18nKey="cancel" />
            {children}
        </Button>
    )
}
