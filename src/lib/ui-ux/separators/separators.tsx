import styled from "styled-components";

export const VerticalSeparator = styled.span`
  width: 2px;
  height: 30px;
  padding: 10px 0px;
  box-sizing: border-box;
  background-color: ${({ theme }) => theme.pallete.standardBorderColor};
`;

export const HorizontalSeparator = styled.div<{ $margin?: string }>`
  width: 100%;
  height: 1px;
  box-sizing: border-box;
  margin: ${({ $margin }) => $margin ? $margin : 'unset'};
  background-color: ${({ theme }) => theme.pallete.standardBorderColor};
`;

export const CircularSeparator = styled.div`
  align-self: center;
  background-color: #98a1b2;
  border: 1px solid #98a1b2 !important;
  border-radius: 50%;
  height: 4px;
  width: 4px;
  margin-top: 2px;
  min-width: 4px !important;
`;