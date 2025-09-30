import { useState, useEffect } from 'react';

export default function S3BucketItem({item}) {
    const [imgUrl, setImgUrl] = useState(null);

    const openAccurateVideo = (launchTemplate) => {
        const licenseKey = '21A42B1E3745B8A8832230E8888804A0U60EBF1E05EA91A6A6ED0BBE9215D7F22';
        const url = `https://apps.accurate.video/launch/validate?launchTemplate=${launchTemplate}&licenseKey=${licenseKey}`;
        window.open(url, '_blank');
    }
    
    useEffect(() => {
        fetch(`/${item.key}`)
        .then((res) => res.json())
        .then((json) => {
            var match = json.data.assets[0].files[0].url.match(/mp4\/(.+)\.mp4$/);
            if(match.length > 0) {
                setImgUrl(`https://multimedia-commons.s3.amazonaws.com/data/videos/keyframes/${match[1]}-005.jpg`);
            }
        })
        .catch((err) => console.error(err));
    }, []);

    return(
        <div className="BucketItem">
            <img src={imgUrl} alt={item.key}  width="200" height="150"/>

            <button onClick={() => openAccurateVideo(item.url)}>
                {item.key.split("_")[0] + ".mp4"}
            </button>
        </div>
    )
}