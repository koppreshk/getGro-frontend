import { AddAgentForm } from "modules/settings/component/user-and-permissions";

export const CreateNewAgentContainer = (props: { toggleAddUserDrawer: () => void }) => {
    const { toggleAddUserDrawer } = props;

    const onFormSubmitHandler = () => {
        toggleAddUserDrawer()
    }

    return (
        <>
            <AddAgentForm mode="create" onFormSubmitHandler={onFormSubmitHandler} toggleUserDrawer={toggleAddUserDrawer} />
        </>
    )
}