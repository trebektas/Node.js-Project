import app from './routes.js'
const port = 3000

//set the server to listen at port
app.listen(port, () => console.log(`Server listening at port ${port}`));