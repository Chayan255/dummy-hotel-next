"use client";

import React, { useState } from "react";

export default function CurrentAffairsPage() {
  const [newsData] = useState([
    {
      title: "ভারত নতুন উপগ্রহ উৎক্ষেপণ করেছে 🛰️",
      description: "নতুন উপগ্রহ জলবায়ুর পরিবর্তন পর্যবেক্ষণ করবে এবং আবহাওয়ার পূর্বাভাস উন্নত করবে।",
      image: "🛰️",
      date: "২০২৫-০৯-০৭",
    },
    {
      title: "শেয়ার বাজার রেকর্ড উচ্চতায় 📈",
      description: "অর্থনৈতিক বৃদ্ধির ধনাত্মক সূচকের কারণে বাজারে উত্থান।",
      image: "📈",
      date: "২০২৫-০৯-০৬",
    },
    {
      title: "নতুন শিক্ষা নীতি ঘোষণা 🎓",
      description: "সরকার বিদ্যালয় শিক্ষার মান উন্নত করতে নতুন সংস্কার করেছে।",
      image: "🎓",
      date: "২০২৫-০৯-০৫",
    },
    {
      title: "টেক কনফারেন্স ২০২৫ শুরু 💻",
      description: "নতুন উদ্ভাবন, স্টার্টআপ ও প্রযুক্তি আলোচনা এবছরের সম্মেলনকে চিহ্নিত করছে।",
      image: "💻",
      date: "২০২৫-০৯-০৪",
    },
    {
      title: "জলবায়ু সম্মেলন সফলভাবে শেষ 🌍",
      description: "বিশ্ব নেতারা টেকসই নীতি ও ভবিষ্যৎ পরিকল্পনার ওপর একমত হয়েছে।",
      image: "🌍",
      date: "২০২৫-০৯-০৩",
    },
  ]);

  return (
    <main style={{ padding: "2rem", fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9f9", minHeight: "100vh" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem", fontSize: "2.5rem", color: "#222" }}>সর্বশেষ খবর</h1>

      <div style={{ 
        display: "grid", 
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", 
        gap: "2rem" 
      }}>
        {newsData.map((item, index) => (
          <div
            key={index}
            style={{
              backgroundColor: "#fff",
              borderRadius: "12px",
              overflow: "hidden",
              boxShadow: "0 6px 18px rgba(0,0,0,0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
              cursor: "pointer",
              textAlign: "center",
              fontSize: "4rem",
              paddingTop: "1rem"
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-5px)";
              e.currentTarget.style.boxShadow = "0 12px 24px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 6px 18px rgba(0,0,0,0.1)";
            }}
          >
            <div>{item.image}</div>
            <div style={{ padding: "1rem", fontSize: "1rem", textAlign: "left" }}>
              <h2 style={{ marginBottom: "0.5rem", fontSize: "1.25rem", color: "#111" }}>{item.title}</h2>
              <p style={{ marginBottom: "0.75rem", fontSize: "0.95rem", color: "#555", minHeight: "50px" }}>
                {item.description}
              </p>
              <small style={{ color: "#999", fontSize: "0.85rem" }}>{item.date}</small>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
