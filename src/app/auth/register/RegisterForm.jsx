"use client";

import registerUser from "@/actions/auth/registerUser";
import imageUpload from "@/lib/imageUpload";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const RegisterForm = () => {
  const router = useRouter();
  const handleRegister = async (e) => {
    e.preventDefault();
    const target = e.target;
    const toastId = toast.loading("Registering...");
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
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });
        if (res.ok) {
          target.reset();
          router.push('/')
          toast.dismiss(toastId)
          return toast.success("Registration Successful");
        }
      } else {
        toast.dismiss(toastId)
        return toast.error("Registration Failed !");
      }
    }
    else{
      toast.dismiss(toastId)
      return toast.error('Image Upload Failed!')
    }
  };
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
        <button className="btn mt-4 bg-white dark:bg-transparent border dark:border-white  dark:text-white text-black ">
          <svg
            aria-label="Email icon"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="stroke-black dark:stroke-white"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
            >
              <rect width="20" height="16" x="2" y="4" rx="2"></rect>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
            </g>
          </svg>
          SignUp with Email
        </button>
      </fieldset>
    </form>
  );
};

export default RegisterForm;
