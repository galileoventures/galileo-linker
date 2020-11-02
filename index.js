// with thanks and light inspiration from https://github.com/obezuk/cf-workers-link-shortener
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})
/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  var request_url = new URL(request.url);

  short_url = request_url.pathname.split('/');

  if (short_url[1]) {
    // we have a shortened URL slug!
    var input = '';

    if (short_url.length > 1) {
      short_url.shift();
      input = short_url.join('/');
    } else {
      input = short_url[1];
    }

    // get it from our KV store
    var url = await WORKERS_KV_LINKS.get(input);

    if (url) {
      var requested_url = new URL(url);
      // TODO some nice powered by headers for this because why not
      return Response.redirect(requested_url.toString(), 301);
    } else {
        // no URL for this link, 404 with a little bit of nice ~branding~
      return new Response(JSON.stringify({
        "Status" : 404,
        "Message" : 'Short link not found. Please check the link and try again',
        "ShortUrl" : null
      }), {
        'status': 404,
        'statusText': 'Not found',
        'headers': { "Content-Type": "application/json", "X-Powered-By": "Galileo Ventures" }
      });
    }

  } else {
    // no short link, redirect to the Galileo website
    return Response.redirect('https://galileo.ventures', 301);
  }
  
}