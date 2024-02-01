import React, { useCallback } from "react";
import { Close, Edit } from "@mui/icons-material"
import { Drawer, IconButton, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { Queue } from "modules/settings/apis"
import { EditQueueContainer } from "modules/settings/containers";
import { HeaderWrapper } from "modules/tickets/components/ticket-details/ticket-list-view";

export const EditQueue = (props: { queueMetadata: Queue }) => {
    const { queueMetadata } = props;
    const [openAddQueueDrawer, setOpenAddQueueDrawer] = React.useState(false);

    const toggleAddQueueDrawer = useCallback(() => {
        setOpenAddQueueDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <IconButton onClick={toggleAddQueueDrawer}>
                <Edit />
            </IconButton>
            <Drawer anchor="right" open={openAddQueueDrawer} onClose={toggleAddQueueDrawer}>
                <FlexBox width="600px" height="100%" flexDirection="column">
                    <HeaderWrapper padding="20px !important" width="100%" justifyContent="space-between" alignItems="center">
                        <Typography variant="h5">Edit Queue</Typography>
                        <IconButton aria-label="Close" onClick={toggleAddQueueDrawer}>
                            <Close />
                        </IconButton>
                    </HeaderWrapper>
                    <EditQueueContainer
                        toggleAddQueueDrawer={toggleAddQueueDrawer}
                        queueMetadata={queueMetadata} />
                </FlexBox>
            </Drawer>
        </>
    )
}