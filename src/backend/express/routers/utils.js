function reqUser(req, res, next) {
    try {
        if (!req.user) {
            res.status(401);
            next({
                name: "UserNotLoggedIn",
                message: "You must be logged in to do this."
            });
        }
    } catch (error){
        console.error(error)
    }
}

module.exports = {reqUser}