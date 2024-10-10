import { useState, DragEvent, ChangeEvent, useRef, MouseEventHandler, Dispatch, SetStateAction } from "react";
import styled from 'styled-components';
import { Trans, useTranslation } from 'react-i18next';
import { Button, IconButton, Typography } from "@mui/material"
import { DeleteOutline } from '@mui/icons-material';
import { FlexBox } from "lib/ui-ux";
import { generateId } from 'lib/utils';
import { IFile } from './create-article';

const FileType = styled(FlexBox)`
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-color: #465365;
    color: ${(props) => props.theme.pallete.white};
`;

const AttachmentPreviewContainer = styled(FlexBox)`
    border: 1px solid #ccc;
    background-color: ${(props) => props.theme.pallete.white};
    border-radius: 6px;
    width: fit-content;
`;

const FileUploadDNDContainer = styled(FlexBox) <{ $isDragging: boolean }>`
    border: ${({ $isDragging, theme }) => $isDragging ? `2px dashed ${theme.pallete.primaryPurple}` : '2px dashed #ccc'};
    border-radius: 8px;
    margin-bottom: 20px;
`;

interface FileUploadDNDProps {
    files: IFile[];
    setFiles: Dispatch<SetStateAction<IFile[]>>
}

export const FileUploadDND = (props: FileUploadDNDProps) => {
    const { files, setFiles } = props;
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        setIsDragging(false);

        // Extract files from the drop event
        const droppedFiles = Array.from(e.dataTransfer.files);
        const modifiedFiles = droppedFiles.slice().map((file) => ({ file, id: generateId() }));
        setFiles(modifiedFiles);
    };

    const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        const modifiedFiles = selectedFiles.slice().map((file) => ({ file, id: generateId() }));
        setFiles(modifiedFiles);
    };

    const handleOpenFileDialog: MouseEventHandler<HTMLButtonElement> = (ev): void => {
        ev.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Open the file selection dialog
        }
    };

    const onDeleteClick = (id: string) => {
        const filteredFiles = files.filter((item) => item.id !== id);
        setFiles(filteredFiles);
    }
    const { t } = useTranslation();

    return (
        <FlexBox gap={'20px'} height='calc(100% - 160px)' padding="20px" style={{ background: '#f1f1f1', borderRadius: '8px' }}>
            <FileUploadDNDContainer
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                alignItems="center"
                justifyContent="center"
                width="60%"
                height="100%"
                flexDirection='column'
                gap={'8px'}
                $isDragging={isDragging}>
                <Typography variant="h6">{isDragging ? t('release_to_drop') : t('drag_and_drop')}</Typography>
                <Typography variant="body2">{t('or')}</Typography>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileSelection}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <Button variant="contained" onClick={handleOpenFileDialog} ><Trans i18nKey="browse" /></Button>
            </FileUploadDNDContainer>
            {files.length ? <UploadedFiles files={files} onDeleteClick={onDeleteClick} /> : null}
        </FlexBox>
    )
}

interface UploadedFileProps {
    files: IFile[];
    onDeleteClick: (id: string) => void;
}

const UploadedFiles = (props: UploadedFileProps) => {
    const { files, onDeleteClick } = props;
    return (
        <FlexBox flexDirection='column' gap={'20px'}>
            <Typography><Trans i18nKey="uploaded_files" /></Typography>
            {files.map((item, index) => (
                <AttachmentPreviewContainer key={`${item.file.name}-${index}`} gap="8px" alignItems="center">
                    <FileType alignItems="center" justifyContent="center">
                        <Typography variant="caption" sx={{ color: 'inherit' }}>{item.file.name.split('.').pop()?.toUpperCase()}</Typography>
                    </FileType>
                    <Typography variant="body3" title={item.file.name} sx={{ maxWidth: '320px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.file.name}</Typography>
                    <IconButton onClick={() => onDeleteClick(item.id)}>
                        <DeleteOutline />
                    </IconButton>
                </AttachmentPreviewContainer>
            ))}
        </FlexBox>
    )
}