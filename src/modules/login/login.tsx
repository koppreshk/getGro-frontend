import { ArrowForwardRounded } from "@mui/icons-material";
import { Box, Button, Checkbox, FormControlLabel, Grid, Link, TextField, Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import React from "react";
import styled from "styled-components";

const LoginWrapper = styled(FlexBox)`
    
`;

const LoginForm = () => {
    return (
        <Box sx={{ width: '100%', padding: '50px', boxSizing: 'border-box' }}>
            <form>
                <Grid container spacing={4}>
                    <Grid item md={12}>
                        <Typography variant="h2" sx={{ fontWeight: 500 }}>Login</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <TextField label="Username / Email" type="text" fullWidth />
                    </Grid>
                    <Grid item md={12}>
                        <TextField label="Password" type="password" fullWidth />
                    </Grid>
                    <Grid item md={12}>
                        <Button variant="contained" fullWidth size="large" endIcon={<ArrowForwardRounded />}>Sign in</Button>
                    </Grid>
                </Grid>
                <Grid item md={12}>
                    <FlexBox $justifyContent="space-between" $alignItems="center">
                        <FormControlLabel
                            value="end"
                            control={<Checkbox />}
                            label="Remember me"
                            labelPlacement="end"
                        />
                        <Link href="#" variant="subtitle2" underline="none" sx={{ fontSize: '16px' }}>Forgot password?</Link>
                    </FlexBox>

                </Grid>
            </form>
        </Box>
    )
}

export const Login = React.memo(() => {
    return (
        <LoginWrapper $height="100%" $width="100%">
            <FlexBox $width="60%">

            </FlexBox>
            <FlexBox $width="40%">
                <LoginForm />
            </FlexBox>
        </LoginWrapper>
    )
})