import passport from 'passport';

export const passportCall = (strategy) =>{

    return async(req,res,next) =>{
        
        // Definimos el scope solo para estrategias que usan OAuth 2.0 (como Google)
        // El scope determina qué información del usuario solicitamos a Google
        let scope = strategy === 'google' ? { scope: ['profile', 'email'] } : {}; 


        // El scope solo afecta a estrategias OAuth, otras estrategias lo ignoran sin causar errores
        passport.authenticate(strategy,scope,function(error,user,info){

            if(error) return next(error);

            if(!user){
                req.user = null;
                if(info.message == "No auth token"){
                    return next();
                }else{
                    return res.sendUnauthorized(info.message );
                }
            }

            req.user = user;
            next();
        })(req,res,next);
    }
}