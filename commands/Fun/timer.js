const discord = require('discord.js');
const config = require('../../config.json');
const timezone = require("moment-timezone");

module.exports = {

    name: "timer",
    aliases: ["time"],
    description: "Sets a timer for n seconds",
    category: "Fun",
    cooldown: 5,
    run: async (client, message, args) => {

		var tleft = args[0]
		
        if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
            content: "I do not have the **MESSAGE_EMBED_LINKS** permission in this channel.\nPlease enable it."
        });

        try{
			const startembed = new discord.MessageEmbed()
                .setDescription("T-minus " + tleft + " seconds on your timer.")
                .setColor(config.color)
                .setFooter({ text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({ 
                        dynamic: true 
                    }) 
                });
            const m = await message.channel.send({ embeds: [startembed] });
			
            const embed = new discord.MessageEmbed()
                .setDescription('Timer is completed.')
                .setColor(config.color)
                .setFooter({ text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({ 
                        dynamic: true 
                    }) 
                })


			var cdowninterval = setInterval(function () {
				tleft = tleft - 1;
				const cembed = new discord.MessageEmbed()
                	.setDescription("T-minus " + tleft + " seconds on your timer.")
                	.setColor(config.color)
            	    .setFooter({ text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({ 
                    	dynamic: true 
        	        }) 
                });
				m.edit({ content: ' ', embeds: [cembed] }) 
			}, 1000);
			
			setTimeout(function() { 
				m.edit({ content: ' ', embeds: [embed] })
				clearInterval(cdowninterval);
  				cdowninterval = null;
			}, args[0] * 1000);
			
        } catch (e) {
            const embed = new discord.MessageEmbed()
                .setDescription(`${e}`)
                .setColor(config.color)
            message.channel.send({ embeds: [embed] })
        }
    }
};