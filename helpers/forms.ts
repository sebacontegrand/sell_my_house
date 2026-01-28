import { Form } from "@prisma/client";


export const updateForm = async (id: string, complete: boolean): Promise<Form> => {
    const body = { complete }
    const formDb = await fetch(`/api/form/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
            'content-Type': 'application/json'
        }
    }).then(res => res.json())


    return formDb;
}

export const createForm = async (prelistingId: string, date: Date, email: string, asesor: string, proprietario: string, celular: string, direccion: string, propertytype: string): Promise<Form> => {
    const body = { prelistingId, date, email, asesor, proprietario, celular, direccion, propertytype }
    console.log("Body to be sent:", body);

    const formDb = await fetch(`/api/form`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'content-Type': 'application/json'
        }
    }).then(res => {
        if (!res.ok) {
            throw new Error('Network response was not ok' + res.statusText);
        }
        return res.json();
    });


    return formDb;
}

export const deletedform = async (): Promise<void> => {

    await fetch(`/api/form`, {
        method: 'DELETE',

        headers: {
            'content-Type': 'application/json'
        }
    }).then(res => res.json())



}

