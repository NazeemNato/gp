import jwt from "jsonwebtoken";

export const verify = (token: string) => {
    let response;
    try {
        jwt.decode(token, )
    }catch (_){
        return null;
    }
    return response;
}