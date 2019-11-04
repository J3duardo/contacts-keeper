const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  //Tomar el token del header
  const token = req.header("x-auth-token");

  //Chequear si el token existe
  if(!token) {
    return res.status(401).json({msg: "Access denied: You need to be logged in to access this resource."})
  }

  //Decodificar el token y enviar el payload al cliente
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next()
  }
  catch (error) {
    res.status(401).json({msg: "Invalid token"})
  }
}