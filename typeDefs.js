const { gql } = require("apollo-server-express")

// queries
const typeDefs = gql`
    type Query {
        hello:String
    }
`

module.exports = typeDefs