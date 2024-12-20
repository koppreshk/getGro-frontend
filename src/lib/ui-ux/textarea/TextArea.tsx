import styled from 'styled-components';

const StyledTextArea = styled.textarea<
  Partial<Omit<ITextAreProps, 'canResize'>> & { $canResize?: boolean }
>`
  resize: ${({ $canResize }) => ($canResize ? 'unset' : 'none')};
  font-family: inherit;
  font-size: 14px;
  padding: 10px;
  width: 100%;
  border: none;
  outline: none;
  border-radius: ${({ theme }) => theme.semantics.borderRadius.md};
  box-sizing: border-box;

  &:disabled {
    background-color: ${({ theme }) => theme.pallete.disabledBgColor};
    color: #00000042;
    cursor: not-allowed;
  }
`;

interface ITextAreProps extends React.HTMLProps<HTMLTextAreaElement> {
  canResize?: boolean;
}

export const TextArea = (props: ITextAreProps) => {
  const { canResize = false, ...rest } = props;

  return <StyledTextArea $canResize={canResize} {...rest} />;
};
