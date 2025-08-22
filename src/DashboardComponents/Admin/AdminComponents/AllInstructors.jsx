import useShowUsersData from "@/hooks/useShowUsersData";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

const AllInstructors = () => {
  const instructors = useShowUsersData("instructor").user;
  const deleteInstructor = () => {
    alert("hello");
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th className="text-center">userId</th>
            <th className="text-center">role</th>
            <th>
              <TfiTrash />
            </th>
          </tr>
        </thead>
        <tbody>
          {instructors?.map((instructor, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{instructor.name}</td>
                <td>{instructor.email}</td>
                <td className="text-center">{instructor.userId}</td>
                <td className="text-center">
                  <div className="dropdown dropdown-top dropdown-center">
                    <div tabIndex={0} className="m-1 cursor-pointer">
                      {instructor.role}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-10 p-2 shadow-sm"
                    >
                      <li>
                        <a className="text-nowrap">Make Admin</a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td
                  className="cursor-pointer
                "
                  onClick={deleteInstructor}
                >
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

export default AllInstructors;
