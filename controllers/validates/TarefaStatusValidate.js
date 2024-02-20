const Joi = require('@hapi/joi');

const regiterValidate = (data) => {

    const schema = Joi.object({
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        ativo: Joi.number().required(),
        concluido: Joi.number().required(),
        cancelado: Joi.number().required(),
        datacriacao: Joi.string().required(),
        dataalteracao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        atarefastatuscol: Joi.string().required().max(45),
    })
    return schema.validate(data);
}

const regiterValidateUpdate = (data) => {

    const schema = Joi.object({
        idstatus: Joi.number().required(),
        titulo: Joi.string().required(),
        descricao: Joi.string().required(),
        ativo: Joi.number().required(),
        concluido: Joi.number().required(),
        cancelado: Joi.number().required(),
        datacriacao: Joi.string().required(),
        dataalteracao: Joi.string().required(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        atarefastatuscol: Joi.string().required().max(45),
    })
    return schema.validate(data);
}

module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;