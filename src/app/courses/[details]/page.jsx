import React from "react";

export async function generateMetadata({ params }) {
  const details = await params.details;
  return {
    title: details,
  };
}

const page = ({ params }) => {
  return <div>course details</div>;
};

export default page;
