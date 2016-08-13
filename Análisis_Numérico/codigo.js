function Limpiar_Elements(id, N, element){
	var aux=document.getElementById(id).getElementsByTagName(element);
	for(var i=aux.length-1; i>=N; i--){		
		document.getElementById(id).removeChild(aux[i]);
	}
	
}
function ProcesarMaquina(){
	var expo=parseInt(document.getElementById("exp").value);
	var mant=parseInt(document.getElementById("man").value);
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
	Limpiar_Elements('contenido', 1, 'table');
	var tabla=document.createElement("table");
	var at0=document.createAttribute("width"); at0.value="90%"; tabla.setAttributeNode(at0);
	var at1=document.createAttribute("align"); at1.value="center"; tabla.setAttributeNode(at1);
	var tr1=document.createElement("tr");
	var td11=document.createElement("td"); td11.appendChild(document.createTextNode("signo"));
	tr1.appendChild(td11);	
	var td12=document.createElement("td"); td12.appendChild(document.createTextNode("exponente"));
	var at12=document.createAttribute("colspan"); at12.value=expo+1; td12.setAttributeNode(at12);
	tr1.appendChild(td12);	
	var td13=document.createElement("td"); td13.appendChild(document.createTextNode("matisa"));
	var at13=document.createAttribute("colspan"); at13.value=mant; td13.setAttributeNode(at13);
	tr1.appendChild(td13);
	var tr2=document.createElement("tr");
	var td21=document.createElement("td"); td21.appendChild(document.createTextNode(" 0 "));
	var at21=document.createAttribute("class"); at21.value="rojo"; td21.setAttributeNode(at21);
	tr2.appendChild(td21);
	var td22=document.createElement("td"); td22.appendChild(document.createTextNode(" 0 "));
	var at22=document.createAttribute("class"); at22.value="rojo"; td22.setAttributeNode(at22);
	tr2.appendChild(td22);
	for(var i=0; i<expo; i++){
		var tdaux=document.createElement("td");
		tdaux.appendChild(document.createTextNode(" 1 "));
		tr2.appendChild(tdaux);
	}
	for(var i=0; i<mant; i++){
		var tdaux=document.createElement("td");
		tdaux.appendChild(document.createTextNode(" 1 "));
		tr2.appendChild(tdaux);
	}
	var tr3=document.createElement("tr");
	for(var i=1; i<mant+expo+3; i++){
		var tdaux=document.createElement("td");
		tdaux.appendChild(document.createTextNode(i));
		tr3.appendChild(tdaux);
	}
	tabla.appendChild(tr1);
	tabla.appendChild(tr2);
	tabla.appendChild(tr3);
	var con=document.getElementById("contenido");
	con.appendChild(tabla);
}

function Atribute(type, val){
	var at12 = document.createAttribute(type);
	at12.value=val;
	return at12;
}
function crear_tabla_funcion(form){
	Limpiar_Elements(form, 2, 'p');
	var grado=document.getElementById("grado").value;
	var pp= document.createElement("p");
	
	var f=document.createTextNode("f ( x )  =  ")	
	pp.appendChild(f);
	for(var i=0; i<=grado; i++){
		var ip1=document.createElement("input");		
		ip1.setAttributeNode(Atribute("type", "text"));
		ip1.setAttributeNode(Atribute("name", "constante"));
		ip1.setAttributeNode(Atribute("size", "6"));
		ip1.setAttributeNode(Atribute("id", "constante"+i));
		var ip2=document.createElement("input");
		ip2.setAttributeNode(Atribute("type", "text"));
		ip2.setAttributeNode(Atribute("name", "signo"));
		ip2.setAttributeNode(Atribute("maxlength", "1"));
		ip2.setAttributeNode(Atribute("size", "1"));
		ip2.setAttributeNode(Atribute("id", "signo"+i));
		ip2.setAttributeNode(Atribute("placeholder", "+"));
		//var sum = document.createTextNode("+");       // Create a text node
		var x = document.createTextNode(" * x^"+i+" ");
		pp.appendChild(ip2);
		pp.appendChild(ip1);
		pp.appendChild(x);
	}
	var f2=document.createTextNode("  =  0 ");
	pp.appendChild(f2);
	document.getElementById(form).appendChild(pp);	
}

function Insert_Text_Element(type, texto){
	var t=document.createElement(type);
	var x=document.createTextNode(texto);
	t.appendChild(x);
	return t;
}

function Remplazar(exp){	
	while(exp!=exp.replace("e", "Math.E"))exp=exp.replace("e", "Math.E");
	while(exp!=exp.replace("pi", "Math.PI"))exp=exp.replace("pi", "Math.PI");
	while(exp!=exp.replace("ABS", "Math.abs"))exp=exp.replace("ABS", "Math.abs");
	while(exp!=exp.replace("ACOS", "Math.acos"))exp=exp.replace("ACOS", "Math.acos");
	while(exp!=exp.replace("ASIN", "Math.asin"))exp=exp.replace("ASIN", "Math.asin");
	while(exp!=exp.replace("ATAN", "Math.atan"))exp=exp.replace("ATAN", "Math.atan");
	while(exp!=exp.replace("COS", "Math.cos"))exp=exp.replace("COS", "Math.cos");
	while(exp!=exp.replace("SIN", "Math.sin"))exp=exp.replace("SIN", "Math.sin");
	while(exp!=exp.replace("TAN", "Math.tan"))exp=exp.replace("TAN", "Math.tan");
	while(exp!=exp.replace("CEIL", "Math.ceil"))exp=exp.replace("CEIL", "Math.ceil");
	while(exp!=exp.replace("FLOOR", "Math.floor"))exp=exp.replace("FLOOR", "Math.floor");
	while(exp!=exp.replace("LOG", "Math.log"))exp=exp.replace("LOG", "Math.log");
	while(exp!=exp.replace("EXP", "Math.exp"))exp=exp.replace("EXP", "Math.exp");
	while(exp!=exp.replace("POW", "Math.pow"))exp=exp.replace("POW", "Math.pow");
	while(exp!=exp.replace("SQRT", "Math.sqrt"))exp=exp.replace("SQRT", "Math.sqrt");
	return exp;
}

function Eval(fun, x){
	return eval(fun);
}

function Biseccion(fun, A_i, B_i, eps){
	var cnt=0;
	while(cnt++<100000) {
		var X_i= (B_i+A_i)/2.0;
		if(Math.abs(Eval(fun, X_i))<=eps) return X_i;
		if(Eval(fun, A_i)*Eval(fun, X_i)<0){
			B_i=X_i;
		}else{
			A_i=X_i;
		}
	}
	return NaN;
}

function Newton(fun, fundx, X_0, eps){
	var error_i=100, cnt=0;
	var X_i;
	while(error_i>=eps) {
		if(cnt>100000) return NaN;
		X_i=X_0-(Eval(fun, X_0)/Eval(fundx, X_0));
		error_i=Math.abs(X_i-X_0);
		X_0=X_i;
	}
	return X_i;
}
function Secante(fun, X_1, X_2, eps){
	var error_i=100, cnt=0, X_i;
	while(error_i>=eps){
		if(cnt++>=100000) return NaN;
		X_i=X_2-Eval(fun, X_2)*(X_2-X_1)/(Eval(fun, X_2)-Eval(fun, X_1));
		error_i=Math.abs(X_i-X_2);
		X_2=X_i;
		X_1=X_1;
	}
	return X_i;
}

function Procesar_Solucion_Ecuacion(){
	// Metodo Grafico
	Limpiar_Elements("SolGraf", 0, 'p');	
	Limpiar_Elements("SolGraf", 0, 'h2');
	document.getElementById("SolGraf").appendChild(Insert_Text_Element("p", "Esta es la grafica"))
	var funcs = new Array();
	var func=Remplazar(document.getElementById("funcion").value);
	funcs.push(func);
	funcs.push("0");
	var Y1=parseInt(document.getElementById("Y1").value);
	var Y2=parseInt(document.getElementById("Y2").value);
	var X1=parseFloat(document.getElementById("X1").value);
	var X2=parseFloat(document.getElementById("X2").value);
	var x1=new Array();
	var x2=new Array();
	x1.push(X1); x1.push(X1);
	x2.push(X2); x2.push(X2);
	Graficar(funcs, X1, X2, Y1, Y2, x1, x2).render();
	var CajaAux=document.getElementsByTagName('span');
	var Caja=CajaAux[CajaAux.length-1];
	var elements = document.getElementsByTagName('span');
	while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
	document.getElementById("SolGraf").appendChild(Caja);
	// Biseccion
	Limpiar_Elements("SolBise", 0, 'p');	
	Limpiar_Elements("SolBise", 0, 'h2');
	document.getElementById("SolBise").appendChild(Insert_Text_Element("p", "Una de las raices es:"));
	var lo=parseFloat(document.getElementById("XLow").value);
	var hi=parseFloat(document.getElementById("XHig").value);
	var eps=parseFloat(document.getElementById("EPSb").value);
	var X=Biseccion(func, lo, hi, eps);
	document.getElementById("SolBise").appendChild(Insert_Text_Element("p", ""+X));
	// Newton
	Limpiar_Elements("SolNew", 0, 'p');	
	Limpiar_Elements("SolNew", 0, 'h2');
	var X_0=parseFloat(document.getElementById("X_0").value);
	var funcd=document.getElementById("funciondx").value;
	eps=parseFloat(document.getElementById("EPSn").value);
	funcd=Remplazar(funcd);
	X=Newton(func, funcd, X_0, eps);
	document.getElementById("SolNew").appendChild(Insert_Text_Element("p", "Una de las raices es:"));
	document.getElementById("SolNew").appendChild(Insert_Text_Element("p", ""+X));
	//Secante	
	Limpiar_Elements("SolSec", 0, 'p');	
	Limpiar_Elements("SolSec", 0, 'h2');
	var X_1=parseFloat(document.getElementById("X_1").value);
	var X_2=parseFloat(document.getElementById("X_2").value);
	eps=parseFloat(document.getElementById("EPSs").value);
	X=Secante(func, X_1, X_2, eps);
	document.getElementById("SolSec").appendChild(Insert_Text_Element("p", "Una de las raices es:"));
	document.getElementById("SolSec").appendChild(Insert_Text_Element("p", ""+X));
	alert("Proceso Terminado");
}

function crear_matriz(form){
	Limpiar_Elements(form, 2, 'p');
	var tam=document.getElementById("tam").value;
	for(var i=0; i<tam; i++){
		var varp= document.createElement("p");			
		for(var j=0; j<tam; j++){
			var ip=document.createElement("input");		
			ip.setAttributeNode(Atribute("type", "text"));
			ip.setAttributeNode(Atribute("name", "Aij"+i));
			ip.setAttributeNode(Atribute("size", "3"));
			ip.setAttributeNode(Atribute("id", "Aij"+i+j));
			varp.appendChild(ip);
			varp.appendChild(document.createTextNode(" * x"+(j+1)+" "));
		}
		varp.appendChild(document.createTextNode(" = "))
		document.getElementById(form).appendChild(varp);
		var ip=document.createElement("input");		
		ip.setAttributeNode(Atribute("type", "text"));
		ip.setAttributeNode(Atribute("name", "Bi"));
		ip.setAttributeNode(Atribute("size", "3"));
		ip.setAttributeNode(Atribute("id", "Bi"+i));
		varp.appendChild(ip);
	}
}

function Mostrar_Matriz(form, Mat){
	for(var i=0; i<Mat.length; i++){
		var pp=document.createElement("p");
		for(var j=0; j<Mat.length; j++){
			var ip=document.createElement("input");		
			ip.setAttributeNode(Atribute("type", "text"));
			ip.setAttributeNode(Atribute("size", "5"));
			ip.setAttributeNode(Atribute("value", Mat[i][j]));
			pp.appendChild(ip);
			pp.appendChild(document.createTextNode("  "));
		}
		document.getElementById(form).appendChild(pp);
	}
}
function DescomponerLU(Mat){
	var A=new Array();
	for(var k=0; k<Mat.length-1; k++){
		for(var i=k+1; i<Mat.length; i++){
			var factor=Mat[i][k]/Mat[k][k];
			Mat[i][k]=factor;
			for(var j=k+1; j<Mat.length; j++){
				Mat[i][j]=Mat[i][j]-factor*Mat[k][j];
			}
		}
	}
	return Mat;
}

function Substitucion(A, B){	
	var n=A.length;
	var X=new Array(n);
	for(var i=1; i<n; i++){
		var sum=B[i];
		for(var j=0; j<=i-1; j++){
			sum-=(A[i][j]*B[j]);
		}
		B[i]=sum;
	}
	X[n-1]=B[n-1]/A[n-1][n-1];
	for(var i=n-2; i>=0; i--){
		var sum=0.0;
		for(var j=i+1; j<n; j++){
			sum+=A[i][j]*X[j];
		}
		X[i]=(B[i]-sum)/A[i][i];
	}
	return X;
}

function Procesar_Solucion_Matriz(){
	Limpiar_Elements("form2", 0, "p");
	var tam=document.getElementById("tam").value;
	var Aux=new Array(), Mat=new Array(tam), A=new Array(tam), L=new Array(tam), U=new Array(tam), X=new Array(tam), B=new Array();
	for(var i=0; i<tam; i++){
		Aux.push(document.getElementsByName("Aij"+i));
		B.push(document.getElementById("Bi"+i).value);
	}
	for(var i=0; i<tam; i++){
		Mat[i]=new Array(); A[i]=new Array(); U[i]=new Array(); L[i]=new Array();
		for(var j=0; j<Aux[i].length; j++)
			Mat[i].push(Aux[i][j].value);
	}
	A=DescomponerLU(Mat);
	for(var i=0; i<tam; i++)
		for(var j=0; j<A[i].length; j++)
			if(j>=i) U[i].push(A[i][j]); else U[i].push(0);	
	document.getElementById("form2").appendChild(Insert_Text_Element("p", "Matriz U:"));	
	Mostrar_Matriz("form2", U);
	for(var i=0; i<tam; i++)
		for(var j=0; j<A[i].length; j++)
			if(j>i) L[i].push(0); else if(i==j) L[i].push(1); else L[i].push(A[i][j]);
	document.getElementById("form2").appendChild(Insert_Text_Element("p", "Matriz L:"));	
	Mostrar_Matriz("form2", L);
	X=Substitucion(A, B);
	document.getElementById("form2").appendChild(Insert_Text_Element("p", "Soluciones del sistema:"));
	for(var i=0; i<X.length; i++) document.getElementById("form2").appendChild(Insert_Text_Element("p", "x"+(i+1)+" = "+X[i]));
}

function crear_matriz2(form){
	Limpiar_Elements(form, 2, 'p');
	var tam=document.getElementById("tam").value;
	for(var i=0; i<tam; i++){
		var varp= document.createElement("p");
		var aux="f"+(i+1)+" (";
		for(var j=0; j<tam; j++){
			aux+="x"+(j+1);
			if(j<tam-1) aux+=", ";
		}
		aux+=") = ";
		varp.appendChild(document.createTextNode(aux));		
		var ip=document.createElement("input");		
		ip.setAttributeNode(Atribute("type", "text"));
		ip.setAttributeNode(Atribute("name", "Ai"));
		ip.setAttributeNode(Atribute("size", 10*tam));
		ip.setAttributeNode(Atribute("id", "Ai"+i));		
		varp.appendChild(ip);
		document.getElementById(form).appendChild(varp);
	}
	document.getElementById(form).appendChild(Insert_Text_Element("p", "Matriz Jacobiana:"));
	for(var i=0; i<tam; i++){
		var varp= document.createElement("p");			
		for(var j=0; j<tam; j++){
			var ip=document.createElement("input");		
			ip.setAttributeNode(Atribute("type", "text"));
			ip.setAttributeNode(Atribute("name", "Aij"+i));
			ip.setAttributeNode(Atribute("size", 5*tam));
			ip.setAttributeNode(Atribute("id", "Aij"+i+j));
			varp.appendChild(ip);
			varp.appendChild(document.createTextNode("   "));
		}
		document.getElementById(form).appendChild(varp);
	}
	document.getElementById(form).appendChild(Insert_Text_Element("p", "Valores iniciales:"));
	for(var i=0; i<tam; i++){
		var varp=document.createElement("p");
		var aux="x"+(i+1)+" = ";
		varp.appendChild(document.createTextNode(aux));		
		var ip=document.createElement("input");		
		ip.setAttributeNode(Atribute("type", "text"));
		ip.setAttributeNode(Atribute("name", "Xi"));
		ip.setAttributeNode(Atribute("size", 5));
		ip.setAttributeNode(Atribute("id", "Xi"+i));		
		varp.appendChild(ip);
		document.getElementById(form).appendChild(varp);
	}	
}

function Procesar_Solucion_Sistema_No_Lineal(){
	Limpiar_Elements("form2", 0, "p");
	//LECTURA
	var tam=document.getElementById("tam").value;
	var Ecuaciones=new Array(tam), Aux=new Array(), Mat=new Array(tam), VecX=new Array(tam);
	for(var i=0; i<tam; i++)
		Ecuaciones[i]=Remplazar(document.getElementById("Ai"+i).value);
	for(var i=0; i<tam; i++)
		Aux.push(document.getElementsByName("Aij"+i));	
	for(var i=0; i<tam; i++){
		Mat[i]=new Array();
		for(var j=0; j<Aux[i].length; j++)
			Mat[i].push(Remplazar(Aux[i][j].value));
	}
	for(var i=0; i<tam; i++)
		VecX[i]=document.getElementById("Xi"+i).value;
	//METODO NEWTON
	var eps=0.00001, difer=1.0;
	var maxiter =50, iter=0;
	while(difer>eps && iter<maxiter){
		iter++;
		//Evaluar la matriz Jacobiana con VecX
		var MatJX=new Array(tam), A=new Array(tam);
		for(var i=0; i<tam; i++){
			MatJX[i]=new Array(tam); A[i]=new Array(tam);
			for(var j=0; j<tam; j++){
				MatJX[i][j]=Mat[i][j];
				for(var k=0; k<tam; k++){
					var x="x"+(k+1);
					while(MatJX[i][j]!=(MatJX[i][j].replace(x, ""+VecX[k]+"")))MatJX[i][j]=(MatJX[i][j].replace(x, ""+VecX[k]+""));
				}
				MatJX[i][j]=(eval(MatJX[i][j]));
			}
		}
		var B=new Array(tam);
		for(var i=0; i<tam; i++){
			B[i]=Ecuaciones[i];
			for(var k=0; k<tam; k++){
				var x="x"+(k+1);
				while(B[i]!=(B[i].replace(x, ""+VecX[k]+"")))B[i]=(B[i].replace(x, ""+VecX[k]+""));
			}
			B[i]=eval(B[i]);
		}
		A=DescomponerLU(MatJX);
		var ActX=Substitucion(A, B);
		difer=0;
		for(var i=0; i<tam; i++){
			VecX[i]-=ActX[i];
			difer+=Math.abs(ActX[i]);
		}
	}
	document.getElementById("form2").appendChild(Insert_Text_Element("p", "Soluciones:"));
	for(var i=0; i<tam; i++){
		var varp=document.createElement("p");
		var aux="x"+(i+1)+" = "+VecX[i];
		varp.appendChild(document.createTextNode(aux));		
		document.getElementById("form2").appendChild(varp);
	}
	if(iter==maxiter)alert("No se llego a una solucion :/");
}


function Procesar_Solucion_Spline_Cubico(){
	//Graficar
	Limpiar_Elements("SolGraf", 0, 'p');	
	Limpiar_Elements("SolGraf", 0, 'h2');
	document.getElementById("SolGraf").appendChild(Insert_Text_Element("p", "Esta es la grafica"))
	
	var pnt=document.getElementById("puntos").value;
	while(pnt!=pnt.replace("\t", " "))pnt=pnt.replace("\t", " ");
	while(pnt!=pnt.replace("\n", " "))pnt=pnt.replace("\n", " ");
	while(pnt!=pnt.replace("  ", " "))pnt=pnt.replace("  ", " ");
	var arr=pnt.split(" ");
	var X=new Array();
	var A=new Array();
	//Hallar A B C D
	for(var i=0; i<arr.length; i+=2){
		X.push(parseFloat(arr[i]));
		A.push(parseFloat(arr[i+1]));
	}
	var n=X.length-1;
	//for(var i=0; i<=n; i++) alert(i+":"+X[i]+" , "+ A[i]);
	var H=new Array(n+1);
	for(var i=0; i<=n-1; i++){
		H[i]=X[i+1]-X[i];
	}
	var Alpha=new Array(n+1);
	for(var i=1; i<=n-1; i++){
		Alpha[i]=(3/H[i])*(A[i+1]-A[i])-(3/H[i-1])*(A[i]-A[i-1]);
	}
	//resolver el sistema lineal tridiagonal
	var L=new Array(n+1); L[0]=1;
	var U=new Array(n+1); U[0]=0;
	var Z=new Array(n+1); Z[0]=0;
	for(var i=1; i<=n-1; i++){
		L[i]=2*(X[i+1]-X[i-1])-H[i-1]*U[i-1];
		U[i]=H[i]/L[i];
		Z[i]=(Alpha[i]-H[i-1]*Z[i-1])/L[i];
	}	
	L[n]=1; Z[n]=0;
	var B=new Array(n+1);
	var C=new Array(n+1);
	var D=new Array(n+1);
	C[n]=0;
	for(var i=n-1; i>=0; i--){
		C[i]=Z[i]-U[i]*C[i+1];
		B[i]=((A[i+1]-A[i])/H[i])-H[i]*(C[i+1]+2*C[i])/3;
		D[i]=(C[i+1]-C[i])/(3*H[i]);
	}
	////////////////	
	var fff=new Array();
	var x1=new Array();
	var x2=new Array();	
	for(var i=0; i<=n-1; i++){
		var func=A[i];
		func=func+(B[i]>=0?"+":"")+B[i]+"*(x"+(-X[i]>=0?"+":"")+(-X[i])+")";
		func=func+(C[i]>=0?"+":"")+C[i]+"*POW(x"+(-X[i]>=0?"+":"")+(-X[i])+", 2)";
		func=func+(D[i]>=0?"+":"")+D[i]+"*POW(x"+(-X[i]>=0?"+":"")+(-X[i])+", 3)";
		fff.push(Remplazar(func));
		x1.push(X[i]);
		x2.push(X[i+1]);
		//alert(fff[i]);
	}
	Limpiar_Elements("form2", 0, 'p');
	var Mat=new Array(4);
	Mat[0]=A; Mat[1]=B; Mat[2]=C; Mat[3]=D;
	for(var i=0; i<n; i++){
		var pp1=document.createElement("p");		
		pp1.appendChild(document.createTextNode("a_"+i+" + b_"+i+" ( x - x_"+i+" )"+" + c_"+i+" ( x - x_"+i+" ) ^ 2 + d_"+i+" ( x - x_"+i+" ) ^ 3"+"    para "+"x_"+i+" <= x <= x_"+(i+1)));//+"+"+M[0][i]+"+"+M[1][i]+"( x-x_"+(i+1)+")"));
		var pp2=document.createElement("p");
		pp2.appendChild(document.createTextNode(Math.round(Mat[0][i]*1000)/1000+" + "+Math.round(Mat[1][i]*1000)/1000+" ( x - "+X[i]+" )"+" + "+Math.round(Mat[2][i]*1000)/1000+" ( x - "+X[i]+" ) ^ 2 + "+Math.round(Mat[3][i]*1000)/1000+" ( x - "+X[i]+" ) ^ 3"+"    para "+X[i]+" <= x <= "+X[i+1]));//+"+"+M[0][i]+"+"+M[1][i]+"( x-x_"+(i+1)+")"));
		document.getElementById("form2").appendChild(pp1);		
		document.getElementById("form2").appendChild(pp2);
	}
	var Y1=parseInt(document.getElementById("Y1").value);
	var Y2=parseInt(document.getElementById("Y2").value);
	var X1=parseFloat(document.getElementById("X1").value);
	var X2=parseFloat(document.getElementById("X2").value);
	Graficar(fff, X1, X2, Y1, Y2, x1, x2).render();// esto ya garfica varias funciones :)
	var CajaAux=document.getElementsByTagName('span');
	var Caja=CajaAux[CajaAux.length-1];
	var elements = document.getElementsByTagName('span');
	while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
	document.getElementById("SolGraf").appendChild(Caja);
	alert("Grafica Terminada");
}
function RemE(cad, a, b){	
	while(cad!=cad.replace(a,b))cad=cad.replace(a, b);
	return cad;
}
function Procesar_Solucion_EDOs(){
	Limpiar_Elements("SoluX", 0, 'p');
	Limpiar_Elements("SoluYe", 0, 'p');
	Limpiar_Elements("SoluYrk", 0, 'p');
	var func=Remplazar(document.getElementById("funcion").value);
	var a0=parseFloat(document.getElementById("a0").value);
	var a1=parseFloat(document.getElementById("a1").value);
	var b0=parseFloat(document.getElementById("b0").value);
	var h=parseFloat(document.getElementById("h").value);
	var X0 = new Array();
	var Y_E = new Array(); // Y0
	var F_eval0 = new Array(); //K1
	X0.push(a0);
	Y_E.push(b0);	
	var feval=func;	
	feval=RemE(feval, "x", X0[0]);
	feval=RemE(feval, "y", Y_E[0]);
	F_eval0.push(eval(feval));
	for(var ai=a0+h, i=1; ai<=a1; ai+=h, i++){
		X0.push(ai);
		Y_E.push(Y_E[i-1]+h*F_eval0[i-1]);		
		var feval=func;	
		feval=RemE(feval, "x", X0[i]);
		feval=RemE(feval, "y", Y_E[i]);
		F_eval0.push(eval(feval));
	}
	var X1=new Array(); X1=X0;
	var Y1=new Array(); Y1=Y_E;
	var K1=new Array(); K1=F_eval0;
	var X2=new Array();
	var Y2=new Array();
	var K2=new Array();
	var X3=new Array();
	var Y3=new Array();
	var K3=new Array();
	var X4=new Array();
	var Y4=new Array();
	var K4=new Array();
	var RK=new Array();
	for(var ai=a0, i=0; ai<=a1; ai+=h, i++){
		//X1 Y1 y K1 ya estan procesados
		X2.push(X1[i]+(1/2)*h);
		Y2.push(Y1[i]+(1/2)*h*K1[i]);
		var feval=func;	feval=RemE(feval, "x", X2[i]); feval=RemE(feval, "y", Y2[i]);
		K2.push(eval(feval));//////		
		X3.push(X1[i]+(1/2)*h);
		Y3.push(Y1[i]+(1/2)*h*K2[i]);
		feval=func;	feval=RemE(feval, "x", X3[i]); feval=RemE(feval, "y", Y3[i]);
		K3.push(eval(feval));//////		
		X4.push(X1[i]+h);
		Y4.push(Y1[i]+h*K3[i]);
		feval=func;	feval=RemE(feval, "x", X4[i]); feval=RemE(feval, "y", Y4[i]);
		K4.push(eval(feval));
		if(i==0) RK.push(Y1[0]);
		else RK.push(RK[i-1]+(1/6)*(K1[i-1]+2*K2[i-1]+2*K3[i-1]+K4[i-1])*h);
		//alert(RK[i]);
	}
	var pp1=document.createElement("p");
	pp1.appendChild(document.createTextNode("X0"));
	document.getElementById("SoluX").appendChild(pp1);	
	var pp2=document.createElement("p");
	pp2.appendChild(document.createTextNode("Y Euler"));
	document.getElementById("SoluYe").appendChild(pp2);	
	var pp3=document.createElement("p");
	pp3.appendChild(document.createTextNode("Y Runge-Kutta"));
	document.getElementById("SoluYrk").appendChild(pp3);
	for(var i=0; i<Y_E.length; i++){		
		var pp1=document.createElement("p");
		pp1.appendChild(document.createTextNode(X1[i]));
		document.getElementById("SoluX").appendChild(pp1);	
		var pp2=document.createElement("p");
		pp2.appendChild(document.createTextNode(Y_E[i]));
		document.getElementById("SoluYe").appendChild(pp2);	
		var pp3=document.createElement("p");
		pp3.appendChild(document.createTextNode(RK[i]));
		document.getElementById("SoluYrk").appendChild(pp3);
	}
	alert("Termino el proceso");
}

function Procesar_Integrar(){
	Limpiar_Elements("Solu", 0, 'p');
	var func=Remplazar(document.getElementById("funcion").value);
	var A=parseFloat(document.getElementById("A").value);
	var B=parseFloat(document.getElementById("B").value);	
	var h=parseFloat(document.getElementById("h").value);
	var Y = new Array();
	for(var i=A; i<=B; i+=h){
		var feval=func;	feval=RemE(feval, "x", i);
		Y.push(eval(feval));
	}
	var n=Y.length, sum=0, par=0, imp=0;
	for(var i=1; i<n-1; i++){
		sum+=Y[i];
		if(i%2==0) par+=Y[i];
		else imp+=Y[i];
	}
	var trap=(h/2)*(Y[0]+Y[n-1]+2*sum);
	var simp=(h/3)*(Y[0]+Y[n-1]+4*imp+2*par);
	
	var pp1=document.createElement("p");
	pp1.appendChild(document.createTextNode("Por el metodo del trapecio: "+ trap));
	document.getElementById("Solu").appendChild(pp1);	
	var pp2=document.createElement("p");
	pp2.appendChild(document.createTextNode("Por Simpson: "+ simp));
	document.getElementById("Solu").appendChild(pp2);
	alert("Proceso fin");
}
function cargar_imagen(){
	var x = document.getElementById("imagenfile");
	var y = document.getElementById("recuadro");
	y.setAttributeNode(Atribute("src", x.value));
	iniX = document.getElementById("recuadro").offsetLeft;
	iniY = document.getElementById("recuadro").offsetHeight+document.getElementById("recuadro").offsetTop;
}

function Graficar(funciones, X1, X2, Y1, Y2, x1, x2){ //funciones, x1, x2 son vectores
	var data = pv.range(x1[0], x2[0], .1).map(
		function(x) {
			return {x: x, y: eval(funciones[0])};
		}
	),
		w = 500,
		h = 500,
		x = pv.Scale.linear(X1, X2).range(0, w),
		y = pv.Scale.linear(Y1, Y2).range(0, h);
	
	var vis = new pv.Panel()
		.width(w)
		.height(h)
		.bottom(20)
		.left(50)
		.right(20)
		.top(5)
		.fillStyle("#fff")
		.event("mousemove", pv.Behavior.point(Infinity).collapse("y"));

	vis.add(pv.Rule)
		.data(y.ticks())
    //.visible(function() !(this.index % 2))
		.bottom(function(d) Math.round(y(d)) - .5)
		.strokeStyle("#eee")
		.anchor("left").add(pv.Label)
		.text(function(d) d.toFixed(0)); // toFixed es cantidad de decimales

	vis.add(pv.Rule)
		.data(x.ticks())
    //.visible(function(d) d > 0)
		.left(function(d) Math.round(x(d)) - .5)
		.strokeStyle("#eee")
		.anchor("bottom").add(pv.Label)
		.text(function(d) d.toFixed());
	for(var i=0; i<funciones.length; i++){
		data = pv.range(x1[i], x2[i], .01).map( //.01 es la definicion de la linea o division en puntos
			function(x) {
				return {x: x, y: eval(funciones[i])};
			}
		),
		w = 500,
		h = 500,
		x = pv.Scale.linear(X1, X2).range(0, w),
	    y = pv.Scale.linear(Y1, Y2).range(0, h);
		
		vis.add(pv.Line)
			.data(data)
			.left(function(d) x(d.x))
			.bottom(function(d) y(d.y))
			.lineWidth(1)
			.text(function(d) d.x.toFixed(2) + ', ' + d.y.toFixed(2))
			.event("point", pv.Behavior.tipsy({gravity: 's'}));
	}	
	///////////////////////////////////////////////////////////////////
	vis.render();
	return vis;
}













////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function Eval1_Y(form, x){
	var signo=document.getElementsByName("signo");
	var constante=document.getElementsByName("constante");
	var sum=0.0;
	//alert(signo.length);
	for(var i=0; i<signo.length; i++){
		var exp=constante[i].value;
		//alert(exp);
		exp=Remplazar(exp);
		//alert(exp);
		var num=eval(exp);
		num=num*Math.pow(x, i);
		if(signo[i].value=="+"){
			//alert(i+"entr++++");
			sum+=num;
		}else{
			//alert(i+"entro---");
			sum-=num;
		}
	}

	//alert("a");
	return sum;
}
function FF(form, x, sw) {
	if(sw=="0")
		return {x: x, y: Eval1_Y(form, x)};	
	else
		return {x: x, y: Eval_Y(form, x)};
}

function Procesar_1(form){
	Limpiar_Elements(form, 0, 'p');	
	Limpiar_Elements(form, 0, 'h2');	
	var grado=document.getElementById("grado").value;
	document.getElementById(form).appendChild(Insert_Text_Element("h2", "Metodo Grafico"));
	var pp1=document.createElement("p");
	var pp2=document.createElement("p");
	var inX1=document.createElement("input");
	inX1.setAttributeNode(Atribute("type", "text")); inX1.setAttributeNode(Atribute("id", "X1"));
	inX1.setAttributeNode(Atribute("size", "4")); inX1.setAttributeNode(Atribute("placeholder", "100"));
	inX1.setAttributeNode(Atribute("value", "-10"));
	var inX2=document.createElement("input");		
	inX2.setAttributeNode(Atribute("type", "text")); inX2.setAttributeNode(Atribute("id", "X2"));
	inX2.setAttributeNode(Atribute("size", "4")); inX2.setAttributeNode(Atribute("placeholder", "100"));
	inX2.setAttributeNode(Atribute("value", "10"));
	var inY1=document.createElement("input");		
	inY1.setAttributeNode(Atribute("type", "text")); inY1.setAttributeNode(Atribute("id", "Y1"));
	inY1.setAttributeNode(Atribute("size", "4")); inY1.setAttributeNode(Atribute("placeholder", "100"));
	inY1.setAttributeNode(Atribute("value", "-10"));
	var inY2=document.createElement("input");		
	inY2.setAttributeNode(Atribute("type", "text")); inY2.setAttributeNode(Atribute("id", "Y2"));
	inY2.setAttributeNode(Atribute("size", "4")); inY2.setAttributeNode(Atribute("placeholder", "100"));
	inY2.setAttributeNode(Atribute("value", "10"));
	var text=document.createTextNode("<=x<=");
	pp1.appendChild(inX1); pp1.appendChild(text); pp1.appendChild(inX2);
	text=document.createTextNode("<=y<=");
	pp2.appendChild(inY1); pp2.appendChild(text); pp2.appendChild(inY2);
	document.getElementById(form).appendChild(pp1);
	document.getElementById(form).appendChild(pp2);

	/*
	var auxi=document.createElement("script");
	auxi.appendChild(document.createTextNode("Graficar('form1');"));
	document.getElementById("contenido").appendChild(auxi);
	Graficar('form1');
	*/
	alert("entro");
	Graficar('form1', "0" ).render();
	alert("salio");
	var CajaAux=document.getElementsByTagName('span');
	var Caja=CajaAux[CajaAux.length-1];
	var elements = document.getElementsByTagName('span');
	while (elements[0]) elements[0].parentNode.removeChild(elements[0]);
	document.getElementById(form).appendChild(Caja);	
	//Teorema fundamental del algera
	document.getElementById(form).appendChild(Insert_Text_Element("h2", "Teorema fundamental de algebra"));
	document.getElementById(form).appendChild(Insert_Text_Element("p", "Por el teorema fundamental de algebra se puede afirmar que la funcion tiene "+grado+" raíces reales o complejas."));
	// Descartes
	document.getElementById(form).appendChild(Insert_Text_Element("h2", "Regla de Descartes"));
	var signos=document.getElementsByName("signo");
	var cnt=0;
	for(var i=0; i<signos.length-1; i++){
		if(signos[i].value!=signos[i+1].value) cnt++;
	}
	var cad="Por la regla de Descartes se puede afirmar que la funcion tiene";
	for(var i=cnt; i>=0; i-=2){
		cad+=(" "+i);
		if(i-2==0 || i-2==1) cad+=" o";
		else if(i-2>=0) cad+=",";
	}
	cad+=" raíces positivas.";
	document.getElementById(form).appendChild(Insert_Text_Element("p", cad));
	alert(eval("Math.sin(8)"));
	alert(Eval1_Y(form, 1.08));
}
