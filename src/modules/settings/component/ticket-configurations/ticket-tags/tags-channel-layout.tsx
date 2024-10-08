import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trans, useTranslation } from 'react-i18next';
import { ArrowBack } from '@mui/icons-material';
import { Button, Typography } from "@mui/material";
import { FlexBox, CustomIconButton, BreadCrumbs, MoreInformation } from 'lib/ui-ux';
import { CreateTag } from './create-tag';
import { ITagsListProps, TagsList } from './tags-list';

export const TagsLayout = (props: ITagsListProps) => {
    const navigate = useNavigate();
    const [showDialog, setShowDialogBox] = useState(false);

    const toggleCreateTagDialog = () => setShowDialogBox((prev) => !prev);
    const { t } = useTranslation();

    return (
        <FlexBox flexDirection='column' gap={'20px'} padding='10px 20px' height='100%'>
            <BreadCrumbs />
            <MoreInformation information={t('tags_long_description')} />
            <FlexBox justifyContent='space-between' width='100%' alignItems="center">
                <FlexBox alignItems='center' gap="10px">
                    <CustomIconButton onClick={() => navigate('/configurations')} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5"><Trans i18nKey='tags' /></Typography>
                </FlexBox>
                <Button
                    variant="contained"
                    onClick={toggleCreateTagDialog}
                ><Trans i18nKey='create_tags' /></Button>
            </FlexBox>
            <TagsList {...props} />
            <CreateTag handleClose={toggleCreateTagDialog} open={showDialog} createdTags={props.data} />
        </FlexBox>
    );
}
