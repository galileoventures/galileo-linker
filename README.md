# Galileo short link

A CloudFlare worker script to handle short links used by venture fund [Galileo Ventures](https://galileo.ventures). Like our founders, we build technology to make the world better... Even if that's a link shortener behind [https://galileo.lol](https://galileo.lol).

This repo when deployed simply uses a CloudFlare Worker KV store to get the shortlink and 301 to a destination (e.g. `/wiki` -> https://wikipedia.org).

This repo only handles the redirection in a Cloudflare Worker. The worker does not handle creating, reading, updating or destroying the actual links and destinations.

We have a [custom Slackbot](https://github.com/galileoventures/galileo-linker-bot) used to create and handle the key-value mapping for the shortlinks to destinations. 

## Setting it up

To set up the short linker you will need:

- A domain behind Cloudflare to use for link shortening. We got `galileo.lol` but you could also use a subdomain I guess
- Cloudflare workers enabled
- Cloudflare KV store enabled

Note that KV storage and workers may incur some costs depending on Cloudflare's pricing (currently $5/mo) and whether you can fit it into the free tier.

You may want to adjust the URL for the 'home page' of your link shortening domain (e.g. [https://galileo.lol](https://galileo.lol) with no 'slug') to be your website.

## How it works

Using the Slackbot, we store a key-value pair of the short link 'slug' and its destination URL. For example, the KV for `wiki` might be `https://wikipedia.org`.

When a request hits this Cloudflare Worker, it looks up in Cloudflare's KV store if there is a value for that slug. If there is, it 301s the user to the destination site. If not, it sends a 404.

## Contributing & License

No idea why you might like to, but you're welcome to PR. We took some inspiration [an existing repo](https://github.com/obezuk/cf-workers-link-shortener) so feel free to do with it what you will, with caveat of no warranty ;) .