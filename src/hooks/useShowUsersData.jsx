import axios from "axios";
import { useEffect, useState } from "react";


const useShowUsersData = (role) => {
    const [Userdata,setData] = useState([])

    useEffect(()=>{
        const fetchUsersData = async() =>{
            const res = await axios.get(`/api/admin/users?role=${role}&data=${true}`)
            setData(res.data)
        }
        fetchUsersData()
    },[])
    return Userdata
};

export default useShowUsersData;