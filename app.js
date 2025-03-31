import express from 'express';
const hostname = '127.0.0.1'; //or localhost
const app = express();
const port = 3000;

app.use('/WEEK_3/public', express.static('WEEK_3/public'));

app.get('/', (req, res) => {
  res.send('Welcome to my REST API! :)');
});

//(endpoint, function)
app.get('/api/v1/cat', (req, res) => {
  const cat = {
    catId: 666,
    name: 'Kerttu',
    bd: '2006-11-05',
    weight: '19 kg',
    owner: 'you',
    img: 'https://loremflickr.com/320/240/cat',
  };

  res.json(cat);
});

//SET LISTENING LAST!
app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
