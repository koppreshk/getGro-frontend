import { styled } from 'styled-components';

export const VerticalSeparator = styled.div<{
  height?: string;
  $margin?: string;
}>`
  width: 2px;
  height: ${({ height }) => height ?? '30px'};
  padding: 10px 0px;
  box-sizing: border-box;
  margin: ${({ $margin }) => ($margin ? $margin : 'unset')};
  background-color: ${({ theme }) => theme.pallete.standardBorderColor};
`;

export const HorizontalSeparator = styled.div<{
  $margin?: string;
  $backgroundColor?: string;
}>`
  width: 100%;
  min-height: 1px;
  height: 1px;
  display: block;
  box-sizing: border-box;
  margin: ${({ $margin }) => ($margin ? $margin : 'unset')};
  background-color: ${({ theme, $backgroundColor }) =>
    $backgroundColor ?? theme.pallete.standardBorderColor};
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
