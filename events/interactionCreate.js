const { Events } = require('discord.js')

var prepareYoutubeLink = require('../functions/prepareYoutubeLink.js')

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(
                interaction.commandName
            )
            if (!command) {
                console.error(
                    `No command matching ${interaction.commandName} was found.`
                )
                return
            }
            try {
                await command.execute(interaction)
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`)
                console.error(error)
            }
        } else if (interaction.isStringSelectMenu()) {
            if (interaction.customId === 'Videos') {
                const VideoAndTimeInfo = interaction.values[0]

                const youtubeLink = await prepareYoutubeLink(VideoAndTimeInfo)

                await interaction.reply(youtubeLink)
            }
        }
    },
}
