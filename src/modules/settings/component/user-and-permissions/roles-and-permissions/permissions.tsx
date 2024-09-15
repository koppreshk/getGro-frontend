import { Typography } from "@mui/material"
import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import { useState } from "react";

enum PermissionKeys {
    CREATE_TICKET = 'CREATE_TICKET'
}

const modules = [{
    moduleName: 'Tickets',
    moduleKey: 'tickets',
}];

const permissionList = [{
    associatedModule: 'tickets',
    permissions: [{
        name: 'Create ticket',
        key: PermissionKeys.CREATE_TICKET
    }]
}]

export const Permissions = () => {
    const [selectedModule, setSelectedModule] = useState('tickets');

    const onModuleChange = (value: string) => {
        setSelectedModule(value);
    }

    const associatedPermissions = permissionList.find((item) => item.associatedModule === selectedModule)!;

    return (
        <FlexBox flexDirection="column" height="100%">
            <Typography variant="h4">Permissions</Typography>
            <FlexBox height="100%">
                <FlexBox flexDirection="column" width="300px" padding="20px" gap={'15px'}>
                    <Typography variant="h6">Modules</Typography>
                    <FlexBox flexDirection="column">
                        {modules.map((item) => <Modules moduleName={item.moduleName} key={item.moduleKey} moduleKey={item.moduleKey} onModuleChange={onModuleChange} />)}
                    </FlexBox>
                </FlexBox>
                <VerticalSeparator height="calc(100% - 40px)" $margin="20px 10px"/>
                <FlexBox flexDirection="column" padding="20px" gap={'15px'}>
                    <Typography variant="h6">Permissions</Typography>
                    <FlexBox flexDirection="column">
                        {associatedPermissions.permissions.map((item) => <PermissionList {...item} key={item.key} />)}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
        </FlexBox>
    )
}

const Modules = (props: { moduleName: string; moduleKey: string, onModuleChange: (value: string) => void }) => {
    const { moduleKey, moduleName, onModuleChange } = props;
    return (
        <FlexBox onClick={() => onModuleChange(moduleKey)}>
            <Typography variant="body2">{moduleName}</Typography>
        </FlexBox>
    )
}

const PermissionList = (props: {
    name: string;
    key: string;
}) => {
    const { name } = props;
    return (
        <FlexBox>
            <Typography variant="body2">{name}</Typography>
        </FlexBox>
    )
}