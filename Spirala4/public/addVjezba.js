const inputs = document.querySelectorAll('input');
var poruke;
var str;
var mojDiv;
var validacija
function funkcija(){
	mojDiv=document.getElementById("fNova");
	validacija=new Validacija(mojDiv);
	var naziv=document.getElementsByName("vjezba");
	poruke=document.getElementById("poruke");
	validacija.naziv(naziv[0]);
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