export const executePolicies = (policies) =>{
    return (req,res,next) =>{
        // Si la ruta es publica y el usuario no se encuentra autenticado, puede continuar.
        if(policies.includes('PUBLIC') && !req.user) return next();

        // Si la ruta es publica y el usuario se encuentra autenticado, puede continuar.
        if(policies.includes('PUBLIC') && req.user) return next();

        // Si la ruta no es publica y el usuario no se encuentra autenticado, salta un mensaje de error.
        if(!policies.includes('PUBLIC') && !req.user) return res.sendBadRequest('No active session found. Please log in first.');

        // Si la ruta es apta para el rol del usuario, puede continuar.
        if(policies.includes(req?.user?.role?.toUpperCase())) return next();

        // Si no es ninguno de los casos, salta un mensaje de error.
        return res.sendUnauthorized('You do not have permission to perform this action');
    }
}