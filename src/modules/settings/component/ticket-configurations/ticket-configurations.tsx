import { useMemo } from 'react';
import {
    TaskOutlined, Tag, AccountCircle, WorkHistory, LockPerson, Facebook, SellOutlined,
    GridViewRounded, StoreRounded, ThumbsUpDown, SettingsRounded, SupportAgentRounded,
    Groups2Outlined, EventNoteOutlined, AssignmentTurnedInOutlined, Email, ManageHistory,
    ConfirmationNumber, AddCommentOutlined
} from "@mui/icons-material";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";

interface ICategoryOptions {
    route: string;
    label: string;
    uniqueKey: string;
    description?: string;
    catOptionIcon?: () => JSX.Element;
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
                route: "ticket-status",
                label: "Ticket Status",
                uniqueKey: "ticket-status",
                catOptionIcon: () => <AssignmentTurnedInOutlined />,
                description: "Define your ticket statuses to streamline and optimize the routing of support tickets"
            },
            {
                route: "tags",
                label: "Tags",
                uniqueKey: "tags",
                catOptionIcon: () => <SellOutlined />,
                description: "Tag your tickets to enhance organization and improve reporting."
            },
            {
                route: "templates",
                label: "Templates",
                uniqueKey: "templates",
                catOptionIcon: () => <AddCommentOutlined />,
                description: "Maintain and organize a library of predefined templates for responding to tickets."
            }
        ]
    },
    {
        categoryName: 'Channels',
        categoryIcon: () => <Tag color="primary" />,
        categoryOptions: [
            {
                label: 'Facebook',
                route: 'facebook',
                uniqueKey: 'facebook',
                catOptionIcon: () => <Facebook />,
                description: 'Set up your Facebook integration.'
            },
            {
                label: 'Email',
                route: 'email',
                uniqueKey: 'email',
                catOptionIcon: () => <Email />,
                description: 'Configure support email inboxes to automate ticket creation and management.'
            }
        ]
    },
    {
        categoryName: "Ticket Automation",
        categoryIcon: () => <ManageHistory color="primary" />,
        categoryOptions: [
            {
                route: "ticket-escalation",
                label: "Ticket Escalation",
                uniqueKey: "ticket-escalation",
                catOptionIcon: () => <EventNoteOutlined />,
                description: "Simplify ticket handling: Use custom rules to automatically categorize and route tickets."
            },
            {
                route: "auto-assignments",
                label: "Auto Assignments",
                uniqueKey: "auto-assignments",
                catOptionIcon: () => <ManageHistory />,
                description: "Establish automated rules to assign tickets to agents efficiently"
            },
            {
                route: "create-ticket-triggers",
                label: "Create Ticket Triggers",
                uniqueKey: "create-ticket-triggers",
                catOptionIcon: () => <ConfirmationNumber />,
                description: "Configure automation rules to trigger actions automatically when a ticket is created"
            },
            {
                route: "update-ticket-triggers",
                label: "Update Ticket Triggers",
                uniqueKey: "update-ticket-triggers",
                catOptionIcon: () => <ConfirmationNumber />,
                description: "Configure automation rules to trigger actions whenever a ticket is updated."
            },
            // {
            //     route: "time-triggers",
            //     label: "Time Triggers",
            //     uniqueKey: "time-triggers",
            //     catOptionIcon: () => <MoreTime />,
            //     description: "Setup automation rules to perform repeated actions over time"
            // },
        ]
    },
    {
        categoryName: "Users and Permissions",
        categoryIcon: () => <AccountCircle color="primary" />,
        categoryOptions: [
            {
                route: "agents",
                label: "Agents",
                uniqueKey: "Agents",
                catOptionIcon: () => <SupportAgentRounded />,
                description: "Modify, add, or deactivate an agent as needed."
            },
            {
                route: "queues",
                label: "Queues (Groups)",
                uniqueKey: "queues",
                catOptionIcon: () => <Groups2Outlined />,
                description: "Arrange agents according to their areas of expertise to handle specific types of tickets more effectively."
            },
            {
                route: "roles-and-permissions",
                label: "Roles and Permissions",
                uniqueKey: "roles-and-permissions",
                catOptionIcon: () => <LockPerson />,
                description: "Establish custom roles for agents with tailored permissions to meet your needs."
            },
            {
                route: "agent-availability",
                label: "Agent Availability Status",
                uniqueKey: "agent-availability",
                catOptionIcon: () => <WorkHistory />,
                description: "Manage an agent's availability by adding, editing, or removing their status."
            },
        ]
    },
    {
        categoryName: "General",
        categoryIcon: () => <SettingsRounded color="primary" />,
        categoryOptions: [

            {
                route: "satisfaction-survey",
                label: "Satisfaction Survey",
                uniqueKey: "satisfaction-survey",
                description: "Implement a customer satisfaction survey for each ticket to gather feedback and measure service quality.",
                catOptionIcon: () => <ThumbsUpDown />
            }
        ]
    },
    {
        categoryName: "Apps",
        categoryIcon: () => <GridViewRounded color="primary" />,
        categoryOptions: [
            // {
            //     route: "my-apps",
            //     label: "My Apps",
            //     uniqueKey: "my-apps",
            //     description: "View and manage the installed marketplace and custom apps",
            //     catOptionIcon: () => <GridViewRounded />
            // },
            {
                route: "marketplace",
                label: "Marketplace",
                uniqueKey: "marketplace",
                catOptionIcon: () => <StoreRounded />,
                description: "Handle and integrate external applications seamlessly."
            }
        ]
    },

] as IConfigCategory[]

const ConfigLinkWrapper = styled.div`
    &:hover {
        background: ${(props) => props.theme.pallete.grayVariant5};
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        .MuiSvgIcon-root, .config-name {
            color: ${(props) => props.theme.pallete.primaryPurpleText};
        }
    }
    background-color: white;
`;

const OptionWrapper = styled(FlexBox)`
  padding: 10px 15px;
  cursor: pointer;
  border-radius: 5px;
  height: 85px;
  color: ${({ theme }) => theme.pallete.defaultTextColor};
`;

const TicketConfigOptions = (props: ICategoryOptions) => {
    const { label, route, description, catOptionIcon } = props;
    const navigate = useNavigate();
    const onLinkClick = () => {
        navigate(route);
    }

    return (
        <ConfigLinkWrapper onClick={onLinkClick}>
            <OptionWrapper flexDirection="row" gap="10px">
                {catOptionIcon && catOptionIcon()}
                <FlexBox flexDirection="column" width="calc(100% - 30px)">
                    <Typography variant="h5" className="config-name"> {label} </Typography>
                    <Typography variant="caption">{description}</Typography>
                </FlexBox>
            </OptionWrapper>
        </ConfigLinkWrapper>
    )
}

export const TicketsConfiguration = () => {
    const [searchParmas] = useSearchParams();
    const searchText = searchParmas.get('searchText');

    const filteredConfig = useMemo(() => searchText ? configurations.reduce((acc, curr) => {
        const filteredCats = curr.categoryOptions.filter((catOption) => catOption.label.toLowerCase().includes(searchText.toLowerCase()))
        if (filteredCats.length) {
            acc.push({ ...curr, categoryOptions: filteredCats })
        }
        return acc;
    }, [] as IConfigCategory[]) : configurations, [searchText]);

    return (
        <>
            {
                filteredConfig.map((data) =>
                (
                    <FlexBox padding="20px" flexDirection="column" gap="10px" width="100%" key={data.categoryName}>
                        <FlexBox alignItems="center" gap="5px" padding="0 10px">
                            {data.categoryIcon()}
                            <Typography variant="h4">
                                {data.categoryName}
                            </Typography>
                        </FlexBox>
                        <GridLayout $padding="10px" $gridGap="14px 12px" $gridTemplateColumns={"repeat(4, 1fr)"}>
                            {data.categoryOptions.map((categoryData) =>
                                <TicketConfigOptions key={categoryData.uniqueKey} uniqueKey={categoryData.uniqueKey}
                                    label={categoryData.label} route={categoryData.route} description={categoryData.description} catOptionIcon={categoryData.catOptionIcon} />)}
                        </GridLayout>
                    </FlexBox>
                ))
            }
        </>

    )
}