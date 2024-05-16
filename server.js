const express = require("express")
const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")
const { gql } = require("apollo-server-express")
const logger = require("morgan")

require("dotenv").config()

// connect to the mongodb
const URL = process.env.DATABASE_URL
mongoose.connect(URL)
const db = mongoose.connection

// console log when success connected to the mongodb
db.on('connected', function () {
    console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
})

// queries
const typeDefs = gql`
    type Query {
        hello:String
    }
`
// resolvers
const resolvers = {
    Query: {
        hello: () => {
            return "Hello world"
        }
    }
}

const startServer = async () => {
    // start express
    const app = express()
    app.use(logger("dev"))
    const port = process.env.PORT || 4000
    // start server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({ app: app })
    app.listen(port, function () {
        console.log(`Express app running on port ${port}`)
    })
}

startServer()
