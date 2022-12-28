const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('about')
        .setDescription('Get info about the ContentHelper Bot'),
    async execute(interaction) {
        const links = {
            photo: 'https://64.media.tumblr.com/b7adc30458c015601d26467662b71ede/07cc1610225987ff-6c/s1280x1920/b29d6a1cc8e541404c330770f4c2d062d68b8c6b.jpg',
            github: 'https://github.com/skyturkish/content-helper-bot',
            youtube: 'https://www.youtube.com/@ArmaganAmcalar',
            website: 'https://content-searcher-beta-umbwiyhqiq-no.a.run.app/',
        }

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
