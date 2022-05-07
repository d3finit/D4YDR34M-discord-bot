const config = require('../../config.json');
const child = require("child_process");
const petitio = require("petitio");

module.exports = {

	name: "sendlink",
	aliases: ["sl", "link"],
	description: "sends a link",
	category: "Fun",
	cooldown: 3,
	run: async (client, message, args) => {
		const command = args.join(" ");
		if (!command) return message.channel.send("please give a a link to send!");

		// if (err) return message.channel.send({ content: `**ERROR:** \n\`\`\`js\n${err}\n\`\`\`` });

		try {
			await message.channel.send({
				content: "Your link!",
				components: [{
					"type": 1,
					"components": [{
						"type": 2,
						"label": "Link",
						"url": args[0],
						"style": 5
					}]
				}]
			}).then(msg => {
				// setTimeout(() => msg.delete(), 20000)
			});

		} catch (e) {
			message.channel.send({ content: `Error: ${e}` });
		}
	}
}
