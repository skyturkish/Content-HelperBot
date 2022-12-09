const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('secret')
		.setDescription('only you can see me '),
	async execute(interaction) {
		// ephemeral
		await interaction.reply({ content: 'Hiiii, ssshhh !!', ephemeral: true });
	},
};