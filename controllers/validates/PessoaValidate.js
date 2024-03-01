const joi = require("@hapi/joi");

const registerValidate = (data) => {
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
        zusuario_usuario: joi.string().allow(null, "").max(50),
        dtcriacao: joi.string().allow(null, ""),
        dtalteracao: joi.string().allow(null, ""),
        usuariocriacao: joi.string().required().max(50),
        usuarioalteracao: joi.string().required().max(50)

    });
    return schema.validate(data);
};

const registerValidateUpdate = (data) => {
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
        zusuario_usuario: joi.string().allow(null, "").max(50),
        dtcriacao: joi.string().allow(null, ""),
        dtalteracao: joi.string().allow(null, ""),
        usuariocriacao: joi.string().required().max(50),
        usuarioalteracao: joi.string().required().max(50)

    });
    return schema.validate(data);
};

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;