const express = requrie("express")
const { ApolloServer } = require("apollo-server-express")
const mongoose = require("mongoose")

// connect to the mongodb
const URL = process.env.MONGODB_URL
mongoose.connect(URL)
const db = mongoose.connection

// console log when success connected to the mongodb
db.on('connected', function () {
    console.log(`Connected to ${db.name} at ${db.host}:${db.port}`)
})

const startServer = async () => {
    // start express
    const app = express()
    const port = process.env.PORT || 4000
    // start server
    const apolloServer = new ApolloServer({
        typeDefs,
        resolvers
    })
    await apolloServer.start()
    apolloServer.applyMiddleware({app: app})
    app.listen(port, function () {
        console.log(`Express app running on port ${port}`)
    })
}

startServer()
