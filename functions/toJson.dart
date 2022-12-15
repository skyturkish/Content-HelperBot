import 'dart:convert';
import 'dart:io';

main() async {
  var path = 'videosTimeStamp.txt';

  File f = new File(path);
  f.readAsString().then((String lines) {
    final textVideos = lines.split('**************************************************');

    print(textVideos.length);

    String bursa(String e) {
      // print(e);
      return e;
    }

    final Videos videos = Videos(
      videos: textVideos.map((videoContent) {
        final video = videoContent.split('++++++++++++');
        final timeStamps = video[3].split('\n');
        return Video(
          url: video[0],
          title: video[1],
          createdAt: video[2],
          timeStamps: timeStamps
              .map((e) => TimeStamp(
                  time: e.length < 5 ? ' ' : bursa(e).substring(0, 5), text: e.length < 5 ? ' ' : e.substring(6)))
              .toList(),
        );
      }).toList(),
    );
    // dosyaya yazdır bunu
    print(videos.toJson());

    // Write file
    var fileCopy = File('videos_yedek.txt').writeAsStringSync(videos.toJson());
  });
}

class Videos {
  List<Video> videos;
  Videos({
    required this.videos,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'videos': videos.map((x) => x.toMap()).toList()});

    return result;
  }

  String toJson() => json.encode(toMap());
}

class Video {
  final String url;
  final String title;
  final String createdAt;
  final List<TimeStamp> timeStamps;
  Video({
    required this.url,
    required this.title,
    required this.createdAt,
    required this.timeStamps,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'url': url});
    result.addAll({'title': title});
    result.addAll({'createdAt': createdAt});
    result.addAll({'timeStamps': timeStamps.map((x) => x.toMap()).toList()});

    return result;
  }

  String toJson() => json.encode(toMap());
}

class TimeStamp {
  final String time;
  final String text;
  TimeStamp({
    required this.time,
    required this.text,
  });

  Map<String, dynamic> toMap() {
    final result = <String, dynamic>{};

    result.addAll({'time': time});
    result.addAll({'text': text});

    return result;
  }

  String toJson() => json.encode(toMap());
}
