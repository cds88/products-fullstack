import { useSearchParams } from "next/navigation";

export const useAppQueryParams = ():Record<string, Record<string, string>> =>{

    const searchParams = useSearchParams();

    const searchParamsEntries = Object.fromEntries(searchParams.entries())
    const {$orderby, $filter} = searchParamsEntries

    const _filter = $filter || {}
    const filters = {
      brand:"",category:"",title:"", price:"", rating:"",
      ..._filter
    }
    const orderByBefore = $orderby?.split(", ").reduce((acc, item)=>{
        const [key, val] = item.trim().split(" ");
        if(!key || !val) return acc
        return {
          ...acc,
          [key] : val
        }
       }, {}) || {}
   
 
       
       return {
        orderBy: orderByBefore,
        filters
       }

}