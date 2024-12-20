import { generateId } from 'lib/utils';
import { unique } from 'lib/utils/array-utils';
import { useReducer, useCallback, useRef, useEffect } from 'react';

import {
  IChangeArgs,
  IFileInfo,
  IFileUploadProps,
  ReadMode,
} from './file-upload.types';

export function getFileInfo(
  file: File,
  readMode: ReadMode
): Promise<IFileInfo> {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      resolve({
        id: generateId(),
        size: file.size,
        content: fileReader.result,
        name: file.name,
        type: file.type,
      });
    });
    fileReader.addEventListener('error', () =>
      reject({
        error: 'Failed to read content.',
        name: file.name,
      })
    );
    fileReader[readMode](file);
  });
}

export function getAllFilesInfo(fileList: File[], readMode: ReadMode) {
  return Promise.allSettled(
    fileList.map((file) => getFileInfo(file, readMode))
  );
}

type UpsertFiles = {
  type: 'UPSERT';
  payload: IFileInfo[];
};

type RemoveFile = {
  type: 'REMOVE';
  payload: string;
};

type FileRepositoryAction = (UpsertFiles | RemoveFile) & {
  multiple?: boolean;
  allowDuplicateFiles?: boolean;
};

type ChangeInfo = Pick<IChangeArgs, 'action' | 'changedFileIds'> | null;

const stateReducer = (state: IFileInfo[], action: FileRepositoryAction) => {
  switch (action.type) {
    case 'UPSERT': {
      if (action.multiple) {
        const concatinatedFiles = action.payload.concat(state);
        return action.allowDuplicateFiles
          ? concatinatedFiles
          : unique(concatinatedFiles, (i) => `${i.name}_${i.type}`);
      }
      const [firstFile] = action.payload;
      return firstFile ? [firstFile] : [];
    }
    case 'REMOVE':
      return action.multiple
        ? state.filter((i) => i.id !== action.payload)
        : [];

    default:
      return state;
  }
};

const getFileId = (file: IFileInfo) => file.id;

export interface IUseFileRepositoryOptions {
  initialFiles?: IFileInfo[];
  multiple?: boolean;
  allowDuplicateFiles?: boolean;
  onChange?: IFileUploadProps['onChange'];
}

export function useFileRepository(options: IUseFileRepositoryOptions) {
  const {
    initialFiles = [],
    multiple,
    allowDuplicateFiles,
    onChange,
  } = options;
  const [selectedFiles, dispatch] = useReducer(stateReducer, initialFiles);
  const changeInfoRef = useRef<ChangeInfo>(null);

  const upsert = useCallback(
    (files: IFileInfo[]) => {
      dispatch({
        type: 'UPSERT',
        payload: files,
        multiple,
        allowDuplicateFiles,
      });
      changeInfoRef.current = {
        action: 'add',
        changedFileIds: files.map(getFileId),
      };
    },
    [allowDuplicateFiles, multiple]
  );

  const remove = useCallback(
    (fileId: string) => {
      dispatch({
        type: 'REMOVE',
        payload: fileId,
        multiple,
      });
      changeInfoRef.current = {
        action: 'remove',
        changedFileIds: [fileId],
      };
    },
    [multiple]
  );

  useEffect(() => {
    if (onChange === undefined || !changeInfoRef.current) {
      return;
    }
    const changeInfo = changeInfoRef.current;
    onChange({ ...changeInfo, selectedFiles, remove });
    changeInfoRef.current = null;
  }, [onChange, remove, selectedFiles]);

  return { selectedFiles, upsert, remove };
}
