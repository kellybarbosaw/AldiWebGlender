const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schema = Joi.object({

        descricao: Joi.string().required(),
        dtcriacao: Joi.string().required(),
        dtmodificacao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50)

    })
    return schema.validate(data);
}

const registerValidateUpdate = (data) => {

    const schema = Joi.object({

        idtipo: Joi.number().required(),
        descricao: Joi.string().required(),
        dtcriacao: Joi.string().required(),
        dtmodificacao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50)

    })
    return schema.validate(data);
}

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;