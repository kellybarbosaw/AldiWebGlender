// const Joi = require("@hapi/joi");

// const regiterValidate = (data) => {

//     const schema = Joi.object({
//     nome: Joi.string().required().max(100),
//     cpf: Joi.string().required().max(11),
//     dtnascimento: Joi.string().required(),
//     rua: Joi.string().required().max(45),
//     numero: Joi.string().required().max(45),
//     complemento: Joi.string().required().max(45),
//     bairro: Joi.string().required().max(45),
//     naturalidade: Joi.string().required().max(45),
//     nacionalidade: Joi.string().required().max(45),
//     usuario: Joi.string().required().max(45),
//     nroidentidade: Joi.string().required().max(45),
//     orgaoemissorident: Joi.string().required().max(45),
//     estadoemissorident: Joi.string().required().max(45),
//     zusuario_usuario: Joi.string().required().max(50)
    
//     });
//     return schema.validate(data);
// };

// const regiterValidateUpdate = (data) => {

//     const schema = Joi.object({
//     idpessoa: Joi.number().required(),
//     nome: Joi.string().required().max(100),
//     cpf: Joi.string().min(11).max(11),
//     dtnascimento: Joi.string().required(),
//     rua: Joi.string().required().max(45),
//     numero: Joi.string().required().max(45),
//     complemento: Joi.string().required().max(45),
//     bairro: Joi.string().required().max(45),
//     naturalidade: Joi.string().required().max(45),
//     nacionalidade: Joi.string().required().max(45),
//     usuario: Joi.string().required().max(45),
//     nroidentidade: Joi.string().required().max(45),
//     orgaoemissorident: Joi.string().required().max(45),
//     estadoemissorident: Joi.string().required().max(45),
//     zusuario_usuario: Joi.string().required().max(50),


//     });
//     return schema.validate(data);
// };

// module.exports.regiterValidate = regiterValidate;
// module.exports.regiterValidateUpdate = regiterValidateUpdate;

const joi = require("@hapi/joi");

const regiterValidate = (data) => {
    const schema = joi.object({

    nome: joi.string().required().max(100),
    cpf: joi.string().allow(null, "").max(11),
    dtnascimento: joi.string().required(),
    rua: joi.string().allow(null, "").max(45),
    numero: joi.string().allow(null, "").max(45),
    complemento: joi.string().allow(null, "").max(45),
    bairro: joi.string().allow(null, "").max(45),
    naturalidade: joi.string().allow(null, "").max(45),
    nacionalidade: joi.string().allow(null, "").max(45),
    usuario: joi.string().allow(null, "").max(45),
    nroidentidade: joi.string().allow(null, "").max(45),
    orgaoemissorident: joi.string().allow(null, "").max(45),
    estadoemissorident: joi.string().allow(null, "").max(45),
    zusuario_usuario: joi.string().allow(null, "").max(50)
    
    });
    return schema.validate(data);
};

const regiterValidateUpdate = (data) => {
    const schema = joi.object({

    idpessoa: joi.number().required(),
    nome: joi.string().required().max(100),
    cpf: joi.string().allow(null, "").min(11).max(11),
    dtnascimento: joi.string().required(),
    rua: joi.string().allow(null, "").max(45),
    numero: joi.string().allow(null, "").max(45),
    complemento: joi.string().allow(null, "").max(45),
    bairro: joi.string().allow(null, "").max(45),
    naturalidade: joi.string().allow(null, "").max(45),
    nacionalidade: joi.string().allow(null, "").max(45),
    usuario: joi.string().allow(null, "").max(45),
    nroidentidade: joi.string().allow(null, "").max(45),
    orgaoemissorident: joi.string().allow(null, "").max(45),
    estadoemissorident: joi.string().allow(null, "").max(45),
    zusuario_usuario: joi.string().allow(null, "").max(50)
    
    });
    return schema.validate(data);
};

module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;