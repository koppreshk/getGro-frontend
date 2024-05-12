import { AddNewStatusForm } from "modules/settings/component/general/agent-availability/add-new status-form";

export const CreateNewStatusContainer = (props: { toggleAddStatusDrawer: () => void }) => {
    const { toggleAddStatusDrawer } = props;

    const onFormSubmitHandler = () => {
        toggleAddStatusDrawer()
    }

    return (
        <>
            <AddNewStatusForm mode="create" onFormSubmitHandler={onFormSubmitHandler} />
        </>
    )
}