const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const data = require('./data.js');

// Schema es la plantilla
// el modelo es el spray

mongoose.connect('mongodb://localhost/recipeApp')
  .then(() => {
    console.log('Connected to Mongo!');
  }).catch(err => {
    console.error('Error connecting to mongo', err);
  });

  // cada vez que creamos una nueva receta, el nombre será unico. Es por eso que la propiedad unique es tan importante
  const recipeSchema = new Schema({
    // ahora empezamos a colocar todas las propiedades que nos pide el ejercicio
    title:{
      type: String,
      required: true,
      unique: true,
    },
    level : {
      type: String,
      // Enum significa dar las posibilidades que puede tener esa propiedad como valor
      enum: ['Easy Peasy', 'Amateur Chef', 'UltraPro Chef'],
    },
    // en este caso no lo colocamos como objeto, porque solo tiene una propiedad. Podriamos colocarlo como objeto, con una sola propiedad
    ingredient: Array,
    cuisine: {
      type: String,
      required: true,
    },
    dishType:{
      type: String,
      enum: ['Breakfast', 'Dish','Drink','Dessert','Other'],
    },
    image: {
      type: String,
      default : 'https://images.media-allrecipes.com/images/75131.jpg',
    },
    duration:{
      type: Number,
      min: 0,
    },
    // Aqui podriamos no colocarlo como objeto, ya que solo tiene una propiedad
    creator:{
      type: String,
    },
    created:{
      type: Date,
      default: new Date,
    }
  })
  // al final de la plantilla creamos el modelo

  const Recipe = mongoose.model('Recipe',recipeSchema);
  
  Recipe.create({
    title: 'Brocoli con patatas',
    level: 'UltraPro Chef',
    ingredients: ['brocoli', 'patatas','sal','aceite','ajo'],
    cuisine: 'veggie',
    dishType: 'Dish',
    duration: 30,
    creator: 'Anna',
  })
  .then((recipe) => {
    console.log(recipe)
  })
  .catch((error) =>{
    console.log(error);
  })