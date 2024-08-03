import { ErrorMessage } from "lib/ui-ux";
import { useFetchAllUsers } from "modules/settings/apis/users-and-permissions";
import { UserList } from "modules/settings/component/user-and-permissions/agents/user-list"

export const GetAgentsContainer = () => {
    const { data, isLoading, error } = useFetchAllUsers();

    if (data || isLoading) {
        return <UserList usersData={data} isLoading={isLoading} />
    }

    return (
        <>
            <ErrorMessage statusCode={error?.message} />
        </>
    )
}