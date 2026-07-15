export async function onRequestPost(context) {
  try {
    const body = await context.request.text();
    const res = await fetch('https://script.google.com/macros/shttps://script.google.com/macros/s/AKfycbx0GVVCcekMPjIHpYgNtrIfT6oO9Xosus-OeXxEXbjJeqL6Rjvat4mzP_MnHi1mQ_Kd/exec', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    });
    const text = await res.text();
    return new Response(text, { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response('OK', { status: 200 }); // vẫn trả 200 để Zalo không đánh dấu lỗi
  }
}

export async function onRequestGet() {
  return new Response('OK', { status: 200 });
}