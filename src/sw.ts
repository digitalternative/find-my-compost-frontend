/// <reference lib="webWorker" />
import { precacheAndRoute, cleanupOutdatedCaches } from "workbox-precaching";

declare const self: ServiceWorkerGlobalScope;
cleanupOutdatedCaches();
precacheAndRoute(self.__WB_MANIFEST);
