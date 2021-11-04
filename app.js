const express = require('express')
const app = express()
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect') 
const notFound = require('./middleware/notfound')
const errorHandlerMiddleware = require('./middleware/error')

require('dotenv').config()

// middleware
app.use(express.static('./public'))
app.use(express.json())

// routes


app.use('/api/v1/tasks', tasks)
app.use(notFound)
app.use(errorHandlerMiddleware)

// app.get('/api/tasks')        - get all the tasks
// app.post('/api/tasks')       - create a new task
// app.get('/api/tasks/:id')    - get single task
// app.patch('/api/tasks/:id')  - update task
// app.delete('/avi/tasks/:id') - delete task



const port = 3000

const start = async () => {
    try {
        await connectDB (process.env.MONGO_URI)
        app.listen(port, console.log(`server is listening on port ${port}`))

    } 
    catch (error) {
        console.log(error)
    }
}

start()


