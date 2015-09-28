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

function Limpiar_P(form, N){
	var aux=document.getElementById(form).getElementsByTagName('p');
	for(var i=aux.length-1; i>=N; i--){		
		document.getElementById(form).removeChild(aux[i]);
	}
	
}
function crear_tabla_funcion(form){
	Limpiar_P(form, 2);
	var grado=document.getElementById("grado").value;
	var pp= document.createElement("p");
	
	var f=document.createTextNode("f ( x )  =  ")	
	pp.appendChild(f);
	for(var i=0; i<=grado; i++){
		var ip1=document.createElement("input");
		var at11 = document.createAttribute("type"); at11.value="text"; ip1.setAttributeNode(at11);
		var at12 = document.createAttribute("name"); at12.value="constante"; ip1.setAttributeNode(at12);
		var at14 = document.createAttribute("size"); at14.value="6"; ip1.setAttributeNode(at14);
		var at15 = document.createAttribute("id"); at15.value="constante"+i; ip1.setAttributeNode(at15);

		var ip2=document.createElement("input");
		var at21 = document.createAttribute("type"); at21.value="text"; ip2.setAttributeNode(at21);
		var at22 = document.createAttribute("name"); at22.value="signo"; ip2.setAttributeNode(at22);
		var at23 = document.createAttribute("maxlength"); at23.value="1"; ip2.setAttributeNode(at23);
		var at24 = document.createAttribute("size"); at24.value="1"; ip2.setAttributeNode(at24);
        var at25 = document.createAttribute("id"); at25.value="signo"+i; ip2.setAttributeNode(at25);
		var at23 = document.createAttribute("placeholder"); at23.value="+"; ip2.setAttributeNode(at23);
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

function Procesar(form){
	Limpiar_P(form, 0);
	var grado=document.getElementById("grado").value;
	//Teorema fundamental del algera
	var pp = document.createElement("p");
	var x = document.createTextNode("Por el teorema fundamental de algebra se puede afirmar que la funcion tiene "+grado+" raíces reales o complejas.");
	pp.appendChild(x);
	document.getElementById(form).appendChild(pp);
	// Descartes
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
	pp = document.createElement("p");
	x = document.createTextNode(cad);
	pp.appendChild(x);
	pp.appendChild(x);
	document.getElementById(form).appendChild(pp);
	//
	
	//alert("sal"+cnt+ cad);
}

