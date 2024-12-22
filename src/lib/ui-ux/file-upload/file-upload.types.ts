export interface IFileInfo {
  id: string;
  name: string;
  type: string;
  size: number;
  content?: string | ArrayBuffer | null;
  error?: string;
}

export type ReadMode = keyof Pick<
  FileReader,
  'readAsArrayBuffer' | 'readAsBinaryString' | 'readAsDataURL' | 'readAsText'
>;

export interface IChangeArgs {
  action: 'add' | 'remove';
  changedFileIds: string[];
  selectedFiles: IFileInfo[];
  remove: (fileId: string) => void;
}

export interface IFileActions {
  remove(): void;
}

export interface IFileUploadProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  accept?: string;
  allowDuplicateFiles?: boolean;
  hidden?: boolean;
  initialSelectedFiles?: IFileInfo[];
  label?: string;
  multiple?: boolean;
  placeholder?: string;
  readMode?: ReadMode;
  onChange(args: IChangeArgs): void;
}
