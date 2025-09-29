# accurate-video

## ffmpeg
Skapa still frames
`ffmpeg -i {input_file_path} -vf fps=1/120 {output_file_path}`

## docker
Skapa waveform-fil
`docker run --rm -v {path_to_wavfiles}:/tmp -w /tmp realies/audiowaveform -i "filename.wav" -o "filename.dat"`

## python
Skapa launch template
`python .\generate_template.py --video_url {video_url}`