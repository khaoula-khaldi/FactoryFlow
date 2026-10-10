const verifierAdmin = (req, res, next) => {
    
    const role = req.utilisateur.role ;
    if(role !== "ADMIN"){
        return  res.status(403).json({
            message : "accès interdit !!"
        })
    }

    next();
};

module.exports = verifierAdmin;