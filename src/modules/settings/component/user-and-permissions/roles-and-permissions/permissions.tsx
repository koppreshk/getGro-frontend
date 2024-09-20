import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material"
import { FlexBox, LoadingButton, VerticalSeparator } from "lib/ui-ux"
import { useState } from "react";
import { Modules } from "./modules";
import { PermissionList } from "./permission-list";
import { useFormContext } from "react-hook-form";
import { ICreateRoleFormFields } from "./create-role";
import { AllPermissionKeys, ConfigurationPermissionKeys, DashboardPermissionKeys, ModuleKeys, TicketPermissionKeys } from "lib/enums";

interface IPermissionList {
    associatedModule: `${ModuleKeys}`;
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
    associatedModule: ModuleKeys.TICKETS,
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
    associatedModule: ModuleKeys.CONFIGURATIONS,
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
    associatedModule: ModuleKeys.DASHBOARDS,
    permissions: [{
        name: 'Support Monitoring',
        permissionKey: DashboardPermissionKeys.SUPPORT_MONITORNG
    }, {
        name: 'Agent Performance',
        permissionKey: DashboardPermissionKeys.AGENT_PERFORMANCE
    }, {
        name: 'SLA Dashboard',
        permissionKey: DashboardPermissionKeys.SLA_DASHBOARD
    }]
}] as IPermissionList[]

interface PermissionsProps {
    mutationLoading: boolean;
    onSubmit: (formData: ICreateRoleFormFields) => void;
}

export const Permissions = (props: PermissionsProps) => {
    const { onSubmit } = props;
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState(ModuleKeys.TICKETS);
    const { watch, handleSubmit } = useFormContext<ICreateRoleFormFields>();

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
            <FlexBox justifyContent="flex-end" gap={'20px'}>
                <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                <LoadingButton isLoading={props.mutationLoading} variant="contained" type="submit" onClick={handleSubmit(onSubmit)}>Submit</LoadingButton>
            </FlexBox>
        </FlexBox>
    )
}
