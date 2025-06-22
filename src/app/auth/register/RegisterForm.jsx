"use client";

import registerUser from "@/actions/auth/registerUser";
import imageUpload from "@/lib/imageUpload";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const router = useRouer();
  const session = useSession();
  const handleRegister = async (e) => {
    e.preventDefault();
    const target = e.target;
    const photoFile = target.photo.files[0];
    const image = await imageUpload(photoFile);
    if (image) {
      const name = target.name.value;
      const email = target.email.value;
      const password = target.password.value;
      const location = target.location.value;
      const profileImage = image?.data.url;
      const user = {
        name,
        email,
        password,
        location,
        profileImage,
        enrolledCourses: [],
      };
      const student_data = await registerUser(user);
      if (student_data?.success) {
        target.reset();
        return toast.success("Registration Successful");
      } else {
        return toast.error("Registration Failed !");
      }
    }
  };
  useEffect(() => {
    if (session?.data) {
      router.push("/");
    }
  }, [session?.data]);
  return (
    <form onSubmit={handleRegister}>
      <fieldset className="fieldset">
        <label className="label">Name</label>
        <input
          type="text"
          name="name"
          className="input w-full"
          placeholder="Enter Name"
        />
        <label className="label">Email</label>
        <input
          type="email"
          name="email"
          className="input w-full"
          placeholder="Email"
        />
        <label className="label">Password</label>
        <input
          type="password"
          name="password"
          className="input w-full"
          placeholder="Password"
        />
        <label className="label">Location</label>
        <input
          type="text"
          name="location"
          className="input w-full"
          placeholder="district, city"
        />
        <label>PhotoURL</label>
        <input type="file" name="photo" className="file-input" />
        <div className="flex justify-between items-center ">
          <a className="link link-hover">Forgot password?</a>
          <Link className="hover:underline" href={"/auth/login"}>
            Login Now
          </Link>
        </div>
        <button className="btn btn-neutral mt-4">SignUp</button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
