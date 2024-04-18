import useSWR from "swr";

const getDishes=(initialData)=>{
    let res
    if(initialData){
    res= useSWR("/api/dishes",{initialData})
    }
    else{
        res=useSWR("/api/dishes")
    }
    return{
        dishes:res.data,
        isLoading:!res.data && !res.error,
        error:res.error
    }
}
export default getDishes

