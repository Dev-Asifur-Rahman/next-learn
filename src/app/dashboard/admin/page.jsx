import AdminResponsiveDashboard from "@/components/AdminResponsiveDashboard";
export const metadata = {
  title: "Admin | Dashboard",
};

const page = async () => {
  return (
    <>
     <AdminResponsiveDashboard></AdminResponsiveDashboard>
    </>
  );
};

export default page;
