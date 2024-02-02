import { Button } from "@mui/material"
import { SelectField, TextboxField } from "lib/form-fields";
import { DrawerExtended, FlexBox, HorizontalSeparator } from "lib/ui-ux";
import { FormProvider, useForm } from "react-hook-form";
import { TicketDisposeFolder } from "../ticket-details-section/dispose-ticket/ticket-dispose-folder";
import { DatePicker } from "@mui/x-date-pickers";
import { useFolderReducer } from "../ticket-details-section/dispose-ticket";

interface IAddTicketProps {
    openAddTicketDrawer: boolean;
    toggleAddTicketDrawer: () => void;
}

interface IAddTIcketFormFields {
    title: string;
    priority: string;
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
                    <AddTicketForm />
                </FormProvider>
            )}
            onClose={toggleAddTicketDrawer} />
    )
}

const queueOptions = [
    { key: 'twitter', value: 'Twitter' },
    { key: 'chat', value: 'Chat' },
    { key: 'support', value: 'Support' },
    { key: 'call', value: 'Call' },
    { key: 'email', value: 'Email' },
    { key: 'whatsapp', value: 'Whatsapp' },
    { key: 'facebook', value: 'Facebook' },
    { key: 'instagram', value: 'Instagram' },
    { key: 'linkedin', value: 'Linkedin' },
    { key: 'pushBackToQueue', value: 'Push Back To Queue' },
];

const assignToOptions = [
    { key: 'ankitTiwari', value: 'Ankit Tiwari' },
    { key: 'ramesh', value: 'Ramesh' },
];

const AddTicketForm = () => {
    const [folderStates, dispatch] = useFolderReducer();

    const parentFolderClick = (name: string) => {
        dispatch({ type: 'parent-folder', payload: { parentFolder: name, childFolder: '' } })
    };

    const childFolderClick = (name: string) => {
        dispatch({ type: 'child-folder', payload: { parentFolder: folderStates.parentFolder, childFolder: name } })
    }

    const onDeleteHandler = () => {
        dispatch({ type: 'clear-folders' })
    };

    return (
        <FlexBox flexDirection="column" width="100%" gap="15px" padding="20px" overflowY="auto">
            <FlexBox width="100%" gap="10px">
                <TextboxField name="title" label="Title" sx={{ width: 'calc(50% - 10px)' }} />
                <SelectField name="priority" label="Priority" sx={{ width: '50%' }} menuOptions={[{ key: 'low', value: 'Low' }, { key: 'medium', value: 'Medium' }, { key: 'high', value: 'High' }]} />
            </FlexBox>
            <TextboxField
                name="remarks" label="Remarks"
                placeholder="Enter your remarks here..."
                multiline
                rows={4}
                maxRows={4}
            />
            <HorizontalSeparator $margin="8px 0px" />
            <TicketDisposeFolder
                parentFolderValue={folderStates.parentFolder}
                childFolderValue={folderStates.childFolder}
                parentFolderClick={parentFolderClick}
                onDeleteHandler={onDeleteHandler}
                childFolderClick={childFolderClick} />
            <HorizontalSeparator $margin="8px 0px" />
            <FlexBox gap="10px">
                <SelectField name="queue" sx={{ width: '50%' }} label="Queue" menuOptions={queueOptions} />
                <SelectField name="assignTo" sx={{ width: '50%' }} label="Assign To" menuOptions={assignToOptions} />
            </FlexBox>
            <DatePicker />
            <Button variant="contained">Submit</Button>
        </FlexBox>
    )
}