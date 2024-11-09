import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { Message } from "modules/chats/apis";
import styled from "styled-components";
import { PreviewFileContent } from "./preview-file-content";

const FileType = styled(FlexBox)`
    height: 32px;
    padding: 8px;
    border-radius: 6px;
    background-color:  #465365;
    color: ${(props) => props.theme.pallete.white};
`;

const AttachmentPreviewContainer = styled(FlexBox) <{ $isIncomingMessage: boolean }>`
    border: 1px solid ${(props) => props.theme.pallete.grayVariant5};
    background-color: ${({ $isIncomingMessage }) => $isIncomingMessage ? '#d8d9d880' : '#a6c3a180'}; 
    border-radius: 6px;
    width: fit-content;
`;

const fileTypes = {
    'application/pdf': 'pdf',
    'application/msword': 'doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
    'text/plain': 'txt',
    'application/vnd.ms-excel': 'xls',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
    'application/zip': 'zip',
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg',
    'image/bmp': 'bmp',
    'image/gif': 'gif',
    'image/tiff': 'tiff',
    'mime_type': 'video'
};

const getFileExtension = (contentType: string): string | undefined => {
    return fileTypes[contentType.toLocaleLowerCase() as keyof typeof fileTypes];
};

export const AttachmentContent = (props: Pick<Message, 'media_url' | 'mime_type' | 'caption'> & { isIncomingMessage: boolean; }) => {
    const { mime_type = 'image/jpeg', media_url, caption, isIncomingMessage } = props;

    return (
        <FlexBox flexDirection="column">
            <AttachmentPreviewContainer gap="8px" alignItems="center" $isIncomingMessage={isIncomingMessage}>
                <FileType alignItems="center" justifyContent="center">
                    <Typography variant="caption" sx={{ color: 'inherit' }}>
                        {getFileExtension(mime_type)?.toLocaleUpperCase()}
                    </Typography>
                </FileType>
                <Typography
                    variant="body3"
                    title={'File'}
                    sx={{ maxWidth: '120px', minWidth: '80px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {'File'}
                </Typography>
                <FlexBox alignItems="center">
                    <PreviewFileContent media_url={media_url} mime_type={mime_type} />
                </FlexBox>
            </AttachmentPreviewContainer>
            <Typography variant="body2" sx={{ whiteSpace: 'pre-wrap', marginRight: '21px' }} >
                {caption}
            </Typography>
        </FlexBox>
    )
}