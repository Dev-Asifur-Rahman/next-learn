"use client";

import axios from "axios";
import toast from "react-hot-toast";

const page = () => {
  
  const getCertificate = async () => {
    const loading = toast.loading('Waiting for Response')
    const response = await axios.post("/api/student/certificates");
    const data = response.data;
    if(data?.success){
      toast.dismiss(loading)
      return toast.success('Congratulations! You will be Notified Soon')
    }
    else{
      toast.dismiss(loading)
      return toast.error('Something Went Wrong! Try Again')
    }
  };

  return (
    <section className="w-full flex items-center justify-center overflow-y-scroll">
      <button onClick={getCertificate}>Request For Certificate</button>
    </section>
  );
};

export default page;
