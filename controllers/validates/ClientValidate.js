const Joi = require('@hapi/joi');

const registerValidate = (data) => {

    const schema = Joi.object({
        nomefantasia: Joi.string().required().min(6).max(100),
        nome: Joi.string().required().min(3).max(100),
        cgccfo: Joi.string().required().min(11).max(20),        
        inscrestadual: Joi.string().allow(null, '').max(20),
        pagrec: Joi.number().allow(null, ''),
        rua: Joi.string().max(100).allow(null, ''),
        numero: Joi.string().max(8).allow(null, ''),
        complemento: Joi.string().allow(null, '').min(2).max(60),
        bairro: Joi.string().allow(null, '').min(2).max(80),
        cidade: Joi.string().allow(null, '').min(2).max(32),
        codetd: Joi.string().allow(null, '').max(2),
        cep: Joi.string().allow(null, '').max(9),
        telefone: Joi.string().allow(null, '').min(9).max(15),

        ruapgto: Joi.string().allow(null, '').max(100),
        numeropgto: Joi.string().allow(null, '').max(8),
        complementopgto: Joi.string().allow(null, '').min(2).max(60),
        bairropgto: Joi.string().allow(null, '').min(2).max(80),
        cidadepgto: Joi.string().allow(null, '').min(2).max(32),
        codetdpgto: Joi.string().allow(null, '').max(2),
        ceppgto: Joi.string().allow(null, '').max(9),
        telefonepgto: Joi.string().allow(null, '').min(9).max(15),
        
        ruaentrega: Joi.string().allow(null, '').max(100),
        numeroentrega: Joi.string().allow(null, '').max(8),
        complementoentrega: Joi.string().allow(null, '').min(2).max(60),
        bairroentrega: Joi.string().allow(null, '').min(2).max(80),
        cidadeentrega: Joi.string().allow(null, '').min(2).max(32),
        codetdentrega: Joi.string().allow(null, '').max(2),
        cepentrega: Joi.string().allow(null, '').max(9),
        telefoneentrega: Joi.string().allow(null, '').min(9).max(15),

        email: Joi.string().allow(null, '').max(250),
        ativo: Joi.number().required().valid(1,2),
        inscrmunicipal: Joi.string().allow(null, '').max(20),
        pessoafisoujur: Joi.string().allow(null, '').max(1),
        pais: Joi.string().allow(null, '').max(20),
        paispgto: Joi.string().allow(null, '').max(20),
        paisentrega: Joi.string().allow(null, '').max(20),
        emailentrega: Joi.string().allow(null, '').max(250),
        emailpgto: Joi.string().allow(null, '').max(250),

        codmunicipiopgto: Joi.string().allow(null, '').max(20),
        codmunicipioentrega: Joi.string().allow(null, '').max(20),
        dtcriacao: Joi.string().allow(null, ''),
        dtmodificacao: Joi.string().allow(null, ''),
        usuariocriacao: Joi.string().allow(null, '').max(50),
        usuarioalteracao: Joi.string().allow(null, '').max(50),
        tipocliente: Joi.string().max(1)

    })
    return schema.validate(data);
}

const registerValidateUpdate = (data) => {

    const schema = Joi.object({
        idcliente: Joi.number().required(),
        nomefantasia: Joi.string().required().min(6).max(100),
        nome: Joi.string().required().min(3).max(100),
        cgccfo: Joi.string().required().min(11).max(20),        
        inscrestadual: Joi.string().allow(null, '').max(20),
        pagrec: Joi.number().allow(null, ''),
        rua: Joi.string().max(100).allow(null, ''),
        numero: Joi.string().max(8).allow(null, ''),
        complemento: Joi.string().allow(null, '').min(2).max(60),
        bairro: Joi.string().allow(null, '').min(2).max(80),
        cidade: Joi.string().allow(null, '').min(2).max(32),
        codetd: Joi.string().allow(null, '').max(2),
        cep: Joi.string().allow(null, '').max(9),
        telefone: Joi.string().allow(null, '').min(9).max(15),

        ruapgto: Joi.string().allow(null, '').max(100),
        numeropgto: Joi.string().allow(null, '').max(8),
        complementopgto: Joi.string().allow(null, '').min(2).max(60),
        bairropgto: Joi.string().allow(null, '').min(2).max(80),
        cidadepgto: Joi.string().allow(null, '').min(2).max(32),
        codetdpgto: Joi.string().allow(null, '').max(2),
        ceppgto: Joi.string().allow(null, '').max(9),
        telefonepgto: Joi.string().allow(null, '').min(9).max(15),
        
        ruaentrega: Joi.string().allow(null, '').max(100),
        numeroentrega: Joi.string().allow(null, '').max(8),
        complementoentrega: Joi.string().allow(null, '').min(2).max(60),
        bairroentrega: Joi.string().allow(null, '').min(2).max(80),
        cidadeentrega: Joi.string().allow(null, '').min(2).max(32),
        codetdentrega: Joi.string().allow(null, '').max(2),
        cepentrega: Joi.string().allow(null, '').max(9),
        telefoneentrega: Joi.string().allow(null, '').min(9).max(15),

        email: Joi.string().allow(null, '').max(250),
        ativo: Joi.number().required().valid(1,2),
        inscrmunicipal: Joi.string().allow(null, '').max(20),
        pessoafisoujur: Joi.string().allow(null, '').max(1),
        pais: Joi.string().allow(null, '').max(20),
        paispgto: Joi.string().allow(null, '').max(20),
        paisentrega: Joi.string().allow(null, '').max(20),
        emailentrega: Joi.string().allow(null, '').max(250),
        emailpgto: Joi.string().allow(null, '').max(250),

        codmunicipiopgto: Joi.string().allow(null, '').max(20),
        codmunicipioentrega: Joi.string().allow(null, '').max(20),
        dtcriacao: Joi.string().allow(null, ''),
        dtmodificacao: Joi.string().allow(null, ''),
        usuariocriacao: Joi.string().allow(null, '').max(50),
        usuarioalteracao: Joi.string().allow(null, '').max(50),
        tipocliente: Joi.string().max(1)
    })
    return schema.validate(data);
}

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;
