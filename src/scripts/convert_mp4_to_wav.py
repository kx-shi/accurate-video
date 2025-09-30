import subprocess

def mp4_to_wav(input_file, output_file):
    cmd = [
        "ffmpeg",
        "-i", input_file,
        "-vn",              # no video
        "-acodec", "pcm_s16le",  # uncompressed PCM
        "-ar", "44100",     # sample rate
        "-ac", "2",         # stereo
        output_file
    ]
    subprocess.run(cmd, check=True)

# Example
mp4_to_wav("C:/Users/karol/Downloads/002d7deeeb4269e9c1960c1a7ce8.mp4", "C:/Users/karol/Downloads/output.wav")