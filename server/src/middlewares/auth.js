const jwt = require("jsonwebtoken")

exports.auth = (req,res,next) => {

    const authHeader = req.header("Authorization")
    const token = authHeader && authHeader.split(" ")[1]

    console.log(token);

    if(!token) {
        return res.status(401).send({
            status: "Error",
            message: "Unauthorized User"
        })
    }

    try {

        const verifyToken = jwt.verify(token, process.env.TOKEN_KEY)

        req.Users = verifyToken

        console.log(verifyToken);
        next()

    } catch (error) {
        console.log(error);
        res.status(400).send({
            status: "Failed",
            message: "Invalid Token"
        })
    }

} 