import { Edit } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { Queue } from "modules/settings/apis"
import { EditQueueContainer } from "modules/settings/containers";
import React, { useCallback } from "react";

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
            <EditQueueContainer
                toggleAddQueueDrawer={toggleAddQueueDrawer}
                openAddQueueDrawer={openAddQueueDrawer}
                queueMetadata={queueMetadata} />
        </>
    )
}