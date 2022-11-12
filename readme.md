This program proxies traffic between one server and another, whose private server has a changing, non-public ip.

See `diagram.png` in this repository for a basic illustration of how this works.

There is no guarantee that this will work for sockets which need to be open continuously.  It can proxy HTTPS traffic as
well; however, you must make sure your private server is correctly configured.\



I made this open-source, but I made it for private use.  I thought some people might want something like this without
having to set up NGINX or similar software when a small script like this works instead.
