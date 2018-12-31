var express=require('express');
var app=express();
var fs = require('fs');
const multer = require('multer');
var jsonxml = require('jsontoxml');
app.use(express.static("public"));
app.use(express.static("pdf"));
var path=__dirname+ '/public';
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

var Postoji=false;
//zadatak 2  ------------------------------------------------------------------------------------------

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname+'/pdf')
    },
    fileFilter: ( req, file, cb ) => { 
                      console.log( file.mimetype ); 
                      var postoji=false;
                      fs.exists(__dirname+'/pdf/' + req.body.naziv+'.pdf', function(exists) {
						    if (exists) {
						    	console.log("STORAGE___ VEĆ POSTOJI FAJL");
						    	postoji=true;
						    } else {
						    	postoji=false;
						    	console.log("STORAGE___  NE POSTOJI FAJL");
						    	cb(null, req.body.naziv+'.pdf')
						    }
						    console.log("postoji- " + postoji);
						    cb(null,postoji) 
						});
             },
    filename: function (req, file, cb) {
        cb(null, req.body.naziv+'.pdf')
  }
});
const upload = multer({ storage: storage });

app.post('/addZadatak',upload.any(), function(req, res) {
	try{
	  if(req.body.naziv==null){
	  	return res.redirect(path+"/greska.html");
	  }
	  const file = req.files[0];
	  if(file.mimetype!="application/pdf"){
	  	return res.redirect(path+'/greska.html');
	  }
	  else{
	  	fs.readFile(file.path, function(err, data) {
		    if (err){
		      return res.redirect('/greska'+'.html');
		  }
		  	var jsObj="{'naziv':"+req.body.naziv + ", 'postavka': http://localhost:8080/zadatak?naziv="+req.body.naziv+"}";
		  	var ubacitiJS=JSON.stringify(jsObj);
		  	var stream = fs.createWriteStream(__dirname+"/pdf/"+ req.body.naziv + "Zad.json");
			stream.once('open', function(fd) {
				stream.write(ubacitiJS);
			  	stream.end();
			});
		    //res.send(`Your files's name is ${file.originalname}. Its size is ${file.size} and its mime type is ${file.mimetype}`);
		    res.end();
	  	});	
	  }

	}
	catch(err){
		console.log("Zadatak 2 error cathc");
	}
 /* console.log("Zadatak 2  REQ FILES - \n " + req.files);
  if(req.body.naziv==null){
  	console.log("POSTOJI FAJL ZADAATAK DVA RETUN");
  	return res.redirect(path+"/greska.html");
  }
  const file = req.files[0];
  if(file.mimetype!="application/pdf"){
  	return res.redirect(path+'/greska.html');
  }
  else{
  	fs.readFile(file.path, function(err, data) {
	    if (err){
	    	console.log("Saljem na greska html");
	      return res.redirect('/greska'+'.html');
	  }
	  	var jsObj="{'naziv':"+req.body.naziv + ", 'postavka': http://localhost:8080/zadatak?naziv="+req.body.naziv+"}";
	  	var ubacitiJS=JSON.stringify(jsObj);
	  	var stream = fs.createWriteStream(__dirname+"/pdf/"+ req.body.naziv + "Zad.json");
		stream.once('open', function(fd) {
			stream.write(ubacitiJS);
		  	stream.end();
		});
	    //res.send(`Your files's name is ${file.originalname}. Its size is ${file.size} and its mime type is ${file.mimetype}`);
	    res.end();
  	});	
  }*/
});


//zadatak 3 ------------------------------------------------------------------------------------------

app.get('/zadatak',function(req, res){
		if(Object.keys(req.query).length!=1 || Object.keys(req.query)[0]!="naziv"){
			res.status(400);
			res.redirect('/greska.html');
			console.log("Zadatak 3 - pogresni parametri");
			return;
		}
        res.sendFile(__dirname+'/pdf/'+req.query.naziv+'.pdf',function(err){
        	if (err) {
        		res.status(404);
        		res.redirect('/greska.html');
		    	console.log("Zadatak 3 - ERROR " + err);
		    	return;
		    } else {   	
		    	res.end();
		    }
		  });
});

//zadatak 4 ------------------------------------------------------------------------------------------
app.post('/addGodina', function(req, res) {
	fs.readFile(path+"/godine.csv",function(err,content){
            if(err){
            	console.log("ERROR 4 zadatak");
            	res.status(404);
            	return res.redirect('/greska.html');
            }
            else{
                var niz=[];
                var tekst=content.toString();
                var redovi=tekst.split("\n");
               	console.log(req.body);
                for(var i=0;i<redovi.length;i++){
                    var kolone=redovi[i].split(",");
                    if(kolone[0]==req.body.nazivGod){
                    	console.log("Fajl postoji");
                    	return res.redirect('/greska'+'.html');	
                    } 	//fajl već postoji
                }
            }
            /*console.log(Object.keys(req.query)[0]);
            console.log(Object.keys(req.query)[1]);
            console.log(Object.keys(req.query)[2]);
            console.log(req.query);
            console.log(req.body);
            if(Object.keys(req.query).length!=3 || Object.keys(req.query)[0]!="nazivGod" || 
            	Object.keys(req.query)[1]!="nazivRepVje" || Object.keys(req.query)[2]!="nazivRepSpi"){
            	res.status(400);
            	res.redirect('/greska.html');
            	console.log("4 Zadatak pogresni jedan od nazivGod,nazivRepVje ili nazivRepSpi")
            	return;
            }*/
            var objekat=req.body.nazivGod+","+req.body.nazivRepVje+","+req.body.nazivRepSpi;
					fs.appendFile(path+'/godine.csv', objekat+"\n", (err) => {  
					    if (err) return res.redirect('/greska.html');
   
					    res.redirect('/addGodina.html');
					    //res.end();
						
					});
        });
	 

});

//zadatak 5 ------------------------------------------------------------------------------------------

app.get('/godine',function(req, res){
		//TODO super radi ali provjeriti u četvrtom zadatku dodavanje ili ovdje provjeriti da ako je samo jedan red prazan da ne čita to
		fs.readFile(path+"/godine.csv",function(err,content){
            if(err){
                res.writeHead(404,{"Content-Type":"application/json"});
                res.end(JSON.stringify({message:'404 Not Found'}));
            }
            else{
                var niz=[];
                var tekst=content.toString();
                var redovi=tekst.split("\n");
                for(var i=0;i<redovi.length;i++){
                    var kolone=redovi[i].split(",");
                    if(kolone[0]=="")continue;			
                    var objekat={nazivGod:kolone[0],nazivRepVje:kolone[1],nazivRepSpi:kolone[2]};
                    niz.push(objekat);
                }
                res.writeHead(200,{"Content-Type":"application/json"});
                res.end(JSON.stringify(niz));
            }
        });
});
//zadatak 7 ------------------------------------------------------------------------------------------

app.get('/zadaci',function(req, res){
	var nizFajlova=[];
	fs.readdir(__dirname+'/pdf', (err, files) => {
	  files.forEach(file => {
	  	if(file.includes('.pdf')){
	  		nizFajlova.push(file);
	  	}
	  });
	  var niz=[];
        for(var i=0;i<nizFajlova.length;i++){
        	nizFajlova[i]=nizFajlova[i].replace(".pdf","");
            var objekat={ime:nizFajlova[i],postavka:'http://localhost:8080/zadatak?naziv='+nizFajlova[i]};
            niz.push(objekat);
        }
	  if (req.accepts('json')) {
        res.writeHead(200,{"Content-Type":"application/json"});
        res.end(JSON.stringify(niz));
	  	}
	  	else if(req.accepts('xml')) {
	  		var nizXml='<?xml version="1.0" encoding="UTF-8"?>\n<zadaci>';
			for(var i=0;i<nizFajlova.length;i++){
	        	nizFajlova[i]=nizFajlova[i].replace(".pdf","");
				var objekat='<zadatak>\n<naziv>' + nizFajlova[i] + '</naziv> \n <postavka> http://localhost:8080/zadatak?naziv=' + nizFajlova[i]+' </postavka>\n </zadatak>'; 
	            nizXml+=objekat;
	    	}
	    	nizXml+='</zadaci>';
	    	res.writeHead(200,{"Content-Type":"application/xml"});
	        res.end(nizXml);
	  	}
	  	else if(req.accepts('csv')) {
	  		var nizCsv='';
	  		for(var i=0;i<nizFajlova.length;i++){
	  			nizFajlova[i]= nizFajlova[i].replace(".pdf","");
	            var objekat=nizFajlova[i]+',http://localhost:8080/zadatak?naziv='+nizFajlova[i]+'\n';
	            nizCsv+=objekat;
	        }
	        res.writeHead(200,{"Content-Type":"text/csv"}); 
	        res.end(nizCsv);
	  	}else{
	  		res.writeHead(200,{"Content-Type":"application/json"});
        	res.end(JSON.stringify(niz));
	  	}

	});
});
app.listen(8080);