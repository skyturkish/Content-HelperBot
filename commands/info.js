const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('nimble')
		.setDescription('Get information about the nimble'),
	async execute(interaction) {
		await interaction.reply(`Nimble information`);
	},
};