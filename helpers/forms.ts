import { formSchema } from '@/components/forms/Zschema';
import { Form } from '@prisma/client';
import { z } from 'zod';


export const updateForm=async(prelistingId: string,transformedValues:z.infer<typeof formSchema>):Promise<Form>=>{
    const body={prelistingId,...transformedValues}
    const formDb= await fetch(`/api/form/${prelistingId}`,{
        method:'PUT',
        body:JSON.stringify(body),
        headers:{
            'content-Type':'application/json'
        }
    }).then(res=>res.json())
    
    
    return formDb;
}

export const createForm=async(prelistingId: string,transformedValues:z.infer<typeof formSchema>):Promise<Form>=>{
    const body={prelistingId,...transformedValues}
    console.log("Body to be sent:", body);
    
    const formDb= await fetch(`/api/form`,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'content-Type':'application/json'
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok' + res.statusText);
        }
        return res.json();
    });

    
    return formDb;
}

export const deletedform=async():Promise<void>=>{
    
     await fetch(`/api/form`,{
        method:'DELETE',
        
        headers:{
            'content-Type':'application/json'
        }
    }).then(res=>res.json())
}

export const fetchForm = async (id: string) => {
    const response = await fetch(`/api/form/${id}`);
    console.log("%c Line:52 🍊 id", "color:#7f2b82", id);
    if (!response.ok) {
      throw new Error("Failed to fetch form data");
    }
    return await response.json();
  };
  

  export const updateFormPUT=async(prelistingId: string,transformedValues:z.infer<typeof formSchema>):Promise<Form>=>{
    const body={prelistingId,...transformedValues}
    
    try {
        const response = await fetch(`/api/form/${prelistingId}`, {
          method: 'PUT',
          body: JSON.stringify(body),
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        // Parse the response as JSON
        const formDb = await response.json();
        
        return formDb;
      } catch (error) {
        console.error('Error in updateFormPUT:', error);
        throw error;
      }
    };
