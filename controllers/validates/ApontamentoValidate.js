const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schema = Joi.object({
        idprojetotarefa: Joi.number().required(),
        data: Joi.string().required(),
        horainicio: Joi.string().required(),
        horafinal: Joi.string().required(),
        descricao: Joi.string().required().max(300),
        dtcriacao: Joi.string().required(),
        dtmodificacao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(45),
        usuarioalteracao: Joi.string().required().max(45),

    })
    return schema.validate(data);
}

const registerValidateUpdate = (data) => {

    const schema = Joi.object({
        idapontamento: Joi.number().required(),
        idprojetotarefa: Joi.number().required(),
        data: Joi.string().required(),
        horainicio: Joi.string().required(),
        horafinal: Joi.string().required(),
        descricao: Joi.string().required().max(300),
        dtcriacao: Joi.string().required(),
        dtmodificacao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(45),
        usuarioalteracao: Joi.string().required().max(45),

    })
    return schema.validate(data);
}

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;