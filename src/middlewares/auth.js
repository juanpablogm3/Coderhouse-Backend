import CustomError from "../errors/custom-error.js";
import EErros from "../errors/enums.js";

export function isUser(req, res, next) {
  try {
    if (req.session?.user?.role === 'user') {
      return next();
    } else {
      CustomError.createError({
        name: "Authentication error",
        cause: "Invalid or not existing user credentials",
        message: "Error de autenticación",
        code: EErros.AUTHENTICATION_ERROR,
      })
    }
  } catch (error) {
    next(error);    
  }
}

export function isAdmin(req, res, next) {
  try {
    if (req.session?.user?.role === 'admin') {
      return next();
    } else {
      CustomError.createError({
        name: "Authorization error",
        cause: "The client has valid credentials but does not have permission to access the requested resource",
        message: "No tienes permiso para acceder a esta página",
        code: EErros.AUTHORIZATION_ERROR,
      });
    }
  } catch (error) {
    next(error); // Pasar el error al manejador de errores global
  }
}

export function isPremium(req, res, next) {
  try {
    if (req.session?.user?.role === 'premium') {
      return next();
    } else {
      CustomError.createError({
        name: "Authorization error",
        cause: "The client has valid credentials but does not have permission to access the requested resource",
        message: "No tienes permiso para acceder a esta página",
        code: EErros.AUTHORIZATION_ERROR,
      });
    }
  } catch (error) {
    next(error); // Pasar el error al manejador de errores global
  }
}

export function isUserOrAdmin(req, res, next) {
  try{
    if (req.session?.user?.role === 'user' || req.session?.user?.role === 'admin') {
      return next();
    } else {
      CustomError.createError({
        name: "Authentication error",
        cause: "Invalid or not existing user credentials",
        message: "Error de autenticación",
        code: EErros.AUTHENTICATION_ERROR,
      })
    }
  } catch (error){
    next(error);
  }
}

export function isUserOrPremium(req, res, next) {
  try{
    if (req.session?.user?.role === 'user' || req.session?.user?.role === 'premium') {
      return next();
    } else {
      CustomError.createError({
        name: "Authentication error",
        cause: "Invalid or not existing user credentials",
        message: "Error de autenticación",
        code: EErros.AUTHENTICATION_ERROR,
      })
    }
  } catch (error){
    next(error);
  }
}

export function isPremiumOrAdmin(req, res, next) {
  try{
    if (req.session?.user?.role === 'premium' || req.session?.user?.role === 'admin') {
      console.log(req.session)
      return next();
    } else {
      CustomError.createError({
        name: "Authentication error",
        cause: "Invalid or not existing user credentials",
        message: "Error de autenticación",
        code: EErros.AUTHENTICATION_ERROR,
      })
    }
  } catch (error){
    next(error);
  }
}

export function isPremiumOrAdminOrUser(req, res, next) {
  try{
    if (req.session?.user?.role === 'premium' || req.session?.user?.role === 'admin'|| req.session?.user?.role === 'user') {
      return next();
    } else {
      CustomError.createError({
        name: "Authentication error",
        cause: "Invalid or not existing user credentials",
        message: "Error de autenticación",
        code: EErros.AUTHENTICATION_ERROR,
      })
    }
  } catch (error){
    next(error);
  }
}