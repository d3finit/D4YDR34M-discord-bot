const discord = require('discord.js');
const config = require('../../config.json');
const timezone = require("moment-timezone");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {

    name: "rockpaperscissors [WIP]",
    aliases: ["rps"],
    description: "Lets play rock - paper - scissors! Just do rps <rock|paper|scissors>",
    category: "Fun",
    cooldown: 5,
    run: async (client, message, args) => {

        if (!message.guild.me.permissions.has("EMBED_LINKS")) return message.channel.send({
            content: "I do not have the **MESSAGE_EMBED_LINKS** permission in this channel.\nPlease enable it."
        });

        try {
			var uinput = null
			if (args[0] == "rock"){
				// user picked rock
				uinput = 1
			} else if (args[0] == "paper"){
				// user picked paper
				uinput = 2
			} else if (args[0] == "scissors"){
				// user picked scissors
				uinput = 3
			} else {
				// input is invalid
				uinput = "Input is invalid"
			}
			
            const embed = new discord.MessageEmbed()
                .setDescription('Rock.. Paper... Scissors... Shoot... \nYou picked `' + args[0] + '` \nComputer picked `' + '` \n**Winner: ' + winner + '**')
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