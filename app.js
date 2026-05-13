import 'dotenv/config';
import express from 'express';


const PORT = process.env.PORT;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.set('view engine', 'pug');
app.set('views', './views');

//rutas
app.get('/', (req, res) => {
  res.render('index');
});
  

app.listen(PORT, (err) => {
  if(err) {
    console.error(err);
    return;
  }

  console.log(`Servidor corriendo en puerto ${PORT}`);
});