var bbucket=null;
var niz=null;
function posaljiAjax(x){
	var ajax = new XMLHttpRequest();
	ajax.onreadystatechange = function(){
	        if(ajax.readyState ==4 && ajax.status==200){
	        	var objekat1=ajax.responseText;
	        	var objekat=JSON.parse(objekat1);
	            alert(objekat.message);
	        }
	    }
	    ajax.open("POST","http://localhost:8080/student" , true);
	    ajax.setRequestHeader("Content-type", "application/json");	    
		ajax.send(x);
}
function ispisi(greska,x){
	if(greska==null){
		niz=x;
		console.log("Lista studenata:\n"+JSON.stringify(x));
	}
}
function dodajStudente(){
		var sGod=document.getElementsByName("sGodina");
		var objekat={godina:sGod[0].value,studenti:niz};
		posaljiAjax(JSON.stringify(objekat));
}
function nekaFunkcija(){
	if(bbucket==null){
		bbucket= new BitBucket("ykZjKdyBJ77aMsqSfS", "eLDc5nXUpSWjNBwXvpgdr8cuWhrTF7uc");
	}
	bbucket.ucitaj("wtv18","wtProjekat18",ispisi);
	document.getElementById("dodaj").disabled=false;
}
function dajMiGodine(){
	var godine=document.getElementsByName("sGodina");
	var ajax = new XMLHttpRequest();
	    ajax.onreadystatechange = function(){
	        if(ajax.readyState ==4 && ajax.status==200){
	        	
	        	while (godine[0].firstChild) {
				    godine[0].removeChild(godine[0].firstChild);
				}
				/*while (godine[1].firstChild) {
				    godine[1].removeChild(godine[1].firstChild);
				}*/
				var podaci1=ajax.responseText;
				var podaci=JSON.parse(podaci1);
				for(var i=0;i<podaci.length;i++){
					//var objekat2=document.createElement("option");
					var objekat=document.createElement("option");
					objekat.setAttribute("value", ""+podaci[i].id);
					//objekat2.setAttribute("value", ""+podaci[i].id);
					objekat.text=podaci[i].naziv;
					//objekat2.text=podaci[i].naziv;
					godine[0].appendChild(objekat);
					//godine[1].appendChild(objekat2);
				}
	        }
	    }
	    ajax.open("GET","http://localhost:8080/dajMiGodine" , true);
	    ajax.setRequestHeader('Accept', 'application/json');
		ajax.send(null);
};
dajMiGodine();