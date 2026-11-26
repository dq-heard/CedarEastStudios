// The only line that differs between projects.
// It must match "binding" in wrangler.json exactly, including case.
const getKV = (env) => env.DEBOUNCE_CES;

export default {
  async fetch(request, env) {
    if (request.method !== "POST")
      return new Response("Method not allowed", { status: 405 });
    if (request.headers.get("x-webhook-secret") !== env.WEBHOOK_SECRET) {
      return new Response("Unauthorized", { status: 401 });
    }
    await getKV(env).put("last-change", String(Date.now()));
    return new Response("queued", { status: 202 });
  },

  async scheduled(_event, env) {
    const kv = getKV(env);
    const last = await kv.get("last-change");
    if (!last) {
      console.log("no pending change");
      return;
    }
    const age = Date.now() - Number(last);
    if (age < 120_000) {
      console.log(`waiting, ${Math.round(age / 1000)}s since last change`);
      return;
    }

    await kv.delete("last-change");
    try {
      const res = await fetch(env.DEPLOY_HOOK_URL, { method: "POST" });
      console.log("deploy hook status", res.status);
      if (!res.ok) await kv.put("last-change", last);
    } catch (err) {
      console.log("deploy hook failed", String(err));
      await kv.put("last-change", last);
    }
  },
};
