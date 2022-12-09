const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('selamlabeni')
		.setDescription('burasi sadece sana özel selamlar'),
	async execute(interaction) {
		await interaction.reply('SElamlar!');
	},
};