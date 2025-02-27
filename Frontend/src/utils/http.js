// export const getBaseHeaders = () =>{
//     return {
//         headers: {
//             'Content-Type':'application',
//             Accept:'application/json'
//         },
//         withCredentials: true
//     }
// }

// export const getFormHeaders = () =>{
//     return {
//         headers: {
//             'Content-Type':'application/json', 
//             Accept:'application/json'
//         },
//         withCredentials: true
//     }
// }

export const getHeaders = () => ({
    headers: {
        Accept: 'application/json',
    },
    withCredentials: true
});

export const postHeaders = () => ({
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
    },
    withCredentials: true
});

export const postFileHeaders = () => ({
    headers: {
        'Content-Type': 'multipart/form-data',
        Accept: 'application/json'
    },
    withCredentials: true
});
