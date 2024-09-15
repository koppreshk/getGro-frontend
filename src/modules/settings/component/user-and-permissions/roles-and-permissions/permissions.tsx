import { useNavigate } from "react-router-dom";
import { Button, Typography } from "@mui/material"
import { FlexBox, VerticalSeparator } from "lib/ui-ux"
import { useState } from "react";
import { Modules } from "./modules";
import { PermissionList } from "./permission-list";

enum PermissionKeys {
    CREATE_TICKET = 'CREATE_TICKET',
    REPLY_TICKET = 'REPLY_TICKET',
    MERGE_TICKET = 'MERGE_TICKET'
}

export enum ModuleKeys {
    TICKETS = 'TICKETS',
    ADMIN = 'ADMIN'
}

interface IPermissionList {
    associatedModule: keyof typeof ModuleKeys;
    permissions: {
        name: string;
        permissionKey: PermissionKeys;
    }[];
}

const modules = [{
    moduleName: 'Tickets',
    moduleKey: ModuleKeys.TICKETS
}, {
    moduleName: 'Admin',
    moduleKey: ModuleKeys.ADMIN
}];


const permissionList = [{
    associatedModule: 'TICKETS',
    permissions: [{
        name: 'Create ticket',
        permissionKey: PermissionKeys.CREATE_TICKET
    }, {
        name: 'Reply ticket',
        permissionKey: PermissionKeys.REPLY_TICKET
    }]
}, {
    associatedModule: 'ADMIN',
    permissions: []
}] as IPermissionList[]

export const Permissions = () => {
    const navigate = useNavigate();
    const [selectedModule, setSelectedModule] = useState(ModuleKeys.TICKETS);

    const onModuleChange = (value: ModuleKeys) => {
        setSelectedModule(value);
    }

    const associatedPermissions = permissionList.find((item) => item.associatedModule === selectedModule)!;

    return (
        <FlexBox flexDirection="column" height="calc(100% - 166px)">
            <Typography variant="h4">Permissions</Typography>
            <FlexBox height="calc(100% - 102px)">
                <FlexBox flexDirection="column" width="300px" padding="20px" gap={'15px'}>
                    <Typography variant="h6">Modules</Typography>
                    <FlexBox flexDirection="column" >
                        {modules.map((item) => (
                            <Modules
                                moduleName={item.moduleName}
                                key={item.moduleKey}
                                moduleKey={item.moduleKey}
                                isSelected={item.moduleKey === selectedModule}
                                onModuleChange={onModuleChange} />))}
                    </FlexBox>
                </FlexBox>
                <VerticalSeparator height="calc(100% - 40px)" $margin="20px 10px" />
                <FlexBox flexDirection="column" padding="20px" gap={'15px'}>
                    <Typography variant="h6">Permissions</Typography>
                    <FlexBox flexDirection="column">
                        {associatedPermissions.permissions.map((item) => <PermissionList {...item} key={item.permissionKey} />)}
                    </FlexBox>
                </FlexBox>
            </FlexBox>
            <FlexBox width="60%" justifyContent="flex-end" gap={'20px'}>
                <Button variant="outlined" onClick={() => navigate(-1)}>Cancel</Button>
                <Button variant="contained">Submit</Button>
            </FlexBox>
        </FlexBox>
    )
}
