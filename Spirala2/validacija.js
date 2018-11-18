var Validacija=(function(){
//lokalne variable idu ovdje
var regime;
var reggodina;
var result;
var regindex;
var regnaziv;
var regpass;
var regurl;

var konstruktor=function(divElementPoruke){

return{
ime:function(inputElement){

	//TODOOOOO
	regime=/^[A-Z]{1}([a-z]+\')*[a-z]+((\s|\-)[A-Z]{1}([a-z]+\')*[a-z]+){0,3}$/;

	if(regime.test(inputElement.value)){
		inputElement.className = 'valid';
	}
	else{
		inputElement.className = 'invalid';
	}

},
godina:function(inputElement){
	//Validna godina predstavlja string oblika 20AB/20CD gdje je CD broj za jedan veći od AB
	reggodina=/^(20(\d)(\d)\/20(\d)(\d))$/		//g
	result=reggodina.exec(inputElement.value);
	if(result==null){
		inputElement.className = 'invalid';
		return -1;
	}
	if((result[2]==result[4] && result[3]==(result[5]-1))||(result[2]==(result[4]-1) && result[3]==9 && result[5]==0)){
		inputElement.className = 'valid';
	}
	else{
		inputElement.className = 'invalid';
	}
},
repozitorij:function(inputElement,regex){
	//- Validan repozitorij predstavlja string koji zadovoljava regex iz parametra
	if(regex.test(inputElement.value)){
		inputElement.className = 'valid';
	}
	else{
		inputElement.className = 'invalid';
	}

},
index:function(inputElement){
	//Validan index je petocifren pozitivan broj gdje su prve dvije cifre od 14 do 20.
	regindex=/^(1[4-9]|20)\d{3}$/;
	if(regindex.test(inputElement.value)){
		inputElement.className = 'valid';
	}
	else{
		inputElement.className = 'invalid';
	}
},
naziv:function(inputElement){
	/*Validan naziv je string koji počinje slovima, a završava brojem ili malim slovom. Ne može
	biti kraći od 3 slova i može sadržavati brojeve, slova i sljedeće znakove \ / - “ ‘ ! ?
	: ; ,	*/
	regnaziv=/^([a-zA-Z]([a-zA-Z0-9]|\\|\/|-|"|'|!|\?|:|;|,){1,}[a-z0-9])$/;

	if(regnaziv.test(inputElement.value)){
		inputElement.className = 'valid';
	}
	else{
		inputElement.className = 'invalid';
	}
},
password:function(inputElement){
	/*Validan password sadrži minimalno osam znakova u kojima mora biti bar dvoje od
	sljedećeg: veliko slovo, malo slovo ili broj. Ostali znakovi su zabranjeni.*/
	regpass=/(?:^| )(?=.{8,}(?=$| ))(^(([A-Z]+[a-z0-9])|([a-z]+[A-Z0-9])|([0-9]+[a-zA-Z]))[A-Za-z0-9]*$)(?=$| )/;
	if(regpass.test(inputElement.value)){
		inputElement.className = 'valid';
	}
	else{
		inputElement.className = 'invalid';
	}


},
url:function(inputElement){
	/*Validan url ima format protokol://host/putanja?parametri. Boldirani dijelovi su obavezni,
	a ostali dopušteni. Protokol može biti http, https, ftp ili ssh. Host se sastoji od 1 ili više
	riječi odvojenih tačkama, ne može počinjati ili završavati tačkom. Putanja sadrži jednu ili
	više riječi odvojenih sa slash znakom. Ukoliko postoje parametri na kraju se dodaje “?”.
	Parametri imaju oblik rijec=rijec&rijec=rijec. Riječ može sadržavati samo mala slova
	engleske abecede, brojeve i crticu -, ne može počinjati niti završavati crticom.*/
	regurl=/^(?:((http)|(https)|(ssh)|(ftp)):\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:\/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
	if(regurl.test(inputElement.value)){
		inputElement.className = 'valid';
	}
	else{
		inputElement.className = 'invalid';
	}

	//^((http|https|ftp|ssh):\/\/\w(\.|\w)*\w(\/([a-z0-9][a-z0-9-]*[a-z0-9]\/?)+)?)$

}

}
}
return konstruktor;
}());










/*

//Primjer koristenja:
var mojDiv=document.getElementById(“mojDivPoruke”);
Var inputIme=document.getElementById(“inputIme”);
var validacija = new Validacija(mojDiv);
validacija.ime(inputIme);
//U zadatku ne smijete koristiti nikakve hardkodirane vanjske
elemente, niti bilo kakvu vanjsku variablu koju niste dobili kroz
parametre konstruktora ili kroz parametre metoda*/