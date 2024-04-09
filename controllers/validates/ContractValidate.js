const { allow } = require('@hapi/joi');
const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schema = Joi.object({
        idcliente: Joi.number().required(),
        descricaovenda: Joi.string().allow(null,'').max(50),
        statusvenda: Joi.string().max(1),
        idprojeto: Joi.number().allow('',null),
        comercialvendacol: Joi.string().allow(null,'').max(50),
        dtcontato: Joi.string().allow('',null),
        dtcontrato: Joi.string().allow(null,''),
        dtassinatura: Joi.string().allow(null,''),
        dtconclusao: Joi.string().allow(null,''),
        dtcriacao: Joi.string().allow(null,''),
        dtalteracao: Joi.string().allow(null,''),
        usuariocriacao: Joi.string().allow(null,'').max(50),
        usuarioalteracao: Joi.string().required().max(50),

    })
    return schema.validate(data);
}
const registerValidateUpdate = (data) => {

    const schema = Joi.object({
        idvenda: Joi.number().required(),
        idcliente: Joi.number().required(),
        descricaovenda: Joi.string().allow(null,'').max(50),
        statusvenda: Joi.string().max(1),
        idprojeto: Joi.number().allow(null,''),
        comercialvendacol: Joi.string().allow(null,'').max(50),
        dtcontato: Joi.string().allow('',null),
        dtcontrato: Joi.string().allow('',null),
        dtassinatura: Joi.string().allow('',null),
        dtconclusao: Joi.string().allow('',null),

        dtcriacao: Joi.string().allow(null,''),
        dtalteracao: Joi.string().allow(null,''),
        usuariocriacao: Joi.string().allow(null,'').max(50),
        usuarioalteracao: Joi.string().required().max(50),

    })
    return schema.validate(data);
}



module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;