"use client";

import Link from "next/link";

const LoginForm = () => {
  const handleLogin = (e) => {
    e.preventDefault();
    const target = e.target;
    const email = target.email.value;
    const password = target.password.value;
    console.log(email, password);
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
