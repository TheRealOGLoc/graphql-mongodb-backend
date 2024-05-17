const { gql } = require("apollo-server-express")

// queries
const typeDefs = gql`
    type Post{
        id:ID
        title:String!
        description:String!
    }
    type Query {
        hello:String
        getAll: [Post]
    }
    type Mutation {
        createPost(post: PostInput!): Post
        updatePost(id: String!, post:PostInput!): Post
        deletePost(id: String!): Post
    }
    input PostInput {
        title: String
        description: String
    }
    
`

module.exports = typeDefs