# Galileo short link

A CloudFlare worker script to handle short links used by venture fund [Galileo Ventures](https://galileo.ventures). Like our founders, we build technology to make the world better... Even if that's a link shortener behind https://galileo.lol.

This repo when deployed simply uses a CloudFlare Worker KV store to get the shortlink and 301 to a destination (e.g. `/wiki` -> https://wikipedia.org).

TODO more instructions and a writeup on how to set up yourself!