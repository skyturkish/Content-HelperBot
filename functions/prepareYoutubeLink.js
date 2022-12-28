var json = require('../data/videos.json')

function prepareYoutubeLink(VideoAndTimeInfo) {
    const videoCompanent = VideoAndTimeInfo.split(':')

    const video = json['videos'][videoCompanent[0]]

    const timeStamp = video['timeStamps'][videoCompanent[1]]

    const time = timeStamp['time'].split(':')

    const minute = time[0]

    const second = time[1]

    const startSecond = parseInt(minute) * 60 + parseInt(second)

    return video['url'] + '&t=' + startSecond + 's'
}

module.exports = prepareYoutubeLink
