import useSWR from "swr";

const getCategories =(initialData)=>{
    let res
    if(initialData){
        res= useSWR("/api/categories",{initialData})
    }
    else{
        res= useSWR("/api/categories")
    }
    return{
        categories:res.data,
        isLoading:!res.data && !res.error,
        error:res.error
    }
}
export default getCategories