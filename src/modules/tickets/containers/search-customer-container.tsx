import { useGetCustomerDetails } from "../apis/get-customer-details"
import { useForm, FormProvider } from "react-hook-form";
import { SearchCustomerFlyout } from "../components/ticket-details";
import React, { useState } from "react";

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
        }
    });

    const [formObject, setFormObject] = useState({ email: '', phone: '' })
    // const [customerData, setCustomerData] = useState(null);
    // const [isLoading, setIsLoading] = useState(false);
    console.log('formObject', formObject);
    const { onSearchUserBtnClick, showSearchUserFlyout } = props;
    const { refetch } = useGetCustomerDetails(formObject);

    const onformSubmit = React.useCallback(async () => {
        const getformvalues = methods.getValues();
        setFormObject({ email: getformvalues.email, phone: getformvalues.phoneNumber })
        try {
            // setIsLoading(true);
            const { data } = await refetch();
            // setCustomerData(data);
            console.log('Customer data', data);
        } catch (error) {
            // Handle errors if necessary
        } finally {
            // setIsLoading(false);
        }
    }, [methods, refetch])

    return (
        <FormProvider {...methods}>
            <SearchCustomerFlyout
                showSearchUserFlyout={showSearchUserFlyout}
                onSearchUserBtnClick={onSearchUserBtnClick}
                onformSubmit={onformSubmit} />
        </FormProvider>
    )

}