function ucitaj(naziv){
    var ajax=new XMLHttpRequest();
    ajax.onreadystatechange=function(){
        if(ajax.readyState==4 && ajax.status==200){
            document.getElementById("glavni").innerHTML=ajax.responseText;
        }
        else if(ajax.readyState==4 && ajax.status== 404){
            document.getElementById("glavni").innerHTML="Error 404";
        }
    }
    ajax.open("GET","http://localhost:8080/"+naziv,true);
    ajax.send();

}