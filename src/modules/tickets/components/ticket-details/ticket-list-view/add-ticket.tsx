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
    tag: { key: string, value: string }[],
}

export const AddTicket = (props: IAddTicketProps) => {
    const { openAddTicketDrawer, toggleAddTicketDrawer } = props;
    const formMethods = useForm<IAddTIcketFormFields>({
        defaultValues: {
            priority: 'low',
            title: ''
        }
    });

    return (
        <DrawerExtended
            anchor="right"
            header={"Add Ticket"}
            open={openAddTicketDrawer}
            onRenderContent={() => (
                <FormProvider {...formMethods}>
                    <AddTicketContainer />
                </FormProvider>
            )}
            onClose={toggleAddTicketDrawer} />
    )
}