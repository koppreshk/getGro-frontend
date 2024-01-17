/// <reference types="vite-plugin-svgr/client" />

import { Typography } from "@mui/material"
import { CustomIconButton, FlexBox, PopoverWithBeak } from "lib/ui-ux"
import styled from 'styled-components';
import { useState } from "react";
import DonutIcon from '../../../../assets/svg/donut-chart.svg?react'

const StatsContainer = styled(FlexBox)`
    padding: 20px;
    border-radius: 8px;
`;

const data = [
    {
        dataType: 'openTickets',
        headerLabel: `Open Tickets (current)`,
        dataValues: [
            {
                label: 'YOU',
                value: 0
            },
            {
                label: 'GROUPS',
                value: 14
            }
        ]
    },
    {
        dataType: 'ticketStatistics',
        headerLabel: `Ticket Statistics (this week)`,
        dataValues: [
            {
                label: 'GOOD',
                value: 0
            },
            {
                label: 'BAD',
                value: 1
            },
            {
                label: 'SOLVED',
                value: 1
            }
        ]
    }
];

export const AgentStatistics = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <>
            <CustomIconButton iconComponent={<DonutIcon />} tooltipProps={{ title: 'Quick Stats' }} onClick={handleClick} />
            <PopoverWithBeak
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}>
                <StatsContainer gap="15px" flexDirection="column">
                    {data.map((item) => <StatsMiniBlock item={item} key={item.dataType} />)}
                </StatsContainer>
            </PopoverWithBeak>
        </>
    )
}

interface IStatsMiniBlockProps {
    item: {
        dataType: string;
        headerLabel: string;
        dataValues: {
            label: string;
            value: number;
        }[];
    }
}

const StyledFlexbox = styled(FlexBox)`
    border: 1px solid ${(props) => props.theme.pallete.grayVariant1};
    border-radius: 8px;
    width: fit-content;
    .stats-mini-block-child {
        border-right: 1px solid ${(props) => props.theme.pallete.grayVariant1};
    }
    .stats-mini-block-child:last-child{
        border-right: none;
    }
`;

const StatsMiniBlock = (props: IStatsMiniBlockProps) => {
    const { item } = props;
    return (
        <FlexBox gap="5px" flexDirection="column">
            <Typography variant="h6">{item.headerLabel}</Typography>
            <StyledFlexbox>
                {item.dataValues.map((arg) => (
                    <FlexBox flexDirection="column" className="stats-mini-block-child" alignItems="center" key={arg.label} width="75px" justifyContent="center" padding="4px">
                        <Typography variant="h6">{arg.value}</Typography>
                        <Typography variant="body2">{arg.label}</Typography>
                    </FlexBox>
                )
                )}
            </StyledFlexbox>
        </FlexBox>
    )
}