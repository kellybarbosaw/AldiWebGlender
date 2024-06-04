const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schema = Joi.object({
        idpessoa: Joi.number().required(),
        tiporecurso: Joi.number().required(),
        datainicio: Joi.string().required(),
        datafim: Joi.string().required(),
        datacriacao: Joi.string().required(),
        dataalteracao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        ativo: Joi.number().required(),
        valorhr: Joi.number().required(),

    })
    return schema.validate(data);
}

const registerValidateUpdate = (data) => {

    const schema = Joi.object({
        idrecurso: Joi.number().required(),
        idpessoa: Joi.number().required(),
        tiporecurso: Joi.number().required(),
        datainicio: Joi.string().required(),
        datafim: Joi.string().required(),
        datacriacao: Joi.string().required(),
        dataalteracao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        ativo: Joi.number().required(),
        valorhr: Joi.number().required()

    })
    return schema.validate(data);
}

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;