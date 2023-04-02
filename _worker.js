export default {
    async fetch(request, env) {
      const url = new URL(request.url);
      url.host = "api.openai.com";
      // openai is already set all CORS heasders 
        const response = await fetch(url, {
            headers: request.headers,
            method: request.method,
            body: request.body,
            redirect: 'follow'
        }).then(response => {
            response.headers.set('req', '1111111');
        })
        // .catch(error => {
        //     response.body.set('{"error": "' + error + '"}')
        // });;
        return response;
    }
}

