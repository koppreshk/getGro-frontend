import { DrawerExtended } from "lib/ui-ux";
import { AddTicketContainer } from "modules/tickets/containers";
import { FormProvider, useForm } from "react-hook-form";

interface IAddTicketProps {
    openAddTicketDrawer: boolean;
    toggleAddTicketDrawer: () => void;
}

export interface IAddTIcketFormFields {
    title: string;
    priority: string;
    channel: string,
    queueId: string;
    remarks: string;
    employeeId: string;
    tag: { key: string, value: string }[],
}

export const AddTicket = (props: IAddTicketProps) => {
    const { openAddTicketDrawer, toggleAddTicketDrawer } = props;
    const formMethods = useForm<IAddTIcketFormFields>({
        defaultValues: {
            priority: '1',
            title: '',
            channel: '1',
            queueId: '',
            tag: []
        }
    });

    return (
        <DrawerExtended
            anchor="right"
            header={"Add Email Ticket"}
            width="800px"
            open={openAddTicketDrawer}
            onRenderContent={() => (
                <FormProvider {...formMethods}>
                    <AddTicketContainer toggleAddTicketDrawer={toggleAddTicketDrawer} />
                </FormProvider>
            )}
            onClose={toggleAddTicketDrawer} />
    )
}