export const getBaseHeaders = () =>{
    return {
        headers: {
            'Content-Type':'application',
            Accept:'application/json'
        },
        withCredentials: true
    }
}

export const getFormHeaders = () =>{
    return {
        headers: {
            'Content-Type':'application/json', 
            Accept:'application/json'
        },
        withCredentials: true
    }
}
