import styled from "styled-components";

const StyledTextArea = styled.textarea<{ $canResize?: boolean }>`
    resize: ${({ $canResize }) => $canResize ? 'unset' : 'none'};
    font-family: inherit;
    font-size: 14px;
    padding: 10px;
    width: 100%;
    border: none;
    outline: none;
    box-sizing: border-box;
`;

interface ITextAreProps {
    canResize?: boolean;
    value?: string;
    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

export const TextArea = (props: ITextAreProps) => {
    const { canResize = false, onChange, value } = props;

    return (
        <StyledTextArea $canResize={canResize} onChange={onChange} value={value} />
    )
}