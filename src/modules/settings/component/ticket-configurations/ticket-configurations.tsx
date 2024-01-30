import { TaskOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FlexBox } from "lib/ui-ux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";


const ticketConfigOptions = [
    {
        route: "disposition-type",
        label: "Disposition Type",
        key: "disposition-type"
    },
    {
        route: "ticket-filter",
        label: "Ticket Filter",
        key: "ticket-filter"
    },
    {
        route: "ticket-escalation",
        label: "Ticket Escalation",
        key: "ticket-escalation"
    },
    {
        route: "ticket-queue",
        label: "Ticket Queue",
        key: "ticket-queue"
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
    key: string;
}

const TicketConfigOptions = (props: ITicketConfigOptionsProps) => {
    const { key, label, route } = props;
    const navigate = useNavigate();
    const OnLinkClick = () => {
        navigate(route);
    }
    
    return (

        <ConfigLinkWrapper onClick={OnLinkClick} key={key}>
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
                {ticketConfigOptions.map((data) => <TicketConfigOptions key={data.key} label={data.label} route={data.route} />)}
            </FlexBox>
        </FlexBox>
    )
}