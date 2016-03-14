function Limpiar_Elements(id, N, element){
	var aux=document.getElementById(id).getElementsByTagName(element);
	for(var i=aux.length-1; i>=N; i--)		
		document.getElementById(id).removeChild(aux[i]);	
}
function Leer(area){
	var CodeWords=document.getElementById(area).value.trim().split("\n");	
	for(var i=0; i<CodeWords.length; i++) CodeWords[i]=CodeWords[i].trim();
	for(var i=0; i<CodeWords.length; i++)
		if(CodeWords[i]==""){
			CodeWords.splice(i, 1); i--;
		}
	return CodeWords;
}

function IsBloque(C){	
	for(var i=1; i<C.length; i++)
		if(C[i].length!=C[0].length) return false;
	return true;
}

function IsSingular(C){
	for(var i=0; i<C.length; i++)
		if(C.indexOf(C[i])!=C.lastIndexOf(C[i])) return true;
	return false;
}

function LibrePrefijos(C){
	for(var i=0; i<C.length; i++)
		for(var j=i+1; j<C.length; j++){
			var k=0;
			for(k=0; k<Math.min(C[i].length, C[j].length); k++)
				if(C[i].charAt(k)!=C[j].charAt(k)) break;
			if(k==Math.min(C[i].length, C[j].length)) return false;
		}
	return true;
}
function Sufijos(cad){
	var ans="", V = new Array();
	for(var i=cad.length-1; i>=0; i--){
		ans=(cad.charAt(i)).concat(ans);
		V.push(ans);
	}
	return V;
}
function Edge1(a, b, Cads, N){
	var cad=Cads[a].concat(Cads[b]);
	if(Cads.indexOf(cad)==-1) return false;
	if(Cads.indexOf(cad)<N) return true;
	return false;
}
function Edge2(a, b, Cads, N){
	for(var i=0; i<N; i++){
		var cad=Cads[i].concat(Cads[b]);
		if(cad==Cads[a]) return true;
	}
	return false;
}
function CadenaAmbigua(C){
	if(IsSingular(C))
		for(var i=0; i<C.length; i++)
			if(C.indexOf(C[i])!=C.lastIndexOf(C[i])) return C[i];
	var N=C.length;
	var Cadenas=C;
	for(var i=0; i<N; i++){
		var Suf=Sufijos(C[i]);
		for(var j=0; j<Suf.length; j++)
			if(Cadenas.indexOf(Suf[j])==-1) Cadenas.push(Suf[j]);
	}	
	var G=new Array(), P=new Array(), Vis=new Array();
	for(var i=0; i<Cadenas.length; i++){
		G[i]=new Array();
		P[i]=-1;
		Vis[i]=0;
	}
	for(var i=0; i<Cadenas.length; i++)
		for(var j=0; j<Cadenas.length; j++){
			if(i==j) continue;
			if(Edge1(i, j, Cadenas, N))	G[i].push({to:j, type:1});
			if(Edge2(i, j, Cadenas, N)) G[i].push({to:j, type:2});
		}//Terminno de Armar
	var Q=new Array();
	for(var i=0; i<N; i++){
		Q.push(i); P[i]=-1; Vis[i]=1;
	}
	var U=-1;
	while(Q.length>0){
		var u=Q[0]; Q.shift();
		for(var i=0; i<G[u].length; i++){
			var v=G[u][i].to, type=G[u][i].type;
			if(v<N){
				P[v]={from:u, type:type};
				U=v;
				break;
			}
			if(Vis[v]==0){
				Q.push(v);
				Vis[v]=1;
				P[v]={from:u, type:type};;
			}
		}
		if(U!=-1) break;
	}
	if(U==-1) return "";
	var cadans=Cadenas[U];
	var lol=0;
	while(P[U]!=-1){
		if(lol++>100) break;
		u=P[U].from;
		v=U;
		t=P[U].type;
		var cc;
		if(t==1){
			cc=Cadenas[u].concat(Cadenas[v]);
			cadans=Cadenas[u].concat(cadans);
		}
		if(t==2){
			cc=Cadenas[u].substr(0, Cadenas[u].length-Cadenas[v].length);
			cadans=cc.concat(cadans);
		}
		P[U]=-1;
		U=u;
	}
	return cadans;
}
var Aux=new Array(), Cads=new Array();
var CadenaG;
function Gen(cad, I){
	if(I==CadenaG.length) Cads.push(cad);
	for(var i=0; i<Aux[I].length; i++)
		Gen(cad.concat("  ,  ").concat(CadenaG.substr(I, Aux[I][i])),I+Aux[I][i]);
}
function Decodificar(Cadena, Codigo){
	CadenaG=Cadena;
	var N=Cadena.length;
	for(var i=0; i<N; i++) Aux[i]=-1;
	Aux[N]=new Array();
	for(var i=N-1; i>=0; i--)
		for(var j=i, ans=""; j<N; j++){
			ans=ans.concat(Cadena.charAt(j));
			if(Codigo.indexOf(ans)!=-1)
				if(Aux[j+1]!=-1){
					if(Aux[i]==-1) Aux[i]=new Array();
					Aux[i].push(ans.length);
				}
		}
	for(var i=0; i<Aux[0].length; i++)
		Gen(CadenaG.substr(0, Aux[0][i]),Aux[0][i]);
}
function Procesar_Codigo_UD(area, formR){
	Cads=new Array();
	Limpiar_Elements(formR, 0, "p");
	var CodeWords=Leer(area);
	var pp1=document.createElement("p"); //bolque
	var pp2=document.createElement("p"); //singular
	var pp3=document.createElement("p"); //libre de prefijos
	var pp4=document.createElement("p"); //ud
	var pp5=document.createElement("p"); //ca
	if(IsBloque(CodeWords)) pp1.appendChild(document.createTextNode("El Código es Bloque"));
	else pp1.appendChild(document.createTextNode("El Código NO es Bloque"));
	if(IsSingular(CodeWords)) pp2.appendChild(document.createTextNode("El Código es Singular"));
	else pp2.appendChild(document.createTextNode("El Código NO es Singular"));
	if(LibrePrefijos(CodeWords)) pp3.appendChild(document.createTextNode("El Código es Libre de Prefijos"));
	else pp3.appendChild(document.createTextNode("El Código NO es Libre de Prefijos"));		
	var CadAmb=CadenaAmbigua(CodeWords);
	if(CadAmb=="") pp4.appendChild(document.createTextNode("El Código es Unívocamente Decodificable"));
	else{		
		pp4.appendChild(document.createTextNode("El Código NO es Unívocamente Decodificable"));
		pp5.appendChild(document.createTextNode("Una cadena ambigua es : "+CadAmb));
	}
	document.getElementById(formR).appendChild(pp1);	
	document.getElementById(formR).appendChild(pp2);
	document.getElementById(formR).appendChild(pp3);
	document.getElementById(formR).appendChild(pp4);	
	document.getElementById(formR).appendChild(pp5);
	if(!IsSingular(Leer(area))){
		var Dec=Decodificar(CadAmb, Leer(area));
		for(var i=0; i<Cads.length; i++){
			var pp=document.createElement("p");
			pp.appendChild(document.createTextNode("Decodificacion #"+(i+1)+": "+Cads[i]));
			document.getElementById(formR).appendChild(pp);
		}
	}
	
}
///////////////////

function Huffman(Fuente_S, r){
	var plus=(Math.ceil((Fuente_S.S.length-r)/(r-1))*(r-1))+r*1-Fuente_S.S.length; //agregar
	for(var i=0; i<plus; i++){
		Fuente_S.S.push("*"); Fuente_S.P.push(0.0);
	}
	var Tri=new Array();
	for(var i=0; i<Fuente_S.S.length; i++) Tri.push({pi:Fuente_S.P[i], id:i, union:-1, wi:""});
	Tri.sort(function(a, b){return -a.pi+b.pi});
	var Aux=new Array();
	var reduc=(Fuente_S.S.length-r)/(r-1);
	for(var i=0; i<=reduc; i++) Aux[i]=new Array();	
	for(var i=0; i<Tri.length; i++) Aux[0].push(JSON.parse(JSON.stringify(Tri[i])));
	for(var i=0; i<reduc; i++){
		var aux=new Array();
		for(var j=0; j<Aux[i].length; j++) aux.push(JSON.parse(JSON.stringify(Aux[i][j])));
		var sum=0.0;		
		for(var j=1; j<=r; j++) sum+=aux[aux.length-j].pi;
		for(var j=0; j<r; j++)	aux.pop();
		for(var j=0; j<aux.length; j++) aux[j].union=-1;
		aux.push({pi:sum, id:aux.length, union:1, wi:""});
		aux.sort(function(a, b){return -a.pi+b.pi});
		for(var j=0; j<aux.length; j++) Aux[i+1].push(JSON.parse(JSON.stringify(aux[j])));
	}
	for(var i=0; i<r; i++) Aux[reduc][i].wi=""+i; // caso base q==r
	for(var i=reduc; i>0; i--){
		var J=-1;		
		for(var j=0; j<Aux[i].length && J==-1; j++) if(Aux[i][j].union==1) J=j;
		var l=0;
		for(var j=0; j<Aux[i].length; j++){
			if(j==J) continue;
			Aux[i-1][l].wi=Aux[i][j].wi;
			l++;
		}
		for(var j=Aux[i-1].length-r, l=0; l<r; j++, l++) Aux[i-1][j].wi=((Aux[i][J].wi).concat(""+l));
	}
	var Cod=new Array(); for(var i=0; i<Cod; i++) Cod[i].push("");
	for(var j=0; j<Aux[0].length; j++) Cod[Aux[0][j].id]=Aux[0][j].wi;
	for(var j=0; j<plus; j++) Cod.pop();
	return Cod;
}

function Proc_Fuente_S(texto){
	var S=new Array();
	var C=new Array();
	for(var i=0; i<texto.length; i++){
		var j=S.indexOf(texto.charAt(i));
		if(j==-1){
			S.push(texto.charAt(i));
			C.push(1);
		}else
			C[j]++;
	}
	for(var i=0; i<S.length; i++)
		C[i]=C[i]/texto.length;
	return {S:S, P:C};
}
function Procesar_Huffman(texto, textid, textid2, r){
	var Fuente_S=Proc_Fuente_S(texto);
	var Cod=Huffman(Fuente_S, r);
	var Cad="S_i    \t    P_i             \t   W_i\n";
	for(var i=0; i<Cod.length; i++){
		Cad=Cad.concat(Fuente_S.S[i]+" \t "+Fuente_S.P[i]+" \t "+Cod[i]+"\n");
	}
	document.getElementById(textid).value=Cad;
	var mensaje="";
	for(var i=0; i<texto.length; i++){
		mensaje=mensaje.concat(Cod[ (Fuente_S.S).indexOf(texto.charAt(i)) ]);
	}
	document.getElementById(textid2).value=mensaje;
}

function Procesar_Codificacion_Aritmetica(texto, textid, textid2){
	var Fuente_S=Proc_Fuente_S(texto);
	//alert(Fuente_S.S+" "+Fuente_S.P);
	var Cad="S_i    \t    P_i\n";
	for(var i=0; i<Fuente_S.S.length; i++){
		Cad=Cad.concat(Fuente_S.S[i]+" \t "+Fuente_S.P[i]+"\n");
	}
	document.getElementById(textid).value=Cad;
	var Acum=new Array();
	Acum[0]=0.0;
	for(var i=1; i<=Fuente_S.S.length; i++){
		Acum[i]=Acum[i-1]+Fuente_S.P[i-1];
	}
	var j=0;
	var I=0.0, D=1.0, L=1.0;
	for(j=0; j<texto.length; j++){
		var idx=Fuente_S.S.indexOf(texto.charAt(j))+1;
		D=I+L*Acum[idx];
		L=L*Fuente_S.P[idx-1];
		I=D-L;
		//alert(texto.charAt(j)+" "+I+" "+ D);
	}
	document.getElementById(textid2).value="["+I+" , "+D+"[\nY decir que pare en el "+texto.length+" simbolo decodificado";
}
