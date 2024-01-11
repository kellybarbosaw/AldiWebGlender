const Joi = require('@hapi/joi');


const regiterValidate = (data) => {

    const schema = Joi.object({
        nome: Joi.string().required().min(3).max(50),
        email: Joi.string().required().min(3).max(50),
        senha: Joi.string().required().min(6).max(200),
        perfil:Joi.string().required().min(2).max(200),
        status:Joi.string().required().min(2).max(200),

    })

    return schema.validate(data);
}

const loginValidate = (data) => {

    const schema = Joi.object({
        email: Joi.string().required().min(3).max(50),
        senha: Joi.string().required().min(6).max(200),
    })

    return schema.validate(data);
}

module.exports.loginValidate = loginValidate;
module.exports.regiterValidate = regiterValidate;
