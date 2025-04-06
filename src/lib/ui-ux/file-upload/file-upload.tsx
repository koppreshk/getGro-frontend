import { AttachFileOutlined } from '@mui/icons-material';
import { useNotifications } from 'lib';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { styled } from 'styled-components';

import { IFileUploadProps, IFileInfo } from './file-upload.types';
import { getAllFilesInfo, useFileRepository } from './utils';
import { CustomIconButton } from '../common';

const DefaultFileInput = styled.input.attrs({
  type: 'file',
})`
  display: none;
`;

export const parseFileInfo = (
  settledResult: PromiseSettledResult<IFileInfo>
): IFileInfo =>
  settledResult.status === 'fulfilled'
    ? settledResult.value
    : settledResult.reason;

// eslint-disable-next-line react/display-name
export const FileUpload = React.memo((props: IFileUploadProps) => {
  const {
    hidden,
    allowDuplicateFiles,
    accept,
    multiple,
    initialSelectedFiles,
    readMode = 'readAsText',
    onChange,
    onRenderButton,
  } = props;
  const id = React.useId();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const { upsert } = useFileRepository({
    initialFiles: initialSelectedFiles,
    multiple,
    onChange,
    allowDuplicateFiles,
  });
  const onButtonClick = React.useCallback(() => {
    const { current } = inputRef;
    current?.click();
  }, []);
  const { t } = useTranslation();
  const { showNotification } = useNotifications();

  const loadSelectedFiles = React.useCallback(
    async (fileList: File[] | null) => {
      if (!fileList || fileList.length === 0) {
        return;
      }

      const file = fileList[0]; // Get the selected file

      const maxSizeInMB = 20;
      const maxSizeInBytes = maxSizeInMB * 1024 * 1024;

      if (file.size > maxSizeInBytes) {
        showNotification({
          message: `The file is too large. Please upload a file smaller than ${maxSizeInMB}MB.`,
          type: 'error',
        });
      } else {
        const result = (await getAllFilesInfo(fileList, readMode)).map(
          parseFileInfo
        );
        upsert(result);
        const { current } = inputRef;
        if (!current) {
          return;
        }
        current.value = '';
      }
    },
    [readMode, showNotification, upsert]
  );

  const onFileSelect = React.useCallback(
    (ev: React.ChangeEvent<HTMLInputElement>) => {
      loadSelectedFiles(ev.target.files ? Array.from(ev.target.files) : null);
    },
    [loadSelectedFiles]
  );

  return hidden ? null : (
    <>
      {onRenderButton ? (
        onRenderButton({
          onClick: onButtonClick,
        })
      ) : (
        <CustomIconButton
          onClick={onButtonClick}
          tooltipProps={{
            title: t('upload_attachments'),
            arrow: true,
            placement: 'top',
          }}
          iconComponent={<AttachFileOutlined />}
        />
      )}
      <DefaultFileInput
        id={id}
        type="file"
        ref={inputRef}
        accept={accept}
        multiple={multiple}
        onChange={onFileSelect}
      />
    </>
  );
});
