import { CenteredCircularProgress } from "lib/ui-ux";
import { IAddExophoneNumber, useAddExophoneNumber, useFetchExophoneNumbers, useFetchExotelConfiguration } from "modules/settings/apis/marketplace/exotel";
import { useFetchAllUsers } from "modules/settings/apis/users-and-permissions";
import { AddExophoneNumberFormBase } from "modules/settings/component/apps/marketplace/exotel-configuration/manage-exotel-numbers";

interface IEmployeeList {
    key: string;
    value: string;
}

export interface IAddExophoneNumberFormFields {
    appName: string;
    friendlyName: string;
    phoneNumber: string;
    sid: string;
    users: IEmployeeList[];
    webHookUrl?: string;
}

export const AddExophoneNumberContainer = (props: { togglePopup: () => void }) => {
    const { mutateAsync, isLoading: isMutationLoading } = useAddExophoneNumber();
    const { data: exophoneNumData, isLoading: isExophoneNumDataLoading } = useFetchExophoneNumbers();
    const { data: allUsersData, isLoading: isAllUsersDataLoading } = useFetchAllUsers("all");
    const { data, isLoading } = useFetchExotelConfiguration()

    const onSubmit = (payload: IAddExophoneNumber) => {
        return mutateAsync(payload)
    };

    if (isExophoneNumDataLoading || isAllUsersDataLoading || isLoading) {
        return <CenteredCircularProgress />
    }

    if (exophoneNumData && allUsersData && data) {
        return (
            <AddExophoneNumberFormBase
                onSubmit={onSubmit}
                togglePopup={props.togglePopup}
                exotelConfigDetails={data}
                isMutationLoading={isMutationLoading}
                allUsersData={allUsersData}
                exophoneNumData={exophoneNumData.exophones}
            />
        )
    }
}