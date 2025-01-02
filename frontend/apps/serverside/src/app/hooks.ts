import { useSearchParams } from "next/navigation";


type UseAppQueryParamsReturn = {
  orderBy: Record<string, string>;
  filters: Record<string, string>;
  pathString: string;
}


export const useAppQueryParams = ():UseAppQueryParamsReturn =>{

    const searchParams = useSearchParams();
     const searchParamsEntries = Object.fromEntries(searchParams.entries())
    const {$orderby, ...filters} = searchParamsEntries

 
 
    const orderByBefore = $orderby?.split(",").reduce((acc, item)=>{
        const [key, val] = item.trim().split(" ");
        if(!key || !val) return acc
        return {
          ...acc,
          [key] : val
        }
       }, {}) || {}
   
 
       
       return {
        orderBy: orderByBefore,
        filters: {
  brand:"",category:"",title:"", price:"", rating:"", tags:"",
          ...filters
        },
        pathString: searchParams.toString()
       }

}