const Joi = require('@hapi/joi');

const regiterValidate = (data) => {

    const schema = Joi.object({
        titulo: Joi.string().required().max(90),
        descricao: Joi.string().allow(null,"").max(500),
        idcliente: Joi.string().required(),
        dtcriacao: Joi.string().allow(null,""),
        dtalteracao: Joi.string().allow(null,""),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        statusprojeto: Joi.number().required(),
        idvenda: Joi.number().required(),
        dtinicioprojeto: Joi.string().allow(null,""),
        dtconclusaoprojeto: Joi.string().allow(null,""),
        horasestimadas: Joi.string().allow(null,""),
        horasgastas: Joi.string().allow(null,""),
        saldohoras: Joi.string().allow(null,""),
        valorprojeto: Joi.number().allow(null,""),
        valorconsumido: Joi.number().allow(null,"")
    })
    return schema.validate(data);
}

const regiterValidateUpdate = (data) => {

    const schema = Joi.object({
        idprojeto: Joi.number().required(),
        titulo: Joi.string().required().max(90),
        descricao: Joi.string().allow(null,"").max(500),
        idcliente: Joi.string().required(),
        dtcriacao: Joi.string().allow(null,""),
        dtalteracao: Joi.string().allow(null,""),
        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),
        statusprojeto: Joi.number().required(),
        idvenda: Joi.number().required(),
        dtinicioprojeto: Joi.string().allow(null,""),
        dtconclusaoprojeto: Joi.string().allow(null,""),
        horasestimadas: Joi.string().allow(null,""),
        horasgastas: Joi.string().allow(null,""),
        saldohoras: Joi.string().allow(null,""),
        valorprojeto: Joi.number().allow(null,""),
        valorconsumido: Joi.number().allow(null,"")
    })
    return schema.validate(data);
}


module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;