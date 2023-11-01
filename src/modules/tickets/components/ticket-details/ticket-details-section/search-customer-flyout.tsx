import { Box, Button, Drawer, Grid, IconButton, TextField, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import CloseIcon from '@mui/icons-material/Close';

const DrawerContent = styled.div`
    width: 1000px;
`;

const HeaderWrapper = styled(FlexBox)`
    box-sizing: border-box;
    padding: 15px 10px 10px 15px;
    border-bottom: 1px solid #e9ebed;
`;

const StlyedFlexBox = styled(FlexBox)`
    margin-top: 20px;
`;


interface ISearchCustomerFlyoutProps {
    onSearchUserBtnClick: () => void;
    showSearchUserFlyout: boolean;
}
export const SearchCustomerFlyout = (props: ISearchCustomerFlyoutProps) => {
    const { onSearchUserBtnClick, showSearchUserFlyout } = props;
    // const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    // const toggleDrawer = () => {
    //     setIsDrawerOpen((x) => !x);
    // };

    return (
        <>
            {/* <Button onClick={toggleDrawer}>Open</Button> */}
            <Drawer anchor="right" open={showSearchUserFlyout} onClose={onSearchUserBtnClick}>
                <DrawerContent>
                    <HeaderWrapper $width="100%" $justifyContent="space-between">
                        <Typography variant="h6">Search Customer Form</Typography>
                        <IconButton aria-label="Close" onClick={onSearchUserBtnClick}>
                            <CloseIcon />
                        </IconButton>
                    </HeaderWrapper>
                    <Box sx={{ width: '100%', padding: '20px', boxSizing: 'border-box' }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField id="" label="Customer ID" type="number" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="" label="Name" type="text" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="" label="Phone Number" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="" label="Email" type="email" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="" label="Customer Code" type="text" fullWidth />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField id="" label="Order ID" type="text" fullWidth />
                            </Grid>
                        </Grid>
                        <StlyedFlexBox $gap='10px' $width="100%" $justifyContent="flex-end">
                            <Button variant="contained" size="large">Search & Attach</Button>
                            <Button variant="contained" size="large">Search</Button>
                        </StlyedFlexBox>
                    </Box>
                </DrawerContent>
            </Drawer>
        </>
    );
}