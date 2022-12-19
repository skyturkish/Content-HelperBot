const { SlashCommandBuilder } = require('discord.js')

var json = require('../data/videos.json')

const wait = require('node:timers/promises').setTimeout

module.exports = {
    data: new SlashCommandBuilder()
        .setName('youtubeurl')
        .setDescription('Provides information about the user.'),
    async execute(interaction, secondInformation) {
        const videoCompanent = secondInformation.split(':')

        const video = json['videos'][videoCompanent[0]]

        const timeStamp = video['timeStamps'][videoCompanent[1]]

        const time = timeStamp['time'].split(':')

        const minute = time[0]

        const second = time[1]

        const startSecond = parseInt(minute) * 60 + parseInt(second)

        await interaction.reply(video['url'] + '&t=' + startSecond + 's')

        await wait(60000)

        interaction.deleteReply().then(console.log).catch(console.error)
    },
}
