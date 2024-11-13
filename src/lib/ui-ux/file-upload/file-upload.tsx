import * as React from 'react';
import styled from 'styled-components';
import { IFileUploadProps, IFileInfo } from './file-upload.types';
import { getAllFilesInfo, useFileRepository } from './utils';
import { IconButton } from '@mui/material';
import { AttachFileOutlined } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useNotifications } from 'lib';

const DefaultFileInput = styled.input.attrs({
    type: 'file'
})`
    display: none;
`;

export const parseFileInfo = (settledResult: PromiseSettledResult<IFileInfo>): IFileInfo => (settledResult.status === 'fulfilled' ? settledResult.value : settledResult.reason);

export const FileUpload = React.memo((props: IFileUploadProps) => {
    const {
        hidden, allowDuplicateFiles,
        accept, multiple, initialSelectedFiles, readMode = 'readAsText', onChange } = props;
    const id = React.useId();
    const inputRef = React.useRef<HTMLInputElement>(null);
    const { upsert } = useFileRepository({ initialFiles: initialSelectedFiles, multiple, onChange, allowDuplicateFiles });
    const _onButtonClick = React.useCallback(() => {
        const { current } = inputRef;
        current?.click();
    }, []);
    const { t } = useTranslation();
    const { showNotification } = useNotifications();

    const loadSelectedFiles = React.useCallback(async (fileList: File[] | null) => {
        if (!fileList || fileList.length === 0) {
            return;
        }

        const file = fileList[0]; // Get the selected file

        const maxSizeInMB = 20;
        const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

        if (file.size > maxSizeInBytes) {
            showNotification({ message: `The file is too large. Please upload a file smaller than ${maxSizeInMB}MB.`, type: 'error' });
        }
        else {
            const result = (await getAllFilesInfo(fileList, readMode)).map(parseFileInfo);
            upsert(result);
            const { current } = inputRef;
            if (!current) {
                return;
            }
            current.value = '';
        }
    }, [readMode, showNotification, upsert]);

    const _onFileSelect = React.useCallback((ev: React.ChangeEvent<HTMLInputElement>) => {
        loadSelectedFiles(ev.target.files ? Array.from(ev.target.files) : null);
    }, [loadSelectedFiles]);

    return hidden ? null : (
        <>
            <IconButton onClick={_onButtonClick} title={t('upload_file')}>
                <AttachFileOutlined />
            </IconButton>
            <DefaultFileInput id={id} type="file" ref={inputRef} accept={accept} multiple={multiple} onChange={_onFileSelect} />
        </>
    );
});
