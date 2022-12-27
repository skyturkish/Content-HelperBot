const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
} = require('discord.js')

var json = require('../data/videos.json')

const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
        .setName('videos')
        .setDescription('Get information about the nimble')
        .addStringOption((option) =>
            option
                .setName('content')
                .setDescription('content aramanı sağlayacak kelimeyi yaz')
                .setMinLength(3)
                .setRequired(true)
        ),

    async execute(interaction) {
        const inputValue = interaction.options
            .getString('content')
            .toLowerCase()

        const videos = json['videos']

        const videoInformations = []

        for (let i = 0; i < videos.length; i++) {
            const video = videos[i]

            const timeStamps = video['timeStamps']

            const createdAt = video['createdAt']

            for (let index = 0; index < timeStamps.length; index++) {
                const timeStamp = timeStamps[index]

                const text = timeStamp['text']

                if (text.toLowerCase().includes(inputValue)) {
                    videoInformations.push({
                        videoIndex: i,
                        createdAt: createdAt,
                        videoTimeStampText: text,
                        timeStampIndex: index,
                    })
                    break
                }
            }
        }

        if (videoInformations.length == 0) {
            await interaction.reply({
                content: 'there is no video about ' + inputValue,
                ephemeral: true,
            })
            return
        }

        const row = new ActionRowBuilder().addComponents(
            new StringSelectMenuBuilder()
                .setCustomId('videos')
                .setPlaceholder('Nothing selected')
                .addOptions(
                    videoInformations
                        .slice(0, 25)
                        .map(function (currentvalue, index) {
                            return {
                                label: (index + 1).toString(),
                                // value can carry only String
                                value:
                                    videoInformations[index][
                                        'videoIndex'
                                    ].toString() +
                                    ':' +
                                    videoInformations[index][
                                        'timeStampIndex'
                                    ].toString(),
                            }
                        })
                )
        )

        let videoTimeStamps = ''

        videoInformations.slice(0, 25).forEach((currentvalue, index) => {
            const videoTimeStampText = currentvalue['videoTimeStampText']
            const videoTimeStampCreatedAt = currentvalue['createdAt']

            videoTimeStamps =
                `${videoTimeStamps} ${index + 1} - ${videoTimeStampText} ` +
                videoTimeStampCreatedAt +
                '\n'
        })

        // change url with website has all video can be searched
        const embed = new EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Videos')
            .setURL('https://content-searcher-beta-umbwiyhqiq-no.a.run.app/')
            .setDescription(videoTimeStamps)

        interaction
            .reply({
                embeds: [embed],
                ephemeral: true,
                components: [row],
            })
            .then(() => console.log('Reply sent.'))
            .catch(console.error)

        await wait(60000)

        interaction.deleteReply().then(console.log).catch(console.error)
    },
}
