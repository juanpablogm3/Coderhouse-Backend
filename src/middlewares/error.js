import EErros from "../errors/enums.js";

export default (error, req, res, next) => { 
    console.log(error/* .cause */);

    switch(error.code){
        case EErros.PRODUCT_NOT_IN_CART:
            res
                .status(404)
                .send({status: "error", error: error.name, cause: error.cause, message: error.message});
            break;
        case EErros.CART_DOESNT_EXIST:
            res
                .status(404)
                .send({status: "error", error: error.name, cause: error.cause, message: error.message});
            break;
        case EErros.MONGO_CONNECT_FAIL:
            res
                .status(500)
                .send({status: "error", error: error.name, cause: error.cause, message: error.message});
            break;
        case EErros.AUTHENTICATION_ERROR:
            console.log(error);
            res
                .status(401)
                .render("error", {error});
            break;
        case EErros.AUTHORIZATION_ERROR:
            res
                .status(403)
                .render("error", {error});
            break;
        case EErros.INTERNAL_SERVER_ERROR:
        res
            .status(500)
            .render("error", {error});
            break;
        case EErros.ERROR_CREATING_PRODUCT:
        res
            .status(403)
            .render("error", {error});
            break;
        default:
            res.status(400).json({status: "error", error: "Unhandled error"});
            break;
    }
};