import { CenteredCircularProgress } from "lib/ui-ux";
import { useAddExophoneNumber, useFetchExophoneNumbers } from "modules/settings/apis/marketplace/exotel";
import { useFetchAllUsers } from "modules/settings/apis/users-and-permissions";
import { AddExophoneNumberFormBase } from "modules/settings/component/apps/marketplace/exotel-configuration/manage-exotel-numbers";
import { setExotelNumberWebhookUrl } from "modules/settings/storage";
import { useDispatch } from "react-redux";

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
    const dispatch = useDispatch();

    const onSubmit = (formFields: IAddExophoneNumberFormFields) => {
        mutateAsync({
            app_name: formFields.appName,
            friendly_name: formFields.friendlyName,
            phone_number: formFields.phoneNumber,
            sid: formFields.sid,
            users: formFields.users.map((x) => Number(x.key))
        })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                dispatch(setExotelNumberWebhookUrl(res.create_pop_url));
            })
    };

    if (isExophoneNumDataLoading && isAllUsersDataLoading) {
        return <CenteredCircularProgress />
    }

    console.log('exophoneNumData', exophoneNumData);
    console.log('allUsersData', allUsersData);

    if (exophoneNumData && allUsersData) {

        return (
            <AddExophoneNumberFormBase
                onSubmit={onSubmit}
                isMutationLoading={isMutationLoading}
                togglePopup={props.togglePopup}
                allUsersData={allUsersData}
                exophoneNumData={exophoneNumData.exophones}
            />
        )
    }
}