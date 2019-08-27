var CommitTabela=(function(){
//lokalne variable idu ovdje
var i=0;
var j=0;
var brojac=0;
var pomocna;
var max=0;
var table;
var prviRed;
var prvaKolona;
var element;
var element2;
var privremenaDuzina=3;
var privremenoMax=0;
var ukupno=3;
var obrisiTabelu;
var x;
var a;
var zadnjaKolona;
var tekst;
var konstruktor=function(divElement,brojZadataka){
	//pravljenje tabele
	document.getElementById("doradi").style.display="grid";
	obrisiTabelu = document.getElementsByTagName("table");
    if(obrisiTabelu.length!=0)
    	obrisiTabelu[0].parentNode.removeChild(obrisiTabelu[0]);	
	table=document.createElement("table");
	//prvi red
	prviRed=document.createElement("tr");
	element=document.createElement("th");
	element2=document.createElement("th");
	element.appendChild(document.createTextNode("Naziv zadatka"));
	element2.appendChild(document.createTextNode("Commiti"));
	prviRed.appendChild(element);
	prviRed.appendChild(element2);
	table.appendChild(prviRed);
	for ( i = 0; i < brojZadataka; i++) {
	    var tr = document.createElement("tr");
        var td = document.createElement("td");
        td.appendChild(document.createTextNode("Zadatak "+(i+1)));
        var td1=document.createElement("td");
        tr.appendChild(td);
        tr.appendChild(td1);
        table.appendChild(tr);
	    }	   
	
	divElement.appendChild(table);

	return{
		dodajCommit:function(rbZadatka,url){
				if(rbZadatka<0 || rbZadatka>=(table.rows.length-1))return -1;
				//if(rbCommita<0 || rbCommita >= (table.rows[(rbZadatka+1)].cells.length-2))return -1;
				//traženje koliko max kolona ima
				for(i=1;i<table.rows.length;i++){
					if(table.rows[i].cells.length>max){
						max=table.rows[i].cells.length;
					}
				}
				//dodavanje kolone		(if   ako ima najviše kolona)	(else  ako nema hehe)
				if(table.rows[(rbZadatka+1)].cells.length==max){
					//var 
					x=table.rows[(rbZadatka+1)].insertCell((max-1));
					//var 
					a=document.createElement("a");
					a.href=url;
					a.appendChild(document.createTextNode("" + (table.rows[(rbZadatka+1)].cells.length-2)));
					x.appendChild(a);
					//x.innerHTML="" + (table.rows[(rbZadatka+1)].cells.length-2);
					max++;
					table.rows[(rbZadatka+1)].cells[(max-1)].style.display="none";
					//podesavanje colspan
					for(i=0;i<table.rows.length;i++){
						//var duzina 
						privremenaDuzina=table.rows[i].cells.length-1;
						ukupno=max-privremenaDuzina-1;
						if(ukupno!=0)
							table.rows[i].cells[privremenaDuzina].style.display="table-cell";
						table.rows[i].cells[privremenaDuzina].colSpan=ukupno;
					}
				}
				else
				{
					//var 
					zadnjaKolona=table.rows[(rbZadatka+1)].cells.length-1;
					//var 
					tekst=table.rows[(rbZadatka+1)].insertCell((zadnjaKolona));
					a=document.createElement("a");
					a.href=url;
					a.appendChild(document.createTextNode("" + (table.rows[(rbZadatka+1)].cells.length-2)));
					tekst.appendChild(a);
					//tekst.innerHTML="" + (table.rows[(rbZadatka+1)].cells.length-2);
					//podesavanje colspan
					zadnjaKolona++;
					if(max==(zadnjaKolona+1)){
						table.rows[(rbZadatka+1)].cells[(max-1)].style.display="none";
					}
					else{
						table.rows[(rbZadatka+1)].cells[zadnjaKolona].colSpan=(max-zadnjaKolona-1);	
					}
					
				}
		},
		editujCommit:function(rbZadatka,rbCommita,url){
				if(rbZadatka<0 || rbZadatka>=(table.rows.length-1))return -1;
				if(rbCommita<0 || rbCommita >= (table.rows[(rbZadatka+1)].cells.length-2))return -1;
				//TODO: dodati URL
				table.rows[(rbZadatka+1)].cells[(rbCommita+1)].getElementsByTagName("a")[0].href=url;//	a.href=url;
				//table.rows[(rbZadatka+1)].cells[(rbCommita+1)].a.setAttribute("href",url);
		},
		obrisiCommit:function(rbZadatka,rbCommita){
				//validnost index-a
				if(rbZadatka<0 || rbZadatka>=(table.rows.length-1))return -1;
				if(rbCommita<0 || rbCommita >= (table.rows[(rbZadatka+1)].cells.length-2))return -1;


				//traženje koliko max kolona ima
				for(i=0;i<table.rows.length;i++){
					if(table.rows[i].cells.length>max){
						max=table.rows[i].cells.length;
					}
				}
				if(table.rows[(rbZadatka+1)].cells.length==max){
					table.rows[(rbZadatka+1)].deleteCell((rbCommita+1)); 
					max--;
					for(i=0;i<table.rows.length;i++){
						if(table.rows[i].cells.length>max){
							table.rows[(rbZadatka+1)].cells[(max-1)].style.display="table-cell";
							max=table.rows[i].cells.length;
						}
					}
					//podesavanje colspan
					for(i=0;i<table.rows.length;i++){
						//var duzina 
						privremenaDuzina=table.rows[i].cells.length-1;
						ukupno=max-privremenaDuzina-1;
						if(ukupno==0 && max!=2)
							table.rows[i].cells[privremenaDuzina].style.display="none";
						else{
							table.rows[i].cells[privremenaDuzina].style.display="table-cell";
						}
						table.rows[i].cells[privremenaDuzina].colSpan=ukupno;
					}
				}
				else{

					//var duzina
					privremenaDuzina=table.rows[(rbZadatka+1)].cells.length-1;
					table.rows[(rbZadatka+1)].deleteCell((rbCommita+1));
					table.rows[(rbZadatka+1)].cells[(privremenaDuzina-1)].colSpan=max-privremenaDuzina;

				}
			}
	}
}
return konstruktor;
}());
//Primjer koristenja:
//var mojDiv=document.getElementById(“mojDiv”);
//var tabela= new CommitTabela(mojDiv,4);
//tabela.dodajCommit(0,”www.etf.ba”);
