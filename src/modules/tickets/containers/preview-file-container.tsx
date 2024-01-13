import { CircularProgress, Dialog, IconButton } from "@mui/material";
import { IAttachments, useFetchAttachments } from "../apis"
import { Close, Panorama } from "@mui/icons-material";
import { toCamelCasedKeysFromUnderScores } from "lib/utils";
import { useState } from "react";
import { CustomIconButton } from "lib/ui-ux";

export const PreviewFileContainer = (props: Pick<IAttachments, 'id' | 'contentType'>) => {
    const { id, contentType } = props;
    const [downloadAttachments, { isLoading, data }] = useFetchAttachments(id);
    const [showFilePreview, setFilePreviewDisplay] = useState(false);

    const toggleViewer = () => setFilePreviewDisplay((prevValue) => !prevValue);

    const onDownloadClick = () => {
        toggleViewer()
        downloadAttachments({ 'attachment_id': id })
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
            fullScreen
            aria-describedby="alert-dialog-description">
            <IconButton edge="start" color="inherit" onClick={onClose} sx={{ alignSelf: 'end', paddingRight: '20px' }}>
                <Close />
            </IconButton>
            <object data={`data:${contentType};base64,${content}`} type={contentType} width="100%" height="100%">
                <p>Alternative text</p>
            </object>
        </Dialog >
    )
}