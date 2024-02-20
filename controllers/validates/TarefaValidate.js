const joi = require("@hapi/joi");

const regiterValidate = (data) => {
  const schema = joi.object({
    
    titulotarefa: joi.string().allow(null, "").max(60),
    descricaotarefa: joi.string().allow(null, "").max(300),
    horasestimadas: joi.string().allow(null, ""),
    datacriacao: joi.string().allow(null, ""),
    dataalteracao: joi.string().allow(null, ""),
    usuariocriacao: joi.string().required().max(50),
    usuarioalteracao: joi.string().required().max(50)
  });
  return schema.validate(data);
};

const regiterValidateUpdate = (data) => {
  const schema = joi.object({

    idtarefa: joi.number().required(),
    titulotarefa: joi.string().allow(null, "").max(60),
    descricaotarefa: joi.string().allow(null, "").max(300),
    horasestimadas: joi.string().allow(null, ""),
    datacriacao: joi.string().allow(null, ""),
    dataalteracao: joi.string().allow(null, ""),
    usuariocriacao: joi.string().required().max(50),
    usuarioalteracao: joi.string().required().max(50)

  });
  return schema.validate(data);
};

module.exports.regiterValidate = regiterValidate;
module.exports.regiterValidateUpdate = regiterValidateUpdate;