import React from "react";
import { AttachFileOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export const NativeFileUpload = (props: { onChange: (fileList: File[]) => void }) => {
    const inputRef = React.useRef<HTMLInputElement>(null);

    const _onButtonClick = React.useCallback(() => {
        const { current } = inputRef;
        current?.click();
    }, []);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const _onChange = (args: React.ChangeEvent<HTMLInputElement>) => {
        if (props.onChange) {
            props.onChange(args.target.files ? Array.from(args.target.files) : []);
        }
    }

    return (
        <>
            <IconButton onClick={_onButtonClick} title="Upload files(s)">
                <AttachFileOutlined />
            </IconButton>
            <input
                type="file"
                style={{ display: 'none' }}
                multiple={false}
                ref={inputRef}
                onChange={_onChange}
            />
        </>
    )
}