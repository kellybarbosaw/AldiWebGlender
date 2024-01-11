const Joi = require('@hapi/joi');


const regiterValidate = (data) => {

    const schema = Joi.object({
        cnpj: Joi.string().required().min(14).max(14),
        nome: Joi.string().required().min(3).max(100),
        nomefantasia: Joi.string().required().min(6).max(100),
        inscrestadual:Joi.string().required().min(10).max(20),
        inscrmunicipal:Joi.string().required().min(2).max(20),

        telefone:Joi.string().required().min(9).max(15),
        celular:Joi.string().allow(null, '').min(9).max(15),
        email:Joi.string().required().min(2).max(100),
        rua:Joi.string().required().min(2).max(100),
        numero:Joi.string().required().min(2).max(10),
        complemento:Joi.string().allow(null, '').min(2).max(100),
        bairro:Joi.string().required().min(2).max(70),
        cidade:Joi.string().required().min(2).max(70),
        estado:Joi.string().required().min(2).max(70),
        pais:Joi.string().required().min(2).max(70),
        cep:Joi.string().required().min(8).max(8),

        respcomercial:Joi.string().required().min(3).max(100),
        telcomercial:Joi.string().required().min(9).max(15),
        celcomercial:Joi.string().allow(null, '').min(9).max(15),
        emailcomercial:Joi.string().required().min(2).max(100),

        respfinanceiro:Joi.string().required().min(3).max(100),
        telfinanceiro:Joi.string().required().min(9).max(15),
        celfinanceiro:Joi.string().allow(null, '').min(9).max(15),
        emailfinanceiro:Joi.string().required().min(2).max(100)

    })
    return schema.validate(data);
}

const regiterValidateUpdate = (data) => {

    const schema = Joi.object({
        idclient: Joi.string().required(),
        cnpj: Joi.string().required().min(14).max(14),
        nome: Joi.string().required().min(3).max(100),
        nomefantasia: Joi.string().required().min(6).max(100),
        inscrestadual:Joi.string().required().min(10).max(20),
        inscrmunicipal:Joi.string().required().min(2).max(20),

        telefone:Joi.string().required().min(9).max(15),
        celular:Joi.string().allow(null, '').min(4).max(15),
        email:Joi.string().required().min(2).max(100),
        rua:Joi.string().required().min(2).max(100),
        numero:Joi.string().required().min(2).max(10),
        complemento:Joi.string().allow(null, '').min(2).max(100),
        bairro:Joi.string().required().min(2).max(70),
        cidade:Joi.string().required().min(2).max(70),
        estado:Joi.string().required().min(2).max(70),
        pais:Joi.string().required().min(2).max(70),
        cep:Joi.string().required().min(8).max(8),

        respcomercial:Joi.string().required().min(3).max(100),
        telcomercial:Joi.string().required().min(9).max(15),
        celcomercial:Joi.string().allow(null, '').min(4).max(15),
        emailcomercial:Joi.string().required().min(2).max(100),

        respfinanceiro:Joi.string().required().min(3).max(100),
        telfinanceiro:Joi.string().required().min(4).max(15),
        celfinanceiro:Joi.string().allow(null, '').min(4).max(15),
        emailfinanceiro:Joi.string().required().min(2).max(100)

    })
    return schema.validate(data);
}



module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;
