var GodineAjax = (function(){
	var konstruktor = function(divSadrzaj){
		var ajax = new XMLHttpRequest();
	    ajax.onreadystatechange = function(){
	        if(ajax.readyState ==4 && ajax.status==200){
	        	while (divSadrzaj.firstChild) {
				    divSadrzaj.removeChild(divSadrzaj.firstChild);
				}
	            var object1=ajax.responseText;
	            var object=JSON.parse(object1);
	            for(var i=0;i<object.length;i++){
	            	var input = document.createElement("div");
	            	input.setAttribute("class", "godina");
	            	var pNaziv=document.createElement("p");
	            	pNaziv.innerHTML=object[i].nazivGod;
	            	var pNazivRepVje=document.createElement("p");
	            	pNazivRepVje.innerHTML=object[i].nazivRepVje;
	            	var pNazivRepSpi=document.createElement("p");
	            	pNazivRepSpi.innerHTML=object[i].nazivRepSpi;
	            	input.appendChild(pNaziv);
	            	input.appendChild(pNazivRepVje);
	            	input.appendChild(pNazivRepSpi);
	            	divSadrzaj.appendChild(input);
	            }
	        }
	    }
	    ajax.open("GET","http://localhost:8080/godine" , true);
	    ajax.setRequestHeader('Accept', 'application/json');
		ajax.send(null);	    
		return {
			osvjezi:function(){
				var ajax = new XMLHttpRequest();
			    ajax.onreadystatechange = function(){
			        if(ajax.readyState ==4 && ajax.status==200){
			        	while (divSadrzaj.firstChild) {
						    divSadrzaj.removeChild(divSadrzaj.firstChild);
						}
			            var object1=ajax.responseText;
			            var object=JSON.parse(object1);
			            for(var i=0;i<object.length;i++){
			            	var input = document.createElement("div");
			            	input.setAttribute("class", "godina");
			            	var pNaziv=document.createElement("p");
			            	pNaziv.innerHTML=object[i].nazivGod;
			            	var pNazivRepVje=document.createElement("p");
			            	pNazivRepVje.innerHTML=object[i].nazivRepVje;
			            	var pNazivRepSpi=document.createElement("p");
			            	pNazivRepSpi.innerHTML=object[i].nazivRepSpi;
			            	input.appendChild(pNaziv);
			            	input.appendChild(pNazivRepVje);
			            	input.appendChild(pNazivRepSpi);
			            	divSadrzaj.appendChild(input);
			            }
			        }
			    }
			    ajax.open("GET","http://localhost:8080/godine" , true);
			    ajax.setRequestHeader('Accept', 'application/json');
				ajax.send(null);	   
					}
			}
	}
	return konstruktor;
}());
module.exports=GodineAjax;