function Procesar(){
	var expo=document.getElementById("exp").value;
	var mant=document.getElementById("man").value;
	var ex=0;
	expo--;
	for(var i=0; i<expo; i++){
		ex+=(Math.pow(2, i));
	}
	var ma=0;
	for(var i=1; i<=mant; i++){
		ma+=(Math.pow(2, -i));
	}
	var Min=-0.5*Math.pow(2, -ex);
	var Max=ma*Math.pow(2, ex);
	//alert(ma+" "+ex+"|"+Max+"|");
	document.getElementById("Max").value=Max;
	document.getElementById("Min").value=Min;
	
}
