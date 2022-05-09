const config = require('../../config.json');
const child = require("child_process");
const petitio = require("petitio");
const discord = require("discord.js");
const timezone = require("moment-timezone");

module.exports = {

	name: "findserver",
	aliases: ["fs", "find"],
	description: "look for public servers",
	category: "Community",
	cooldown: 3,
	run: async (client, message, args) => {
		const command = args.join(" ");
		var servers = [];
		var serversfinal = "";
		var sc = 0
		
		if (!command) return message.channel.send("please give a search query (needs to be one word)!");
		client.guilds.cache.forEach(guild => {
			if (guild.name.includes(command) && client.settings.get(guild.id, "public") == true) {
				servers.push(guild.name);
				sc = sc + 1
			}
		})
		
		console.log(servers.length)
		
		if ( servers.length == 0 ) {
			serversfinal = "No servers found."
		} else {
			for (var i = 0; i < servers.length; i++) {
    			serversfinal = serversfinal + "- " + servers[i] + "\n";
			}
		}
		// if (err) return message.channel.send({ content: `**ERROR:** \n\`\`\`js\n${err}\n\`\`\`` });

		try {
			const embed = new discord.MessageEmbed()
				.setTitle("Server search results", true)
				.addField(
					"Found " + sc + " server(s)",
					serversfinal + " "
				)
				.setColor(config.color)
				.setFooter({
					text: `Requested by ${message.author.username} | Today at ${timezone.tz(config.timezone).format("HH:mma") + " "}`, iconURL: message.author.displayAvatarURL({
						dynamic: true
					})
				})
			message.channel.send({ embeds: [embed] });


		} catch (e) {
			message.channel.send({ content: `Error: ${e}` });
		}
	}
}
