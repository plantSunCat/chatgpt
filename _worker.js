export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      url.host = "api.openai.com";
  
      const serialized = {
        method: request.method,
        headers: {},
        redirect: request.redirect
      };
    
      request.headers.forEach((value, name) => {
        serialized.headers[name] = value;
      });
    

      if (request.method !== 'GET' && request.method !== 'HEAD') {
        serialized.body = request.body.json() ? request.body : null;
      }
    
      try {
        const response = await fetch(url, {
          headers: request.headers,
          method: request.method,
          body: request.body,
          redirect: 'follow'
        });

        const responseBodyJson = await response.json();
        let ret = {
          response: responseBodyJson,
          requset: serialized
        }
  
        return new Response(JSON.stringify(ret), response);
      } catch (error) {
        let ret = {
            error: error.message,
            requset: serialized
        }
        return new Response(JSON.stringify(ret), {status: 500});
      }
    }
  }
