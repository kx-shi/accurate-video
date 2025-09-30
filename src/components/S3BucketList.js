import { useEffect, useState } from "react";
import S3BucketItem from './S3BucketItem'

export default function S3BucketList() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBucketItems() {
      try {
        // Call S3 REST API directly
        const response = await fetch(
          "https://accurate-video.s3.eu-north-1.amazonaws.com/?list-type=2"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();
        const items = [];

        // S3 returns XML, so we parse it
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        const contents = xmlDoc.getElementsByTagName("Contents");
        console.log(contents)
        for (let i = 0; i < contents.length; i++) {
          const key = contents[i].getElementsByTagName("Key")[0].textContent;
          if(key.split(".")[1] === 'json') {
            const url = `https://accurate-video.s3.eu-north-1.amazonaws.com/${key}`
            items.push({ key, url });
          }
        }
        setObjects(items);
      } catch (err) {
        console.error("Error fetching bucket contents:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBucketItems();
  }, []);

  if (loading) return <p>Loading bucket contents...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="Bucketlist">
      <h2>Videos</h2>
      <h3>Click on a video to open it in Accurate.Video</h3>
      {objects.length === 0 ? (
        <p>No objects found.</p>
      ) : (
        <div className="flexbox">
            {objects.map((item) => (
              <S3BucketItem item={item} />
            ))}
        </div>
      )}
    </div>
  );
}
