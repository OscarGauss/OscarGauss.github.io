function crear_tabla(n, nom){
    for(var i=1; i<=n; i++){
	var pp= document.createElement("p");
	var ip1=document.createElement("input");
	var at11 = document.createAttribute("type"); at11.value="text"; ip1.setAttributeNode(at11);
	var at12 = document.createAttribute("name"); at12.value=nom+"I"; ip1.setAttributeNode(at12);
	var at13 = document.createAttribute("maxlength"); at13.value="1"; ip1.setAttributeNode(at13);
	var at14 = document.createAttribute("size"); at14.value="4"; ip1.setAttributeNode(at14);
	var at15 = document.createAttribute("id"); at15.value=nom+"I"+i; ip1.setAttributeNode(at15);
	var ip2=document.createElement("input");
	var at21 = document.createAttribute("type"); at21.value="text"; ip2.setAttributeNode(at21);
	var at22 = document.createAttribute("name"); at22.value=nom+"D"; ip2.setAttributeNode(at22);
	var at23 = document.createAttribute("maxlength"); at23.value="2"; ip2.setAttributeNode(at23);
	var at24 = document.createAttribute("size"); at24.value="4"; ip2.setAttributeNode(at24);
        var at25 = document.createAttribute("id"); at25.value=nom+"D"+i; ip2.setAttributeNode(at25);
	var t = document.createTextNode("→");       // Create a text node
	pp.appendChild(ip1); pp.appendChild(t); pp.appendChild(ip2);
	document.getElementById(nom).appendChild(pp);
    }
}

function limpiar_reload(form1, form2){
	document.getElementById(form1+"nt").value=""; //join convierte array a cadena
    document.getElementById(form1+"t").value="";
    document.getElementById(form1+"np").value="";
	document.getElementById(form2+"nt").value=""; //join convierte array a cadena
    document.getElementById(form2+"t").value="";
    document.getElementById(form2+"np").value="";
	location.reload();
}

function is_in(Arr, val){ //visitado
	for(var i=0; i<Arr.length; i++) if(Arr[i]==val) return true;
	return false;
}

function vaciar(Producciones){ //reverse
	var ProAux = [];
	for(var i=0; i<Producciones.length; i++) ProAux.unshift(Producciones[i]);
	return ProAux;
}

function siguiente_letra(Existentes){
    var Letras = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    var le=0;
    for(le=0; le<Letras.length; le++){
		var c=0;
		for(var j=0; j<Existentes.length; j++)
            if(Existentes[j]==Letras[le])
                c++;
		if(c==0)
            break;
    }
    return Letras[le];
}

function guardar_gramatica(form){
    var produccionesI = document.getElementsByName(form+"I");
    var produccionesD = document.getElementsByName(form+"D");
    var producciones = [];
    for(var i=0; i<((document.getElementById(form+"np")).value); i++)
		producciones.push({izq:produccionesI[i].value, der:produccionesD[i].value});
    var terminales = document.getElementById(form+"t").value.split(" ");
    var noterminales = document.getElementById(form+"nt").value.split(" ");
    return {N:noterminales, T:terminales, P:producciones, S:"S"};
}

function mostrar_gramatica(gram, form){ //escribe la gramatica gram en form
    document.getElementById(form+"nt").value=gram.N.join(" "); //join convierte array a cadena
    document.getElementById(form+"t").value=gram.T.join(" ");
    document.getElementById(form+"np").value=gram.P.length;
    crear_tabla(gram.P.length, form);
    for(var i=0; i<gram.P.length; i++){
		document.getElementById(form+"I"+(i+1)).value=gram.P[i].izq;
		document.getElementById(form+"D"+(i+1)).value=gram.P[i].der;
    }
}

function is_grld(Gram){//S->aS, S->a
	for(var i=0; i<Gram.P.length; i++){
		if(!is_in(Gram.N, Gram.P[i].izq)) return false;
		if(!is_in(Gram.T, Gram.P[i].der.charAt(0))) return false;
		if(Gram.P[i].der.length==2 && !is_in(Gram.N, Gram.P[i].der.charAt(1))) return false;
	}
	return true;
}

function is_procesar_grld_eli_s_der(Gram){
	for(var i=0; i<Gram.P.length; i++) if(Gram.P[i].der.charAt(1)=="S") return true;
	return false;
}

function procesar_grld_eli_s_der(form1, form2){
	var Gram = guardar_gramatica(form1);
	if(!is_grld(Gram)){ alert("No es una gramatica válida"); return ; }
	if(!is_procesar_grld_eli_s_der(Gram)){ alert("No es necesario convertir la gramática"); return ; }
	
    var Sprima=siguiente_letra(Gram.N); Gram.N.push(Sprima);
    for(var i=0; i<Gram.P.length; i++){
        Gram.P[i].der=Gram.P[i].der.replace("S", Sprima); Gram.P[i].der=Gram.P[i].der.replace("S", Sprima); // ojo n necesario si es GRLD
        Gram.P[i].izq=Gram.P[i].izq.replace("S", Sprima);
    }
    for(var i=0; i<Gram.P.length; i++){
        if(Gram.P[i].izq==Sprima){
            Gram.P.unshift({izq:"S", der:Gram.P[i].der});
            i++;
        }
    }
//    alert("Proceso hecho")
    mostrar_gramatica(Gram, form2);
    return Gram;
}

function procesar_grli_de_grld(form1, form2){
	alert("Procesar_grli_de_grld");
	var Gram = guardar_gramatica(form1);
	if(!is_grld(Gram)){ alert("No es una gramatica válida"); return ; }
	if(is_procesar_grld_eli_s_der(Gram)){ alert("Primero se debe eliminar las producciones cuyo simbolo raíz no aparezca en ninguna parte derecha de las producciones"); return ; }
	//Primero generamos el grafo
	var Grafo = [], Vis = [];
	var lambda = siguiente_letra(Gram.N);
	for(var i=0; i<Gram.P.length; i++)
		if(!is_in(Vis, Gram.P[i].izq)){
			var nod = Gram.P[i].izq;
			Vis.push(nod);
			var Aux = [];
			for(var j=0; j<Gram.P.length; j++)
				if(Gram.P[j].izq==nod){
					if(Gram.P[j].der.length==1) Gram.P[j].der+=lambda;
					Aux.push( {ter:Gram.P[j].der.charAt(0), noter:Gram.P[j].der.charAt(1)} );
				}
			Grafo.unshift({nodo:nod, edges:Aux}); //nod = edges
		}
	alert("Se armo el grafo");
	// Se 'invierte el grafo' y se hallan las nuevas producciones
	var NuevasProducciones = [];
	for(var i=0; i<Grafo.length; i++){
		for(var j=0; j<Grafo[i].edges.length; j++){
			var aux;
			if(Grafo[i].nodo=="S" && Grafo[i].edges[j].noter==lambda){
				aux = { izq:"S", der:Grafo[i].edges[j].ter};
			}else{
				if(Grafo[i].edges[j].noter==lambda){
					aux = { izq:"S", der:Grafo[i].nodo+Grafo[i].edges[j].ter};
				}else{
					if(Grafo[i].nodo=="S"){
						aux = { izq:Grafo[i].edges[j].noter, der:Grafo[i].edges[j].ter};
					}else{
						aux = { izq:Grafo[i].edges[j].noter, der:Grafo[i].nodo+Grafo[i].edges[j].ter};
					}
				}
			}
			NuevasProducciones.push(aux);
		}
	}
	//////////////////////////////////////////////////
	// y por ultimo Llenar valores en el formulario 3///////////////
	alert("Proceso echo");
	Gram.P=NuevasProducciones;
	mostrar_gramatica(Gram, form2);
	/*cad="";
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
	*/
	/////////////////////////////////////////////////
}
