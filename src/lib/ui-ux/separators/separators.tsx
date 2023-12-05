import styled from "styled-components";

export const VerticalSeparator = styled.span`
  width: 2px;
  height: 50px;
  padding: 10px 0px;
  box-sizing: border-box;
  background-color:  ${({ theme }) => theme.pallete.grayVariant1};
`;

export const HorizontalSeparator = styled.div<{ $margin?: string }>`
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  margin: ${({ $margin }) => $margin ? $margin : 'unset'};
  background-color:  ${({ theme }) => theme.pallete.grayVariant1};
`;