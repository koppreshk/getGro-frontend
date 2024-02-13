import { Edit } from '@mui/icons-material';
import { CustomIconButton, DrawerExtended } from 'lib/ui-ux';
import { EscalationConditions } from 'modules/settings/apis/escalations';
import { EditEscalationContainer } from 'modules/settings/containers';
import React, { useCallback } from 'react';

function EditEscalation(props: { escalaltionMetadata: EscalationConditions }) {
    const [openAddEscalationDrawer, setOpenAddEscalationDrawer] = React.useState(false);

    const toggleAddEscalationDrawer = useCallback(() => {
        setOpenAddEscalationDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <>
            <CustomIconButton onClick={toggleAddEscalationDrawer} iconComponent={<Edit />} tooltipProps={{ title: "Edit Escalation", arrow: true }} />
            <DrawerExtended
                anchor="right"
                width="500px"
                open={openAddEscalationDrawer}
                header="Edit Escalation"
                onRenderContent={() => (
                    <EditEscalationContainer
                        toggleAddEscalationDrawer={toggleAddEscalationDrawer}
                        escalationMetadata={props.escalaltionMetadata} />
                )}
                onClose={toggleAddEscalationDrawer} />
        </>
    );
}

export default EditEscalation;