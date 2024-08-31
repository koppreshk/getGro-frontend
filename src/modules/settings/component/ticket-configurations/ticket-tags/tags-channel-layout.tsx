import { ArrowBack } from '@mui/icons-material';
import { Button, Typography } from "@mui/material";
import { FlexBox, CustomIconButton, BreadCrumbs, MoreInformation } from 'lib/ui-ux';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreateTag } from './create-tag';
import { ITagsListProps, TagsList } from './tags-list';

export const TagsLayout = (props: ITagsListProps) => {
    const navigate = useNavigate();
    const [showDialog, setShowDialogBox] = useState(false);

    const toggleCreateTagDialog = () => setShowDialogBox((prev) => !prev);

    return (
        <FlexBox flexDirection='column' gap={'20px'} padding='10px 20px' height='100%'>
            <BreadCrumbs />
            <MoreInformation information='Tags are labels that you can assign to tickets. They help with categorizing, filtering, and automating processes.' />
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
            <TagsList {...props} />
            <CreateTag handleClose={toggleCreateTagDialog} open={showDialog} createdTags={props.data} />
        </FlexBox>
    );
}
