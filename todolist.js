var express = require('express');
var app = express();

var fs = require('fs');

/* On utilise les cookies et les sessions */
app.use(express.cookieParser())
.use(express.session({secret: 'todosecret'}))
.use(express.bodyParser())

/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
})

/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) {
    if(req.session.todolist == ''){
	var file = fs.readFileSync("liste","UTF-8");
	var datas = file.split("\n");
	var data = new Array();
	for(var i = 0 ; i < datas.length ; i++){
	    if(datas[i] != ''){
		req.session.todolist.push(datas[i]);
		data[i] = datas[i];
	    }
	}
	res.render('index.ejs', {todolist: data});
    }else{
	var content = '';
	for(var i = 0; i < req.session.todolist.length ; i++){
	    content += req.session.todolist[i]+"\n";
	}
	fs.writeFile("liste", content, "UTF-8");
	res.render('index.ejs', {todolist: req.session.todolist});
    }
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', function(req, res) {
    if (req.body.newtodo != '') {
	var details = '';
	if(req.body.newdate != '' && req.body.newclock != '')
	    details = req.body.newtodo+" "+req.body.newdate+" "+req.body.newclock;
	else
	    details = req.body.newtodo;
        req.session.todolist.push(details);
	fs.appendFileSync("todo", details+"\n", "UTF-8");
    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
})

/* Autoriser l'accès aux ressources des modules externes */
.use(express.static(__dirname, '/modules'))

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);