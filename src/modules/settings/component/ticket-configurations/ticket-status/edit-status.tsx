import { useState, useCallback } from "react"
import { Edit } from "@mui/icons-material"
import { CustomIconButton, DrawerExtended } from "lib/ui-ux"
import { IGenericResponse } from "modules/settings/apis/templates/types"
import { EditTicketStatusContainer } from "modules/settings/containers/ticket-status"
import { useTranslation } from "react-i18next"

interface EditStatusProps {
    statusData: IGenericResponse[];
    selectedData: IGenericResponse;
}

export const EditStatus = (props: EditStatusProps) => {
    const { statusData, selectedData } = props;
    const [showDrawer, setShowDrawer] = useState(false)
    const { t } = useTranslation();

    const toggleDrawer = useCallback(() => {
        setShowDrawer((preValue) => !preValue);
    }, []);

    return (
        <>
            <CustomIconButton iconComponent={<Edit />} tooltipProps={{ title: "Edit Status", arrow: true }} onClick={toggleDrawer}/>
            <DrawerExtended
                open={showDrawer}
                anchor="right"
                width="500px"
                header={t('modules.configurations.configurationOptions.tickets.ticketStatus.editLabel')}
                onRenderContent={() => (
                    <EditTicketStatusContainer onSelectRowMetaData={selectedData} toggleDrawer={toggleDrawer} statusData={statusData} />
                )}
                onClose={toggleDrawer}
            />
        </>
    )
}