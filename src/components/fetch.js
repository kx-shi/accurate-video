import React, { useEffect, useState } from "react";
import { XMLParser } from "fast-xml-parser";
// https://multimedia-commons.s3.amazonaws.com/

export default function S3BucketList() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const openAccurateVideoTest = (launchTemplate) => {
    const licenseKey = '21A42B1E3745B8A8832230E8888804A0U60EBF1E05EA91A6A6ED0BBE9215D7F22';
    //const launchTemplate = 'https://accurate-video.s3.eu-north-1.amazonaws.com/test.json';
    const url = `https://apps.accurate.video/launch/validate?launchTemplate=${launchTemplate}&licenseKey=${licenseKey}`;
    window.open(url, '_blank');
  }

  useEffect(() => {
    async function fetchBucketItems() {
      try {
        // Call S3 REST API directly
        const response = await fetch(//"/s3/?list-type=2"
          "https://accurate-video.s3.eu-north-1.amazonaws.com/?list-type=2"
          //"https://multimedia-commons.s3.amazonaws.com/?list-type=2&prefix=data/videos/mp4/&max-keys=10"
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

        for (let i = 0; i < contents.length; i++) {
          const key = contents[i].getElementsByTagName("Key")[0].textContent;
          const url = `https://accurate-video.s3.eu-north-1.amazonaws.com/${key}`
          items.push({ key, url });
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

  if (loading) return <p className="text-gray-500">Loading bucket contents...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Public S3 Bucket Items</h2>
      {objects.length === 0 ? (
        <p className="text-gray-500">No objects found.</p>
      ) : (
        <ul className="space-y-2">
          {objects.map((item) => (
            <li key={item.key} className="p-2 rounded-lg shadow border bg-white">
              <button onClick={() => openAccurateVideoTest(item.url)}>
                {item.key}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
