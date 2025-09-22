import axios from "axios";


const usePromotionRole = async(currentRole,requestedRole) => {
    const response = await axios.post(`/api/admin/promotion?role=${currentRole}&request=${requestedRole}`)
    // return 
};

export default usePromotionRole;