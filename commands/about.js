const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
var links = require('../data/links.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Get info about the ContentHelper Bot'),
    async execute(interaction) {
        const exampleEmbed = new EmbedBuilder()
            .setColor(0x6b249c)
            .setAuthor({
                name: 'Content Helper',
                iconURL: links.photo,
                url: links.github,
            })
            .setDescription(
                'Hello! I am Content-HelperBot, I am here to help you to bring videos with start-second by input word which you provide me. '
            )
            .setThumbnail(links.photo)
            .addFields(
                { name: 'Commands', value: '/videos \n /about' },
                { name: '\u200B', value: '\u200B' },
                {
                    name: ':scroll: Content',
                    value: '78 Video \n 1026 Question asked',
                    inline: true,
                },
                {
                    name: '\u200B',
                    value: '\u200B',
                    inline: true,
                },
                {
                    name: ':link: Links',
                    value: `[Github](${links.github}) \n [Youtube](${links.youtube}) \n [Website](${links.website})`,
                    inline: true,
                }
            )
            .setTimestamp()
            .setFooter({
                text: 'Created by skyturkish',
                iconURL: links.photo,
            })

        interaction
            .reply({
                embeds: [exampleEmbed],
                ephemeral: true,
            })
            .then(() => console.log('/about Reply sent.'))
            .catch(console.error)
    },
}
