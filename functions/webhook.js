export async function onRequestPost(context) {
  const body = await context.request.text();

  // Trả 200 cho Zalo NGAY LẬP TỨC, không chờ Apps Script xử lý xong
  context.waitUntil(
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

export async function onRequestGet() {
  return new Response("OK", { status: 200 });
}
