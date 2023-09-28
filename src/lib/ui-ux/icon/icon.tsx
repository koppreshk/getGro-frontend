import React from "react";
import styled from "styled-components";

export interface IIconProps {
    iconName: string;
    className?: string;
    iconSize?: 18 | 24 | 36 | 48;
    onClick?(ev: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}

const StyledIconContainer = styled.span<Pick<IIconProps, 'iconSize'>>`
    font-size: ${(props) => `${props.iconSize ?? 24}px`};
    color: #fff;
    cursor: pointer;

    /* Rules for using icons as black on a light background. */
    .material-icons.md-dark { color: rgba(0, 0, 0, 0.54); }
    .material-icons.md-dark.md-inactive { color: rgba(0, 0, 0, 0.26); }

    /* Rules for using icons as white on a dark background. */
    .material-icons.md-light { color: rgba(255, 255, 255, 1); }
    .material-icons.md-light.md-inactive { color: rgba(255, 255, 255, 0.3); }
`;

export const Icon = React.memo((props: IIconProps) => {
    const { iconName, iconSize, className, onClick } = props;
    return (
        <StyledIconContainer className={className} iconSize={iconSize} onClick={onClick}>{iconName}</StyledIconContainer>
    )
})