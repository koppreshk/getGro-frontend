import { Tab, styled as MUIStyled } from "@mui/material";

interface StyledTabProps {
    label: string;
}

export const StyledTab = MUIStyled((props: StyledTabProps) => (
    <Tab disableRipple {...props} />
))(({ theme }) => ({
    textTransform: 'none',
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    '&.Mui-focusVisible': {
        backgroundColor: 'rgba(100, 95, 228, 0.32)',
    },
    '&.Mui-selected': {
        fontWeight: theme.typography.fontWeightMedium,
    },
}));