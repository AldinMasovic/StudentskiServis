var mojDiv;
var tabela;
var brojZdataka;
var red;
var kolona;
var url;
var poruke;
const inputs = document.querySelectorAll('input');
function funkcijaKreiraj(divElement){
	mojDiv=document.getElementById(divElement);
	brojZdataka=document.getElementById("brojredova").value;
	tabela= new CommitTabela(mojDiv,brojZdataka);
}
function funkcijaDodaj(){
	red=document.getElementById("red1").value;
	url=document.getElementById("url1").value;
	if(red=="")
		red="-1";
	tabela.dodajCommit(Number(red),url);	
}
function funkcijaObrisi(){
	red=document.getElementById("red1").value;
	kolona=document.getElementById("kolona1").value;
	if(red=="")
		red="-1";
	if(kolona=="")
		kolona="-1";
	tabela.obrisiCommit(Number(red),Number(kolona));
}
function funkcijaEdituj(){
	red=document.getElementById("red1").value;
	kolona=document.getElementById("kolona1").value;
	url=document.getElementById("url1").value;
	if(red=="")
		red="-1";
	if(kolona=="")
		kolona="-1";
	tabela.editujCommit(Number(red),Number(kolona),url);
}
function funkcija(){
	var mojDiv1=document.getElementById("doradi");
	validacija=new Validacija(mojDiv1);
	var url1=document.getElementsByName("url");
	poruke=document.getElementById("poruke");
	validacija.url(url1[0]);
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
