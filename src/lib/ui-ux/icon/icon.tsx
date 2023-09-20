import React from "react";
import styled from "styled-components";

export interface IIconProps {
    iconName: string;
    className?: string;
    iconSize?: 18 | 24 | 36 | 48;
    onClick?(ev: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

const StyledIconContainer = styled.span<Pick<IIconProps, 'iconSize'>>`
    font-size: ${(props) => `${props.iconSize}px` ?? '24px'};
    color: #fff;
    cursor: pointer;
`;

export const Icon = React.memo((props: IIconProps) => {
    const { iconName, iconSize, className, onClick } = props;
    return (
        <StyledIconContainer className={className} iconSize={iconSize} onClick={onClick}>{iconName}</StyledIconContainer>
    )
})