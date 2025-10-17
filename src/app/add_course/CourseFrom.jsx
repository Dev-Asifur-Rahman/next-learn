"use client";
import { addCourse } from "@/actions/instructor/addCourse";
import imageUpload from "@/lib/imageUpload";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { PiUploadBold } from "react-icons/pi";

const CourseFrom = () => {
  const session = useSession();
  const user = session.data.user;

  const [lessons, setLessons] = useState([]);
  const [lessonName, setLessonName] = useState(null);
  const [totalLessons, setTotalLessons] = useState(0);

  useEffect(() => {
    console.log(lessons.length);
  }, [lessons]);

  const handleForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const selectValue = form.selectValue.value;
    const lesson = form.lesson.value;
    setLessonName(lesson);
  };

  const getLesson = (e) => {
    const selectValue = e.target.value;
    if (selectValue === "create") {
      // write created course and refetch
      document.getElementById("my_modal_1").showModal();
    } else {
      // write updated course
    }
  };

  const handleCreateForm = async (e) => {
    e.preventDefault();
    const form = e.target;
    const loading = toast.loading("Loading");

    const modal = document.getElementById("my_modal_1");
    // taking course info by modal
    const title = form.title.value;
    const description = form.description.value;
    const courseId = form.courseId.value;
    const photoFile = form.course_image.files[0];
    const image = await imageUpload(photoFile);
    if (!image) {
      toast.dismiss(loading);
      toast.error("Image Upload Failed");
      modal.close();
      return;
    } else {
      const courseObject = {
        title,
        description,
        courseId,
        instructor_id: user?._id,
        courseImage: image?.data.url,
      };
      const result = await addCourse(courseObject);
      if (result.success === true) {
        toast.dismiss(loading);
        toast.success("Course Created Successfully");
        modal.close();
        return;
      } else {
        toast.dismiss(loading);
        toast.error("Something went wrong ! try again");
        modal.close();
        form.reset();
        return;
      }
    }
  };
  return (
    <section className="w-full">
      <div className="w-full flex justify-center">
        <form
          onSubmit={handleForm}
          action=""
          className=" w-[90%] md:w-full lg:w-full border p-3 md:p-0 lg:p-0 grid grid-cols-1  justify-items-center gap-y-3"
        >
          <div className="w-full max-w-[260px]">
            <label className="label dark:text-white text-inherit my-1">
              Select Course
            </label>
            <select
              onChange={getLesson}
              defaultValue="Select Your Course"
              className="select w-full focus:ring-0 focus:border-0"
              name="selectValue"
            >
              <option disabled={true}>Select Your Course</option>
              <option value="create" className="">
                Create New
              </option>
              <option value={"crimson"}>Crimson</option>
              <option value={"amber"}>Amber</option>
              <option value={"velvet"}>Velvet</option>
            </select>
          </div>
          <div className="w-full max-w-[260px]">
            <label className="my-1">Enter Lesson</label>
            <input
              type="text"
              className="input w-full focus:ring-0 focus:border-0"
              placeholder="Enter Lesson"
              name="lesson"
            />
          </div>
          <button className="btn w-full max-w-[260px]  bg-white dark:bg-transparent dark:text-white text-black border dark:border-white">
            <div className="flex items-center justify-center gap-2">
              <PiUploadBold /> <p>Add Course</p>
            </div>
          </button>
        </form>
      </div>
      {/* modal  */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="w-full">
            <form
              method="dialog"
              className=" grid grid-cols-1 gap-y-3
            "
              onSubmit={handleCreateForm}
            >
              <div>
                <label htmlFor="" className="label my-1">
                  Course Title
                </label>
                <input
                  type="text"
                  name="title"
                  className="input focus:ring-0 focus:border-0 w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="label my-1">
                  Description
                </label>
                <input
                  type="text"
                  name="description"
                  className="input focus:ring-0 focus:border-0 w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="label my-1">
                  CourseId (must be start with c)
                </label>
                <input
                  type="text"
                  name="courseId"
                  className="input focus:ring-0 focus:border-0 w-full"
                />
              </div>
              <div>
                <label htmlFor="" className="label my-1">
                  Course Image
                </label>
                <input type="file" name="course_image" className="file-input" />
              </div>
              {/* if there is a button in form, it will close the modal */}
              <div className="w-full flex items-center gap-2">
                <button className="btn btn-outline">Confirm</button>
                <button
                  type="button"
                  className="btn btn-outline"
                  onClick={() => document.getElementById("my_modal_1").close()}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
    </section>
  );
};

export default CourseFrom;
