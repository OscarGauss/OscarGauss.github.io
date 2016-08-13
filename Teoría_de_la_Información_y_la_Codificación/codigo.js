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

function Split(text, SW){
	var A=text.split("\n");
	var R=new Array();
	for(var i=0; i<A.length; i++){
		var B=A[i].split(" ");
		for(var j=0; j<B.length; j++){
			B[j]=B[j].trim();
			if(B[j]!="")
				if(SW==1) R.push(eval(B[j]));
			else R.push(B[j]);
		}
	}
	return R;
}
function Proc_Fuente_M(form){
	var S=Split(document.getElementById(form+"S").value, 0);	
	var M=document.getElementById(form+"M").value;
	var auxP=Split(document.getElementById(form+"P").value, 1);
	var qm=Math.pow(S.length, M);
	//alert(S); alert(auxP); alert(qm);
	var P=new Array(qm);
	for(var i=0; i<qm; i++){
		P[i]=new Array(qm);
		for(var j=0; j<qm; j++){
			P[i][j]=auxP[(i*qm)+j];
		}
	}
	//alert("P:"+P+"::"+P[3][3]);
	var W0=new Array(qm);
	S.sort();
	return {S:S, m:M, P:P, W0:W0};
}

function Elev(Simbolos, N){
	var NewSimb=new Array();
	var NewSimbI=new Array();
	NewSimb.push("");
	var xd=new Array(); xd.push(-1);
	NewSimbI.push[0]=new Array(); NewSimbI[0]=xd;
	for(var i=0; i<N; i++){
		var Aux_S=new Array();
		var Aux_SI=new Array();
		for(var j=0; j<Simbolos.length; j++)
			for(var k=0; k<NewSimb.length; k++){
				Aux_S.push(Simbolos[j]+NewSimb[k]);
				var xd=JSON.parse(JSON.stringify(NewSimbI[k]));
				xd.unshift(j);
				Aux_SI[Aux_SI.length]=new Array();
				Aux_SI[Aux_SI.length-1]=xd;
			}
		NewSimb=Aux_S;
		NewSimbI=Aux_SI;
	}
	for(i=0; i<NewSimbI.length; i++) NewSimbI[i].pop();
	return {S:NewSimb, I:NewSimbI};
}
function Extención_Fuente_M(form1, form2){
	var Fuente_M=Proc_Fuente_M(form1);
	var n=document.getElementById(form1+"N").value;
	var S_N=Elev(Fuente_M.S, n);
	var alfas=JSON.parse(JSON.stringify(Elev(Fuente_M.S, Fuente_M.m)));
	var u=Math.ceil(Fuente_M.m/n);
	var Est_N=Elev(S_N.S, u);
	var M_N=new Array(Est_N.S.length);
	for(var i=0; i<Est_N.S.length; i++){
		M_N[i]=new Array(Est_N.S.length);
		for(var j=0; j<Est_N.S.length; j++)	M_N[i][j]=0.0;
	}
	for(var i=0; i<S_N.S.length; i++)
		for(var j=0; j<Est_N.S.length; j++){
			var xd=JSON.parse(JSON.stringify(Est_N.I[j])); xd.push(i);
			xd.shift();
			var cadxd="";
			for(var l=0; l<xd.length; l++) cadxd=cadxd+S_N.S[xd[l]];
			var h=new Array();
			var cnt=0;
			for(var k=Est_N.I[j].length-1; k>=0 && cnt<Fuente_M.m; k--){
				var aux=S_N.I[ Est_N.I[j][k] ];
				for(var l=aux.length-1; l>=0 && cnt<Fuente_M.m; l--){
					h.unshift(aux[l]);
					cnt++;
				}				
			}
			var auxp=1.0;
			var h1=JSON.parse(JSON.stringify(h));
			for(var k=0; k<S_N.I[i].length; k++){				
				h1.push(S_N.I[i][k]); h1.shift();
				var cadh="";
				for(var l=0; l<h.length; l++) cadh=cadh+Fuente_M.S[h[l]];
				var cadh1="";
				for(var l=0; l<h1.length; l++) cadh1=cadh1+Fuente_M.S[h1[l]];
				auxp=auxp*Fuente_M.P[ alfas.S.indexOf(cadh1) ][ alfas.S.indexOf(cadh) ];
				h=JSON.parse(JSON.stringify(h1));
			}
			M_N[ Est_N.S.indexOf(cadxd) ][j]=auxp.toFixed(5);
		}
	var V=new Array();
	for(var i=0; i<M_N.length; i++) V[i]=document.createElement("td");
	var TB=document.createElement("table");	
	var a1=document.createElement("tr");
	var b0=document.createElement("td");
	var atb0 = document.createAttribute("rowspan"); atb0.value="4"; b0.setAttributeNode(atb0);
	var atb1 = document.createAttribute("align"); atb1.value="center"; TB.setAttributeNode(atb1);
	a1.appendChild(b0);
	for(var i=0; i<M_N.length; i++){
		var q=document.createElement("sub"), r=document.createTextNode(i+1); q.appendChild(r);
		var q1=document.createElement("sub"), r1=document.createTextNode(i+1); q1.appendChild(r1);
		var b=document.createElement("td");
		b.appendChild(document.createTextNode("β")); b.appendChild(q); a1.appendChild(b);
		V[i].appendChild(document.createTextNode("β")); V[i].appendChild(q1); V[i].appendChild(document.createTextNode(" = ")); 
	}TB.appendChild(a1);
	var a2=document.createElement("tr");
	for(var i=0; i<M_N.length; i++){
		var b=document.createElement("td");
		for(var j=0; j<Est_N.I[i].length; j++){
			var q=document.createElement("sub"), r=document.createTextNode(Est_N.I[i][j]+1); q.appendChild(r);
			var q1=document.createElement("sub"), r1=document.createTextNode(Est_N.I[i][j]+1); q1.appendChild(r1);
			b.appendChild(document.createTextNode("σ")); b.appendChild(q);
			V[i].appendChild(document.createTextNode("σ")); V[i].appendChild(q1);
		}
		V[i].appendChild(document.createTextNode(" = "));
		a2.appendChild(b);		
	}TB.appendChild(a2);
	var a3=document.createElement("tr");
	for(var i=0; i<M_N.length; i++){
		var b=document.createElement("td");
		for(var j=0; j<Est_N.I[i].length; j++){
			for(var k=0; k<S_N.I[Est_N.I[i][j]].length; k++){				
				var q=document.createElement("sub"), r=document.createTextNode(S_N.I[Est_N.I[i][j]][k]+1); q.appendChild(r);
				var q1=document.createElement("sub"), r1=document.createTextNode(S_N.I[Est_N.I[i][j]][k]+1); q1.appendChild(r1);
				b.appendChild(document.createTextNode("s")); b.appendChild(q);
				V[i].appendChild(document.createTextNode("s")); V[i].appendChild(q1);
			}
		}
		V[i].appendChild(document.createTextNode(" = ")); 
		a3.appendChild(b);		
	}TB.appendChild(a3);
	var a4=document.createElement("tr");
	for(var i=0; i<M_N.length; i++){
		var b=document.createElement("td");
		b.appendChild(document.createTextNode(Est_N.S[i]));
		V[i].appendChild(document.createTextNode(Est_N.S[i]));
		a4.appendChild(b);		
	}TB.appendChild(a4);
	for(var i=0; i<M_N.length; i++){
		var a=document.createElement("tr");
		a.appendChild(V[i]);
		for(var j=0; j<M_N.length; j++){
			var b=document.createElement("td");
			b.appendChild(document.createTextNode(M_N[i][j]));
			a.appendChild(b);
		}
		TB.appendChild(a);
	}
	document.getElementById(form2+"S").value=S_N.S.join(" ");
	document.getElementById(form2+"M").value=u;
	Limpiar_Elements("tablaPrin", 0, "table")
	document.getElementById("tablaPrin").appendChild(TB);
	//alert("TERMINO");
}

function POW(b, e, mod){
	if(e==0) return 1;
	var aux=POW(b, Math.floor(e/2), mod);
	aux=(aux*aux)%mod;
	if((e%2)!=0) aux=(aux*b)%mod;
	return aux;
}

function Procesar_RSACifrar(texto, Pub, TextArea){
	var TextoASCCI=new Array();
	for(var i=0; i<texto.length; i++){
		TextoASCCI.push(texto.charCodeAt(i));
		TextoASCCI[i]=POWBI(BigInteger(TextoASCCI[i]), BigInteger(Pub.e), BigInteger(Pub.n)).toString();
	}
	TextArea.value=TextoASCCI.join("-");	
}

function Procesar_RSADeCifrar(texto, Pub, TextArea){
	var TextoCif=new Array();
	TextoCif=texto.split("-");
	for(var i=0; i<TextoCif.length; i++){
		TextoCif[i]=POWBI(BigInteger(TextoCif[i]), BigInteger(Pub.d), BigInteger(Pub.n)).toString();
		TextoCif[i]=String.fromCharCode(TextoCif[i]);
	}
	TextArea.value=TextoCif.join("");
}
function POWBI(b, e, mod){
	if(e.toString()=="0") return BigInteger("1");
	var aux=POWBI(b, e.divide("2"), mod);
	aux=(aux.multiply(aux)).remainder(mod);
	if(e.isOdd()) aux=aux.multiply(b).remainder(mod);
	return aux;
}

function NumRnd(n){
	var cad="";
	for(var i=0; i<n; i++){
		cad=cad+Math.floor((Math.random() * 10) + 1); 
	}
	return cad;
}

function MCD(num1, num2){
	var a=BigInteger();
	if(num1.subtract(num2).isNegative()){
		a=num2; num2=num1; num1=a;
	}
	while((num1.remainder(num2)).toString()!="0"){
		a=num1;
		num1=num2;
		num2=a.remainder(num2);
	}
	return num2;
}
function modmulinv(a, b){
	var b0=b, t, q;
	var x0=BigInteger("0"), x1=BigInteger("1");
	if(b.toString()=="1") return BigInteger("1");
	while(a.subtract("2").isPositive()){
		q=a.divide(b);
		t=b; b=a.remainder(b); a=t;
		t=x0; x0=x1.subtract(q.multiply(x0)); x1=t;
	}
	if(x1.isNegative()) x1=x1.add(b0);
	return x1;
}

function Procesar_RSAGEN(Textn, Texte, Textd, nd){
	/*var dl=modmulinv(BigInteger("91862383885"), BigInteger("100002").multiply("1000032")); */
	var p=NumRnd(nd);
	while(!EsPrimo(BigInteger(p))){	p=NumRnd(nd); } 
	var q=NumRnd(nd);
	while(!EsPrimo(BigInteger(q))) q=NumRnd(nd);
	//alert(p+" "+q);
	var n=BigInteger(p).multiply(q);
	var pe=(BigInteger(p).subtract("1")).multiply( BigInteger(q).subtract("1") );
	var e=NumRnd(pe.toString().length-1);
	while(MCD(BigInteger(e), pe).toString()!="1"){
		e=NumRnd(pe.toString().length-1);
	}
	var d=modmulinv(BigInteger(e), pe);
	if((BigInteger(e).multiply(d)).remainder(pe).toString()!="1") Procesar_RSAGEN(Textn, Texte, Textd, nd);
	Textn.value=n;
	Texte.value=e;
	Textd.value=d;
}
function EsPrimo(N){
	var primo=new Array(2,3,5,7,11,13,17,19,23,29,31,37);
	if(N.subtract("41").isNegative()){
		for(var i=0;i<12;++i)if(BigInteger(primo[i]).toString()==N.toString())return true;
		//alert("NO");
		return false;
	}
	if(N.isEven()) return false;		
	var s=0;
	var d=N.subtract("1");
	var N1=N.subtract("1");
	while( d.isEven() ){
		d=d.divide("2");
		s++;
	}
	//alert(s+" d: "+d.toString());
	var a=BigInteger(), u=BigInteger(), j=BigInteger();
	for(var i=0; i<=11; i++){
		a=BigInteger(primo[i]);
		u=POWBI(a, d, N);
		//alert("uu:"+u.toString());
		if(u.toString()!="1" && u.toString()!=N1.toString()){
			j=1;
			while(j<s && u.toString()!=N1.toString()){				
				u=(u.multiply(u)).remainder(N);
				//alert(a+" "+u.toString());
				if(u.toString()=="1") { return false;}
				j++;
			}
			//alert("igu? "+u.toString()+" "+N1.toString());
			if(u.toString()!=N1.toString()){//alert("iguales"+u.toString()+" "+N1.toString());
				return false; }
		}
	}
	return true;
}
