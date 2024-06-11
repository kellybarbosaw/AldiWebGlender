const joi = require("@hapi/joi");

const registerValidate = (data) => {
  const schema = joi.object({
    
    titulotarefa: joi.string().allow(null, "").max(60),
    descricaotarefa: joi.string().allow(null, "").max(300),
    horasestimadas: joi.string().allow(null, ""),
    datacriacao: joi.string().allow(null, ""),
    dataalteracao: joi.string().allow(null, ""),
    usuariocriacao: joi.string().required().max(50),
    usuarioalteracao: joi.string().required().max(50),
    status: joi.number().allow(null, ''),
  });
  return schema.validate(data);
};

const registerValidateUpdate = (data) => {
  const schema = joi.object({

    idtarefa: joi.number().required(),
    titulotarefa: joi.string().allow(null, "").max(60),
    descricaotarefa: joi.string().allow(null, "").max(300),
    horasestimadas: joi.string().allow(null, ""),
    datacriacao: joi.string().allow(null, ""),
    dataalteracao: joi.string().allow(null, ""),
    usuariocriacao: joi.string().max(50),
    usuarioalteracao: joi.string().required().max(50),
    status: joi.number().allow(null, ''),

  });
  return schema.validate(data);
};

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;