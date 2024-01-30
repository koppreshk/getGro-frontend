import { TaskOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const ticketConfigOptions = [
    {
        route: "disposition-type",
        label: "Disposition Type",
        uniqueKey: "disposition-type"
    },
    {
        route: "ticket-filter",
        label: "Ticket Filter",
        uniqueKey: "ticket-filter"
    },
    {
        route: "ticket-escalation",
        label: "Ticket Escalation",
        uniqueKey: "ticket-escalation"
    },
    {
        route: "ticket-queue",
        label: "Ticket Queue",
        uniqueKey: "ticket-queue"
    }
]

const ConfigLinkWrapper = styled.div`
    :hover {
        background: ${(props) => props.theme.pallete.purpleLight};
    }
`;

const OptionWrapper = styled.div`
  padding: 8px 5px;
  cursor: pointer;
  box-sizing: border-box;
`;

interface ITicketConfigOptionsProps {
    route: string;
    label: string;
    uniqueKey: string;
}

const TicketConfigOptions = (props: ITicketConfigOptionsProps) => {
    const { label, route } = props;
    const navigate = useNavigate();
    const OnLinkClick = () => {
        navigate(route);
    }

    return (
        <ConfigLinkWrapper onClick={OnLinkClick}>
            <OptionWrapper>
                <Typography variant="body3"> {label} </Typography>
            </OptionWrapper>
        </ConfigLinkWrapper>
    )
}

export const TicketsConfiguration = () => {
    return (
        <FlexBox padding="20px" flexDirection="column" gap="10px">
            <FlexBox alignItems="center" gap="5px">
                <TaskOutlined color="primary" />
                <Typography variant="h5">
                    Tickets
                </Typography>
            </FlexBox>

            <FlexBox flexDirection="column">
                {ticketConfigOptions.map((data) => <TicketConfigOptions key={data.uniqueKey} uniqueKey={data.uniqueKey} label={data.label} route={data.route} />)}
            </FlexBox>
        </FlexBox>
    )
}