import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Dashboard",
};

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/login");
  }

  const role = session.user?.role;

  if (role === "admin") {
    redirect("/dashboard/admin");
  } else if (role === "instructor") {
    redirect("/dashboard/instructor");
  } else if (role === "student") {
    redirect("/dashboard/student");
  }
};

export default Page;
