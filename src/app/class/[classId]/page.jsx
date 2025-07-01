import LessonViewer from "@/components/LessonViewer";
import mongoDb, { collections } from "@/lib/mongoConnect";
import { ObjectId } from "mongodb";


const page = async({params}) => {
    const id = params.classId
    const contents = await mongoDb(collections.contents)
    const classObject = await contents.findOne({_id: new ObjectId(id)})
    const classLessons = classObject.content
    return (
        <div>
            <LessonViewer lessons={classLessons}></LessonViewer>
        </div>
    );
};

export default page;