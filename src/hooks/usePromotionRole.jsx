import axios from "axios";
import toast from "react-hot-toast";


const usePromotionRole = async(currentRole,requestedRole,userId) => {
    const loading = toast.loading('Please Wait')
    const response = await axios.post(`/api/admin/promotion?role=${currentRole}&request=${requestedRole}&userId=${userId}`)
    if(response.data.success){
        toast.dismiss(loading)
        toast.success('Promoted Sucessfully')
    }
};

export default usePromotionRole;