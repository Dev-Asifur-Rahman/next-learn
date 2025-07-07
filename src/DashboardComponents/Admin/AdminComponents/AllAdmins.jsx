import useShowUsersData from "@/hooks/useShowUsersData";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

const AllAdmins = () => {
  const admins = useShowUsersData("admin").user;
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>userId</th>
            <th>role</th>
            <th>
              <TfiTrash />
            </th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((admin, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.userId}</td>
                <td>{admin.role}</td>
                <td>
                  <RxCross1 />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllAdmins;
