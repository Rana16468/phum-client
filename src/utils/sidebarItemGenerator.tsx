import { NavLink } from "react-router-dom";
import { TSidebarItem, TUserPath } from "../types/SideBar.type"

export const sidebarItemGenerator=(items:TUserPath[],role:string)=>{

   const sidebarItmes= items.reduce((acc:TSidebarItem[],item)=>{
    
        if(item.name && item.path)
        {
            acc.push({key:item.name,label:<NavLink to={`/${role}/${item.path}`}>{item.name}</NavLink>})
        }
        
        if(item.children)
        {
            acc.push({
                key:item.name!,
                label:item.name,
                children:item.children.map((child)=>{

                    if(child?.name){
                        return {
                            key:child.name!,
                            label:<NavLink to={`/admin/${child.path}`}>{child.name}</NavLink>
                        }
                    }
                })
    
            })
        }
        return acc
    
    
    },[]);
    return sidebarItmes

}