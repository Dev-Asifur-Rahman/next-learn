import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";
import React from "react";

export async function generateMetadata({ params }) {
  const details = await params.details;
  return {
    title: details,
  };
}

const page = async({ params }) => {
  const course_id = await params.details;
  const courses = mongoDb(collections.courses)
  const course_details = await courses.findOne({_id: new ObjectId(course_id)})
  return <div>{JSON.stringify(course_details)}</div>;
};

export default page;
