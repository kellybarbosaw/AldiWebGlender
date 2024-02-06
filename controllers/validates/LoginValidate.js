const Joi = require('@hapi/joi');


const regiterValidate = (data) => {

    // usando valores para definir ATIVO
    // 1 ativo 
    // 2 inativo
    const schema = Joi.object({
        usuario: Joi.string().required().min(3).max(50),
        nome: Joi.string().required().min(3).max(100),
        ativo: Joi.number().required().valid(1,2),
        perfil: Joi.string().required().min(3).max(50),
        datacriacao: Joi.string().required(),
        dataalteracao:Joi.string().required(),
        usuariocriacao:Joi.string().required().min(3).max(50),
        usuarioalteracao:Joi.string().required().min(3).max(50),
        senha:Joi.string().required().min(2).max(200),
        email:Joi.string().required().min(2).max(100),
    })

    return schema.validate(data);
}

const regiterValidateUpdate = (data) => {

    const schema = Joi.object({
        usuario: Joi.string().required().min(3).max(50),
        nome: Joi.string().required().min(3).max(100),
        ativo: Joi.number().required().valid(1,2),
        perfil: Joi.string().required().min(3).max(50),
        datacriacao: Joi.string().required(),
        dataalteracao:Joi.string().required(),
        usuariocriacao:Joi.string().required().min(3).max(50),
        usuarioalteracao:Joi.string().required().min(3).max(50),
        senha:Joi.string().required().min(2).max(200),
        email:Joi.string().required().min(2).max(100),
    })
    return schema.validate(data);
}

const loginValidate = (data) => {

    const schema = Joi.object({
        senha:Joi.string().required().min(2).max(200),
        email:Joi.string().required().min(2).max(100),
    })

    return schema.validate(data);
}

module.exports.loginValidate = loginValidate;
module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;
