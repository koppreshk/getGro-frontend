import { useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { CasedAttachmentResposne, IAttachments, useFetchAttachments } from "../apis"
import { FileDownloadOutlined } from "@mui/icons-material";
import { saveFile, toCamelCasedKeysFromUnderScores } from "lib/utils";
import { CustomIconButton } from "lib/ui-ux";

export const DownloadAttachmentsContainer = (props: Pick<IAttachments, 'id'>) => {
    const { id } = props;
    const [downloadAttachments, { isLoading, data, dataUpdatedAt }] = useFetchAttachments(`${id}-download`);

    useEffect(() => {
        if (data) {
            const { fileContent, fileName, fileType } = toCamelCasedKeysFromUnderScores(data) as CasedAttachmentResposne;
            saveFile(fileContent, fileName, fileType)
        }
    }, [data, dataUpdatedAt])

    const onDownloadClick = () => {
        downloadAttachments({ 'attachment_id': id })
    }

    if (isLoading) {
        return (
            <CircularProgress size={24} />
        )
    }

    return (
        <CustomIconButton onClick={onDownloadClick} tooltipProps={{ title: "Download File" }} iconComponent={<FileDownloadOutlined />} />
    )
}