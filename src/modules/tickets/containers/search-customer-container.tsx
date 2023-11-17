import React from "react";
import { useGetCustomerDetails } from "../apis/get-customer-details"
import { useForm, FormProvider } from "react-hook-form";
import { SearchCustomerFlyout } from "../components/ticket-details";

interface ISearchCustomerContainerPRops {
    onSearchUserBtnClick: () => void;
    showSearchUserFlyout: boolean;
}

interface ISearchCustomerInputFormFields {
    customerId: number;
    name: string;
    phoneNumber: string;
    email: string;
    customerCode: string;
    orderId: string;
}

export const SearchCustomerContainer = (props: ISearchCustomerContainerPRops) => {
    const methods = useForm<ISearchCustomerInputFormFields>({
        defaultValues: {
            email: '',
            phoneNumber: ''
        },
        mode: 'onBlur'
    });

    const { onSearchUserBtnClick, showSearchUserFlyout } = props;
    const [getCustomerDetails, { data, isLoading }] = useGetCustomerDetails();

    const onformSubmit = React.useCallback(async () => {
        const getformvalues = methods.getValues();
        getCustomerDetails({ email: getformvalues.email, phone: getformvalues.phoneNumber })
    }, [getCustomerDetails, methods])

    return (
        <FormProvider {...methods}>
            <SearchCustomerFlyout
                showSearchUserFlyout={showSearchUserFlyout}
                onSearchUserBtnClick={onSearchUserBtnClick}
                onformSubmit={onformSubmit}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                isLoading={isLoading} data={data as any}
            />
        </FormProvider>
    )

}