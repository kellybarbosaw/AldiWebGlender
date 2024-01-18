const Joi = require('@hapi/joi');

const regiterValidate = (data) => {

    const schema = Joi.object({
        idcliente: Joi.number().required(),
        descricaovenda: Joi.string().required().max(50),
        statusvenda: Joi.string().required().max(40),
        idprojeto: Joi.number(),
        comercialvenda: Joi.string().required().max(45),

        dtcontato: Joi.date(),
        dtcontrato: Joi.date(),
        dtassinatura: Joi.date(),
        dtconclusao: Joi.date(),
        dtcriacao: Joi.date(),
        dtalteracao: Joi.date(),

        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),

    })
    return schema.validate(data);
}

const regiterValidateUpdate = (data) => {

    const schema = Joi.object({
        idvenda: Joi.number().required(),
        idcliente: Joi.number().required(),
        descricaovenda: Joi.string().required().max(50),
        statusvenda: Joi.string().required().max(40),
        idprojeto: Joi.number(),
        comercialvenda: Joi.string().required().max(45),

        dtcontato: Joi.date(),
        dtcontrato: Joi.date(),
        dtassinatura: Joi.date(),
        dtconclusao: Joi.date(),
        dtcriacao: Joi.date(),
        dtalteracao: Joi.date(),

        usuariocriacao: Joi.string().required().max(50),
        usuarioalteracao: Joi.string().required().max(50),

    })
    return schema.validate(data);
}



module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;