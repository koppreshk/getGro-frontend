import { useMemo } from 'react';
import {
    TaskOutlined, Tag, AccountCircle, WorkHistory, LockPerson, Facebook, SellOutlined,
    GridViewRounded, StoreRounded, ThumbsUpDown, SettingsRounded, SupportAgentRounded,
    Groups2Outlined, EventNoteOutlined, AssignmentTurnedInOutlined
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
                description: "Create your ticket status for efficient ticket routing"
            },
            {
                route: "disposition-type",
                label: "Disposition Type",
                uniqueKey: "disposition-type",
                catOptionIcon: () => <AssignmentTurnedInOutlined />,
                description: "Create your ticket dipositon type for efficient ticket routing"
            },
            {
                route: "ticket-escalation",
                label: "Ticket Escalation",
                uniqueKey: "ticket-escalation",
                catOptionIcon: () => <EventNoteOutlined />,
                description: "Streamline ticket management: Automate categorization and routing with custom rules"
            },
            {
                route: "ticket-queue",
                label: "Ticket Queue",
                uniqueKey: "ticket-queue",
                catOptionIcon: () => <Groups2Outlined />,
                description: "Organizing agents based on their expertise to address specific ticket types"
            },
            {
                route: "tags",
                label: "Tags",
                uniqueKey: "tags",
                catOptionIcon: () => <SellOutlined />,
                description: "Label your tickets for better organizing and reporting"
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
                description: 'Configure facebook'
            }
        ]
    },
    {
        categoryName: "Users and Permissions",
        categoryIcon: () => <AccountCircle color="primary" />,
        categoryOptions: [
            {
                route: "users",
                label: "Users",
                uniqueKey: "users",
                catOptionIcon: () => <SupportAgentRounded />,
                description: "Add user and assign them roles"
            },
            {
                route: "roles-and-permissions",
                label: "Roles and Permissions",
                uniqueKey: "roles-and-permissions",
                catOptionIcon: () => <LockPerson />,
                description: "Create custom roles for agents with specific permissions"
            },
            {
                route: "agent-availability",
                label: "Agent Availability Status",
                uniqueKey: "agent-availability",
                catOptionIcon: () => <WorkHistory />,
                description: "Add, edit or remove an agents avaibilility status"
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
                description: "Set up customer satisfaction survey for the ticket",
                catOptionIcon: () => <ThumbsUpDown />
            }
        ]
    },
    {
        categoryName: "Apps",
        categoryIcon: () => <GridViewRounded color="primary" />,
        categoryOptions: [

            {
                route: "my-apps",
                label: "My Apps",
                uniqueKey: "my-apps",
                description: "View and manage the installed marketplace and custom apps",
                catOptionIcon: () => <GridViewRounded />
            },
            {
                route: "marketplace",
                label: "Marketplace",
                uniqueKey: "marketplace",
                catOptionIcon: () => <StoreRounded />,
                description: "Manage and integrate third-party applications"
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