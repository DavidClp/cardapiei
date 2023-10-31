const {
  Estabelecimento,
  Localizacao,
  Contato,
  horario_atendimento,
  Categoria,
  Produto,
} = require("../database/models");

const create = async function (estabelecimento) {
  const estabelecimentoCriado = await Estabelecimento.create(estabelecimento);
  return estabelecimentoCriado;
};

const update = async function (estabelecimento, usu_id) {
  const fieldsToUpdate = {
    nome: estabelecimento.nome ?? undefined,
    descricao: estabelecimento.descricao ?? undefined,
    logo: estabelecimento.logo ?? undefined,
  };
  await Estabelecimento.update(fieldsToUpdate, {
    where: { usu_id: usu_id },
  });
};

const updateById = async function (estabelecimento, id) {
  const fieldsToUpdate = {
    nome: estabelecimento.nome ?? undefined,
    descricao: estabelecimento.descricao ?? undefined,
    logo: estabelecimento.logo ?? undefined,
  };
  await Estabelecimento.update(fieldsToUpdate, {
    where: { id: id },
  });
};

const findAll = async function () {
  const estabelecimentos = await Estabelecimento.findAll();
  return estabelecimentos;
};

const findById = async function (id) {
  const estabelecimento = await Estabelecimento.findByPk(id);
  return estabelecimento;
};

const findOneByWhere = async function (where) {
  const estabelecimento = await Estabelecimento.findOne({
    where: where,
  });
  return estabelecimento;
};

const findByWhereComDados = async function (where) {
  const estabelecimento = await Estabelecimento.findOne({
    include: { model: Localizacao },
    where: where,
  });
  return estabelecimento;
};

const findByWhereComTudo = async function (where) {
  try {
    const estabelecimento = await Estabelecimento.findOne({
      where: where, // Condição para a tabela Estabelecimento
      include: [
        {
          model: Categoria,
          where: {ativo: 1},
          include: [
            {
              model: Produto,
              where: { ativo: 1 },
            },
          ],
        },
        Localizacao,
        Contato,
        horario_atendimento,
      ],
    });

    return estabelecimento;
  } catch (error) {
    // Lide com erros, por exemplo, lançando ou registrando-os
    console.log(error);
    throw error;
  }
};

const deletar = async function (id) {
  return await Estabelecimento.destroy({ where: { id: id } });
};

module.exports = {
  create,
  update,
  updateById,
  findAll,
  findById,
  findOneByWhere,
  findByWhereComDados,
  findByWhereComTudo,
  deletar,
};
