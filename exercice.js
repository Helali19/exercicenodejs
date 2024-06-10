const express = require('express');
const app = express();
let bodyParser = require("body-parser");

let multer = require ('multer')
let upload = multer ({dest:'res/'})
let path = require ('path')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'img/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileUpload = require('express-fileupload');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.engine('.html', require('ejs').__express);
app.set('views', __dirname+'/views');
app.set('view engine', 'html');
app.listen(3000, function() {
    // Afficher un message dans la console pour me dire que le serveur a bien été créé 
    console.log("Le serveur s'est bien lancé");
    app.get('/exercice', function (req, res) {
        res.render("view_exercice");
    });
    app.post('/exercice', upload.single('image'), function(request, res) {
        let name = request.body.name; 
        let email = request.body.email;
        console.log(name, email, image);
       
        res.render('view_res', {name, email, image});
    });
  
}).on('error', function(err) { 
    // Sinon afficher un message d'erreur
    console.log("Le serveur a généré une erreur: ", err); 
});
console.log("La fin!!!");