import argparse
import subprocess
from pathlib import Path

def generate_waveform_jpg(audio_filepath: str) -> None:
    
    #if not audio_filepath.exists():
    #    raise FileNotFoundError(f"Audio file not found: {audio_filepath}")

    output_filepath = "test_waveform.dat"
    folder_path = "C:/Users/karol/Documents/Projects/GitPortfolio/accurate-video/public/wavfiles"
    input_filename = "002d7deeeb4269e9c1960c1a7ce8.wav"
    output_filename = "002d7deeeb4269e9c1960c1a7ce8.dat"

    # Build the command
    cmd = [
        "docker", "run", "--rm",
        "-v", f"{folder_path}:/tmp",   # mount host folder to /tmp in container
        "-w", "/tmp",                  # set working directory in container
        "realies/audiowaveform",       # Docker image
        "-i", input_filename,          # input file inside container (/tmp)
        "-o", output_filename          # output file inside container (/tmp)
    ]

    # Run the command
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print("Error running audiowaveform:", e)
        raise

if __name__ == "__main__":
    '''
    parser = argparse.ArgumentParser(description="Generate launch template JSON file for Accurate.Video")
    parser.add_argument("--audio_filepath", type=str, default=None, help="Path to the audiofile")

    args = parser.parse_args()

    generate_waveform_jpg(
        audio_filepath=args.audio_filepath
    )
    '''

    generate_waveform_jpg(audio_filepath="002d7deeeb4269e9c1960c1a7ce8.wav")