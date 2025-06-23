import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Admin | Dashboard",
};

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    return redirect("/auth/login");
  }
  else if(session.user.role !== 'admin'){
    return redirect(`/dashboard/${session.user.role}`)
  }
};

export default page;
