import argparse
import subprocess
from pathlib import Path
import shlex

def generate_waveform_jpg(
        name
    ):
    
    audio_filepath = f"{name}.wav"

    output_filepath = f"{name}.dat"

    folder_path = Path(__file__).resolve().parent.parent.parent / "public/wavfiles"
    folder_path = folder_path.as_posix()

    # Build the command
    cmd = [
        "docker", "run", "--rm",
        "-v", f"{folder_path}:/tmp",   # mount host folder to /tmp in container
        "-w", "/tmp",                  # set working directory in container
        "realies/audiowaveform",       # Docker image
        "-i", audio_filepath,          # input file inside container (/tmp)
        "-o", output_filepath          # output file inside container (/tmp)
    ]
    print(shlex.join(cmd))
    return
    

    # Run the command
    try:
        subprocess.run(cmd, check=True)
    except subprocess.CalledProcessError as e:
        print("Error running audiowaveform:", e)
        raise

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Generate waveform for .wav-file")
    parser.add_argument("--name", type=str, default=None, help="Name of file")

    args = parser.parse_args()

    generate_waveform_jpg(
        name=args.name
    )