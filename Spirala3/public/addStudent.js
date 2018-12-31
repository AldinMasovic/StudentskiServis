const inputs = document.querySelectorAll('input');
var poruke;
var str;
var mojDiv;
var validacija
function funkcija(){
	mojDiv=document.getElementById("fPojedinacni");
	validacija=new Validacija(mojDiv);
	//var naziv=document.getElementsByName("naziv");
	var ime=document.getElementsByName("ime");
	var ind=document.getElementsByName("index");
	poruke=document.getElementById("poruke");
	validacija.ime(ime[0]);
	validacija.index(ind[0]);
	str="Sljedeća polja nisu validna:";
	inputs.forEach((input) => {
            if(input.className=="invalid"){
            	str+=input.name + ",";
            }
});
	if(str!="Sljedeća polja nisu validna:"){
		str=str.slice(0,-1)+"!";
		poruke.innerHTML=str;
		poruke.style.display="block";
	}
	else{
		poruke.style.display="none";	
	}
}