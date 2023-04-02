export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    url.host = "api.openai.com";

    try {
      const response = await fetch(url, {
        headers: request.headers,
        method: request.method,
        body: request.body,
        redirect: 'follow'
      });

      const requestBodyJson = await request.json();
      const responseBodyJson = await response.json();

      let ret = {
        req: requestBodyJson,
        res: responseBodyJson
      }

      return new Response(JSON.stringify(ret), response);
    } catch (error) {
      let ret = {error: error.message}
      return new Response(JSON.stringify(ret), {status: 500});
    }
  }
}
