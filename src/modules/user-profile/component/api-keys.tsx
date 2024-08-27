import { Button, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux"

export const GenerateAPIKeys = () => {
    return (
        <FlexBox flexDirection="column" gap="20px">
            <Typography>
                API keys can be used to create, read, update and delete your data in GetGro.
                Generate a API key using the Create API KEY button and see the,API Docs to get started,
                You should treat API keys as securely as any other password.
            </Typography>
            <FlexBox>

                <Button variant="contained">Create API Key</Button>
            </FlexBox>
        </FlexBox>
    )
}