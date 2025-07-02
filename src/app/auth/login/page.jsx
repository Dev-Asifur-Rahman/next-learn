import GoogleLogin from "@/components/GoogleLogin";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "LogIn",
};

const page = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col gap-10">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <LoginForm></LoginForm>
            <GoogleLogin></GoogleLogin>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
