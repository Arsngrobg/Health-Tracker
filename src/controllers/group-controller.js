const groupModel = require('../models/group.js');

const groups = require('../json/groups.json');

module.exports.list = async(req, res) => {
    const query = req.body.query;

    const grouplist = await groupModel.getSimilar('', 10, 1);

    groupModel.getSimilar(query, 5, 1).then(_ => {
        res.render(
            '../src/views/pages/groups', {
                groups,
                grouplist,
                msg: null
            });
    });
}

module.exports.join = async (req, res) => {
    const groupid = req.body.group_id;

    if (!groupid) {
        return res.status(400).send("Group ID is required");
    }

    try {
        await groupModel.addUserToGroup(groupid, res.locals.user.UserID, "Member");

        // After adding, fetch updated groups if needed
        const grouplist = await groupModel.getSimilar('', 10, 1);

        res.render('../src/views/pages/groups', {
        groups,
        grouplist,
        msg: "You have been added to group " + groupid
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Failed to join group");
    }
};
