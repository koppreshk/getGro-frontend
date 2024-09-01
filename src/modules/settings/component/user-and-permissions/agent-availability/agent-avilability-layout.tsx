import { useNavigate } from "react-router-dom";
import { ArrowBack } from "@mui/icons-material";
import { Typography } from "@mui/material"
import { BreadCrumbs, CustomIconButton, FlexBox, MoreInformation } from "lib/ui-ux"
import { AgentAvailabilityStatusesContainer } from "modules/settings/containers/agent-availability";

// const AddNewStatus = (props: {
//     openAddStatusDrawer: boolean;
//     toggleAddStatusDrawer: () => void
// }) => {
//     const { openAddStatusDrawer, toggleAddStatusDrawer } = props;
//     return (
//         <DrawerExtended
//             width="500px"
//             header="Add New Status"
//             anchor="right"
//             open={openAddStatusDrawer}
//             onRenderContent={() => (
//                 <CreateNewStatusContainer toggleAddStatusDrawer={toggleAddStatusDrawer} />
//             )}
//             onClose={toggleAddStatusDrawer} />
//     )
// }

export default function AgentAvailabilityLayout() {
    // const [openAddStatusDrawer, setOpenAddStatusDrawer] = React.useState(false);
    const navigate = useNavigate();

    // const toggleAddStatusDrawer = useCallback(() => {
    //     setOpenAddStatusDrawer((prevValue) => !prevValue);
    // }, []);

    return (
        <FlexBox width="100%" height="100%" flexDirection="column" padding="20px" gap={'20px'}>
            <BreadCrumbs />
            <MoreInformation information="Agent availability statuses reflect the current readiness and capability of an agent to handle specific tasks or responsibilities." />
            <FlexBox width="100%" justifyContent="space-between" padding="10px" alignItems="center">
                <FlexBox alignItems="center" gap="10px">
                    <CustomIconButton onClick={() => { navigate('/configurations') }} iconComponent={<ArrowBack />} tooltipProps={{ title: 'Back' }} />
                    <Typography variant="h5">Agent Availability Statuses</Typography>
                </FlexBox>
                {/* <Button variant="contained" onClick={toggleAddStatusDrawer} startIcon={<AddCircleOutline />}>Add Status</Button> */}
                {/* <AddNewStatus openAddStatusDrawer={openAddStatusDrawer} toggleAddStatusDrawer={toggleAddStatusDrawer} /> */}
            </FlexBox>
            <AgentAvailabilityStatusesContainer />
        </FlexBox>
    )
}