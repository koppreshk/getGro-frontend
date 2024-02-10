
import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { createColumnHelper } from "@tanstack/react-table";
import { ConfigDataGrid } from "lib/ui-ux/configuration-data-grid"
import { Add } from "@mui/icons-material"
import { Button, Typography } from "@mui/material"
import { CustomIconButton, DrawerExtended, FlexBox } from "lib/ui-ux"
import { CreateTicketEscalationContainer } from "modules/settings/containers";
import { EscalationConditions } from "modules/settings/apis/escalations";

export interface IUserData {
    firstName: string
    lastName: string
    age: number
    gender: string
    visits: number
    progress: number
}

interface ITicketEscalaltionLayoutProps {
    isLoading: boolean;
    escalationConditions: EscalationConditions[]
}

const useColumns = () => {
    const columnHelper = createColumnHelper<EscalationConditions>();

    const columns = [
        columnHelper.accessor("name", {
            id: 'name',
            cell: info => info.getValue(),
            header: () => 'Name',
        }),
        columnHelper.accessor("condition", {
            id: 'condition',
            cell: info => info.getValue(),
            header: () => 'Condition',
        }),
        columnHelper.accessor("after", {
            id: 'after',
            cell: info => info.getValue(),
            header: () => 'After',
        }),
        columnHelper.accessor("designation_type", {
            id: 'designation_type',
            cell: info => info.getValue(),
            header: () => 'Designation Type',
        }),
        columnHelper.accessor("status", {
            id: 'status',
            cell: info => info.getValue(),
            header: () => 'Status',
        }),
        columnHelper.accessor("type_of_ticket", {
            id: 'type_of_ticket',
            cell: info => info.getValue(),
            header: () => 'Type Of Ticket',
        })
    ]

    return columns;
}


const AddNewEscalation = (props: {
    openAddEscalationDrawer: boolean;
    toggleAddEscalationDrawer: () => void
}) => {
    const { openAddEscalationDrawer, toggleAddEscalationDrawer } = props;
    return (
        <DrawerExtended
            width="500px"
            header="Add New Escalation"
            anchor="right"
            open={openAddEscalationDrawer}
            onRenderContent={() => (
                <CreateTicketEscalationContainer toggleAddEscalationDrawer={toggleAddEscalationDrawer} />
            )}
            onClose={toggleAddEscalationDrawer} />
    )
}

export const TicketEscalationLayout = (props: ITicketEscalaltionLayoutProps) => {
    const { escalationConditions, isLoading } = props;
    const columns = useColumns();
    const [openAddEscalationDrawer, setOpenAddEscalationDrawer] = React.useState(false);
    const navigate = useNavigate();

    const toggleAddEscalationDrawer = useCallback(() => {
        setOpenAddEscalationDrawer((prevValue) => !prevValue)
    }, []);

    return (
        <FlexBox width="100%" flexDirection="column">
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => navigate(-1)} iconComponent={<ArrowBackIcon />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Ticket Escalation</Typography>
                </FlexBox>
                <Button variant="contained" onClick={toggleAddEscalationDrawer} startIcon={<Add />}>Add Escalation</Button>
                <AddNewEscalation openAddEscalationDrawer={openAddEscalationDrawer} toggleAddEscalationDrawer={toggleAddEscalationDrawer} />
            </FlexBox>
            <ConfigDataGrid columns={columns} isLoading={isLoading} data={escalationConditions} />
        </FlexBox>
    )
}