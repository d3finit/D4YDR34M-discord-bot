const discord = require('discord.js');
const config = require('../../config.json');
const timezone = require("moment-timezone");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {

    name: "coinflip",
    aliases: ["cf", "flip"],
    description: "Flips a coin",
    category: "Fun",
    cooldown: 2,
    run: async (client, message, args) => {

        if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
            content: "I do not have the **MESSAGE_EMBED_LINKS** permission in this channel.\nPlease enable it."
        });

        try {
			var coinstate = getRandomInt(1, 2);
			console.log(coinstate)
			
			if (coinstate == 1){
				coinstate = "heads"
			} else {
				coinstate = "tails"
			}
			
            const embed = new discord.MessageEmbed()
                .setDescription(`The coin landed on ${coinstate}`)
                .setColor(config.color)
                .setFooter({ text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({ 
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