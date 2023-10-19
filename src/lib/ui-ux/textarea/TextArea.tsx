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
}

export const TextArea = (props: ITextAreProps) => {
    const { canResize = false } = props;

    return (
        <StyledTextArea $canResize={canResize} />
    )
}