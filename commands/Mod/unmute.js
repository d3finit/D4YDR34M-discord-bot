const discord = require('discord.js');
const config = require('../../config.json');
const timezone = require("moment-timezone");

module.exports = {

	name: "unmute",
	aliases: [],
	description: "Unmutes a user",
	category: "Mod",
	cooldown: 5,
	run: async (client, message, args) => {

		if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
			content: "I do not have the **MESSAGE_EMBED_LINKS** permission in this channel.\nPlease enable it."
		});

		try {
			if (message.member.roles.cache.find(r => r.name === "Mod")) {
				let role = message.member.guild.roles.cache.find(role => role.name === "Muted");

				// const target = message.mentions.members.first();
				let target = message.mentions.members.first();
				
				
				// console.log(message.mentions.members.users)
				target.roles.remove(role);

				var muteEmbed = new discord.MessageEmbed()
				muteEmbed.setTitle("Unmute Results")
				muteEmbed.addField("User ID: ", `\`${target}\``)
				muteEmbed.addField("Username: ", `$target`)
				// muteEmbed.addField(":notepad_spiral: Reason:", muteReason)
				muteEmbed.addField(`Unuted by`,`${message.author.tag}`)
				muteEmbed.setFooter({ text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({ 
                        dynamic: true 
                    }) 
                })
				message.channel.send({ embeds: [muteEmbed] });
			};
		} catch (e) {
			const embed = new discord.MessageEmbed()
				.setDescription(`${e}`)
				.setColor(config.color)
			message.channel.send({
				embeds: [embed]
			})
		}
	}
}
