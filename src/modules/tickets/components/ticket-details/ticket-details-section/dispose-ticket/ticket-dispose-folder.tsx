import { useMemo } from "react";
import styled from "styled-components";
import { DeleteOutline, FolderCopyOutlined, NavigateNext } from "@mui/icons-material";
import { Breadcrumbs, Chip, Typography } from "@mui/material"
import { CustomIconButton, FlexBox } from "lib/ui-ux"

interface IDisposeFolderData {
    parentFolder: string;
    name: string;
    subFolder: string[];
}

const StyledBreadCrumbs = styled(Breadcrumbs)`
    .MuiBreadcrumbs-separator {
        margin-left: 4px;
        margin-right: 4px;
    }
`
const disposeFolderData = [
    {
        parentFolder: 'call',
        name: 'Call',
        subFolder: ['Complaint', 'Query', 'Call']
    },
    {
        parentFolder: 'email',
        name: 'Email',
        subFolder: ['Complaint', 'Query', 'Email']
    },
    {
        parentFolder: 'facebook',
        name: 'Facebook',
        subFolder: ['Complaint', 'Query', 'Facebook']
    },
    {
        parentFolder: 'instagram',
        name: 'Instagram',
        subFolder: ['Complaint', 'Query', 'Instagram']
    },
    {
        parentFolder: 'return',
        name: 'Return',
        subFolder: []
    },
] as IDisposeFolderData[];

const FolderAddress = styled(FlexBox)`
    border-radius: 5px;
    border: 1px solid #ccc;
    height: 40px;
`;

interface ISelectFolderProps {
    title: string;
    items: string[];
    onItemClick: (name: string) => void;
}

const SelectFolder = (props: ISelectFolderProps) => {
    const { items, onItemClick, title } = props;
    return (
        <>
            <Typography variant="h6">{title}</Typography>
            <FlexBox flexWrap="wrap" gap="5px">
                {items.map((item) => (
                    <Chip
                        key={item}
                        label={item}
                        variant="outlined"
                        color="primary"
                        onClick={() => onItemClick(item)}
                    />
                ))}
            </FlexBox>
        </>
    )
};

interface ITicketDisposeFolderProps {
    parentFolderValue: string;
    childFolderValue: string;
    parentFolderClick: (name: string) => void;
    childFolderClick: (name: string) => void;
    onClickClearSelection: () => void;
}

export const TicketDisposeFolder = (props: ITicketDisposeFolderProps) => {
    const { childFolderValue, onClickClearSelection, parentFolderClick, parentFolderValue, childFolderClick } = props;
    const getChildFolder = useMemo(() =>
        parentFolderValue.length !== 0 ? disposeFolderData.find((data) => data.name === parentFolderValue)! : {} as IDisposeFolderData, [parentFolderValue]);

    return (
        <FlexBox gap="10px" flexDirection="column">
            <Typography variant="body3">
                Click on the folders to select path to dispose ticket
            </Typography>
            <FolderAddress padding="5px" justifyContent="space-between" alignItems="center" width="100%">
                <StyledBreadCrumbs separator={<NavigateNext fontSize="small" />}>
                    <FlexBox alignItems="center">
                        <FolderCopyOutlined fontSize="small" />
                    </FlexBox>
                    {parentFolderValue && <Chip label={parentFolderValue} variant="filled" color="primary" size="small" />}
                    {childFolderValue && <Chip label={childFolderValue} variant="filled" color="primary" size="small" />}
                </StyledBreadCrumbs>
                <CustomIconButton
                    onClick={onClickClearSelection}
                    tooltipProps={{ title: "Clear selection", arrow: true }}
                    iconComponent={<DeleteOutline fontSize="small" />}
                />
            </FolderAddress>
            {parentFolderValue.length === 0 ?
                <SelectFolder
                    title="Select Main Folder"
                    items={disposeFolderData.map((data) => data.name)}
                    onItemClick={parentFolderClick}
                />
                :
                <SelectFolder
                    title="Select Sub Folder"
                    items={getChildFolder?.subFolder}
                    onItemClick={childFolderClick}
                />
            }
        </FlexBox>
    )
}