export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Endpoint webhook thật - Zalo POST vào đây
    if (url.pathname === "/webhook") {
      if (request.method !== "POST") {
        return new Response("OK", { status: 200 });
      }
      const body = await request.text();

      // Trả 200 ngay, forward nền phía sau
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

    // Ping giữ ấm (không bắt buộc với Worker vì Worker không "ngủ")
    if (url.pathname === "/ping") {
      return new Response("pong", { status: 200 });
    }

    // Trang gốc - kiểm tra sống
    return new Response("OK", { status: 200 });
  },
};
