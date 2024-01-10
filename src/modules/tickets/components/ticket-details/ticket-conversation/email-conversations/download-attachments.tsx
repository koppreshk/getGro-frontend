import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux"
import styled from "styled-components";
import { IEmailConversations } from "./email-conversations-layout";
import { DownloadAttachmentsContainer } from "modules/tickets/containers";

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
    'image/tiff': 'tiff'
};

const getFileExtension = (contentType: string) => {
    return fileTypes[contentType.toLocaleLowerCase() as keyof typeof fileTypes];
};

export const DownloadAttachments = (props: Pick<IEmailConversations, 'attachments'>) => {
    const { attachments } = props;

    return (
        <FlexBox $gap="10px" style={{ marginLeft: '50px' }} $flexWrap="wrap">
            {attachments.map((attachment) => (
                <AttachmentPreviewContainer $gap="8px" $alignItems="center" key={attachment.id}>
                    <FileType $alignItems="center" $justifyContent="center">
                        <Typography variant="caption" sx={{ color: 'inherit' }}>
                            {getFileExtension(attachment.contentType).toUpperCase()}
                        </Typography>
                    </FileType>
                    <Typography
                        variant="body3"
                        title={attachment.filename}
                        sx={{ maxWidth: '120px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                        {attachment.filename}
                    </Typography>
                    <DownloadAttachmentsContainer id={attachment.id} />
                </AttachmentPreviewContainer>
            ))}
        </FlexBox>
    )
}