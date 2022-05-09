const discord = require('discord.js');
const config = require('../../config.json');
const timezone = require("moment-timezone");

function isbooster(bstdate) {
    if (bstdate == null){
		return "User is not boosting."
	} else {
		return bstdate
	}
}

module.exports = {

	name: "whois",
	aliases: ["who"],
	description: "Gets the details of a user",
	category: "Misc",
	cooldown: 5,
	run: async (client, message, args) => {

		if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
			content: "I do not have the **MESSAGE_EMBED_LINKS** permission in this channel.\nPlease enable it."
		});

		try {
			let target = message.mentions.members.first();

			
			const embed = new discord.MessageEmbed()
				.setTitle("User info for " + target.user.username + "#" + target.user.discriminator, true)
				.setThumbnail(target.user.avatarURL())
				.addFields(
					{ name: 'Joined on: ', value: "`" + target.joinedAt + "`", inline: true },
					{ name: 'Boosting since: ', value: "`" + isbooster(target.premiumSince) + "`", inline: true },
					{ name: 'Created on: ', value: "`" + target.user.createdAt + "`", inline: true }
				)
				.addFields(
					{ name: 'Bannable: ', value: "`" + target.bannable + "`", inline: true },
					{ name: 'Kickable: ', value: "`" + target.kickable + "`", inline: true },
					{ name: 'Moderatable', value: "`" + target.moderatable + "`", inline: true }
				)
				.addFields(
					{ name: 'Display color: ', value: "`" + target.displayHexColor + "`", inline: true },
					{ name: 'Display name: ', value: "`" + target.displayName + "`", inline: true },
					{ name: 'Tag:', value: "`" + target.user.tag + "`", inline: true }
				)
				.addField(
					"Roles: ",
					target.roles.cache.map(r => `${r}`).join(' | ')
				)
				.setColor(config.color)
				.setFooter({
					text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({
						dynamic: true
					})
				})
			message.channel.send({ embeds: [embed] });

		} catch (e) {
			const embed = new discord.MessageEmbed()
				.setDescription(`${e}`)
				.setColor(config.color)
			message.channel.send({ embeds: [embed] })
		}
	}
};