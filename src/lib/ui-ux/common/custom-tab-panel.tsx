import { Box } from "@mui/system";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    height?: string;
}

export function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, height = 'calc(100% - 49px)', ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            style={{ boxSizing: 'border-box', overflow: 'auto', height }}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: '15px 0px 15px 10px' }}>{children}</Box>}
        </div>
    );
}

export function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}