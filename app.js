const express = require('express');
const morgan = require('morgan');
const app = express();
app.use(morgan('dev'))

app.get('/burgers', (req, res) => {
  res.send('We have juicy cheese burgers!');
})

app.get('/pizza/pepperoni', (req, res) => {
  res.send("Your pizza is on the way!");
})

app.get('/pizza/pineapple', (req, res) => {
  res.send("We don't serve that here. Never call again!");
})

app.get('/echo', (req, res) => {
  console.log(req.baseUrl)
  const responseText = `Here are some details of your request:
    Base URL: ${req.originalUrl}
    Host: ${req.hostname}
    Path: ${req.path}
  `;
  res.send(responseText)
})

app.get('/queryViewer', (req, res) => {
  console.log(req.query);
  res.end(); //do not send any data back to the client
});

app.get('/greetings', (req, res) => {
  const nam = req.query.name;
  const race = req.query.race;

  if(!nam) {
    return res.status(400).send('please provide a name')
  }

  if(!race) {
    return res.status(400).send('Please provide a race');
  }

  const grettings = `Greetings ${nam} the ${race}, welcome to our kingdom.`;

  res.send(grettings)
})

app.get('/sum', (req, res) => {
  const a = req.query.b;
  const b = req.query.d;
  const sum = a+b;
  const result = `the sum of ${a} and ${b} is ${sum}`;
  res.send(result)
})

app.get('/cipher', (req, res) => {
  const text = req.query.text;
  const shift = req.query.shift;
  //http://localhost:8000/cipher?text=asdf&shit=2
  const split = text.split('')
  const newLetterArr = split.map(data => {
    const charCode = data.charCodeAt(0)
    const numCode = parseInt(shift) + parseInt(charCode)
    console.log(numCode)
    return String.fromCharCode(numCode)
  })
  const newLetter = newLetterArr.join('')
  res.send(newLetter)
})

app.get('/lotto', (req, res) => {
  const arr = req.query.arr;
  console.log(arr)

  const filterNum = arr.filter(data => {
    if(data >= 1 && data <= 20) {
      return data;
    } else {
      return null
    }
  })
  const data = filterNum.length === 6? filterNum: 'number needs to be between 1 - 20';
  console.log(filterNum)
  
  let randomNum = []
  for(let i = 0; i<=6; i++) {
    randomNum.push(Math.floor((Math.random() * 20) + 1));
  }

  let matchingNum = []
  const newNum = filterNum.forEach(num => {
    intNum = parseInt(num);
    console.log(intNum)
    console.log(randomNum)
    randomNum.forEach(ramNum => {
      if(ramNum === intNum) {
        matchingNum.push(ramNum)
      }})
  })
  const uniqueSet = new Set(matchingNum);
  const uniqueArr = [...uniqueSet]
  console.log(uniqueArr)

  const statement = uniqueArr.length < 4? `Sorry, you lose`: 
    uniqueArr.length === 4? `Congratulations, you win a free ticket`:
    uniqueArr.length === 5? `Congratulations! You win $100!`:
    uniqueArr.length === 6? `Wow! Unbelievable! You could have won the mega millions!`: null;

  res.send(statement)
})


app.listen(8000, ()=> {
  console.log('express server is listening on port 8000')
})