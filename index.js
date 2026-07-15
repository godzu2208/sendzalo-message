export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/webhook") {
      if (request.method !== "POST") {
        return new Response("OK", { status: 200 });
      }
      const body = await request.text();
      ctx.waitUntil(
        fetch(
          "https://script.google.com/macros/s/AKfycbx0GVVCcekMPjIHpYgNtrIfT6oO9Xosus-OeXxEXbjJeqL6Rjvat4mzP_MnHi1mQ_Kd/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: body,
          },
        ).catch((err) => console.error("Forward error:", err)),
      );
      return new Response("OK", { status: 200 });
    }

    if (url.pathname === "/ping") {
      return new Response("pong", { status: 200 });
    }

    return new Response("OK", { status: 200 });
  },
};
