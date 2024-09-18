export enum TicketPermissionKeys {
    ADD_TICKET = "add_ticket",
    REPLY_TICKET = "reply_ticket",
    EDIT_PRIORITY = "edit_priority",
    EDIT_ASSIGNEE = "edit_assignee",
    EDIT_STATUS = "edit_status",
    EDIT_TAGS = "edit_tags",
    SPLIT_TICKET = "split_ticket",
    MANAGE_NOTES = "manage_notes",
    MERGE_TICKET = "merge_ticket",
}

export enum ConfigurationPermissionKeys {
    MANAGE_TICKET_STATUS = "manage_ticket_status",
    MANAGE_TAGS = "manage_tags",
    MANAGE_EMAIL = "manage_email",
    MANAGE_TICKET_ESCALATION = "manage_ticket_escalation",
    MANAGE_AUTO_ASSIGNMENTS = "manage_auto_assignments",
    MANAGE_CREATE_TICKET_TRIGGERS = "manage_create_ticket_triggers",
    MANAGE_UPDATE_TICKET_TRIGGERS = "manage_update_ticket_triggers",
    MANAGE_AGENTS = "manage_agents",
    MANAGE_QUEUES = "manage_queues",
    MANAGE_ROLES_PERMISSIONS = "manage_roles_permissions",
    MANAGE_AGENT_AVAILABILITY_STATUSES = "manage_agent_availability_statuses",
    MANAGE_AUDIT_LOGS = "manage_audit_logs",
    MANAGE_MARKETPLACE = "manage_marketplace"
}

export type AllPermissionKeys = `${TicketPermissionKeys}` | `${ConfigurationPermissionKeys}`

export enum ModuleKeys {
    TICKETS = 'TICKETS',
    CONFIGURATIONS = 'CONFIGURATIONS',
    DASHBOARDS = 'DASHBOARDS'
}
