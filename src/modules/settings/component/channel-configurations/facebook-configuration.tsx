/* eslint-disable  */  // Disables all ESLint rules for this file

import { useEffect, useState } from 'react';
import { Button, Typography } from "@mui/material";
import { Facebook } from '@mui/icons-material';
import styled from 'styled-components';
import { BreadCrumbs, FlexBox } from 'lib/ui-ux';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import { useNotifications } from 'lib';

// Define Facebook SDK types for TypeScript
declare global {
    interface Window {
        FB: any;
        fbAsyncInit: () => void;
    }
}

interface FacebookResponse {
    name: string;
    email: string;
    picture: Picture;
    id: string;
    userID: string;
    expiresIn: number;
    accessToken: string;
    signedRequest: string;
    graphDomain: string;
    data_access_expiration_time: number;
    status?: string
}

export interface Picture {
    data: Data;
}

export interface Data {
    height: number;
    is_silhouette: boolean;
    url: string;
    width: number;
}

const Conatainer = styled.div`
    overflow: auto;
    height: 100%;
    padding: 20px;
`;

const StyledButton = styled(Button)`
    &&{
        background: ${({ theme }) => theme.channelSpecific.facebook};
        &:hover {
            background: ${({ theme }) => theme.channelSpecific.facebook} !important;
        }
    }
`;

const StyledContainer = styled(FlexBox)`
    width: fit-content;
    background: ${({ theme }) => theme.pallete.grayVariant5};
    padding: 18px;
    border-radius: 6px;
`;

// const hardcodedData = {
//     "name": "Nav Inten",
//     "email": "intentnavigator@gmail.com",
//     "picture": {
//         "data": {
//             "height": 50,
//             "is_silhouette": false,
//             "url": "https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=122150474858080493&height=50&width=50&ext=1714277683&hash=AfrO1CJ6vTHOWtr9hGC96vhbvsPsYQPF0Pr1W1GFxlz8bg",
//             "width": 50
//         }
//     },
//     "id": "122150474858080493",
//     "accessToken": "EAAwpasSJqQgBOZCqlAaXJZBqtW0HO96ZBzU5mNQk2VNAs3fzU9wMsCejyaNriL0IVuHZCP3mB0cEmIn9ThPK3ZA1ML7kahjDJwstQZBzai6MZBQ9TWlDkQ1olnOAdjn7YnXWGMwdY9PihRpAFevNj5nZATzPpWgmZA0Tqw6fRpeDCaZBQVval7F6xDUPxWMHfYKWyxEAZDZD",
//     "userID": "122150474858080493",
//     "expiresIn": 5135983,
//     "signedRequest": "fh4j-CCss6GaOQesVXz4u7u3ecvpxFQKC9BJqYqhyWQ.eyJ1c2VyX2lkIjoiMTIyMTUwNDc0ODU4MDgwNDkzIiwiY29kZSI6IkFRQWh5YVh4OUlGN25mQmFPczY1cGthMFp4TEs4Mkt3SjRibUFOaVh0eGJZN29LTkRhSVpLanhnbWZDNVdOSnM2ZGYtNEtuUDJBSmtlYm5yS2E4aXpuZ0FpOVpKYkZKT0JwQXdMVnV2NEZFbzJUUXBKVHJRMTJtU3FMVzJaaFAtNnJaRHBSbXJMdmhURkZLbTg1X0FCWkNoMzFpWTBIR1Y2OXNFWUZsaWZpRVk5TVZNVlg3MHJRZzZBRnZ3WEk5T3lxT0hUR3E4TDVzSHJPQmxjSE1aTkUtNWI1NjFURmNzRkdpaExLOHBzczJKcW9fNjZ5WjFULThRc2h6RlkxWkZWN2pLR0FEV2lDTUJoVllCazBJTm96X2Y5ZUQwT1ZZeXdsSzlzcEplLWtlUEExQVlxc3JySzdJcVN4Ulo3Mm92eUdVIiwib2F1dGhfdG9rZW4iOiJFQUF3cGFzU0pxUWdCT1pDcWxBYVhKWkJxdFcwSE85NlpCelU1bU5RazJWTkFzM2Z6VTl3TXNDZWp5YU5yaUwwSVZ1SFpDUDNtQjBjRW1JbjlUaFBLM1pBMU1MN2thaGpESndzdFFaQnphaTZNWkJROVRXbERrUTFvbG5PQWRqbjdZblhXR013ZFk5UGloUnBBRmV2Tmo1blpBVHpQcFdnbVpBMFRxdzZmUnBlRENhWkJRVnZhbDdGNnhEVVB4V01IZllLV3l4RUFaRFpEIiwiYWxnb3JpdGhtIjoiSE1BQy1TSEEyNTYiLCJpc3N1ZWRfYXQiOjE3MTE2ODU2ODN9",
//     "graphDomain": "facebook",
//     "data_access_expiration_time": 1719415572
// }

export default function FacebookConfigurations() {
    const [facebookResponse, setFacebookResponse] = useState<null | FacebookResponse>(null);
    const { showNotification } = useNotifications();

    useEffect(() => {
        // Initialize the Facebook SDK
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: '386521997887994', // Replace with your Facebook App ID
                cookie: true,
                xfbml: true,
                version: 'v21.0', // Use the latest version
            });
            window.FB.AppEvents.logPageView();
        };

        // Load the Facebook SDK script dynamically
        (function (d, s, id) {
            const fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            const js: any = d.createElement(s);
            js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk.js';
            fjs?.parentNode?.insertBefore(js, fjs);
        })(document, 'script', 'facebook-jssdk');
    }, []);

    // Facebook login handler
    const handleFBLogin = () => {
        window.FB.login((response: any) => {
            if (response.authResponse) {
                console.log('Logged in!', response);

                // Fetch user details like name and email
                window.FB.api('/me', { fields: 'name, email' }, (userInfo: any) => {
                    console.log('User info:', userInfo);
                });
            } else {
                console.log('User cancelled login or did not fully authorize.');
            }
        }, {
            response_type: 'code',
            override_default_response_type: true,
            redirect_uri: 'https://haanum.getgro.io/configurations/facebook'
        }); // Request email permission
    };

    const onCopy = () => {
        navigator.clipboard.writeText(JSON.stringify(facebookResponse!, null, 2))
            .then(() => showNotification({ message: 'Copied to clipboard', type: 'success' }))
            .catch(() => showNotification({ message: 'Failed to copy', type: 'error' }));
    }

    return (
        <>
            <BreadCrumbs />
            <Conatainer>

                {facebookResponse === null
                    ?
                    <FlexBox gap={'20px'} alignItems='center' style={{ background: '#F1F2F4', borderRadius: '4px' }}>
                        <Facebook style={{ fontSize: 260 }} />
                        <FlexBox flexDirection='column'>
                            <Typography variant='h3'>Engage your customers, directly on facebook</Typography>
                            <Typography mb='20px' variant='body3'>Associate a facebook page with customer support and respond to customer comments and wall posts directly from getgro</Typography>
                            <StyledButton startIcon={<Facebook />} sx={{ width: '300px' }} variant='contained' onClick={handleFBLogin}>
                                Login with facebook
                            </StyledButton>
                        </FlexBox>
                    </FlexBox>
                    :
                    <FlexBox flexDirection='column' gap="10px">
                        <img src={facebookResponse.picture.data.url} height={facebookResponse.picture.data.height} width={facebookResponse.picture.data.width} />
                        <StyledContainer flexDirection='column' gap="8px">
                            <Typography variant='h5' textAlign="center" color="green">Connected to facebook</Typography>
                            <FlexBox gap="8px" alignItems='center'>
                                <Typography variant='h6'>Name: </Typography>
                                <Typography variant='body2'>{facebookResponse.name}</Typography>
                            </FlexBox>
                            <FlexBox gap="8px" alignItems='center'>
                                <Typography variant='h6'>Email: </Typography>
                                <Typography variant='body2'>{facebookResponse.email}</Typography>
                            </FlexBox>
                            <FlexBox gap="8px" alignItems='center'>
                                <Typography variant='h6'>UserId: </Typography>
                                <Typography variant='body2'>{facebookResponse.userID}</Typography>
                            </FlexBox>
                        </StyledContainer>
                        <FlexBox gap="10px">
                            <Button variant='contained' sx={{ width: 'fit-content' }} onClick={() => setFacebookResponse(null)}>Logout</Button>
                            <Button
                                variant='outlined'
                                sx={{ width: 'fit-content' }}
                                startIcon={<AssignmentOutlinedIcon />}
                                onClick={onCopy}>
                                Copy metadata to clipboard
                            </Button >
                        </FlexBox>
                    </FlexBox>}
            </Conatainer>
        </>
    )
}

/* eslint-enable */
