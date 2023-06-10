/* eslint-disable import/prefer-default-export */

import Main from "./Main";

const ping = (createdTimestamp: number) =>
  `Latency is ${Date.now() - createdTimestamp}ms. API Latency is ${Math.round(
    Main.client.ws.ping
  )}ms`;

export { ping };
