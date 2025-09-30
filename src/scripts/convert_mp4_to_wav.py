import argparse
import subprocess
from pathlib import Path

def mp4_to_wav(
        name
    ):

    mp4_filepath = Path(__file__).resolve().parent.parent.parent / f"public/mp4/{name}.mp4"
    wav_filepath = Path(__file__).resolve().parent.parent.parent / f"public/wavfiles/{name}.wav"

    cmd = [
        "ffmpeg",
        "-i", mp4_filepath,
        "-vn",              # no video
        "-acodec", "pcm_s16le",  # uncompressed PCM
        "-ar", "44100",     # sample rate
        "-ac", "2",         # stereo
        wav_filepath
    ]
    subprocess.run(cmd, check=True)

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Convert .mp4 to .wav")
    parser.add_argument("--name", type=str, default=None, help="Name of file")

    args = parser.parse_args()

    mp4_to_wav(
        name=args.name
    )