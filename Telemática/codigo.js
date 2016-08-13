function Procesar_Cifrar(texto, palabra, TextArea){
	alert("Cifrar");
	var Key="";
	for(i in palabra) Key+=palabra.charCodeAt(i);
	var Cadena="";
	for(i in texto) Cadena+=texto.charCodeAt(i);
	var N=Cadena.length, I=0, SW=true;
	var Cad=Cadena.split("");
	var Cif="";
	while(N-- > 0){
		var x=parseInt(Key.charAt(I)); I++; I%=Key.length;
		x%=Cad.length;
		if(SW==false) x=Cad.length-1-x;
		Cif+=Cad[x];
		Cad.splice(x, 1);
		//SW=!SW;
	}
	var i=0;
	var New="";
	while(1){
		if(i+1>=Cif.length) break;
		var x=parseInt( Cif.charAt(i)+Cif.charAt(i+1) );
		if(x>=32 && x<100) New=New+String.fromCharCode(x);
		else New=New+"*"+Cif.charAt(i)+Cif.charAt(i+1);
		i+=2;
	}
	if(Cif.length%2==1){
		New=New+Cif.charAt(Cif.length-1);
		New=New+"*";
	}
	var decif;
	//TextArea.value=Key+"\n::"+Cadena+"\n::"+decif+"\n=="+Cif+"\n"+Cadena.split("").sort().join("")+"\n"+Cif.split("").sort().join("")+"\n"+New;
	TextArea.value=New;
}


function Procesar_DeCifrar(texto, palabra, TextArea){
	alert("DeCifrar");
	var Key="";
	for(i in palabra) Key+=palabra.charCodeAt(i);
	var Cadena="", N=texto.length;
	if(texto.charAt(N-1)=="*"){ N-=2; }
	for(var i=0; i<N; i++){
		var x=texto.charAt(i);
		if(x=="*"){
			if(i+1>=N) break;
			Cadena+=texto.charAt(i+1);
			Cadena+=texto.charAt(i+2);
			i+=2;
		}else Cadena+=texto.charCodeAt(i);
	}
	N=texto.length;
	if(texto.charAt(N-1)=="*"){ Cadena+=texto.charAt(N-2); }
	var Cif="", M=Cadena.length, I=0, SW=true;
	var Cad=new Array();
	for(var i=0; i<M; i++) Cad.push("-");
	for(var J=0; J<Cadena.length; J++){
		var x=parseInt(Key.charAt(I)); I++; I%=Key.length;
		x%=M; M--;
		if(SW){
			var y=0, z;
			for(var i=0; i<Cadena.length; i++){
				if(y>x) break;
				if(Cad[i]=="-"){z=i; y++;}
			}
			Cad[z]=""+Cadena.charAt(J);
		}else{
			x=M-1-x;
			var y=0, z;
			for(var i=0; i<Cadena.length; i++){
				if(y>x) break;
				if(Cad[i]=="-"){z=i; y++; }
			}
			Cad[z]=""+Cadena.charAt(J);
		}
		//SW=!SW;
	}
	var letras="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var v=new Array();
	for(i in letras) v.push(letras.charCodeAt(i));
	var aux="", New="";
	for(var i=0; i<Cadena.length; i++){
		aux+=Cad[i];
		for(var j=0; j<v.length; j++){
			if(v[j]==parseInt(aux)){
				aux="";
				New+=letras.charAt(j);
				break;
			}
		}

	}
	//TextArea.value=Key+"\n"+Cadena+"\n"+Cad.join("")+"\n"+New;
	TextArea.value=New;
}
