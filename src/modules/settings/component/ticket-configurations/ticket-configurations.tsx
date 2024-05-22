import { TaskOutlined, Tune, Tag } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { useNavigate, useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { useMemo } from 'react';
import ThumbsUpDownIcon from '@mui/icons-material/ThumbsUpDown';

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
                route: "disposition-type",
                label: "Disposition Type",
                uniqueKey: "disposition-type",
                description: "Create your ticket dipositon type for efficient ticket routing"
            },
            {
                route: "ticket-filter",
                label: "Ticket Filter",
                uniqueKey: "ticket-filter",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing."
            },
            {
                route: "ticket-escalation",
                label: "Ticket Escalation",
                uniqueKey: "ticket-escalation",
                description: "Streamline ticket management: Automate categorization and routing with custom rules"
            },
            {
                route: "ticket-queue",
                label: "Ticket Queue",
                uniqueKey: "ticket-queue",
                description: "Organizing agents based on their expertise to address specific ticket types"
            },
            {
                route: "tags",
                label: "Tags",
                uniqueKey: "tags",
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
                description: 'Configure facebook'
            }
        ]
    },
    {
        categoryName: "Users and Permissions",
        categoryIcon: () => <Tune color="primary" />,
        categoryOptions: [
            {
                route: "users",
                label: "Users",
                uniqueKey: "users",
                description: "Add user and assign them roles"
            },
            {
                route: "roles-and-permissions",
                label: "Roles and Permissions",
                uniqueKey: "roles-and-permissions",
                description: "Create custom roles for agents with specific permissions"
            },
            {
                route: "agent-availability",
                label: "Agent Availability Status",
                uniqueKey: "agent-availability",
                description: "Add, edit or remove an agents avaibilility status"
            },
        ]
    },
    {
        categoryName: "General",
        categoryIcon: () => <Tune color="primary" />,
        categoryOptions: [

            {
                route: "satisfaction-survey",
                label: "Satisfaction Survey",
                uniqueKey: "satisfaction-survey",
                description: "Set up customer satisfaction survey for the ticket",
                catOptionIcon: () => <ThumbsUpDownIcon />
            },
            {
                route: "access-configuration",
                label: "Dashboard Configuration",
                uniqueKey: "general-access-configuration1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
            },
            {
                route: "ticket-filter",
                label: "Gen AI Configuration",
                uniqueKey: "general-ticket-filter1",
                description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod."
            },
        ]
    },

] as IConfigCategory[]

const ConfigLinkWrapper = styled.div`
    &:hover {
        background: ${(props) => props.theme.pallete.grayVariant5};
        box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
        .config-name {
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
                <FlexBox flexDirection="column">
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