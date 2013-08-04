var express = require('express');
var app = express();
var fs = require('fs');
var auth = express.basicAuth(function(user, pass) {
	return (user == "romain" && pass == "dauby");
}, 'Area 51');

function objectToString(obj) {
    if(typeof(obj.date) != 'undefined' && typeof(obj.clock) != 'undefined')
	return "{\"todo\" : \""+obj.todo+"\", \"date\" : \""+obj.date+"\", \"clock\" : \""+obj.clock+"\"}\n";
    else
	return "{\"todo\" : \""+obj.todo+"\"}\n";
}

/* On utilise les cookies et les sessions */
app.use(express.cookieParser())
.use(express.session({secret: 'todosecret'}))
.use(express.bodyParser())
/* S'il n'y a pas de todolist dans la session,
on en crée une vide sous forme d'array avant la suite */
.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined')
        req.session.todolist = [];
    next();
})

/* Http authentification */
.get('/', auth)
/* On affiche la todolist et le formulaire */
.get('/todo', function(req, res) {
    var data = Array();
    if(req.session.todolist == ''){
	var file = fs.readFileSync("liste","UTF-8");
	var datas = file.split("\n");	
	for(var i = 0 ; i < datas.length ; i++){
	    if(datas[i] != ''){
		var da = JSON.parse(datas[i]);
		var text = da.todo;
		if(typeof(da.date) != 'undefined')
		    text += " "+da.date+" "+da.clock;
		req.session.todolist.push(da);
		data[i] = text;
	    }
	}
    }else{
	var content = '';
	for(var i = 0; i < req.session.todolist.length ; i++)
	    content += objectToString(req.session.todolist[i]);
	fs.writeFile("liste", content, "UTF-8");
	
	for(var i = 0 ; i < req.session.todolist.length ; i++){
	    var text = req.session.todolist[i].todo;
	    if(typeof(req.session.todolist[i].date) != 'undefined' && typeof(req.session.todolist[i].clock) != 'undefined')
		text += " "+req.session.todolist[i].date+" "+req.session.todolist[i].clock;
	    data[i] = text;
	}
    }
    res.render('index.ejs', {todolist: data});
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', function(req, res) {
    if (req.body.todo != '') {
        req.session.todolist.push(req.body);
	fs.appendFileSync("liste", objectToString(req.body)+"\n", "UTF-8");
    }
    res.redirect('/todo');
})

/* Supprime un élément de la todolist */
.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '')
        req.session.todolist.splice(req.params.id, 1);
    res.redirect('/todo');
})

/* Autoriser l'accès aux ressources des modules externes */
.use(express.static(__dirname, '/modules'))

/* On redirige vers la todolist si la page demandée n'est pas trouvée */
.use(function(req, res, next){
    res.redirect('/todo');
})

.listen(8080);
