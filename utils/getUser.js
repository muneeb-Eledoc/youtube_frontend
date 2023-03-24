import axios from '../axios'

export const getUser = async (id)=>{
    try{
        const res = await axios.get('/user/find/'+id);
        return res.data
    }catch(e){}
}