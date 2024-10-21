import { Tabs, styled as MUIStyled } from "@mui/material";

interface StyledTabsProps {
    children?: React.ReactNode;
    value: number;
    whiteBackground?: boolean;
    onChange: (event: React.SyntheticEvent, newValue: number) => void;
}

export const StyledTabs = MUIStyled((props: StyledTabsProps) => (
    <Tabs
        {...props}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))<StyledTabsProps>(({ whiteBackground }) => ({
    '& .MuiTabs-indicator': {
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: 'transparent',
    },
    '& .MuiTabs-indicatorSpan': {
        maxWidth: 40,
        width: '100%',
        backgroundColor: '#635ee7',
    },
    background: whiteBackground ? '#fff' : '#f1f1f1',
}));
