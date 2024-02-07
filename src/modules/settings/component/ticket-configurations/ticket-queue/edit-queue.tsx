import React, { useCallback } from "react";
import { Edit } from "@mui/icons-material"
import { Queue } from "modules/settings/apis/queues"
import { EditQueueContainer } from "modules/settings/containers";
import { CustomIconButton, DrawerExtended } from "lib/ui-ux";

export const EditQueue = (props: { queueMetadata: Queue }) => {
    const { queueMetadata } = props;
    const [openAddQueueDrawer, setOpenAddQueueDrawer] = React.useState(false);

    const toggleAddQueueDrawer = useCallback(() => {
        setOpenAddQueueDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <CustomIconButton onClick={toggleAddQueueDrawer} iconComponent={<Edit />} tooltipProps={{ title: "Edit Queue", arrow: true }} />
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