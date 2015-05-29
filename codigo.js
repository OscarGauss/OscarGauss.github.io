function CrearTabla(n){
	for(var i=1; i<=n; i++){
		var pp= document.createElement("p");
		var ip1=document.createElement("input");
		var at11 = document.createAttribute("type"); at11.value="text"; ip1.setAttributeNode(at11);
		var at12 = document.createAttribute("name"); at12.value="I"; ip1.setAttributeNode(at12);
		var at13 = document.createAttribute("maxlength"); at13.value="1"; ip1.setAttributeNode(at13);
		var at14 = document.createAttribute("size"); at14.value="4"; ip1.setAttributeNode(at14);
		var at15 = document.createAttribute("id"); at15.value="I"+i; ip1.setAttributeNode(at15);
		var ip2=document.createElement("input");
		var at21 = document.createAttribute("type"); at21.value="text"; ip2.setAttributeNode(at21);
		var at22 = document.createAttribute("name"); at22.value="D"; ip2.setAttributeNode(at22);
		var at23 = document.createAttribute("maxlength"); at23.value="2"; ip2.setAttributeNode(at23);
		var at24 = document.createAttribute("size"); at24.value="4"; ip2.setAttributeNode(at24);
		var at25 = document.createAttribute("id"); at25.value="D"+i; ip2.setAttributeNode(at25);
		var t = document.createTextNode("→");       // Create a text node
		pp.appendChild(ip1); pp.appendChild(t); pp.appendChild(ip2);
		document.getElementById("form1").appendChild(pp);
	}
}

function vaciar(Producciones){
	var ProAux = [];
	for(var i=0; i<Producciones.length; i++)
		ProAux.unshift(Producciones[i]);
	return ProAux;
}
function visitado(x, V){
	for(var i=0; i<V.length; i++){
		if(V[i]==x)
			return 1;
	}
	return 0;
}
function limpiar(){
	for(var f=1; f<=3; f++){
		document.getElementById(f+"nntt").value="";
		document.getElementById(f+"tt").value="";
		document.getElementById(f+"numpro").value="";
		for(var i=1; i<=20; i++){
			idi = f+"I"+(i);
			idd = f+"D"+(i);
			document.getElementById(idi).value="";
			document.getElementById(idd).value="";
		}
	}
}
function SiguienteLetra(Letras, Existentes){
	for(le=0; le<Letras.length; le++){
		var auxx=0;
		for(var j=0; j<Existentes.length; j++)
			if(Existentes[j]==Letras[le])
				auxx++;
		if(auxx==0)
			break;
	}
	return Letras[le];
}
function GuardarGramatica(){
	var produccionesI = document.getElementsByName("I");
	var produccionesD = document.getElementsByName("D");
	var ter = document.getElementById("tt").value;
	var noter = document.getElementById("nntt").value;
	var Producciones = [];
	var Terminales = [];
	var NoTerminales = [];
	var Letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
	for(var i=0; i<((document.getElementById("numpro")).value); i++)
		Producciones.unshift({izq:produccionesI[i].value, der:produccionesD[i].value});
	for(var i=0; i<noter.length; i++)
		if(noter.charAt(i)!=" ")
			NoTerminales.unshift(noter.charAt(i));
	for(var i=0; i<ter.length; i++)
		if(ter.charAt(i)!=" ")
			Terminales.unshift(ter.charAt(i));
	//Producciones.orderByString('izq');
	//Transformar  primero las producciones de este tipo S-->aS
	var le, cha, cad, idi, idd;
	while(true){
		cha=-1;
		for(var i=0; i<Producciones.length; i++)
			if(Producciones[i].der.length>1 && Producciones[i].izq=="S")
				if(Producciones[i].der.charAt(1)=='S'){
					cha=i;
					break;
				}
		if(cha==-1)
			break;
		var auxletra = SiguienteLetra(Letras, NoTerminales);
		Producciones[cha].der=Producciones[cha].der.charAt(0)+auxletra;
		NoTerminales.unshift(auxletra);
		ProAux=vaciar(Producciones);//vaciar
		for(var i=0; i<ProAux.length; i++)
			if(ProAux[i].izq=="S")
				Producciones.unshift({izq:auxletra, der:ProAux[i].der});
		//Producciones.orderByString('izq');
	}
	//////////////////////////////////////////////////
	limpiar();
	//Llenar valores en el formulario 1///////////////
	alert("Se elimino las producciones de este tipo: S->aS");
	cad=""; NoTerminales = vaciar(NoTerminales);
	for(var i=0; i<NoTerminales.length; i++){
		cad+=NoTerminales[i]+" ";
	}
	document.getElementById("1nntt").value=cad;
	cad=""; Terminales = vaciar(Terminales);
	for(var i=0; i<Terminales.length; i++){
		cad+=Terminales[i]+" ";
	}
	document.getElementById("1tt").value=cad;
	document.getElementById("1numpro").value=Producciones.length;
	Producciones = vaciar(Producciones);
	for(var i=0; i<Producciones.length; i++){
		idi = "1I"+(i+1);
		idd = "1D"+(i+1);
		document.getElementById(idi).value=Producciones[i].izq;
		document.getElementById(idd).value=Producciones[i].der;
	}
	/////////////////////////////////////////////////
	//Transformar Las producciones de este tipo A-->aS
	NoTerminales = vaciar(NoTerminales);
	Terminales = vaciar(Terminales);
	Producciones = vaciar(Producciones);
	while(true){
		cha=-1;
		for(var i=0; i<Producciones.length; i++)
			if(Producciones[i].der.length>1)
				if(Producciones[i].der.charAt(1)=='S'){
					cha=i;
					break;
				}
		if(cha==-1)
			break;
		var auxletra = SiguienteLetra(Letras, NoTerminales);
		Producciones[cha].der=Producciones[cha].der.charAt(0)+auxletra;
		NoTerminales.unshift(auxletra);
		var ProAux = vaciar(Producciones);
		for(var i=0; i<ProAux.length; i++)
			if(ProAux[i].izq=="S")
				Producciones.unshift({izq:auxletra, der:ProAux[i].der});
		//Producciones.orderByString('izq');
	}
	//////////////////////////////////////////////////
	//Llenar valores en el formulario 2///////////////
	alert("Se elimino las producciones de este tipo: A->aS");
	cad=""; NoTerminales = vaciar(NoTerminales);
	for(var i=0; i<NoTerminales.length; i++){
		cad+=NoTerminales[i]+" ";
	}
	document.getElementById("2nntt").value=cad;
	cad=""; Terminales = vaciar(Terminales);
	for(var i=0; i<Terminales.length; i++){
		cad+=Terminales[i]+" ";
	}
	document.getElementById("2tt").value=cad;
	document.getElementById("2numpro").value=Producciones.length;
	Producciones = vaciar(Producciones);
	for(var i=0; i<Producciones.length; i++){
		idi = "2I"+(i+1);
		idd = "2D"+(i+1);
		document.getElementById(idi).value=Producciones[i].izq;
		document.getElementById(idd).value=Producciones[i].der;
	}
	/////////////////////////////////////////////////
	//LUEGO DE ELIMINAR (S-->aS Y A-->as) DEBEMOS GENERAR LA GRLI
	//Primero generamos el grafo
	var Grafo = [];
	var Vis = [];
	var lambda = SiguienteLetra(Letras, NoTerminales);
	for(var i=0; i<Producciones.length; i++){
		if(visitado(Producciones[i].izq, Vis)==0){
			var nod = Producciones[i].izq;
			Vis.unshift(nod);
			var Aux = [];
			for(var j=0; j<Producciones.length; j++){
				if(Producciones[j].izq==nod){
					if(Producciones[j].der.length==2){
						var aux = {ter:Producciones[j].der.charAt(0), noter:Producciones[j].der.charAt(1)}
						Aux.unshift(aux);
					}else{
						var aux = {ter:Producciones[j].der.charAt(0), noter:lambda}
						Aux.unshift(aux);
					}
				}
			}
			Grafo.unshift({nodo:nod, cont:Aux});
		}
	}
	////Se termina de generar el grafo
	/*alert("Se armo el grafo");
	for(var i=0; i<Grafo.length; i++){
		var cadaux="";
		for(var j=0; j<Grafo[i].cont.length; j++){
			cadaux +=" "+Grafo[i].cont[j].ter+" "+Grafo[i].cont[j].noter;
		}
		//alert(Grafo[i].nodo+" "+cadaux);
	}*/
	////Se 'invierte el grafo' y se hallan las nuevas producciones
	var NuevasProducciones = [];
	for(var i=0; i<Grafo.length; i++){
		for(var j=0; j<Grafo[i].cont.length; j++){
			var proauxxx;
			if(Grafo[i].nodo=="S" && Grafo[i].cont[j].noter==lambda){
				proauxxx = { izq:"S", der:Grafo[i].cont[j].ter};
			}else{
				if(Grafo[i].cont[j].noter==lambda){
					proauxxx = { izq:"S", der:Grafo[i].nodo+Grafo[i].cont[j].ter};
				}else{
					if(Grafo[i].nodo=="S"){
						proauxxx = { izq:Grafo[i].cont[j].noter, der:Grafo[i].cont[j].ter};
					}else{
						proauxxx = { izq:Grafo[i].cont[j].noter, der:Grafo[i].nodo+Grafo[i].cont[j].ter};
					}
				}
			}
			NuevasProducciones.unshift(proauxxx);
		}
	}
	//////////////////////////////////////////////////
	// y por ultimo Llenar valores en el formulario 3///////////////
	alert("En la parte inferior se puede observar la gramática regular lineal izquierda equivalente a la gramatica introducida");
	cad="";
	for(var i=0; i<NoTerminales.length; i++){
		cad+=NoTerminales[i]+" ";
	}
	document.getElementById("3nntt").value=cad;
	cad="";
	for(var i=0; i<Terminales.length; i++){
		cad+=Terminales[i]+" ";
	}
	document.getElementById("3tt").value=cad;
	document.getElementById("3numpro").value=NuevasProducciones.length;
	NuevasProducciones = vaciar(NuevasProducciones);
	for(var i=0; i<NuevasProducciones.length; i++){
		idi = "3I"+(i+1);
		idd = "3D"+(i+1);
		document.getElementById(idi).value=NuevasProducciones[i].izq;
		document.getElementById(idd).value=NuevasProducciones[i].der;
	}
	/////////////////////////////////////////////////
}
function EsExpReg(expreg){
	var c=0;
	for(var i=0; i<expreg.length; i++){
		if((expreg[i].exp.length==1) || (expreg[i].exp.length==2 && expreg[i].exp.charAt(1)=='*') || ( expreg[i].exp.length==3 && (expreg[i].exp.charAt(1)=='+' || expreg[i].exp.charAt(1)=='.') ) ){
			c++;
		}
	}
	if(c==expreg.length)
		return true;
	return false;
}

function Convertir(cad){
	var LetrasMin = ["z","y","x","w","v","u","t","s","r","q","p","o","n","m","l","k","j","i","h","g","f","e","d","c","b","a"];
	var Alfabeto = [];
	for(var i=0; i<cad.length; i++){
		if(cad.charAt(i)>='a' && cad.charAt(i)<='z'){
			var auxx=0;
			for(var j=0; j<Alfabeto.length; j++){
				if(cad.charAt(i)==Alfabeto[j])
					auxx++;
			}
			if(auxx==0){
				Alfabeto.unshift(cad.charAt(i));
			}
		}
	}
	for(var i=0; i<Alfabeto.length; i++){
		alert(Alfabeto[i]);
	}
	var ini = SiguienteLetra(LetrasMin, Alfabeto);
	alert(ini);
	var expregulares = [{nom:ini, exp:cad}];
	alert("ini");
	var lol=0;
	//alert("es "+EsExpReg(expregulares));
	while(!EsExpReg(expregulares)){
		alert(lol);
		var bus="";
		for(var i=0; i<expregulares.length; i++){
			for(var j=0; j<expregulares[i].exp.length; j++){
				if(expregulares[i].exp.charAt(j)=='('){
					var c = 0;
					var cad="";
					for(var k=j+1; k<expregulares[i].exp.length; k++){
						if(expregulares[i].exp.charAt(k)==')' && c==0) break;
						if(expregulares[i].exp.charAt(k)=='(') c++;
						if(expregulares[i].exp.charAt(k)==')') c--;
						cad+=expregulares[i].exp.charAt(k);
					}
					var nomaux= SiguienteLetra();
					expregulares[i].exp.replace("("+cad+")", nomaux);
					expregulares.unshift({nom:nomaux, exp: cad});
					break;
				}

			}	
		}
		lol++;if(lol==3)break;
	}
	//unshift
	return expregulares;
}

function GuardarExp(){
	alert("asfas");
	var r1 = document.getElementById("expreg1").value;
	var r2 = document.getElementById("expreg2").value;
	var R1 = Convertir(r1);
	alert("len de R1 "+R1.length);
	for(var i=0; i< R1.length; i++){
		alert(R1[i].nom+":"+R1[i].exp);
	}
}