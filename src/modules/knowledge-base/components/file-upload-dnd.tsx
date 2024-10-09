import styled from 'styled-components';
import { Button, IconButton, Typography } from "@mui/material"
import { FlexBox } from "lib/ui-ux";
import { useState, DragEvent, ChangeEvent, useRef, MouseEventHandler } from "react";
import { DeleteOutline } from '@mui/icons-material';

const FileType = styled(FlexBox)`
    width: 40px;
    height: 40px;
    border-radius: 6px;
    background-color: #465365;
    color: ${(props) => props.theme.pallete.white};
`;

const AttachmentPreviewContainer = styled(FlexBox)`
    border: 1px solid ${(props) => props.theme.pallete.grayVariant5};
    background-color: ${(props) => props.theme.pallete.grayVariant5};
    border-radius: 6px;
    width: fit-content;
`;

const FileUploadDNDContainer = styled(FlexBox) <{ $isDragging: boolean }>`
    border: ${({ $isDragging, theme }) => $isDragging ? `2px dashed ${theme.pallete.primaryPurple}` : '2px dashed #ccc'};
    border-radius: 8px;
    margin-bottom: 20px;
`;

export const FileUploadDND = () => {
    const [files, setFiles] = useState<File[]>([]);
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
        setFiles(droppedFiles);
    };

    const handleFileSelection = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = e.target.files ? Array.from(e.target.files) : [];
        setFiles(selectedFiles);
    };

    const handleOpenFileDialog: MouseEventHandler<HTMLButtonElement> = (ev): void => {
        ev.stopPropagation();
        if (fileInputRef.current) {
            fileInputRef.current.click(); // Open the file selection dialog
        }
    };

    // const handleUpload = async () => {
    //     if (files.length === 0) {
    //         alert('Please select some files first.');
    //         return;
    //     }

    //     const formData = new FormData();
    //     files.forEach(file => {
    //         formData.append('files[]', file);
    //     });

    //     try {
    //         const response = await fetch('/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });

    //         if (response.ok) {
    //             alert('Files uploaded successfully!');
    //         } else {
    //             alert('File upload failed.');
    //         }
    //     } catch (error) {
    //         console.error('Error uploading files:', error);
    //         alert('Error uploading files.');
    //     }
    // };

    return (
        <FlexBox gap={'20px'} width="100%" height='100%'>
            <FileUploadDNDContainer
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                alignItems="center"
                justifyContent="center"
                width="60%"
                height="50%"
                flexDirection='column'
                gap={'8px'}
                $isDragging={isDragging}
            >
                <Typography variant="h6">{isDragging ? 'Release to drop the files here' : 'Drag and drop files to upload'}</Typography>
                <Typography variant="body2">{'Or'}</Typography>
                <input
                    type="file"
                    multiple
                    ref={fileInputRef}
                    onChange={handleFileSelection}
                    style={{ display: 'none' }}
                    id="fileInput"
                />
                <Button variant="contained" onClick={handleOpenFileDialog} >Browse</Button>
            </FileUploadDNDContainer>
            <UploadedFiles files={files} />
        </FlexBox>
    )
}

interface UploadedFileProps {
    files: File[]
}

const UploadedFiles = (props: UploadedFileProps) => {
    const { files } = props;
    return (
        <FlexBox flexDirection='column' gap={'20px'}>
            <Typography>Uploaded Files</Typography>
            {files.map((item, index) => (
                <AttachmentPreviewContainer key={`${item.name}-${index}`} gap="8px" alignItems="center">
                    <FileType alignItems="center" justifyContent="center">
                        <Typography variant="caption" sx={{ color: 'inherit' }}>{item.name.split('.').pop()?.toUpperCase()}</Typography>
                    </FileType>
                    <Typography variant="body3" title={item.name} sx={{ maxWidth: '320px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>{item.name}</Typography>
                    <IconButton>
                        <DeleteOutline />
                    </IconButton>
                </AttachmentPreviewContainer>
            ))}
        </FlexBox>
    )
}