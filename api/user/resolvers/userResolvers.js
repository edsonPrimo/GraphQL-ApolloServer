const { GraphQLScalarType } = require('graphql')

const useResolvers = {
  DateTime: new GraphQLScalarType({
    name: 'DateTime',
    description: 'string de data e hora no formato ISO-8601',
    serialize: (value) => value.toISOString(), //transforma em formato date ISO
    parseValue: (value) => new Date(value), //pega os dados através de um input (pegam dados que chegam de variavel)
    parseLiteral: (ast) => new Date(ast.value) //pega os dados através de um input (pega dados através de argumento inline)
  }),

  Query: {
    users: (root, args, { dataSources }) => dataSources.usersAPI.getUsers(),
    user: (root, { id }, { dataSources }) => dataSources.usersAPI.getUserById(id)
  },
  Mutation: {
    adicionaUser: async (root, user, { dataSources }) => dataSources.usersAPI.adicionaUser(user),
    atualizaUser: async (root, novosDados, { dataSources }) => dataSources.usersAPI.atualizaUser(novosDados),
    deletaUser: async (root, { id }, { dataSources }) => dataSources.usersAPI.deletaUser(id)
  }
}

module.exports = useResolvers