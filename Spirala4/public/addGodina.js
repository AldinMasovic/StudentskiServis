const inputs = document.querySelectorAll('input');
var poruke;
var str;
var mojDiv;
var validacija;
var ajaxxx;
function funkcija(){
	mojDiv=document.getElementById("side");
	validacija=new Validacija(mojDiv);
	var godina=document.getElementsByName("naziv");
	var rvjezbe=document.getElementsByName("rvjezbe");
	var rspirala=document.getElementsByName("rspiral");
	poruke=document.getElementById("poruke");
	validacija.godina(godina[0]);
	var reg=/^\w{4,}$/;
	validacija.repozitorij(rvjezbe[0],reg);
	validacija.repozitorij(rspirala[0],reg);
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
function ajaxFun(){
	var mojDiva=document.getElementById("glavniSadrzaj");
	ajaxxx=new GodineAjax(mojDiva);
}
function osvjeziAjax(){
	ajaxxx.osvjezi();
}