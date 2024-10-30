import { Instagram } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { BreadCrumbs, FlexBox } from "lib/ui-ux";
import styled from "styled-components";

const StyledButton = styled(Button)`
    &&{
        background: ${({ theme }) => theme.channelSpecific.instagram};
        &:hover {
            background: ${({ theme }) => theme.channelSpecific.instagram} !important;
        }
    }
`;

const Conatainer = styled.div`
    overflow: auto;
    height: 100%;
    padding: 20px;
`;

export default function InstagramConfigurations() {

    const handleonClick = () => {
        window.open(`https://www.instagram.com/oauth/authorize?enable_fb_login=0&force_authentication=1&client_id=558293376682732&redirect_uri=https://haanum.getgro.io/configurations/instagram&response_type=code&scope=instagram_business_basic%2Cinstagram_business_manage_messages%2Cinstagram_business_manage_comments%2Cinstagram_business_content_publish`)
    }

    return (
        <>
            <BreadCrumbs />
            <Conatainer>
                <FlexBox gap={'20px'} alignItems='center' style={{ background: '#F1F2F4', borderRadius: '4px' }}>
                    <Instagram style={{ fontSize: 260 }} />
                    <FlexBox flexDirection='column'>
                        <Typography variant='h3'>Engage your customers, directly on Instagram</Typography>
                        <Typography mb='20px' variant='body3'>Associate a Instagram page with customer support and respond to customer comments and wall posts directly from getgro</Typography>
                        <StyledButton startIcon={<Instagram />} sx={{ width: '300px' }} variant='contained' onClick={handleonClick}>
                            Login with Instagram
                        </StyledButton>
                    </FlexBox>
                </FlexBox>
            </Conatainer>
        </>
    )

}