import { CircularProgress, Dialog, IconButton } from "@mui/material";
import { Conversations, IAttachments, useFetchAttachments } from "../../../apis"
import { Close, Panorama } from "@mui/icons-material";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";
import { useState } from "react";
import { CustomIconButton } from "lib/ui-ux";

export const PreviewFileContainer = (props: Pick<IAttachments, 'id' | 'contentType'> & Pick<Conversations, 'messageId'>) => {
    const { id, contentType, messageId } = props;
    const [downloadAttachments, { isLoading, data }] = useFetchAttachments(id);
    const [showFilePreview, setFilePreviewDisplay] = useState(false);

    const toggleViewer = () => setFilePreviewDisplay((prevValue) => !prevValue);

    const onDownloadClick = () => {
        toggleViewer()
        downloadAttachments({ 'attachment_id': id, 'message_id': messageId })
    }

    if (isLoading) {
        return (
            <CircularProgress size={24} />
        )
    }

    return (
        <>
            {data ? <PreviewFile open={showFilePreview} onClose={toggleViewer} content={toCamelCasedKeysFromUnderScores(data).fileContent} contentType={contentType} /> : null}
            <CustomIconButton onClick={onDownloadClick} tooltipProps={{ title: "Preview File" }} iconComponent={<Panorama />} />
        </>
    )
}

const PreviewFile = (props: { open: boolean; onClose: () => void; content: string; contentType: string }) => {
    const { onClose, open, content, contentType } = props;
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            fullWidth
            maxWidth={'lg'}
            sx={{ width: '-webkit-fill-available' }}
            aria-describedby="alert-dialog-description">
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                }}
            >
                <Close />
            </IconButton>
            <object data={`data:${contentType.split(';')[0]};base64,${content}`} style={{ height: '100%' }}>
                <p>Alternative text</p>
            </object>
        </Dialog >
    )
}