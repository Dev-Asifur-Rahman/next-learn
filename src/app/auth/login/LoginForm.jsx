"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const LoginForm = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (res.ok) {
      toast.success("Login Successful");
      router.push('/')
    } else return toast.error("Login Failed");
  };
  return (
    <form onSubmit={handleLogin}>
      <fieldset className="fieldset">
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
        <div className="flex justify-between items-center ">
          <a className="link link-hover">Forgot password?</a>
          <Link className="hover:underline" href={"/auth/register"}>
            Register Now
          </Link>
        </div>
        <button className="btn btn-neutral mt-4">SignIn</button>
      </fieldset>
    </form>
  );
};

export default LoginForm;
