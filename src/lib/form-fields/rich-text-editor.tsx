import { ErrorMessage } from '@hookform/error-message';
import { FlexBox } from 'lib/ui-ux';
import React, { useEffect } from 'react';
import {
  Controller,
  FieldValues,
  RegisterOptions,
  useFormContext,
} from 'react-hook-form';
import ReactQuill, { ReactQuillProps } from 'react-quill';
import { styled } from 'styled-components';

import { StyledErrorMessage } from './select-field';

type IRichTextEditorFieldProps = ReactQuillProps & {
  name: string;
  className?: string;
  rules?: Omit<
    RegisterOptions<FieldValues, string>,
    'valueAsNumber' | 'valueAsDate' | 'setValueAs' | 'disabled'
  >;
  disableAutoFocus?: boolean;
};

const EditorContainer = styled(FlexBox)`
  .quill {
    width: 100%;
    display: flex;
    flex-direction: column;
  }
  .ql-toolbar,
  .ql-container {
    border-left: 0;
    border-right: 0;
    border-bottom: 1px solid
      ${({ theme }) => theme.pallete.formFieldBorderColor};
    border-top: none;
  }
  .ql-container {
    min-height: 180px;
    border-bottom: 0px;
  }
  .ql-editor {
    padding: 12px 16px;
  }
`;

//Important links for editor resources:
//https://www.npmjs.com/package/react-quill#default-toolbar-elements
//https://codepen.io/alexkrolick/pen/gmroPj?editors=0010

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, 7] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link'],
    ['clean'],
  ],
};

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'clean', // Clean formatting button
];

export const validateAtLeastOneChar = (value: string) => {
  const plainText = value
    .replace(/<\/?[^>]+(>|$)/g, '') // Remove all HTML tags
    .replace(/\s+/g, '') // Remove extra whitespace
    .trim();

  if (plainText.length === 0) {
    return 'Please enter at least one character.';
  }
};

export const RichTextEditorField = (props: IRichTextEditorFieldProps) => {
  const {
    name,
    rules,
    className,
    disableAutoFocus = false,
    ...restProps
  } = props;
  const {
    formState: { errors },
    control,
  } = useFormContext();
  const quillRef: React.LegacyRef<ReactQuill> | undefined = React.createRef();

  useEffect(() => {
    if (!disableAutoFocus && quillRef?.current) {
      quillRef.current.focus();
    }
  }, [disableAutoFocus, quillRef]);

  return (
    <>
      <Controller
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { onChange, value, ref, ...rest } }) => (
          <EditorContainer className={className}>
            <ReactQuill
              {...restProps}
              {...rest}
              theme="snow"
              value={value}
              ref={quillRef}
              placeholder="Type in here"
              preserveWhitespace
              modules={modules}
              formats={formats}
              onChange={onChange}
            />
          </EditorContainer>
        )}
        control={control}
        rules={rules}
        name={name}
      />
      <ErrorMessage errors={errors} name={name} as={StyledErrorMessage} />
    </>
  );
};
