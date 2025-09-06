// app/api/current-affairs/route.js

export async function GET() {
  const url = "https://inshortsapi.vercel.app/news?category=national";

  try {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
      return new Response(
        JSON.stringify({ error: "Failed to fetch current affairs" }),
        { status: response.status }
      );
    }

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
    });
  }
}
