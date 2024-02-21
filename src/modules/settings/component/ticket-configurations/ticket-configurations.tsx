import { TaskOutlined, Tune } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ICategoryOptions {
    route: string;
    label: string;
    uniqueKey: string;
}

interface IConfigCategory {
    categoryName: string;
    categoryIcon: () => JSX.Element;
    categoryOptions: ICategoryOptions[];
}

const configurations = [
    {
        categoryName: "Tickets",
        categoryIcon: () => <TaskOutlined color="primary" />,
        categoryOptions: [
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
    },
    {
        categoryName: "General",
        categoryIcon: () => <Tune color="primary" />,
        categoryOptions: [
            {
                route: "access-configuration",
                label: "Access Configuration",
                uniqueKey: "general-access-configuration"
            },
            {
                route: "ticket-filter",
                label: "Chat Configuration",
                uniqueKey: "general-ticket-filter"
            },
            {
                route: "ticket-escalation",
                label: "Product Configuration",
                uniqueKey: "general-ticket-escalation2"
            },
            {
                route: "ticket-queue",
                label: "Agent Assistant Configuration",
                uniqueKey: "general-ticket-queue1"
            }, {
                route: "access-configuration",
                label: "Dashboard Configuration",
                uniqueKey: "general-access-configuration1"
            },
            {
                route: "ticket-filter",
                label: "Gen AI Configuration",
                uniqueKey: "general-ticket-filter1"
            },
            {
                route: "ticket-escalation",
                label: "Ticket Escalation",
                uniqueKey: "general-ticket-escalation1"
            },
            {
                route: "ticket-queue",
                label: "Ticket Queue",
                uniqueKey: "general-ticket-queue2"
            }
        ]
    },

] as IConfigCategory[]

const ConfigLinkWrapper = styled.div`
    :hover {
        background: ${(props) => props.theme.pallete.purpleLight};
    }
    background-color: white;
`;

const OptionWrapper = styled(FlexBox)`
  padding: 0 15px;
  cursor: pointer;
  border-radius: 5px;
  border: 1px solid #e3e3e3;
  height: 50px;
`;

const TicketConfigOptions = (props: ICategoryOptions) => {
    const { label, route } = props;
    const navigate = useNavigate();
    const OnLinkClick = () => {
        navigate(route);
    }

    return (
        <ConfigLinkWrapper onClick={OnLinkClick}>
            <OptionWrapper alignItems="center" justifyContent="center">
                <Typography variant="body3"> {label} </Typography>
            </OptionWrapper>
        </ConfigLinkWrapper>
    )
}

export const TicketsConfiguration = () => {
    return (
        <>
            {
                configurations.map((data) =>
                (
                    <FlexBox padding="20px" flexDirection="column" gap="10px" width="100%" key={data.categoryName}>
                        <FlexBox alignItems="center" gap="5px" padding="0 10px">
                            {data.categoryIcon()}
                            <Typography variant="h5">
                                {data.categoryName}
                            </Typography>
                        </FlexBox>
                        <GridLayout $padding="10px" $gridGap="10px" $gridTemplateColumns={"repeat(6, 1fr)"}>
                            {data.categoryOptions.map((categoryData) => <TicketConfigOptions key={categoryData.uniqueKey} uniqueKey={categoryData.uniqueKey} label={categoryData.label} route={categoryData.route} />)}
                        </GridLayout>
                    </FlexBox>
                ))
            }
        </>

    )
}