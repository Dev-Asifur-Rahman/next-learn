"use client";

import Pusher from "pusher-js";
import { useEffect } from "react";
import toast from "react-hot-toast";

const CertificateNotifier = () => {
  useEffect(() => {
    const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER,
      forceTLS: true,
    });
    const channel = pusher.subscribe("certificate");
    channel.bind("certificate-ready", (data) => {
      toast.success("Congratulations! You have recieved certificate");
      console.log(data);
    });
    return () => {
      channel.unbind_all();
      pusher.unsubscribe("certificate");
      pusher.disconnect();
    };
  }, []);
  return null;
};

export default CertificateNotifier;
