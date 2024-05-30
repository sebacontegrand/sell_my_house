import { Prelisting } from "@prisma/client";


export const updatePrelisting=async(id:string,complete:boolean):Promise<Prelisting>=>{
    const body={complete}
    const prelistingDb= await fetch(`/api/prelistings/${id}`,{
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            'content-Type':'application/json'
        }
    }).then(res=>res.json())
    
    
    return prelistingDb;
}

export const createPrelisting=async(description:string, title:string):Promise<Prelisting>=>{
    const body={description,title}
    const prelistingDb= await fetch(`/api/prelistings`,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'content-Type':'application/json'
        }
    }).then(res=>res.json())
    
    
    return prelistingDb;
}

export const deletedPrelisting=async():Promise<void>=>{
    
     await fetch(`/api/prelistings`,{
        method:'DELETE',
        
        headers:{
            'content-Type':'application/json'
        }
    }).then(res=>res.json())
    
    
    
}

