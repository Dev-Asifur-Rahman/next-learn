import Pusher from "pusher";

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,       // Server-side key
  secret: process.env.PUSHER_SECRET, // Server-only secret
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});