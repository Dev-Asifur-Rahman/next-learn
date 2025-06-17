"use client";

import Link from "next/link";

const RegisterForm = () => {
  return (
    <form>
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
