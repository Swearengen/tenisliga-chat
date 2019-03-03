const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Chatkit = require('@pusher/chatkit-server')

const app = express()

const chatkit = new Chatkit.default({
  instanceLocator: 'v1:us1:99cebb3b-bac8-4c5c-bcd1-cabf14849b0a',
  key: '9bc98f25-462d-4f8f-a255-7be522ddb42a:zGAM+jjfQM1dvyq0QZuCsBl2RkygCk6+9SWqXNJQSvk=',
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

app.post('/users', (req, res) => {
    const { userName } = req.body
    const { userId } = req.body

	chatkit
		.createUser({
			id: userId,
			name: userName
		})
		.then(() => res.sendStatus(201))
		.catch(error => {
            console.log(error, '-----------------------');

			if (error.error === 'services/chatkit/user_already_exists') {
				res.sendStatus(200)
			} else {
				res.status(error.status).json(error)
			}
    	})

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
