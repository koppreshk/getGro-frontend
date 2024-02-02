import React, { useCallback } from "react";
import { Edit } from "@mui/icons-material"
import { IconButton, } from "@mui/material"
import { Queue } from "modules/settings/apis"
import { EditQueueContainer } from "modules/settings/containers";
import { DrawerExtended } from "lib/ui-ux";

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
            <DrawerExtended
                anchor="right"
                width="500px"
                open={openAddQueueDrawer}
                header="Edit Queue"
                onRenderContent={() => (
                    <EditQueueContainer
                        toggleAddQueueDrawer={toggleAddQueueDrawer}
                        queueMetadata={queueMetadata} />
                )}
                onClose={toggleAddQueueDrawer} />
        </>
    )
}