import styled, { css } from 'styled-components';
import { Property } from 'csstype';
import React, { Children, ForwardedRef } from 'react';

export type IFlex = {
    inline?: boolean;
    flexDirection?: Property.FlexDirection;
    flexFlow?: Property.FlexFlow;
    flexWrap?: Property.FlexWrap;
    gap?: Property.Gap;
    alignContent?: Property.AlignContent;
    alignItems?: Property.AlignItems;
    alignSelf?: Property.AlignSelf;
    justifyContent?: Property.JustifyContent;
    justifyItems?: Property.JustifyItems;
    justifySelf?: Property.JustifySelf;
    maxWidth?: string;
    maxHeight?: string;
    width?: string;
    padding?: string;
    height?: string;
    overflowX?: Property.OverflowX;
    overflowY?: Property.OverflowY;
}

type CSSFlexProperties = {
    [PropertyKey in keyof IFlex as `$${PropertyKey}`]: IFlex[PropertyKey];
}

const StyledFlexBox = styled.div<CSSFlexProperties>`
    display: ${({ $inline }) => ($inline ? 'inline-flex' : 'flex')};
    flex-shrink: 0;
    flex-grow: 0;
    box-sizing: border-box;
    ${({ $flexDirection }) => $flexDirection && css`flex-direction: ${$flexDirection};`}
    ${({ $flexFlow }) => $flexFlow && css`flex-flow: ${$flexFlow};`}
    ${({ $flexWrap }) => $flexWrap && css`flex-wrap: ${$flexWrap};`}
    ${({ $gap }) => $gap && css`gap: ${$gap};`}
    ${({ $alignContent }) => $alignContent && css`align-content: ${$alignContent};`}
    align-items: ${({ $alignItems }) => $alignItems};
    ${({ $alignSelf }) => $alignSelf && css`align-self: ${$alignSelf};`}
    justify-content: ${({ $justifyContent }) => $justifyContent};
    ${({ $justifyItems }) => $justifyItems && css`justify-items: ${$justifyItems};`}
    ${({ $justifySelf }) => $justifySelf && css`justify-self: ${$justifySelf};`}
    ${({ $height }) => $height && css`height: ${$height};`}
    ${({ $width }) => $width && css`width: ${$width};`}
    ${({ $padding }) => $padding && css`padding: ${$padding};`}
    ${({ $maxHeight }) => $maxHeight && css`max-height: ${$maxHeight};`}
    ${({ $maxWidth }) => $maxWidth && css`max-width: ${$maxWidth};`}
    ${({ $overflowX }) => $overflowX && css`overflow-x: ${$overflowX};`}
    ${({ $overflowY }) => $overflowY && css`overflow-y: ${$overflowY};`}
`;

export type IFlexBoxProps = IFlex & Omit<JSX.IntrinsicElements["div"], 'ref'> & {
    children?: React.ReactNode;
    className?: string;
    renderSeparator?: () => React.ReactNode;
}

export const FlexBox = React.forwardRef((props: IFlexBoxProps, ref: ForwardedRef<HTMLDivElement>) => {
    const { alignContent, alignItems, alignSelf, flexDirection, flexFlow,
        flexWrap, gap, height, inline, justifyContent, justifyItems, justifySelf,
        maxHeight, maxWidth, overflowX, overflowY, padding, width, children, className,
        renderSeparator, ...rest } = props;

    const totalChildrenCount = Children.count(children);

    return (
        <StyledFlexBox {...rest}
            ref={ref}
            $alignContent={alignContent} $alignItems={alignItems} $alignSelf={alignSelf} $flexDirection={flexDirection} $flexFlow={flexFlow}
            $flexWrap={flexWrap} $gap={gap} $height={height} $inline={inline} $justifyContent={justifyContent} $justifySelf={justifySelf} $justifyItems={justifyItems}
            $maxHeight={maxHeight} $maxWidth={maxWidth} $overflowX={overflowX} $overflowY={overflowY} $padding={padding} $width={width} className={className}>
            {Children.map(children, (child, idx) => (
                <>
                    {child}
                    {renderSeparator ? totalChildrenCount !== idx + 1 ? renderSeparator() : null : null}
                </>
            ))}
        </StyledFlexBox >
    )
})