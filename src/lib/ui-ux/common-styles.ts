import { css } from "styled-components";

export const commonStyles = {
    sleekScrollStyle: css`
        *::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: ${props => props.theme.others.scrollContainerColor};
        }
        *::-webkit-scrollbar-thumb {
            border-radius: 8px;
            box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: ${props => props.theme.others.scrollHandleColor};
        }
        &::-webkit-scrollbar {
            width: 6px;
            height: 6px;
            background-color: ${props => props.theme.others.scrollContainerColor};
        }
        &::-webkit-scrollbar-thumb {
            border-radius: 8px;
            box-shadow: inset 0 0 6px rgba(0,0,0,.3);
            background-color: ${props => props.theme.others.scrollHandleColor};
        }
    `,
    textOverflow: css`
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    `,
}