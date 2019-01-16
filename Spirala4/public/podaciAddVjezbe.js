function promjeniAkciju(){
	var forma=document.getElementsByName("fPoveziZadatak");
	var sVjezbe=document.getElementsByName("sVjezbe");
	forma[0].action="http://localhost:8080/vjezba/"+sVjezbe[1].value+"/zadatak";
}
function dajZadatke(){
	var vjezbe=document.getElementsByName("sVjezbe");
	var zadaci=document.getElementsByName("sZadatak");
	var ajax = new XMLHttpRequest();
	    ajax.onreadystatechange = function(){
	        if(ajax.readyState ==4 && ajax.status==200){
	        	while (zadaci[0].firstChild) {
				    zadaci[0].removeChild(zadaci[0].firstChild);
				}
				var podaci1=ajax.responseText;
				var podaci=JSON.parse(podaci1);
				for(var i=0;i<podaci.length;i++){
					//var objekat2=document.createElement("option");
					var objekat=document.createElement("option");
					objekat.setAttribute("value", ""+podaci[i].id);
					//objekat2.setAttribute("value", ""+podaci[i].id);
					objekat.text=podaci[i].naziv;
					//objekat2.text=podaci[i].naziv;
					zadaci[0].appendChild(objekat);
					//vjezbe[1].appendChild(objekat2);
				}
	        }
	    }
	    ajax.open("GET","http://localhost:8080/dajZadatkeZaVjezbe?naziv="+vjezbe[1].value , true);
	    ajax.setRequestHeader('Accept', 'application/json');
		ajax.send(null);
}
function popuniSveTo(){
	var vjezbe=document.getElementsByName("sVjezbe");
	var ajax = new XMLHttpRequest();
	    ajax.onreadystatechange = function(){
	        if(ajax.readyState ==4 && ajax.status==200){
	        	while (vjezbe[0].firstChild) {
				    vjezbe[0].removeChild(vjezbe[0].firstChild);
				}
				while (vjezbe[1].firstChild) {
				    vjezbe[1].removeChild(vjezbe[1].firstChild);
				}
				var podaci1=ajax.responseText;
				var podaci=JSON.parse(podaci1);
				for(var i=0;i<podaci.length;i++){
					var objekat2=document.createElement("option");
					var objekat=document.createElement("option");
					objekat.setAttribute("value", ""+podaci[i].id);
					objekat2.setAttribute("value", ""+podaci[i].id);
					objekat.text=podaci[i].naziv;
					objekat2.text=podaci[i].naziv;
					vjezbe[0].appendChild(objekat);
					vjezbe[1].appendChild(objekat2);
				}
				dajZadatke();
	        }
	    }
	    ajax.open("GET","http://localhost:8080/dajMiPodatke" , true);
	    ajax.setRequestHeader('Accept', 'application/json');
		ajax.send(null);
};
function dajMiGodine(){
	var godine=document.getElementsByName("sGodine");
	var ajax = new XMLHttpRequest();
	    ajax.onreadystatechange = function(){
	        if(ajax.readyState ==4 && ajax.status==200){
	        	while (godine[0].firstChild) {
				    godine[0].removeChild(godine[0].firstChild);
				}
				while (godine[1].firstChild) {
				    godine[1].removeChild(godine[1].firstChild);
				}
				var podaci1=ajax.responseText;
				var podaci=JSON.parse(podaci1);
				for(var i=0;i<podaci.length;i++){
					var objekat2=document.createElement("option");
					var objekat=document.createElement("option");
					objekat.setAttribute("value", ""+podaci[i].id);
					objekat2.setAttribute("value", ""+podaci[i].id);
					objekat.text=podaci[i].naziv;
					objekat2.text=podaci[i].naziv;
					godine[0].appendChild(objekat);
					godine[1].appendChild(objekat2);
				}
	        }
	    }
	    ajax.open("GET","http://localhost:8080/dajMiGodine" , true);
	    ajax.setRequestHeader('Accept', 'application/json');
		ajax.send(null);
};
popuniSveTo();
dajMiGodine();