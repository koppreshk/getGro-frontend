import { TurnLeft, TurnRight } from "@mui/icons-material"
import { Tooltip, IconButton } from "@mui/material"
import { useMemo } from "react"

interface IEmailThreadOptionsProps {
    onReplyClick: React.MouseEventHandler<HTMLButtonElement>;
    onForwardClick: React.MouseEventHandler<HTMLButtonElement>;
}

export const EmailThreadOptions = (props: IEmailThreadOptionsProps) => {
    const { onReplyClick, onForwardClick } = props;
    const threadOptions = useMemo(() => ([
        {
            title: 'Reply',
            onClick: onReplyClick,
            renderIcon: () => <TurnLeft />
        },
        {
            title: 'Forward',
            onClick: onForwardClick,
            renderIcon: () => <TurnRight />
        }
    ]), [onForwardClick, onReplyClick])

    return (
        <>
            {threadOptions.map((option) => (
                <Tooltip title={option.title} key={option.title} arrow placement="right">
                    <IconButton sx={{ padding: 0 }} onClick={option.onClick}>
                        {option.renderIcon()}
                    </IconButton>
                </Tooltip>)
            )}
        </>
    )
}