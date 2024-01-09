import { useEffect } from "react";
import { CircularProgress, IconButton } from "@mui/material";
import { CasedAttachmentResposne, IAttachments, useFetchAttachments } from "../apis"
import { FileDownloadOutlined } from "@mui/icons-material";
import { saveFile, toCamelCasedKeysFromUnderScores } from "lib/utils";

export const DownloadAttachmentsContainer = (props: Pick<IAttachments, 'id'>) => {
    const { id } = props;
    const [downloadAttachments, { isLoading, data, dataUpdatedAt }] = useFetchAttachments();

    useEffect(() => {
        if (data) {
            const { fileContent, fileName, fileType } = toCamelCasedKeysFromUnderScores(data) as CasedAttachmentResposne;
            saveFile(fileContent, fileName, fileType)
        }
    }, [data, dataUpdatedAt])

    const onDownloadClick = () => {
        downloadAttachments({ 'attachment_id': id })
    }

    return (
        <>
            {isLoading
                ?
                <CircularProgress size={24} />
                :
                <IconButton onClick={onDownloadClick}>
                    <FileDownloadOutlined />
                </IconButton>}
        </>
    )
}