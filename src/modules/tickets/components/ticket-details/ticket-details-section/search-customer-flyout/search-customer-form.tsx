import { Box, Button, Grid } from "@mui/material";
import { TextboxField } from "lib/form-fields";
import { useFormContext } from "react-hook-form";
import { ISearchCustomerFlyoutProps } from "..";
import { FlexBox } from "lib/ui-ux";
import styled from "styled-components";
import { emailRegExp } from "lib/utils";

const StlyedFlexBox = styled(FlexBox)`
    margin-top: 20px;
`;

interface ISearchCustomerFormProps extends Pick<ISearchCustomerFlyoutProps, 'onformSubmit'> {

}

export const SearchCustomerForm = (props: ISearchCustomerFormProps) => {
    const { onformSubmit } = props;
    const methods = useFormContext();
    const onsubmit = () => {
        onformSubmit();
    };

    return (
        <form>
            <Box sx={{ width: '100%', padding: '20px', boxSizing: 'border-box', backgroundColor: 'white' }}>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextboxField name="customerId" label="Customer ID" type="number" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="name" label="Name" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="phoneNumber" label="Phone Number" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="email" label="Email" type="email" fullWidth rules={{validate: (value) => !emailRegExp.test(value) ? 'Please enter a valid email address.' : undefined }}/>
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="customerCode" label="Customer Code" type="text" fullWidth />
                    </Grid>
                    <Grid item xs={6}>
                        <TextboxField name="orderId" label="Order ID" type="text" fullWidth />
                    </Grid>
                </Grid>
                <StlyedFlexBox $gap='10px' $width="100%" $justifyContent="flex-end">
                    {/* <Button variant="contained" size="large">Search & Link</Button> */}
                    <Button variant="contained" size="large" type="submit" onClick={methods.handleSubmit(onsubmit)}>Search</Button>
                </StlyedFlexBox>
            </Box>
        </form>
    )
}