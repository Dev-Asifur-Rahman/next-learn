import QuizComponent from "@/DashboardComponents/Student/StudentComponents/QuizComponent";
import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";



export default async function QuizGeneratorPage({ params }) {
  const id = await params.id;
  const contents = await mongoDb(collections.contents);
  const classObject = await contents.findOne({ _id: new ObjectId(id) });
  const classLessons = classObject.content;

  return <QuizComponent lesson={classLessons}></QuizComponent>;
}
