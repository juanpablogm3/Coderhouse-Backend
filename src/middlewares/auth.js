import CustomError from "../errors/custom-error.js";
import EErros from "../errors/enums.js";

export function isUser(req, res, next) {
  try {
    if (req.session?.user?.role === 'user') {
      return next();
    }
  } catch (error) {
    CustomError.createError({
      name: "Authentication error",
      cause: "Invalid or not existing user credentials",
      message: "Error de autenticación",
      code: EErros.AUTHENTICATION_ERROR,
    })
  }
}
  
export function isAdmin(req, res, next) {
  try {
    if (req.session?.user?.role === 'admin') {
      return next();
    }
  } catch (error) {
    CustomError.createError({
      name: "Authorization error",
      cause: "The client has valid credentials but does not have permission to access the requested resource",
      message: "Error de autenticación",
      code: EErros.AUTHORIZATION_ERROR,
    })
  }
}

export function isUserOrAdmin(req, res, next) {
  try{
    if (req.session?.user?.role === 'user' || req.session?.user?.role === 'admin') {
      return next();
    }
  } catch (error){
    CustomError.createError({
      name: "Authentication error",
      cause: "Invalid or not existing user credentials",
      message: "Error de autenticación",
      code: EErros.AUTHENTICATION_ERROR,
    })
  }
}