import { users, roles, permissions, role_permissions, projects, project_memberships, project_invites, board_columns, tasks, task_assignees, task_comments, task_attachments, labels, task_labels, checklists, checklist_items, activity_log } from "../models"

projects.belongsTo(users, { foreignKey: "owner_id" })
users.hasMany(projects, { foreignKey: "owner_id" })

project_memberships.belongsTo(projects, { foreignKey: "project_id", as: "project" })
projects.hasMany(project_memberships, { foreignKey: "project_id", as: "memberships" })

project_memberships.belongsTo(users, { foreignKey: "user_id", as: "user" })
users.hasMany(project_memberships, { foreignKey: "user_id", as: "user_memberships" })

project_memberships.belongsTo(roles, { foreignKey: "role_id", as: "role" })
roles.hasMany(project_memberships, { foreignKey: "role_id", as: "role_memberships" })

projects.belongsToMany(users, { through: project_memberships, foreignKey: "project_id", otherKey: "user_id", as: "members" })
users.belongsToMany(projects, { through: project_memberships, foreignKey: "user_id", otherKey: "project_id", as: "member_projects" })

role_permissions.belongsTo(roles, { foreignKey: "role_id", as: "role" })
roles.hasMany(role_permissions, { foreignKey: "role_id", as: "permission_assignments" })

role_permissions.belongsTo(permissions, { foreignKey: "permission_id", as: "permission" })
permissions.hasMany(role_permissions, { foreignKey: "permission_id", as: "role_assignments" })

roles.belongsToMany(permissions, { through: role_permissions, foreignKey: "role_id", otherKey: "permission_id", as: "permissions" })
permissions.belongsToMany(roles, { through: role_permissions, foreignKey: "permission_id", otherKey: "role_id", as: "roles" })

board_columns.belongsTo(projects, { foreignKey: "project_id" })
projects.hasMany(board_columns, { foreignKey: "project_id" })

tasks.belongsTo(projects, { foreignKey: "project_id" })
projects.hasMany(tasks, { foreignKey: "project_id" })

tasks.belongsTo(board_columns, { foreignKey: "column_id" })
board_columns.hasMany(tasks, { foreignKey: "column_id" })

tasks.belongsTo(users, { foreignKey: "created_by", as: "creator" })
users.hasMany(tasks, { foreignKey: "created_by", as: "created_tasks" })

task_assignees.belongsTo(tasks, { foreignKey: "task_id", as: "task" })
tasks.hasMany(task_assignees, { foreignKey: "task_id", as: "assignee_records" })

task_assignees.belongsTo(users, { foreignKey: "user_id", as: "assignee" })
users.hasMany(task_assignees, { foreignKey: "user_id", as: "task_assignments" })

tasks.belongsToMany(users, { through: task_assignees, foreignKey: "task_id", otherKey: "user_id", as: "assignees" })

users.belongsToMany(tasks, { through: task_assignees, foreignKey: "user_id", otherKey: "task_id", as: "assigned_tasks" })

task_comments.belongsTo(tasks, { foreignKey: "task_id" })
tasks.hasMany(task_comments, { foreignKey: "task_id" })

task_comments.belongsTo(users, { foreignKey: "author_id", as: "author" })
users.hasMany(task_comments, { foreignKey: "author_id", as: "comments" })

task_attachments.belongsTo(tasks, { foreignKey: "task_id" })
tasks.hasMany(task_attachments, { foreignKey: "task_id" })

task_attachments.belongsTo(users, { foreignKey: "uploader_id", as: "uploader" })
users.hasMany(task_attachments, { foreignKey: "uploader_id", as: "uploads" })

labels.belongsTo(projects, { foreignKey: "project_id" })
projects.hasMany(labels, { foreignKey: "project_id" })

task_labels.belongsTo(tasks, { foreignKey: "task_id", as: "task" })
tasks.hasMany(task_labels, { foreignKey: "task_id", as: "label_assignments" })

task_labels.belongsTo(labels, { foreignKey: "label_id", as: "label" })
labels.hasMany(task_labels, { foreignKey: "label_id", as: "task_assignments" })

tasks.belongsToMany(labels, { through: task_labels, foreignKey: "task_id", otherKey: "label_id", as: "labels" })

labels.belongsToMany(tasks, { through: task_labels, foreignKey: "label_id", otherKey: "task_id", as: "tasks" })

checklists.belongsTo(tasks, { foreignKey: "task_id" })
tasks.hasMany(checklists, { foreignKey: "task_id" })

checklist_items.belongsTo(checklists, { foreignKey: "checklist_id" })
checklists.hasMany(checklist_items, { foreignKey: "checklist_id" })

activity_log.belongsTo(projects, { foreignKey: "project_id" })
projects.hasMany(activity_log, { foreignKey: "project_id" })

activity_log.belongsTo(users, { foreignKey: "actor_id", as: "actor" })
users.hasMany(activity_log, { foreignKey: "actor_id", as: "activities" })

project_invites.belongsTo(projects, { foreignKey: "project_id" })
projects.hasMany(project_invites, { foreignKey: "project_id" })

project_invites.belongsTo(roles, { foreignKey: "role_id" })
roles.hasMany(project_invites, { foreignKey: "role_id" })

project_invites.belongsTo(users, { foreignKey: "created_by", as: "inviter" })
users.hasMany(project_invites, { foreignKey: "created_by", as: "created_invites" })
