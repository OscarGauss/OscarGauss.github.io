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
	exp=exp.replace("E", "Math.E");
	exp=exp.replace("PI", "Math.PI");
	exp=exp.replace("abs", "Math.abs");
	exp=exp.replace("acos", "Math.acos");
	exp=exp.replace("asin", "Math.asin");
	exp=exp.replace("atan", "Math.atan");
	exp=exp.replace("cos", "Math.cos");
	exp=exp.replace("sin", "Math.sin");
	exp=exp.replace("tan", "Math.tan");
	exp=exp.replace("ceil", "Math.ceil");
	exp=exp.replace("floor", "Math.floor");
	exp=exp.replace("log", "Math.log");
	exp=exp.replace("exp", "Math.exp");
	exp=exp.replace("pow", "Math.pow");
	exp=exp.replace("sqrt", "Math.sqrt");
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
	var func=document.getElementById("funcion").value;
	func=Remplazar(func);
	Graficar(func).render();
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
	document.getElementById("form2").appendChild(Insert_Text_Element("p", "Soluciones de la matriz:"));
	for(var i=0; i<X.length; i++) document.getElementById("form2").appendChild(Insert_Text_Element("p", "x"+(i+1)+" = "+X[i]));
}
function Graficar(fun){
	var Y1=parseInt(document.getElementById("Y1").value);
	var Y2=parseInt(document.getElementById("Y2").value);
	var X1=parseFloat(document.getElementById("X1").value);
	var X2=parseFloat(document.getElementById("X2").value);
	var data = pv.range(X1, X2, .1).map(
		function(x) {
			return {x: x, y: eval(fun)};
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
	
	vis.add(pv.Line)
		.data(data)
		.left(function(d) x(d.x))
		.bottom(function(d) y(d.y))
		.lineWidth(3)
		.text(function(d) d.x.toFixed(2) + ', ' + d.y.toFixed(2))
		.event("point", pv.Behavior.tipsy({gravity: 's'}));

	// La linea que corta en y=0;////////////////////////////////////////
	data = pv.range(X1, X2, .1).map(
		function(x) {
			return {x: x, y: 0};
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
