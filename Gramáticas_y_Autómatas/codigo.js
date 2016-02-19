function crear_tabla_gram(nom){
	var n = document.getElementById(nom+"np").value;
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

function crear_tabla_afd(nom){	
	var estados = document.getElementById(nom+"es").value.trim().split(" ");
	var alfabeto = document.getElementById(nom+"al").value.trim().split(" ");
	var n=document.getElementById(nom+"nrt").value;
    for(var i=0; i<n; i++)
		document.getElementById(nom).removeChild(document.getElementById(nom).getElementsByTagName('p')[10]);
	n=estados.length*alfabeto.length;
	document.getElementById(nom+"nrt").value=n;
    for(var i=1; i<=n; i++){
		var pp= document.createElement("p");
		var ip1=document.createElement("input");
		var at11 = document.createAttribute("type"); at11.value="text"; ip1.setAttributeNode(at11);
		var at12 = document.createAttribute("name"); at12.value=nom+"Ini"; ip1.setAttributeNode(at12);
		var at13 = document.createAttribute("maxlength"); at13.value="2"; ip1.setAttributeNode(at13);
		var at14 = document.createAttribute("size"); at14.value="4"; ip1.setAttributeNode(at14);
		var at15 = document.createAttribute("id"); at15.value=nom+"Ini"+i; ip1.setAttributeNode(at15);
		var ip2=document.createElement("input");
		var at21 = document.createAttribute("type"); at21.value="text"; ip2.setAttributeNode(at21);
		var at22 = document.createAttribute("name"); at22.value=nom+"Des"; ip2.setAttributeNode(at22);
		var at23 = document.createAttribute("maxlength"); at23.value="2"; ip2.setAttributeNode(at23);
		var at24 = document.createAttribute("size"); at24.value="4"; ip2.setAttributeNode(at24);
        var at25 = document.createAttribute("id"); at25.value=nom+"Des"+i; ip2.setAttributeNode(at25);
		var ip3=document.createElement("input");
		var at31 = document.createAttribute("type"); at31.value="text"; ip3.setAttributeNode(at31);
		var at32 = document.createAttribute("name"); at32.value=nom+"Eti"; ip3.setAttributeNode(at32);
		var at33 = document.createAttribute("maxlength"); at33.value="2"; ip3.setAttributeNode(at33);
		var at34 = document.createAttribute("size"); at34.value="4"; ip3.setAttributeNode(at34);
        var at35 = document.createAttribute("id"); at35.value=nom+"Eti"+i; ip3.setAttributeNode(at35);
		var td = document.createTextNode("δ(");       // Create a text node
		var tc = document.createTextNode(",");       // Create a text node
		var ti = document.createTextNode(")=");       // Create a text node
		pp.appendChild(td); pp.appendChild(ip1);
		pp.appendChild(tc); pp.appendChild(ip3);
		pp.appendChild(ti); pp.appendChild(ip2);
		document.getElementById(nom).appendChild(pp);
    }
}

function limpiar_gram(nom){
	document.getElementById(nom+"nt").value="";
    document.getElementById(nom+"t").value="";
    var n=document.getElementById(nom+"np").value;
    document.getElementById(nom+"np").value="";
    for(var i=0; i<n; i++)
		document.getElementById(nom).removeChild(document.getElementById(nom).getElementsByTagName('p')[7]);
}

function limpiar_aut(nom){
	document.getElementById(nom+"es").value="";
	document.getElementById(nom+"al").value="";
    document.getElementById(nom+"ef").value="";
    var n=document.getElementById(nom+"nrt").value;
    document.getElementById(nom+"nrt").value="";
    for(var i=0; i<n; i++)
		document.getElementById(nom).removeChild(document.getElementById(nom).getElementsByTagName('p')[10]);
}

function is_in(Arr, val){
	for(var i=0; i<Arr.length; i++) if(Arr[i]==val) return true;
	return false;
}

function siguiente_letra_M(Existentes){
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
function siguiente_letra_m(Existentes){
	var letras = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
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
    var terminales = document.getElementById(form+"t").value.trim().split(" ");
    var noterminales = document.getElementById(form+"nt").value.trim().split(" ");
    return {N:noterminales, T:terminales, P:producciones, S:"S"};
}

function guardar_automata(form){
	var estados = document.getElementById(form+"es").value.trim().split(" ");
	var alfabeto = document.getElementById(form+"al").value.trim().split(" ");
	var estfin = document.getElementById(form+"ef").value.trim().split(" ");
	var regtran = [];
	var inicios = document.getElementsByName(form+"Ini");	
	var etiquetas = document.getElementsByName(form+"Eti");	
	var destinos = document.getElementsByName(form+"Des");
	for(var i=0; i<document.getElementById(form+"nrt").value; i++){
		regtran.push({ini:inicios[i].value, eti:etiquetas[i].value, des:destinos[i].value});
	}
	return {K:estados, S:alfabeto, F:estfin, T:regtran, I:"q1"};
}

function mostrar_gramatica(gram, form){ //escribe la gramatica gram en form
	limpiar_gram(form);
    document.getElementById(form+"nt").value=gram.N.join(" "); //join convierte array a cadena
    document.getElementById(form+"t").value=gram.T.join(" ");
    document.getElementById(form+"np").value=gram.P.length;
    crear_tabla_gram(form);
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
	if(!is_in(Gram.N, "S")) return false;
	return true;
}

function is_afd(Aut){
	var cntt=0;
	for(var i=0; i<Aut.K.length; i++) 
		for(var j=0; j<Aut.S.length; j++){ // determinismo
			var cnt=0;
			for(var k=0; k<Aut.T.length; k++)
				if(Aut.K[i]==Aut.T[k].ini && Aut.S[j]==Aut.T[k].eti){
					cnt++;
					if(!is_in(Aut.K, Aut.T[k].des)) return false;
				}
			if(cnt==1) cntt++;
		}
	for(var i=0; i<Aut.F.length; i++)
		if(!is_in(Aut.K, Aut.F[i])) return false;
	if(!is_in(Aut.K, "q1")) return false;
	if(cntt==Aut.K.length*Aut.S.length) return true;
	return false;
}

function is_procesar_grld_eli_s_der(Gram){
	for(var i=0; i<Gram.P.length; i++) if(Gram.P[i].der.charAt(1)=="S") return true;
	return false;
}

function procesar_grld_eli_s_der(form1, form2){
	var Gram = guardar_gramatica(form1);
	if(!is_grld(Gram)){ alert("No es una gramatica válida"); return ; }
	if(!is_procesar_grld_eli_s_der(Gram)){ alert("No es necesario convertir la gramática"); return ; }
	
    var Sprima=siguiente_letra_M(Gram.N); Gram.N.push(Sprima);
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
	var Gram = guardar_gramatica(form1);
	if(!is_grld(Gram)){ alert("No es una gramatica válida"); return ; }
	if(is_procesar_grld_eli_s_der(Gram)){ alert("Primero se debe eliminar las producciones cuyo simbolo raíz no aparezca en ninguna parte derecha de las producciones"); return ; }
	//Primero generamos el grafo
	var Grafo = [], Vis = [];
	var lambda = siguiente_letra_M(Gram.N);
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
	// Se 'invierte el grafo' y se hallan las nuevas producciones
	var NuevasProducciones = [];
	for(var i=0; i<Grafo.length; i++)
		for(var j=0; j<Grafo[i].edges.length; j++){
			var aux;
			if(Grafo[i].nodo=="S" && Grafo[i].edges[j].noter==lambda)
				aux = { izq:"S", der:Grafo[i].edges[j].ter};
			else
				if(Grafo[i].edges[j].noter==lambda)
					aux = { izq:"S", der:Grafo[i].nodo+Grafo[i].edges[j].ter};
				else
					if(Grafo[i].nodo=="S")
						aux = { izq:Grafo[i].edges[j].noter, der:Grafo[i].edges[j].ter};
					else
						aux = { izq:Grafo[i].edges[j].noter, der:Grafo[i].nodo+Grafo[i].edges[j].ter};
			NuevasProducciones.push(aux);
		}
	alert("Proceso hecho");
	Gram.P=NuevasProducciones;
	mostrar_gramatica(Gram, form2);
}

function procesar_grld_de_afd(form1, form2){
	var Aut=guardar_automata(form1);
	if(!is_afd(Aut)){ alert("Automata Finito Deterministico NO valido"); return ;}
	procesar_dibujar(form1);
	var noterminales = [];
	for(var i=0; i<Aut.K.length; i++){
		if(Aut.K[i]=="q1"){
			noterminales.push("S");
			continue;
		}
		var aux=siguiente_letra_M(noterminales);
		noterminales.push(aux);
	}
	var producciones = [];
	for(var i=0; i<Aut.T.length; i++){ // pushear las transiciones
		var auxi="", j, auxd=Aut.T[i].eti;
		for(j=0; j<Aut.K.length; j++) if(Aut.K[j]==Aut.T[i].ini) break;
		auxi=noterminales[j];		
		for(j=0; j<Aut.K.length; j++) if(Aut.K[j]==Aut.T[i].des) break;
		auxd+=noterminales[j];
		producciones.push({izq:auxi, der:auxd});
	}
	for(var i=0; i<Aut.T.length; i++) // pushear las transiciones noterminales
		if(is_in(Aut.F, Aut.T[i].des)){
			var j;
			for(j=0; j<Aut.K.length; j++) if(Aut.K[j]==Aut.T[i].ini) break;
			producciones.push({izq:noterminales[j], der:Aut.T[i].eti});
		}
	for(var i=0; i<producciones.length; i++){//////////////////////revisar esto
		alert(producciones[i].izq+" -> "+producciones[i].der);
	}
	mostrar_gramatica({N:noterminales, T:Aut.S, P:producciones, S:"S"}, form2);
	alert("Conversión lograda con exito");
}

/************************************************Para graficar********************/
function mostrar_data(aut){
	var data="";
	data+="digraph { node[shape=circle fontSize=16]; edge[color=black, fontColor=black];"; //length=300,
	for(var i=0; i<aut.T.length; i++)
		data+=aut.T[i].ini+" -> "+aut.T[i].des+"[label=\""+aut.T[i].eti+"\"];";
	for(var i=0; i<aut.F.length; i++)
		data+=aut.F[i]+" [shape=circle2 fontSize=16];";
	data+="}"
	document.getElementById("data").value=data;
}

function simp_aut(aut){
	var vis=[], Transiciones=[];
	var aux;
	for(var i=0; i<aut.T.length; i++)
		if(!is_in(vis, aut.T[i].ini+aut.T[i].des+"")){
			vis.push(aut.T[i].ini+aut.T[i].des+"");
			aux=""+aut.T[i].eti;
			for(var j=i+1; j<aut.T.length; j++)
				if(aut.T[i].ini==aut.T[j].ini && aut.T[i].des==aut.T[j].des)
					aux+="/"+aut.T[j].eti;
			Transiciones.push({ini:aut.T[i].ini, eti:aux, des:aut.T[i].des});
		}
	aut.T=Transiciones;
	return aut;
}
var network = null;
var data = null;

function destroy() {
	if (network !== null) {
		network.destroy();
		network = null;
	}
}

function procesar_dibujar(form){
	var A = guardar_automata(form);
	mostrar_data(simp_aut(A));
	window.onresize = function () {
		network.redraw()
	};
	var txtData = document.getElementById('data');
	var txtError = document.getElementById('error');
	destroy();
	try {
		txtError.innerHTML = '';
		// Provide a string with data in DOT language
		data = {
			dot: txtData.value
		};
		// create a network
		var container = document.getElementById('mynetwork');
		var options = {};
		network = new vis.Network(container, data, options);
	}
	catch (err) {
		// set the cursor at the position where the error occurred
		var match = /\(char (.*)\)/.exec(err);
		if (match) {
			var pos = Number(match[1]);
			if(txtData.setSelectionRange) {
				txtData.focus();
				txtData.setSelectionRange(pos, pos);
			}
		}
		// show an error message
		txtError.innerHTML =  err.toString();
	}

}
/********************************** FIN para graficar ************************/

