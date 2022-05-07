const discord = require('discord.js');
const config = require('../../config.json');
const timezone = require("moment-timezone");

module.exports = {

    name: "serverconf",
    aliases: ["conf"],
    description: "Set bot's change prefix",
    category: "Admin",
    cooldown: 5,
    run: async (client, message, args) => {

        if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
            content: "I do not have the **MESSAGE_EMBED_LINKS** permission in this channel.\nPlease enable it."
        });
        if (message.member.roles.cache.some(role => role.name === 'Admin')) {
			if (args[0] == "list" || args[0] == null) {
				const embed = new discord.MessageEmbed()
					.setTitle("Server settings:")
                	.setDescription(
						'Prefix (prefix): `'+
						client.settings.get(message.guildId, "prefix")+"`"+
						"\nTimezone (timezone): `"+
						client.settings.get(message.guildId, "timezone")+
						'`'+
						"\nWelcome channel id (welchannid): `"+
						client.settings.get(message.guildId, "welcomechannel")+
						'`'
					)
                	.setColor(config.color)
                	.setFooter({ text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({ 
                        dynamic: true 
                    }) 
                })
            	message.channel.send({
                	embeds: [embed]
            	});
			}
			if (args[0] == "prefix"){
            	const embedmissing = new discord.MessageEmbed()
                	.setDescription(`⚠ | Please type the prefix you want to set!`)
                	.setColor("RED");

            	const embedtoolong = new discord.MessageEmbed()
                	.setDescription(`❌ | Prefix's length shouldn't be longer than 5 letters`)
            	    .setColor("RED");

        	    const embedsame = new discord.MessageEmbed()
                	.setDescription(`⚠ Prefix is same to current's`)
                	.setColor("RED");

            	if (!message.member.permissions.has("MANAGE_GUILD")) return message.channel.send({
                	embeds: [embedmissingperms]
            	});

            	await client.settings.ensure(message.guild.id, {
      	        	prefix: config.prefix
    	        });
            	if (!args[1]) return message.channel.send({ 
        	        embeds: [embedmissing]
    	        });
	            if (args[1].length > 5) return message.channel.send({
            	    embeds: [embedtoolong]
        	    });
    	        if (args[1] == client.settings.get(message.guild.id, "prefix"))
	                return message.channel.send({
                    	embeds: [embedsame]
                	});

            	if (args[1] === "reset") {
        	        client.settings.delete(message.guildId, "prefix")
    	            const embed = new discord.MessageEmbed()
	                    .setDescription(`Prefix reset to Default : \`${config.prefix}\``)
                    	.setColor(config.color)
                	return message.channel.send({
            	        embeds: [embed]
        	        });
    	        }

	            client.settings.set(message.guildId, args[1], "prefix");
            	const embed = new discord.MessageEmbed()
        	        .setDescription(`Prefix Changed to : \`${args[1]}\``)
    	            .setColor(config.color)
	            message.channel.send({
                	embeds: [embed]
            	});
			} else if (args[0] == "timezone"){
				client.settings.set(message.guildId, args[1], "timezone");
            	const embed = new discord.MessageEmbed()
        	        .setDescription(`Timezone Changed to : \`${args[1]}\``)
    	            .setColor(config.color)
	            message.channel.send({
                	embeds: [embed]
            	});
			} else if (args[0] == "welchannid"){
				client.settings.set(message.guildId, args[1], "welcomechannel");
            	const embed = new discord.MessageEmbed()
        	        .setDescription(`Welcome channel id changed to : \`${args[1]}\``)
    	            .setColor(config.color)
	            message.channel.send({
                	embeds: [embed]
            	});
			}
        } else {
			const embedmissingperms = new discord.MessageEmbed()
                .setDescription(`⚠ | ${message.author.username}, Missing role **Admin**!`)
                .setColor("RED");
		}

    }
}