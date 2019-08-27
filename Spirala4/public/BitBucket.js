var BitBucket=(function(){
    var konstruktor=function(key,secret){
        return {
        ucitaj: function(nazivRepSpi, nazivRepVje,callback){
            
            var niz=[];
            niz.push({
                imePrezime: "Aldin Masovic",
                index: "17580"
            });
            niz.push({
                imePrezime: "Merima Kovacevic",
                index: "17600"
            });
            niz.push({
                imePrezime: "Ajla Mesic",
                index: "17496"
            });
            niz.push({
                imePrezime: "Emina Mehic",
                index: "17706"
            });
            callback(null,niz);
            
            }
        }
    }
    return konstruktor;
}());