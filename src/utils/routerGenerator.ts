import { TRoute, TUserPath } from "../types/SideBar.type";



export const routerGenerator=(items:TUserPath[])=>{

    const routes=items.reduce((acc:TRoute[], item) => {
        if (item.children) {
          // If there are children, recursively flatten them
          const childrenPaths = item.children.map(child => ({
            path: child.path,
            element: child.element,
          }));
          
          acc.push(...childrenPaths);
        } else {
          // If no children, add the current item to the result
          acc.push({ path: item.path! , element: item.element });
        }
        return acc;
      }, []);

      return routes



}