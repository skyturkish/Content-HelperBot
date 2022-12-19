const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Provides information about the user.'),
    async execute(interaction) {
        const list = ['Option 1', 'Option 2', 'Option 3']
        let message =
            'Please select an option from the list by its index number:\n'
        list.forEach((option, index) => {
            message += `${index + 1}. ${option}\n`
        })
        await interaction.reply(message)
    },
}
