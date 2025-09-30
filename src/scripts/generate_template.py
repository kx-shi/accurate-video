import json
from datetime import datetime
import uuid
from pathlib import Path
import argparse
import ffmpeg

def generate_launchtemplate(
        video_url,
        output_location,
        audio_channels
):
    
    output_location = output_location or Path(__file__).resolve().parent.parent.parent  / "public"

    '''
    TODO: Generera .wav-file utifrån .mp4 och hämta waveform
    wavfile = (
        ffmpeg
        .input(video_url)
        .output()
        .run()
    )
    '''

    audio_channels = audio_channels
    template_id = str(uuid.uuid4())
    video_id = str(uuid.uuid4())
    audio_id = str(uuid.uuid4())
    title = video_url.split("/")[-1].split(".")[0]

    date = datetime.now().isoformat() + "Z"

    data = {
        "data": {
            "assets": [
                {
                    "id": template_id,
                    "creationDate": date,
                    "updateDate": date,
                    "metadata": [
                        {"key": "title", "value": title}
                    ],
                    "files": [
                        {
                            "id": video_id,
                            "type": "VIDEO",
                            "url": video_url,
                            "metadata": [
                                {"key": "filename", "value": f"{title} (Video)"},
                                {"key": "language", "value": "en"}
                            ]
                        },
                        {
                            "id": audio_id,
                            "type": "AUDIO",
                            "url": video_url,
                            "metadata": [
                                {"key": "filename", "value": f"{title} (Audio)"}
                            ],
                            "container": {
                                "audioStreams": [
                                    {"channels": audio_channels}
                                ]
                            }
                        },
                        {
                            "type": "WAVEFORM",
                            "url": f"https://accurate-video.s3.eu-north-1.amazonaws.com/{title}/{title}.dat",
                            "metadata": [
                            {
                                "key": "waveform:source_file_id",
                                "value": video_id
                            },
                            {
                                "key": "waveform:track",
                                "value": "0"
                            }
                            ]
                        },
                        {
                            "type": "WAVEFORM",
                            "url": f"https://accurate-video.s3.eu-north-1.amazonaws.com/{title}/{title}.dat",
                            "metadata": [
                            {
                                "key": "waveform:source_file_id",
                                "value": audio_id
                            },
                            {
                                "key": "waveform:track",
                                "value": "0"
                            }
                            ]
                        }
                    ]
                }
            ]
        },
        "endpoints": {
            "publish": {
                "download": True
            }
        }
    }

    output_file = output_location / f"{title}_launchtemplate.json"
    
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate launch template JSON file for Accurate.Video")
    parser.add_argument("--video_url", type=str, default=None, help="URL to the video file (mp4)")
    parser.add_argument("--audio_channels", type=int, default=2, help="Number of audio channels")
    parser.add_argument("--output_location", type=str, default=None, help="Folder where output JSON should be saved.")

    args = parser.parse_args()

    generate_launchtemplate(
        video_url=args.video_url,
        audio_channels=args.audio_channels,
        output_location=args.output_location
    )