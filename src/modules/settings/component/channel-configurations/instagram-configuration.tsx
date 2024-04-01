import styled from "styled-components";
import { InstagramLogin } from '@amraneze/react-instagram-login';
import { Instagram } from "@mui/icons-material";

const Container = styled.div`
    overflow: auto;
    height: 100%;
    padding: 20px;
`;

export const InstagramConfiguration = () => {
    const responseInstagram = (response: any) => {
        console.log(response);
    };

    return (
        <Container>
            <InstagramLogin
                clientId="1069893294032723"
                buttonText="Login with Instagram"
                onSuccess={responseInstagram}
                onFailure={responseInstagram}
            >
                <Instagram />
                <span> Login with Instagram</span>
            </InstagramLogin>
        </Container>
    );
}