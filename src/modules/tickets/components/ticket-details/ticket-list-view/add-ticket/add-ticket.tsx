import { DrawerExtended } from "lib/ui-ux";
import { AddTicketContainer } from "modules/tickets/containers";
import { FormProvider, useForm } from "react-hook-form";

interface IAddTicketProps {
    openAddTicketDrawer: boolean;
    toggleAddTicketDrawer: () => void;
}

export interface IAddTIcketFormFields {
    requesterEmail: string;
    subject: string;
    priority: string,
    template: string;
    queueId: string;
    employeeId: string;
    tags: string[],
}

export const AddTicket = (props: IAddTicketProps) => {
    const { openAddTicketDrawer, toggleAddTicketDrawer } = props;
    const formMethods = useForm<IAddTIcketFormFields>({
        defaultValues: {
            priority: '1',
            requesterEmail: '',
            subject: '',
            template: '',
            employeeId: '',
            queueId: '',
            tags: []
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