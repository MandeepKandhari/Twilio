const express = require('express');
const accountSid = process.env.ACCOUNT_SID; 
const authToken = process.env.AUTH_TOKEN; 
const client = require('twilio')(accountSid, authToken); 
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(bodyParser.json());
app.use(cors());


const PORT = process.env.PORT || 8080;

app.get('/',(req,res)=>{
  console.log('accountSid', accountSid)
  console.log('authToken', authToken)
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

app.listen(PORT, () => {
console.log(`App listening on port ${PORT}`);
});