# accurate-video
Enkel hemsida som listar filer. Klickar du på en fil öppnas den i Accurate.Video Validate.

## Funktioner
- Listar filer från en Amazon S3 Bucket
- Visar metadata i form av titel och skapad datum
- Visar waveform
- Uppdateras i realtid när nya objekt läggs upp i S3

## Kom igång
För att köra behövs npm installerat
- Lokalisera till projektet
- `npm start`

___
# Verktyg (minnesanteckningar)

## ffmpeg
Skapa still frames
`ffmpeg -i {input_file_path} -vf fps=1/120 {output_file_path}`

## docker
Skapa waveform-fil
`docker run --rm -v {path_to_wavfiles}:/tmp -w /tmp realies/audiowaveform -i "filename.wav" -o "filename.dat"`

## python
Skapa launch template
`python .\generate_template.py --video_url {video_url}`

## För att skapa en launchtemplate
- Hämta .mp4
- Konvertera till .wav (convert_mp4_to_wav.py)
- Generera audiowaveform (generate_audiowaveform.py)