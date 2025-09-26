import React, { useEffect, useState } from "react";
// https://multimedia-commons.s3.amazonaws.com/

export default function S3BucketList() {
  const [objects, setObjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchBucketItems() {
      try {
        // Call S3 REST API directly
        const response = await fetch(
          "https://multimedia-commons.s3.amazonaws.com/?list-type=2&prefix=data/videos/mp4/&max-keys=10"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const text = await response.text();

        // S3 returns XML, so we parse it
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(text, "application/xml");
        const contents = xmlDoc.getElementsByTagName("Contents");

        const items = [];
        for (let i = 0; i < contents.length; i++) {
          const key = contents[i].getElementsByTagName("Key")[0].textContent;
          const size = contents[i].getElementsByTagName("Size")[0].textContent;
          items.push({ key, size });
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
              <p className="font-mono break-all">{item.key}</p>
              <p className="text-sm text-gray-600">
                Size: {(item.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
