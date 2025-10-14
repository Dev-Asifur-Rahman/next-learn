import useShowUsersData from "@/hooks/useShowUsersData";
import { TfiTrash } from "react-icons/tfi";
import { RxCross1 } from "react-icons/rx";
import usePromotionRole from "@/hooks/usePromotionRole";
import useDeleteUser from "@/hooks/useDeleteUser";
import toast from "react-hot-toast";

const AllInstructors = () => {
  const instructors = useShowUsersData("instructor").user;

  const { DeleteUser } = useDeleteUser();
  const deleteInstructor = async (id, collection) => {
    const data = { id, collection };
    const result = await DeleteUser(data);
    if (result.success === true) {
      toast.success(result?.message);
    } else {
      toast.error(result?.message);
    }
  };

  const promote = async (id, requestedRole) => {
    usePromotionRole("instructor", requestedRole, id);
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
                        <a
                          className="text-nowrap"
                          onClick={() => promote(instructor.userId, "admin")}
                        >
                          Make Admin
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
                <td
                  className="cursor-pointer
                "
                  onClick={() =>
                    deleteInstructor(instructor?.userId, "instructor")
                  }
                >
                  <div
                    className="tooltip tooltip-left"
                    data-tip="Delete Student"
                  >
                    <RxCross1 />
                  </div>
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
