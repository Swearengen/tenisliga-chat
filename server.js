const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:99cebb3b-bac8-4c5c-bcd1-cabf14849b0a',
  key: '9bc98f25-462d-4f8f-a255-7be522ddb42a:zGAMjjfQM1dvyq0QZuCsBl2RkygCk69SWqXNJQSvk=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { username } = req.body
    console.log(username);
    res.sendStatus(200)
	// chatkit
	// 	.createUser({
	// 		id: username,
	// 		name: username
	// 	})
	// 	.then(() => res.sendStatus(201))
	// 	.catch(error => {
	// 		if (error.error === 'services/chatkit/user_already_exists') {
	// 			res.sendStatus(200)
	// 		} else {
	// 			res.status(error.status).json(error)
	// 		}
    // 	})

})

app.post('/authenticate', (req, res) => {
	const authData = chatkit.authenticate({ userId: req.query.user_id })
	res.status(authData.status).send(authData.body)
})

const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
