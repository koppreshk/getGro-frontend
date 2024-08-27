import { ArrowBack } from '@mui/icons-material';
import { Button, Typography } from "@mui/material";
import { FlexBox, CustomIconButton, BreadCrumbs, MoreInformation } from 'lib/ui-ux';
import { TicketTagsContainer } from 'modules/settings/containers';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateTag } from './create-tag';

export const TagsLayout = () => {
    const navigate = useNavigate();
    const [showDialog, setShowDialogBox] = useState(false);

    const toggleCreateTagDialog = () => setShowDialogBox((prev) => !prev);

    return (
        <FlexBox flexDirection='column' gap={'20px'} height="100%" padding='10px 20px'>
            <BreadCrumbs />
            <MoreInformation information='A tag is used to attach a label to tickets, contacts, or contact groups. Tags can be used for categorization, filtering, or automation' />
            <FlexBox justifyContent='space-between' width='100%' alignItems="center">
                <FlexBox alignItems='center' gap="10px">
                    <CustomIconButton onClick={() => navigate('/configurations')} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Ticket Tags</Typography>
                </FlexBox>
                <Button
                    variant="contained"
                    onClick={toggleCreateTagDialog}
                >Create Tags</Button>
            </FlexBox>
            <TicketTagsContainer />
            <CreateTag handleClose={toggleCreateTagDialog} open={showDialog} />
        </FlexBox>
    );
}
