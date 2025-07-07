import useShowUsersData from "@/hooks/useShowUsersData";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";

const AllInstructors = () => {
  const instructors = useShowUsersData("instructor").user;
  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
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
          {instructors?.map((instructor, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{instructor.name}</td>
                <td>{instructor.email}</td>
                <td>{instructor.userId}</td>
                <td>{instructor.role}</td>
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

export default AllInstructors;
