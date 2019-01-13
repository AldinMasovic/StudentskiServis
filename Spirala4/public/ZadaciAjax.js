var ZadaciAjax = (function(){
	var konstruktor = function(callbackFn){
		var ajax= new XMLHttpRequest();
		var neposostoji=false;
		ajax.onreadystatechange = function(){
	        if(ajax.readyState ==4 && ajax.status==200){
	        		callbackFn(ajax.response);
	        	}
	        	neposostoji=true;
            }
        if(neposostoji==false){
        	callbackFn({greska:'Već ste uputili zahtjev'});
        }	
		return {
			dajXML:function(){
		    	ajax.open("GET","http://localhost:8080/zadaci" , true);
		    	ajax.setRequestHeader('Accept', 'application/xml');
		    	ajax.timeout=2000;
		    	ajax.ontimeout = function(e){
		    		return;
		    	};
		    	if(neposostoji==true){
		    		console.log("send ajax");
		    		ajax.send();
		    	}
			},
			dajCSV:function(){
				ajax.open("GET","http://localhost:8080/zadaci" , true);
		    	ajax.setRequestHeader('Accept', 'text/csv');
		    	ajax.timeout=2000;
		    	ajax.ontimeout = function(e){
		    		return;
		    	};
		    	if(neposostoji==true)
		    		ajax.send();

			},
			dajJSON:function(){
				ajax.open("GET","http://localhost:8080/zadaci" , true);
		    	ajax.setRequestHeader('Accept', 'application/json');
		    	ajax.timeout=2000;
		    	ajax.ontimeout = function(e){
		    		return;
		    	};
		    	if(neposostoji==true)
		    		ajax.send();
			}
		}
	}
return konstruktor;
}());
module.exports=ZadaciAjax;