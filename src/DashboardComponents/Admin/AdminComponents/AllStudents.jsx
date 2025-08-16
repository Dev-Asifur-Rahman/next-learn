import useShowUsersData from "@/hooks/useShowUsersData";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

const AllStudents = () => {
  const students = useShowUsersData("student").user;
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
            <th><TfiTrash /></th>
          </tr>
        </thead>
        <tbody>
          {students?.map((student, index) => {
            return (
              <tr key={index}>
                <th>{index+1}</th>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td className="text-center">{student.userId}</td>
                <td className="text-center">{student.role}</td>
                <td><RxCross1 /></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default AllStudents;
