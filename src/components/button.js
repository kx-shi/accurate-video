import React, { useState } from "react";
import axios from 'axios';

export default function AccurateVideoValidate() {
    const [html, setHtml] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getPlayer = async () => {
        setLoading(true);
        setError(null);
        setHtml(null);

        try {
            const res = await axios.get("/launch/validate", { responseType: "text" });
            setHtml(res.data);
        } catch (err) {
            setError(err.message || "Failed to load HTML");
        } finally {
            setLoading(false);
        }
    }

    return(
        <div>
            <button onClick={getPlayer}>Click me!</button>

            {loading && <div>Loading…</div>}
            {error && <div className="text-red-600">Error: {error}</div>}

            {html && (
                <iframe
                title="remote-html"
                srcDoc={html}
                sandbox="allow-same-origin allow-scripts allow-forms"
                style={{ width: "100%", height: "80vh", border: "1px solid #ccc" }}
                />
            )}
        </div>
    )
}