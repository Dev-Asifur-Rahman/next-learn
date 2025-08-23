import useShowUsersData from "@/hooks/useShowUsersData";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

const AllAdmins = () => {
  const admins = useShowUsersData("admin").user;
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra my-6">
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
                <td>
                  <div className="dropdown dropdown-top dropdown-center">
                    <div tabIndex={0} className="m-1 cursor-pointer">
                      {admin.role}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-10 p-2 shadow-sm"
                    >
                      <li>
                        <a className="text-nowrap">Make Instructor</a>
                      </li>
                      <li>
                        <a className="text-nowrap">Make Student</a>
                      </li>
                    </ul>
                  </div>
                </td>
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
