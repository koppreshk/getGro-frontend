import { useMemo } from 'react';
import {
    TaskOutlined, Tag, AccountCircle, WorkHistory, LockPerson, Facebook, SellOutlined,
    GridViewRounded, StoreRounded, ThumbsUpDown, SettingsRounded, SupportAgentRounded,
    Groups2Outlined, EventNoteOutlined, AssignmentTurnedInOutlined, Email, ManageHistory,
    ConfirmationNumber, AddCommentOutlined, PendingActions
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
                    label: t("modules.configurations.configurationOptions.tickets.templates.label"),
                    uniqueKey: "templates",
                    catOptionIcon: () => <AddCommentOutlined />,
                    description: t("modules.configurations.configurationOptions.tickets.templates.shortDescription")
                }
            ]
        },
        {
            categoryName: t("modules.configurations.configurationOptions.channels.primaryLabel"),
            categoryIcon: () => <Tag color="primary" />,
            categoryOptions: [
                {
                    label: t("modules.configurations.configurationOptions.channels.facebook.label"),
                    route: 'facebook',
                    uniqueKey: 'facebook',
                    catOptionIcon: () => <Facebook />,
                    hidden: true,
                    description: t("modules.configurations.configurationOptions.channels.facebook.shortDescription")
                },
                {
                    label: t("modules.configurations.configurationOptions.channels.email.label"),
                    route: 'email',
                    uniqueKey: 'email',
                    catOptionIcon: () => <Email />,
                    hidden: !isFeatureAccessible('manage_email'),
                    description: t("modules.configurations.configurationOptions.channels.email.shortDescription")
                }
            ]
        },
        {
            categoryName: t("modules.configurations.configurationOptions.ticketAutomation.primaryLabel"),
            categoryIcon: () => <ManageHistory color="primary" />,
            categoryOptions: [
                {
                    route: "ticket-escalation",
                    label: t("modules.configurations.configurationOptions.ticketAutomation.ticketEscalation.label"),
                    uniqueKey: "ticket-escalation",
                    catOptionIcon: () => <EventNoteOutlined />,
                    hidden: !isFeatureAccessible('manage_ticket_escalation'),
                    description: t("modules.configurations.configurationOptions.ticketAutomation.ticketEscalation.shortDescription")
                },
                {
                    route: "auto-assignments",
                    label: t("modules.configurations.configurationOptions.ticketAutomation.autoAssignments.label"),
                    uniqueKey: "auto-assignments",
                    catOptionIcon: () => <ManageHistory />,
                    hidden: !isFeatureAccessible('manage_auto_assignments'),
                    description: t("modules.configurations.configurationOptions.ticketAutomation.autoAssignments.shortDescription")
                },
                {
                    route: "create-ticket-triggers",
                    label: t("modules.configurations.configurationOptions.ticketAutomation.createTicketTriggers.label"),
                    uniqueKey: "create-ticket-triggers",
                    catOptionIcon: () => <ConfirmationNumber />,
                    hidden: !isFeatureAccessible('manage_create_ticket_triggers'),
                    description: t("modules.configurations.configurationOptions.ticketAutomation.createTicketTriggers.shortDescription")
                },
                {
                    route: "update-ticket-triggers",
                    label: t("modules.configurations.configurationOptions.ticketAutomation.updateTicketTriggers.label"),
                    uniqueKey: "update-ticket-triggers",
                    catOptionIcon: () => <ConfirmationNumber />,
                    hidden: !isFeatureAccessible('manage_update_ticket_triggers'),
                    description: t("modules.configurations.configurationOptions.ticketAutomation.updateTicketTriggers.shortDescription")
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
            categoryName: t("modules.configurations.configurationOptions.usersAndPermissions.primaryLabel"),
            categoryIcon: () => <AccountCircle color="primary" />,
            categoryOptions: [
                {
                    route: "agents",
                    label: t("modules.configurations.configurationOptions.usersAndPermissions.agents.label"),
                    uniqueKey: "Agents",
                    catOptionIcon: () => <SupportAgentRounded />,
                    hidden: !isFeatureAccessible('manage_agents'),
                    description: t("modules.configurations.configurationOptions.usersAndPermissions.agents.shortDescription")
                },
                {
                    route: "queues",
                    label: t("modules.configurations.configurationOptions.usersAndPermissions.queues.label"),
                    uniqueKey: "queues",
                    catOptionIcon: () => <Groups2Outlined />,
                    hidden: !isFeatureAccessible('manage_queues'),
                    description: t("modules.configurations.configurationOptions.usersAndPermissions.queues.shortDescription")
                },
                {
                    route: "roles-and-permissions",
                    label: t("modules.configurations.configurationOptions.usersAndPermissions.rolesAndPermissions.label"),
                    uniqueKey: "roles-and-permissions",
                    catOptionIcon: () => <LockPerson />,
                    hidden: !isFeatureAccessible('manage_roles_permissions'),
                    description: t("modules.configurations.configurationOptions.usersAndPermissions.rolesAndPermissions.shortDescription")
                },
                {
                    route: "agent-availability",
                    label: t("modules.configurations.configurationOptions.usersAndPermissions.agentAvailabilityStatus.label"),
                    uniqueKey: "agent-availability",
                    catOptionIcon: () => <WorkHistory />,
                    hidden: !isFeatureAccessible('manage_agent_availability_statuses'),
                    description: t("modules.configurations.configurationOptions.usersAndPermissions.agentAvailabilityStatus.shortDescription")
                },
            ]
        },
        {
            categoryName: t("modules.configurations.configurationOptions.general.primaryLabel"),
            categoryIcon: () => <SettingsRounded color="primary" />,
            categoryOptions: [

                {
                    route: "satisfaction-survey",
                    label: t("modules.configurations.configurationOptions.general.satisfactionSurvey.label"),
                    uniqueKey: "satisfaction-survey",
                    description: t("modules.configurations.configurationOptions.general.satisfactionSurvey.shortDescription"),
                    hidden: true,
                    catOptionIcon: () => <ThumbsUpDown />
                },
                {
                    route: "audit-logs",
                    label: t("modules.configurations.configurationOptions.general.auditLogs.label"),
                    uniqueKey: "audit-logs",
                    description: t("modules.configurations.configurationOptions.general.auditLogs.shortDescription"),
                    hidden: !isFeatureAccessible('manage_audit_logs'),
                    catOptionIcon: () => <PendingActions />
                }
            ]
        },
        {
            categoryName: t("modules.configurations.configurationOptions.apps.primaryLabel"),
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
                    label: t("modules.configurations.configurationOptions.apps.marketplace.label"),
                    uniqueKey: "marketplace",
                    catOptionIcon: () => <StoreRounded />,
                    hidden: !isFeatureAccessible('manage_marketplace'),
                    description: t("modules.configurations.configurationOptions.apps.marketplace.shortDescription")
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