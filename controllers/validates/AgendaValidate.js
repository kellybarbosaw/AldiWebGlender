const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schema = Joi.object({
        horainicio: Joi.string().required(),
        horafinal: Joi.string().required(),
        horaalmoco: Joi.string().required(),
        horaprevista: Joi.string(),
        horarealizada: Joi.string().required(),
        atividade: Joi.string().required().max(300),
        data: Joi.string().required(),
        empresaTrabalhada: Joi.string().required().max(300),
        status: Joi.string().required().max(300),
        usuariocriacao: Joi.string().allow(null, '').max(50),

    })
    return schema.validate(data);
}

const registerValidateUpdate = (data) => {

    const schema = Joi.object({
        idagenda: Joi.number().required(),
        horainicio: Joi.string().required(),
        horafinal: Joi.string().required(),
        horaalmoco: Joi.string().required(),
        horaprevista: Joi.string(),
        horarealizada: Joi.string().required(),
        atividade: Joi.string().required().max(300),
        data: Joi.string().required(),
        empresaTrabalhada: Joi.string().required().max(300),
        status: Joi.string().required().max(300),
        usuariocriacao: Joi.string().allow(null, '').max(50),

    })
    return schema.validate(data);
}

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;