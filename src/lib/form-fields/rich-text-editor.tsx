import { FlexBox } from "lib/ui-ux";
import { Controller, useFormContext } from "react-hook-form"
import ReactQuill, { ReactQuillProps } from "react-quill";
import styled from "styled-components";

type IRichTextEditorFieldProps = ReactQuillProps & {
    name: string;
    className?: string;
}

const EditorContainer = styled(FlexBox)`
    .quill {
        width: 100%;
        display: flex;
        flex-direction: column;
    }
    .ql-toolbar, .ql-container {
        border-left: 0;
        border-right: 0;
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
        [{ 'header': [1, 2, 3, 4, 5, 6, 7] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
        ['link'],
        ['clean']
    ],
}

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link'
]

export const RichTextEditorField = (props: IRichTextEditorFieldProps) => {
    const { name, className } = props;
    const { control } = useFormContext();

    return (
        <Controller
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            render={({ field: { onChange, value, ref, ...rest } }) => (
                <EditorContainer className={className}>
                    <ReactQuill
                        {...props}
                        {...rest}
                        theme="snow"
                        value={value}
                        placeholder="Type in here"
                        preserveWhitespace
                        modules={modules}
                        formats={formats}
                        onChange={onChange} />
                </EditorContainer>
            )}
            control={control}
            name={name}
        />
    )
}