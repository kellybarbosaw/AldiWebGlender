const Joi = require('@hapi/joi');

const regiterValidate = (data) => {

    const schema = Joi.object({
        titulo: Joi.string().required().max(90),
        descricao: Joi.string().required().max(500),
        idcliente: Joi.number().required(),
        dtcriacao: Joi.date(),
        dtalteracao: Joi.date(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        statusprojeto: Joi.number().required(),
        idvenda: Joi.number().required(),
        dtinicioprojeto: Joi.date(),
        dtconclusaoprojeto: Joi.date(),
        horasestimadas: Joi.string(),
        horasgastas: Joi.string(),
        valorprojeto: Joi.number(),
        valorconsumido: Joi.number()
    })
    return schema.validate(data);
}

const regiterValidateUpdate = (data) => {

    const schema = Joi.object({
        idprojeto: Joi.number().required(),
        titulo: Joi.string().required().max(90),
        descricao: Joi.string().required().max(500),
        idcliente: Joi.number().required(),
        dtcriacao: Joi.date(),
        dtalteracao: Joi.date(),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        statusprojeto: Joi.number().required(),
        idvenda: Joi.number().required(),
        dtinicioprojeto: Joi.date(),
        dtconclusaoprojeto: Joi.date(),
        horasestimadas: Joi.string(),
        horasgastas: Joi.string(),
        valorprojeto: Joi.number(),
        valorconsumido: Joi.number()
    })
    return schema.validate(data);
}


module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;