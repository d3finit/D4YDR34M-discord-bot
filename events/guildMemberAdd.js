const config = require('../config.json');
const discord = require('discord.js');
const timezone = require("moment-timezone");

module.exports = async (client, member) => {
	var cid = client.settings.get(member.guild.id, "welcomechannel")
	member.guild.channels.fetch(cid)
		.then(channel => channel.send("Welcome to " + member.guild.name + " " + member.user.username + "!"))
};