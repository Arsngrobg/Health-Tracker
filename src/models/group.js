const db = require('../config/db.js');

const Group = {
    // Create a new group
    async create(groupName, groupDesc = null, isPublic = true) {
        const sql = `
            INSERT INTO UserGroup (GroupName, GroupDesc, Public)
            VALUES (?, ?, ?)
        `;
        const [result] = await db.execute(sql, [groupName, groupDesc, isPublic]);
        return result.insertId; // Return the new GroupID
    },

    // Get a group by its ID
    async getByID(groupID) {
        const sql = `SELECT * FROM UserGroup WHERE GroupID = ?`;
        const [rows] = await db.execute(sql, [groupID]);
        return rows[0] || null;
    },

    // Get all groups
    async getAll() {
        const sql = `SELECT * FROM UserGroup`;
        const [rows] = await db.execute(sql);
        return rows;
    },

    // get imilar to an amount
    async getSimilar(name, limit, page=1) {
        const sql = `SELECT * FROM UserGroup WHERE GroupName LIKE ? ORDER BY UserCount DESC LIMIT ? OFFSET ?`
        const [rows] = await db.query(sql, [`%${name}`, limit, limit * (page - 1)]);
        return rows;
    },

    // Update user count manually
    async updateUserCount(groupID, newCount) {
        const sql = `UPDATE UserGroup SET UserCount = ? WHERE GroupID = ?`;
        const [result] = await db.execute(sql, [newCount, groupID]);
        return result.affectedRows > 0;
    },

    // Delete a group by ID
    async delete(groupID) {
        const sql = `DELETE FROM UserGroup WHERE GroupID = ?`;
        const [result] = await db.execute(sql, [groupID]);
        return result.affectedRows > 0;
    },

    // Add a user to the group (also in Membership table)
    async addUserToGroup(groupID, userID, role = 'Member') {
        const sql = `
            INSERT INTO UserGroupMembership (GroupID, UserID, Role)
            VALUES (?, ?, ?)
            ON DUPLICATE KEY UPDATE Role = VALUES(Role)
        `;
        const [result] = await db.execute(sql, [groupID, userID, role]);
        return result.affectedRows > 0;
    },

    // Get all users in a group
    async getUsers(groupID) {
        const sql = `
            SELECT u.UserID, u.Username, m.Role
            FROM UserGroupMembership m
            JOIN User u ON m.UserID = u.UserID
            WHERE m.GroupID = ?
        `;
        const [rows] = await db.execute(sql, [groupID]);
        return rows;
    }
};

module.exports = Group;
