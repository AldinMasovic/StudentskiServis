var express=require('express');
var app=express();
var fs = require('fs');
var Sequelize = require('sequelize');
const multer = require('multer');
var jsonxml = require('jsontoxml');
app.use(express.static("public"));
app.use(express.static("pdf"));
var path=__dirname+ '/public';
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
const db = require('./db.js');
db.sequelize.sync().then(function(){	//{force:true}
    /*inicializacija().then(function(){
        console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
        process.exit();
    });*/
    console.log("Gotovo kreiranje tabela i ubacivanje pocetnih podataka!");
});

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
			db.zadatak.create({
				naziv: req.body.naziv,
				postavka: "http://localhost:8080/zadatak?naziv="+req.body.naziv
			}).then(function(){
				console.log("Uspjesno dodan zadatak u bazu");
				res.redirect('/addZadatak.html');
			})
		    
	  	});	
	  }

	}
	catch(err){
		console.log("Zadatak 2 error cathc");
	}
});


//zadatak 3 ------------------------------------------------------------------------------------------

app.get('/zadatak',function(req, res){
		if(Object.keys(req.query).length!=1 || Object.keys(req.query)[0]!="naziv"){
			res.status(400);
			res.redirect('/greska.html');
			console.log("Zadatak 3 - pogresni parametri");
			return;
		}
		console.log("req query  naziv " + req.query.naziv);
		db.zadatak.findOne({ where: {naziv: req.query.naziv} }).then(function(licniPodatak) {
                            res.sendFile(__dirname+'/pdf/'+licniPodatak.naziv+'.pdf',function(err){//req.query.naziv
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
        
});

//zadatak 4 ------------------------------------------------------------------------------------------
app.post('/addGodina', function(req, res) {
	console.log(req.body);
	console.log("Req body naziv 4 zad - " + req.body.nazivGod);
	db.godina.findOne({ where: {naziv: req.body.nazivGod} }).then(function(licniPodatak) {
					if(licniPodatak==null){
						console.log("licniPodatak- " + licniPodatak);
						db.godina.create({
							naziv: req.body.nazivGod,
							nazivRepSpi: req.body.nazivRepSpi,
							nazivRepVje: req.body.nazivRepVje
						}).then(function(){
							console.log("4 Zadatak spirale 3 s bazom- dodane godine");
							res.redirect('/addGodina.html');
						});
					}
					else{
						return res.redirect('/greska'+'.html');	
					}
	});
/*

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
         /*   var objekat=req.body.nazivGod+","+req.body.nazivRepVje+","+req.body.nazivRepSpi;
					fs.appendFile(path+'/godine.csv', objekat+"\n", (err) => {  
					    if (err) return res.redirect('/greska.html');
   
					    res.redirect('/addGodina.html');
					    //res.end();
						
					});
        });*/
	 

});

//zadatak 5 ------------------------------------------------------------------------------------------

app.get('/godine',function(req, res){
		//TODO super radi ali provjeriti u četvrtom zadatku dodavanje ili ovdje provjeriti da ako je samo jedan red prazan da ne čita to

		db.godina.findAll().then(function(podaci){
			console.log(podaci);
			var niz=[];
			for(var i=0;i<podaci.length;i++){
				var objekat={nazivGod:podaci[i].naziv,nazviRepVje:podaci[i].nazivRepVje,nazivRepSpi:podaci[i].nazivRepSpi};
				niz.push(objekat);
			}
			res.writeHead(200,{"Content-Type":"application/json"});
            res.end(JSON.stringify(niz));
		});
		/*fs.readFile(path+"/godine.csv",function(err,content){
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
        });*/
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

//spirala 3 -----------------------------------------------------------------------------------------------------------------

 /*Implementirajte funkcionalnost dodavanja vježbe/spirale. Ako se pošalje POST
zahtjev iz forme fPostojeca sa podacima sGodine i sVjezbe na url http://localhost:8080/addVjezba
kreira se veza između godine sa id-em sGodine i vježbom sa id-em sVjezbe. Nakon dodavanja
vratite na stranicu addVjezba.html*/
app.post('/addVjezba', function(req, res) {
	if(req.body.naziv==null){
		db.vjezba.findOne({where: {id: req.body.sVjezbe}}).then(function(podatakVjezbe){
	  		db.godina.findOne({where: {id: req.body.sGodine}}).then(function(podatakGodina){
	  			podatakVjezbe.addGodine([podatakGodina]);
	  			podatakGodina.addVjezbe([podatakVjezbe]);
	  			res.redirect('/addVjezba.html');
	  	});
	  });	
	}
	else{
	  var spiralaTrue=0;
	  if(req.body.spirala=="on"){
	  	spiralaTrue=1;
	  }
	  db.vjezba.create({
				naziv: req.body.naziv,
				spirala: spiralaTrue
			}).then(function(podatakVjezbe){
					db.godina.findOne({where: {id: req.body.sGodine}}).then(function(podatakGodina){
		  			podatakVjezbe.addGodine([podatakGodina]);		
		  			podatakGodina.addVjezbe([podatakVjezbe]);
		  			res.redirect('/addVjezba.html');
		  		});
		});
	}
	  
});
/*Zadatak 2.b [0.5b] Implementirajte funkcionalnost dodavanja nove vježbe/spirale. Ako se pošalje
POST zahtjev iz forme fNova sa podacima sGodine, naziv i spirala kreira se nova vježba sa
podacima naziv i postavlja joj se polje spirala na true ili false u zavisnosti od vrijednosti spirala iz
forme. Nakon kreiranja nove vježbe ona se povezuje sa godinom sa id-em sGodine. (Dodavanje
zadataka na vježbu ne radite u ovom zadatku) Nakon dodavanja vratite na stranicu addVjezba.html*/



/*Zadatak 2.c [1b] Dio iz forme fNova koji se odnosi na dodavanja zadataka na vježbu izdvojite u
novu formu (na istoj stranici). U novoj formi fPoveziZadatak treba da se nalazi
● select - name: sVjezbe
● select - name: sZadatak
● input submit - name: dZadatak
Kada se klikne na dugme dZadatak zadatak se dodaje na vježbu. Šalje se POST zahtjev na url
http://localhost:8080/vjezba/:idVjezbe/zadatak. U select tagu sZadatak prikažite sve zadatke koji već
nisu dodjeljeni odabranoj vježbi iz sVjezbe. Ne treba biti moguće u formi odabrati zadatak koji je već
dodan vježbi. Nakon dodavanja zadatka vratite na stranicu addVjezba.html*/
app.post('/vjezba/:idVjezbe/zadatak', function(req, res) {
	  if(req.body.sZadatak==null || req.body.sVjezbe==null){
	  	res.redirect('/greska.html');
	  }
	  db.vjezba.findOne({where: {id: req.params.idVjezbe}}).then(function(podatakVjezba){
	  		db.zadatak.findOne({where:{id: req.body.sZadatak}}).then(function(podatakZdatak){
		  			podatakVjezba.addZadaci([podatakZdatak]);	
		  			podatakZdatak.addVjezbe([podatakVjezba]);
		  			res.redirect('/addVjezba.html');
	  		});
	  	});
		  			
});
app.get('/dajMiPodatke',function(req,res){
	    var niz=[];
		db.vjezba.findAll().then(function(podaci){
			for(var i=0;i<podaci.length;i++){
				var objekat={id:podaci[i].id,naziv:podaci[i].naziv,spirala:podaci[i].spirala};
				niz.push(objekat);
			}
			res.writeHead(200,{"Content-Type":"application/json"});
			res.end(JSON.stringify(niz));
		});
});
app.get('/dajMiGodine',function(req,res){
	    var niz=[];
		db.godina.findAll().then(function(podaci){
			for(var i=0;i<podaci.length;i++){
				var objekat={id:podaci[i].id,naziv:podaci[i].naziv,nazivRepSpi:podaci[i].nazivRepSpi,nazivRepVje:podaci[i].nazivRepVje};
				niz.push(objekat);
			}
			res.writeHead(200,{"Content-Type":"application/json"});
			res.end(JSON.stringify(niz));
		});
});
app.get('/dajZadatkeZaVjezbe',function(req,res){
	    var niz=[];
	    db.vjezba.findOne({where:{id:req.query.naziv}}).then(function(vjezbaPodatak){
	    	vjezbaPodatak.getZadaci().then(function(podaciPovezanosti){
	    		db.zadatak.findAll().then(function(podaci){
				for(var i=0;i<podaci.length;i++){
					var upis=true;
					for(var j=0;j<podaciPovezanosti.length;j++){
						if(podaciPovezanosti[j].id==podaci[i].id)upis=false;
					}
					if(upis){
						var objekat={id:podaci[i].id,naziv:podaci[i].naziv,spirala:podaci[i].spirala};
						niz.push(objekat);	
					}
					
				}
				res.writeHead(200,{"Content-Type":"application/json"});
				res.end(JSON.stringify(niz));
				});
	    	});
	    });
});

//Zadatak 3.a [2b] Stranicu addStudent ispravite tako da ima jednu formu sa poljima
app.post('/student', function(req, res) {
	var studenti=req.body.studenti;
	var m=0;
	var nazivGod="";
	var n=0;
	var nizNM=[0,0];
	//var promisa=new Promise(function(resolve,reject){
		db.godina.findOne({where:{id:req.body.godina}}).then(function(pod){
		nazivGod=pod.naziv;
		var nizPromisa=[];
		for(var i=0;i<studenti.length;i++){
			var novi=false;
			var imeCike=studenti[i].imePrezime;
			var indexCike=studenti[i].index;
			nizPromisa.push(new Promise(function(resolve,reject){
				db.student.findOrCreate({where:{index:indexCike},defaults: {imePrezime: imeCike}}).spread(function(user,created){
				if(created==true){
					n++;
					pod.addStudenti([user]);
				}
				var promisa=new Promise(function(resolve1,reject1){
					pod.getStudenti({where:{index:indexCike}}).then(function(resSet){
						console.log("res set "+resSet);
						console.log(resSet);
						if(resSet==""){
							m++;
							pod.addStudenti([user]);
						}
						resolve1(m);
					});
				});
				promisa.then(function(resolve1){
					console.log("resolve1" + m);
					nizNM[0]=n;
					nizNM[1]=m;
					resolve(nizNM);	
				},function(reject1){});
				//pod.addStudenti([user]);		
			});
			}));	
		}
		Promise.all(nizPromisa).then(function(resolve){
			console.log(""+nizNM[0]);
			console.log(""+nizNM[1]);
			res.writeHead(200,{"Content-Type":"application/json"});
			res.end(JSON.stringify({message:"Dodano je "+nizNM[0]+" novih studenata i upisano "+nizNM[1]+" na godinu "+nazivGod}));	
		},function (error){

		});
		});	
});
app.listen(8080);