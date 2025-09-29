export default function S3BucketItem({item}) {
    const openAccurateVideo = (launchTemplate) => {
        const licenseKey = '21A42B1E3745B8A8832230E8888804A0U60EBF1E05EA91A6A6ED0BBE9215D7F22';
        const url = `https://apps.accurate.video/launch/validate?launchTemplate=${launchTemplate}&licenseKey=${licenseKey}`;
        window.open(url, '_blank');
    }

    const imgUrl = `https://accurate-video.s3.eu-north-1.amazonaws.com/002d7deeeb4269e9c1960c1a7ce8_thumbnails/img001.jpg`

    return(
        <div className="BucketItem">
            <img src={imgUrl} alt={item.key}  width="200" height="150"/>

            <button onClick={() => openAccurateVideo(item.url)}>
                {item.key}
            </button>
        </div>
    )
}