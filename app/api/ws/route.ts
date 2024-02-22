import { EventEmitter } from "events";

export const pubsub = new EventEmitter();

export function SOCKET(
  client: import("ws").WebSocket,
  request: import("http").IncomingMessage,
  server: import("ws").WebSocketServer
) {
  console.log("A client connected!");

  let userId: string | undefined | null;

  if (request.url) {
    userId = new URL(request.url, "http://localhost").searchParams.get(
      "userId"
    );
  }

  pubsub.on(`projectAccepted_${userId}`, (data) => {
    client.send(JSON.stringify(data));
  });

  pubsub.on("newProjectManager", (data) => {
    client.send(data);
  });

  client.on("close", () => {
    pubsub.removeAllListeners("newProjectManager");
    pubsub.removeAllListeners(`projectAccepted_${userId}`);
  });
}
