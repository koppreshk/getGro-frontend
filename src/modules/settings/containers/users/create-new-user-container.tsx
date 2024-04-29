import { AddUserForm } from "modules/settings/component/general"

export const CreateNewUserContainer = (props: { toggleAddUserDrawer: () => void }) => {
    const { toggleAddUserDrawer } = props;

    const onFormSubmitHandler = () => {
        toggleAddUserDrawer()
    }

    return (
        <>
            <AddUserForm mode="create" onFormSubmitHandler={onFormSubmitHandler} />
        </>
    )
}