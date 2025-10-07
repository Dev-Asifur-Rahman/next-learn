import useShowUsersData from "@/hooks/useShowUsersData";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import usePromotionRole from "@/hooks/usePromotionRole";

const AllStudents = () => {
  const students = useShowUsersData("student").user;
  const deleteStudent = () => {
    alert("delete student");
  };

  const promote = async (id, requestedRole) => {
    usePromotionRole("student", requestedRole, id);
  };
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
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
          {students?.map((student, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="text-center">{student.userId}</td>
                <td className="text-center">
                  <div className="dropdown dropdown-top dropdown-center">
                    <div tabIndex={0} className="m-1 cursor-pointer">
                      {student.role}
                    </div>
                    <ul
                      tabIndex={0}
                      className="dropdown-content menu bg-base-100 rounded-box z-10 p-2 shadow-sm"
                    >
                      <li>
                        <a
                          className="text-nowrap"
                          onClick={() => promote(student.userId, "instructor")}
                        >
                          Make Instructor
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td className="cursor-pointer" onClick={deleteStudent}>
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

export default AllStudents;
