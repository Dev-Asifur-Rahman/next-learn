import axios from "axios";


const usePromotionRole = async(currentRole,requestedRole,userId) => {
    const response = await axios.post(`/api/admin/promotion?role=${currentRole}&request=${requestedRole}&userId=${userId}`)
    // return 
};

export default usePromotionRole;