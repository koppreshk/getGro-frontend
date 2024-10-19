import { useMemo } from 'react';
import {
    TaskOutlined, Tag, AccountCircle, WorkHistory, LockPerson, Facebook, SellOutlined,
    GridViewRounded, StoreRounded, ThumbsUpDown, SettingsRounded, SupportAgentRounded,
    Groups2Outlined, EventNoteOutlined, AssignmentTurnedInOutlined, Email, ManageHistory,
    ConfirmationNumber, AddCommentOutlined, PendingActions, Instagram
} from "@mui/icons-material";
import styled from "styled-components";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Typography } from "@mui/material";
import { FlexBox, GridLayout } from "lib/ui-ux";
import { useTranslation } from 'react-i18next';
import { useFeature } from 'lib/hooks';
import React from 'react';

interface ICategoryOptions {
    route: string;
    label: string;
    uniqueKey: string;
    description?: string;
    hidden?: boolean;
    catOptionIcon?: () => JSX.Element;
}

interface IConfigCategory {
    categoryName: string;
    categoryIcon: () => JSX.Element;
    categoryOptions: ICategoryOptions[];
}

const useConfigurations = () => {
    const { t } = useTranslation();
    const isFeatureAccessible = useFeature(undefined);

    return [
        {
            categoryName: t("tickets"),
            categoryIcon: () => <TaskOutlined color="primary" />,
            categoryOptions: [
                {
                    route: "ticket-status",
                    label: t("ticket_status"),
                    uniqueKey: "ticket-status",
                    catOptionIcon: () => <AssignmentTurnedInOutlined />,
                    hidden: !isFeatureAccessible('manage_ticket_status'),
                    description: t("ticket_status_short_description")
                },
                {
                    route: "tags",
                    label: t("tags"),
                    uniqueKey: "tags",
                    catOptionIcon: () => <SellOutlined />,
                    hidden: !isFeatureAccessible('manage_tags'),
                    description: t("tags_short_description")
                },
                {
                    route: "templates",
                    label: t("templates"),
                    uniqueKey: "templates",
                    catOptionIcon: () => <AddCommentOutlined />,
                    description: t("templates_short_description")
                }
            ]
        },
        {
            categoryName: t("channels"),
            categoryIcon: () => <Tag color="primary" />,
            categoryOptions: [
                {
                    label: t("facebook"),
                    route: 'facebook',
                    uniqueKey: 'facebook',
                    catOptionIcon: () => <Facebook />,
                    hidden: false,
                    description: t("facebook_short_description")
                },
                {
                    label: t("instagram"),
                    route: 'instagram',
                    uniqueKey: 'instagram',
                    catOptionIcon: () => <Instagram />,
                    hidden: false,
                    description: t("instagram_short_description")
                },
                {
                    label: t("email"),
                    route: 'email',
                    uniqueKey: 'email',
                    catOptionIcon: () => <Email />,
                    hidden: !isFeatureAccessible('manage_email'),
                    description: t("email_short_description")
                }
            ]
        },
        {
            categoryName: t("ticket_automation"),
            categoryIcon: () => <ManageHistory color="primary" />,
            categoryOptions: [
                {
                    route: "ticket-escalation",
                    label: t("ticket_escalation"),
                    uniqueKey: "ticket-escalation",
                    catOptionIcon: () => <EventNoteOutlined />,
                    hidden: !isFeatureAccessible('manage_ticket_escalation'),
                    description: t("ticket_escalation_short_description")
                },
                {
                    route: "auto-assignments",
                    label: t("auto_assignments"),
                    uniqueKey: "auto-assignments",
                    catOptionIcon: () => <ManageHistory />,
                    hidden: !isFeatureAccessible('manage_auto_assignments'),
                    description: t("auto_assignments_short_description")
                },
                {
                    route: "create-ticket-triggers",
                    label: t("create_ticket_triggers"),
                    uniqueKey: "create-ticket-triggers",
                    catOptionIcon: () => <ConfirmationNumber />,
                    hidden: !isFeatureAccessible('manage_create_ticket_triggers'),
                    description: t("create_ticket_triggers_short_description")
                },
                {
                    route: "update-ticket-triggers",
                    label: t("update_ticket_triggers"),
                    uniqueKey: "update-ticket-triggers",
                    catOptionIcon: () => <ConfirmationNumber />,
                    hidden: !isFeatureAccessible('manage_update_ticket_triggers'),
                    description: t("update_ticket_triggers_short_description")
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
            categoryName: t("users_and_permissions"),
            categoryIcon: () => <AccountCircle color="primary" />,
            categoryOptions: [
                {
                    route: "agents",
                    label: t("agents"),
                    uniqueKey: "Agents",
                    catOptionIcon: () => <SupportAgentRounded />,
                    hidden: !isFeatureAccessible('manage_agents'),
                    description: t("agents_short_description")
                },
                {
                    route: "queues",
                    label: t("queues_groups"),
                    uniqueKey: "queues",
                    catOptionIcon: () => <Groups2Outlined />,
                    hidden: !isFeatureAccessible('manage_queues'),
                    description: t("queues_short_description")
                },
                {
                    route: "roles-and-permissions",
                    label: t("roles_and_permissions"),
                    uniqueKey: "roles-and-permissions",
                    catOptionIcon: () => <LockPerson />,
                    hidden: !isFeatureAccessible('manage_roles_permissions'),
                    description: t("roles_and_permissions_short_description")
                },
                {
                    route: "agent-availability",
                    label: t("agent_availability_status"),
                    uniqueKey: "agent-availability",
                    catOptionIcon: () => <WorkHistory />,
                    hidden: !isFeatureAccessible('manage_agent_availability_statuses'),
                    description: t("agent_availability_status_short_description")
                },
            ]
        },
        {
            categoryName: t("general"),
            categoryIcon: () => <SettingsRounded color="primary" />,
            categoryOptions: [

                {
                    route: "satisfaction-survey",
                    label: t("satisfaction_survey"),
                    uniqueKey: "satisfaction-survey",
                    description: t("satisfaction_survey_short_description"),
                    hidden: true,
                    catOptionIcon: () => <ThumbsUpDown />
                },
                {
                    route: "audit-logs",
                    label: t("audit_logs"),
                    uniqueKey: "audit-logs",
                    description: t("audit_logs_short_description"),
                    hidden: !isFeatureAccessible('manage_audit_logs'),
                    catOptionIcon: () => <PendingActions />
                }
            ]
        },
        {
            categoryName: t("apps"),
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
                    label: t("marketplace"),
                    uniqueKey: "marketplace",
                    catOptionIcon: () => <StoreRounded />,
                    hidden: !isFeatureAccessible('manage_marketplace'),
                    description: t("marketplace_short_description")
                }
            ]
        },

    ] as IConfigCategory[]
}

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
    const configurations = useConfigurations();

    const filteredConfig = useMemo(() => searchText ? configurations.reduce((acc, curr) => {
        const filteredCats = curr.categoryOptions.filter((catOption) => catOption.label.toLowerCase().includes(searchText.toLowerCase()))
        if (filteredCats.length) {
            acc.push({ ...curr, categoryOptions: filteredCats })
        }
        return acc;
    }, [] as IConfigCategory[]) : configurations, [configurations, searchText]);

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
                            (<React.Fragment key={categoryData.uniqueKey}>
                                {categoryData.hidden ? null : <TicketConfigOptions
                                    uniqueKey={categoryData.uniqueKey}
                                    label={categoryData.label} route={categoryData.route}
                                    description={categoryData.description} catOptionIcon={categoryData.catOptionIcon} />}
                            </React.Fragment>
                            )
                            )}
                        </GridLayout>
                    </FlexBox>
                ))
            }
        </>

    )
}