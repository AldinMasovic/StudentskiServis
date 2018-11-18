const inputs = document.querySelectorAll('input');
var poruke;
var str;
function funkcija(){
	var mojDiv=document.getElementById("login");
	var validacija=new Validacija(mojDiv);
	var pass=document.getElementsByName("password");
	var ime=document.getElementsByName("username");

	poruke=document.getElementById("poruke");
	validacija.password(pass[0]);
	validacija.ime(ime[0]);
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