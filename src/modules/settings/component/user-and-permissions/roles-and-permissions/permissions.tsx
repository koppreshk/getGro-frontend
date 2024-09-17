import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material"
import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import { useState } from "react";
import { Modules } from "./modules";
import { PermissionList } from "./permission-list";
import { useFormContext } from "react-hook-form";
import { ICreateRoleFormFields } from "./create-role";
import { AllPermissionKeys, ConfigurationPermissionKeys, ModuleKeys, TicketPermissionKeys } from "lib/enums";

interface IPermissionList {
    associatedModule: keyof typeof ModuleKeys;
    permissions: {
        name: string;
        permissionKey: AllPermissionKeys;
        disabled?: boolean;
    }[];
}

const modules = [{
    moduleName: 'Tickets',
    moduleKey: ModuleKeys.TICKETS,
    hideModule: true
}, {
    moduleName: 'Configurations',
    moduleKey: ModuleKeys.CONFIGURATIONS
}, {
    moduleName: 'Dashboards',
    moduleKey: ModuleKeys.DASHBOARDS
}];


const permissionList = [{
    associatedModule: 'TICKETS',
    permissions: [{
        name: 'Add Ticket',
        permissionKey: TicketPermissionKeys.ADD_TICKET
    },
    {
        name: 'Reply Ticket',
        permissionKey: TicketPermissionKeys.REPLY_TICKET
    },
    {
        name: 'Edit Priority',
        permissionKey: TicketPermissionKeys.EDIT_PRIORITY
    },
    {
        name: 'Edit Assignee',
        permissionKey: TicketPermissionKeys.EDIT_ASSIGNEE
    },
    {
        name: 'Edit Status',
        permissionKey: TicketPermissionKeys.EDIT_STATUS
    },
    {
        name: 'Edit Tags',
        permissionKey: TicketPermissionKeys.EDIT_TAGS
    },
    {
        name: 'Split Ticket',
        permissionKey: TicketPermissionKeys.SPLIT_TICKET
    },
    {
        name: 'Merge Ticket',
        permissionKey: TicketPermissionKeys.MERGE_TICKET
    },
    {
        name: 'Manage Notes',
        permissionKey: TicketPermissionKeys.MANAGE_NOTES
    }]
},
{
    associatedModule: 'CONFIGURATIONS',
    permissions: [{
        name: 'Manage Ticket Status',
        permissionKey: ConfigurationPermissionKeys.MANAGE_TICKET_STATUS
    },
    {
        name: 'Manage Tags',
        permissionKey: ConfigurationPermissionKeys.MANAGE_TAGS
    },
    {
        name: 'Manage Email',
        permissionKey: ConfigurationPermissionKeys.MANAGE_EMAIL
    },
    {
        name: 'Manage Ticket Escalation',
        permissionKey: ConfigurationPermissionKeys.MANAGE_TICKET_ESCALATION
    },
    {
        name: 'Manage Auto assignments',
        permissionKey: ConfigurationPermissionKeys.MANAGE_AUTO_ASSIGNMENTS
    },
    {
        name: 'Manage Create Ticket Triggers',
        permissionKey: ConfigurationPermissionKeys.MANAGE_CREATE_TICKET_TRIGGERS
    },
    {
        name: 'Manage Update Ticket Triggers',
        permissionKey: ConfigurationPermissionKeys.MANAGE_UPDATE_TICKET_TRIGGERS
    },
    {
        name: 'Manage Agents',
        permissionKey: ConfigurationPermissionKeys.MANAGE_AGENTS
    },
    {
        name: 'Manage Queues',
        permissionKey: ConfigurationPermissionKeys.MANAGE_QUEUES
    },
    {
        name: 'Manage Roles And Permissions',
        permissionKey: ConfigurationPermissionKeys.MANAGE_ROLES_PERMISSIONS
    },
    {
        name: 'Manage Agent Availability Statuses',
        permissionKey: ConfigurationPermissionKeys.MANAGE_AGENT_AVAILABILITY_STATUSES
    },
    {
        name: 'Manage Audit Logs',
        permissionKey: ConfigurationPermissionKeys.MANAGE_AUDIT_LOGS
    },
    {
        name: 'Manage MarketPlace',
        permissionKey: ConfigurationPermissionKeys.MANAGE_MARKETPLACE
    }]
},
{
    associatedModule: 'DASHBOARDS',
    permissions: []
}] as IPermissionList[]

export const Permissions = () => {
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState(ModuleKeys.TICKETS);
    const { watch } = useFormContext<ICreateRoleFormFields>();

    const onModuleChange = (value: ModuleKeys) => {
        setSelectedModule(value);
    }

    const associatedPermissions = permissionList.find((item) => item.associatedModule === selectedModule)!;
    const modifiedPermissions = watch(`modules.${associatedPermissions.associatedModule}`) ? associatedPermissions.permissions : associatedPermissions.permissions.map((item) => ({ ...item, disabled: true }))

    return (
        <FlexBox flexDirection="column" height="calc(100% - 134px)">
            <Typography variant="h4">Permissions</Typography>
            <FlexBox height="calc(100% - 102px)">
                <FlexBox flexDirection="column" width="300px" padding="20px" gap={'15px'}>
                    <Typography variant="h6">Modules</Typography>
                    <FlexBox flexDirection="column" >
                        {modules.map((item) => (
                            <Modules
                                {...item}
                                key={item.moduleKey}
                                isSelected={item.moduleKey === selectedModule}
                                onModuleChange={onModuleChange} />))}
                    </FlexBox>
                </FlexBox>
                <VerticalSeparator height="calc(100% - 40px)" $margin="20px 10px" />
                <FlexBox flexDirection="column" padding="20px" gap={'15px'}>
                    <Typography variant="h6">Permissions</Typography>
                    <FlexBox flexDirection="column" flexWrap="wrap" height="calc(100% - 43px)" style={{ columnGap: '35px' }}>
                        {modifiedPermissions.map((item) => <PermissionList {...item} key={item.permissionKey} />)}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
            <FlexBox width="60%" justifyContent="flex-start" gap={'20px'}>
                <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                <Button variant="contained">Submit</Button>
            </FlexBox>
        </FlexBox>
    )
}
