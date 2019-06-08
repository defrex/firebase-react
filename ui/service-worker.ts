/* eslint-env serviceworker */
importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js')

self.workbox.routing.registerRoute(new RegExp('.*.js'), new self.workbox.strategies.NetworkFirst())
