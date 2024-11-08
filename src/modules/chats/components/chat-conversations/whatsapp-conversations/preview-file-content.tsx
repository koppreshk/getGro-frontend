import { Dialog, IconButton } from "@mui/material";
import { Message } from "../../../apis"
import { Close, Panorama } from "@mui/icons-material";
import { useState } from "react";
import { CustomIconButton, FlexBox } from "lib/ui-ux";

export const PreviewFileContent = (props: Pick<Message, 'media_url' | 'mime_type'>) => {
    const { media_url, mime_type } = props;
    const [showFilePreview, setFilePreviewDisplay] = useState(false);

    const toggleViewer = () => setFilePreviewDisplay((prevValue) => !prevValue);

    const onDownloadClick = () => {
        toggleViewer()
    }

    return (
        <>
            <PreviewFile open={showFilePreview} onClose={toggleViewer} media_url={media_url!} mime_type={mime_type} />
            <CustomIconButton onClick={onDownloadClick} tooltipProps={{ title: "Preview File" }} iconComponent={<Panorama />} />
        </>
    )
}

function isImageMimeType(mimeType: string): boolean {
    return mimeType.startsWith("image/");
}

const PreviewFile = (props: { open: boolean; onClose: () => void; media_url: string, mime_type: string }) => {
    const { onClose, open, media_url, mime_type } = props;

    const renderBasedOnFileType = () => {
        if (isImageMimeType(mime_type)) {
            return (
                <FlexBox style={{ overflow: "auto", textAlign: "center" }} alignItems="center" justifyContent="center" width="100%" height="100%">
                    <img
                        src={media_url}
                        alt="Description"
                        style={{ display: "block", maxWidth: "100%", height: "100%" }}
                    />
                </FlexBox>
            )
        }
        return (
            <object data={media_url} style={{ height: '100%' }}>
                <p>Alternative text</p>
            </object>
        )
    }

    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            fullWidth
            maxWidth={'lg'}
            PaperProps={{ sx: { height: '-webkit-fill-available' } }}
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
            {renderBasedOnFileType()}
        </Dialog >
    )
}