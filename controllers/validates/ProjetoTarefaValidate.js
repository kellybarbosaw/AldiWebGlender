const Joi = require("@hapi/joi");

const registerValidate = (data) => {
  const schema = Joi.object({
    idprojeto: Joi.number().required(),
    idtarefa: Joi.number().required(),
    titulotarefa: Joi.string().required().max(90),
    descricaotarefa: Joi.string().allow(null, "").max(300),
    datainicioprevista: Joi.string().allow(null, ""),
    datafimprevista: Joi.string().allow(null, ""),
    dtcriacao: Joi.string().allow(null, ""),
    dtalteracao: Joi.string().allow(null, ""),
    usuariocriacao: Joi.string().allow(null, "").max(45),
    usuarioalteracao: Joi.string().allow(null, "").max(45),
    //statustarefa: Joi.number().allow(null, ""),
    horasestimadas: Joi.string().allow(null, ""),
    horasgastas: Joi.string().allow(null, ""),
    saldohoras: Joi.string().allow(null, ""),
    etapa: Joi.number().required()
  });
  return schema.validate(data);
};

const registerValidateUpdate = (data) => {
  const schema = Joi.object({
    idprojetotarefa: Joi.number().required(),
    idprojeto: Joi.number().required(),
    idtarefa: Joi.number().required(),
    titulotarefa: Joi.string().required().max(90),
    descricaotarefa: Joi.string().allow(null, "").max(300),
    datainicioprevista: Joi.string().allow(null, ""),
    datafimprevista: Joi.string().allow(null, ""),
    dtcriacao: Joi.string().allow(null, ""),
    dtalteracao: Joi.string().allow(null, ""),
    usuariocriacao: Joi.string().allow(null, "").max(45),
    usuarioalteracao: Joi.string().allow(null, "").max(45),
    //statustarefa: Joi.number().allow(null, ""),
    horasestimadas: Joi.string().allow(null, ""),
    horasgastas: Joi.string().allow(null, ""),
    saldohoras: Joi.string().allow(null, ""),
    etapa: Joi.number().required()
  });
  return schema.validate(data);
};

module.exports.registerValidate = registerValidate;
module.exports.registerValidateUpdate = registerValidateUpdate;