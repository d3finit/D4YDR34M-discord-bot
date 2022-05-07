const config = require('../config.json');
const discord = require('discord.js');
const timezone = require("moment-timezone");

module.exports = async (client, guild) => {
	client.settings.ensure(guild.id, { prefix: config.prefix, timezone: config.timezone,  });
};