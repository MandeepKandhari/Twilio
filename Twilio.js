const express = require('express');
const accountSid = 'ACa1e42038bd6424110cc43895c50750ca'; 
const authToken = 'bfb6febcfaa1bb7aac583a1275b19b20'; 
const client = require('twilio')(accountSid, authToken); 
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());


app.get('/',(req,res)=>{
	res.json('This app is working!!!')
})


app.post('/message', (req, res)=>{

const { message, name, number } = req.body

const body = `\n Client Name = ${name} \n  Phone Number = ${number}  \n  Message = ${message}`;

let nameCheck = /^[a-z ,.'-]+$/i;
let numberCheck = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im; 

if(nameCheck.test(name) && numberCheck.test(number) && message !=='') {
	client.messages.create({ 
        body: body, 
        from:'+13656508149',       
        to:'+16479972484',
       }) 
      .then(message => {
      	console.log(message.body)
      	res.json('success')
      	})
      .catch(err=>console.log(err)) 
} else{
	res.status(400).json('error')
}
})	

app.listen(8080);