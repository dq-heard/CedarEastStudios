export default {
  // Sanity calls this on every change: just note the time
  async fetch(request, env) {
    if (request.method !== "POST")
      return new Response("Method not allowed", { status: 405 });
    if (request.headers.get("x-webhook-secret") !== env.WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
    await env.DEBOUNCE.put("last-change", String(Date.now()));
    return new Response("queued", { status: 202 });
  },

  // Runs every minute: deploy once edits have gone quiet for 2 minutes
  async scheduled(_event, env) {
    const last = await env.DEBOUNCE.get("last-change");
    if (!last) return;
    if (Date.now() - Number(last) < 120_000) return;

    await env.DEBOUNCE.delete("last-change");
    const res = await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });
    if (!res.ok) await env.DEBOUNCE.put("last-change", last); // try again next minute
  },
};
