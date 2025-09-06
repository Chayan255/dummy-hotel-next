// app/current-affairs/page.js

"use client";

import { useEffect, useState } from "react";

export default function CurrentAffairsPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch("/api/current-affairs");
        const data = await res.json();
        setNews(data.data || []); // API returns { data: [...] }
      } catch (err) {
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchNews();
  }, []);

  if (loading) return <p>Loading news...</p>;

  if (!news.length) return <p>No news available right now.</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>📰 Current Affairs</h1>
      <ul>
        {news.map((item, index) => (
          <li key={index} style={{ marginBottom: "15px" }}>
            <h3>{item.title}</h3>
            <p>{item.content}</p>
            {item.readMoreUrl && (
              <a href={item.readMoreUrl} target="_blank" rel="noopener noreferrer">
                Read more
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
