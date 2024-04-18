const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schema = Joi.object({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        datacriacao: Joi.string().required(),
        dataalteracao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        status: Joi.number().allow(null, ''),
    })
    return schema.validate(data);
}

const registerValidateUpdate = (data) => {

    const schema = Joi.object({
        idstatus: Joi.number().required(),
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        datacriacao: Joi.string().required(),
        dataalteracao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        status: Joi.number().allow(null, ''),
    })
    return schema.validate(data);
}

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;