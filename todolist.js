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
    var data = Array();
    if(req.session.todolist == ''){
	var file = fs.readFileSync("liste","UTF-8");
	var datas = file.split("\n");	
	for(var i = 0 ; i < datas.length ; i++){
	    if(datas[i] != ''){
		var da = JSON.parse(datas[i]);
		var text = da.tache;
		if(typeof(da.date) != 'undefined')
		    text += " "+da.date+" "+da.heure;
		req.session.todolist.push(da);
		data[i] = text;
	    }
	}
    }else{
	var content = '';
	for(var i = 0; i < req.session.todolist.length ; i++){
	    if(typeof(req.session.todolist[i].date) != 'undefined')
		content += "{\"tache\" : \""+req.session.todolist[i].tache+"\", \"date\" : \""+req.session.todolist[i].date+"\", \"heure\" : \""+req.session.todolist[i].heure+"\"}";
	    else
		content += "{\"tache\" : \""+req.session.todolist[i].tache+"\"}";
	    content += "\n";
	}
	fs.writeFile("liste", content, "UTF-8");
	
	for(var i = 0 ; i < req.session.todolist.length ; i++){
	    var text = req.session.todolist[i].tache;
	    if(typeof(req.session.todolist[i].date) != 'undefined')
		text += " "+req.session.todolist[i].date+" "+req.session.todolist[i].heure;
	    data[i] = text;
	}
    }
    res.render('index.ejs', {todolist: data});
})

/* On ajoute un élément à la todolist */
.post('/todo/ajouter/', function(req, res) {
    if (req.body.newtodo != '') {
	var details = '';
	var json = {};
	if(req.body.newdate != '' && req.body.newclock != ''){
	    details = "{\"tache\" : \""+req.body.newtodo+"\", \"date\" : \""+req.body.newdate+"\", \"heure\" : \""+req.body.newclock+"\"}";
	    json = {tache : req.body.newtodo, date : req.body.newdate, heure : req.body.newclock};
	}
	else{
	    details = "{\"tache\" : \""+req.body.newtodo+"\"}";
	    json = {tache : req.body.newtodo};
	}
        req.session.todolist.push(json);
	fs.appendFileSync("liste", details+"\n", "UTF-8");
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