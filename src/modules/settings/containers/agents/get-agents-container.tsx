import { ErrorMessage } from "lib/ui-ux";
import { UserType, useFetchAllUsers } from "modules/settings/apis/users-and-permissions";
import { UserList } from "modules/settings/component/user-and-permissions/agents/user-list"

export const GetAgentsContainer = (props: { type: UserType }) => {
    const { data, isLoading, error, isFetching } = useFetchAllUsers(props.type);

    if (data || isLoading) {
        return <UserList usersData={data} isLoading={isLoading || isFetching} />
    }

    return (
        <>
            <ErrorMessage statusCode={error?.message} />
        </>
    )
}