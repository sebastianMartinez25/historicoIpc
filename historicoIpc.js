const vue = new Vue({
 el:'#app',
 data:{
  listaDatos : []
 },
 created(){
  this.getLista()
 },
 methods:{
  recargar(){
   console.log("recargando");
   this.getLista()
  },
getLista(){
 // id de la hoja de calculo
 idSheets = '1nR5OPyrQECTZ2CTUB7rclW6VYJlR-7TOUsKBMym09a4';
 //// nuestra      APIKey
 apiKey = 'AIzaSyD4TFfvj5gmSy1ndPFA9GxO8LOulEyk-ik'; 
 // rango de la hoja de calculo que queremos leer
 values = 'A2:E10000';
// fetch es un método nativo para hacer peticiones http
// en el navegador 
 fetch("https://content-sheets.googleapis.com/v4/spreadsheets/" +   idSheets + "/values/A2:E10000?access_token="+ apiKey +"&key="+  apiKey)
.then((lista)=>{
  return lista.json()
}).then((valores)=>{
  this.listaDatos = valores.values.reverse();
  //CODIGO NUEVO
  //CODIGO DE DATOS O MENSAJE ACTUAL DEL IPC
var filaInicial=0;
var valorAño=(this.listaDatos[filaInicial][0]);
var valorMes=(this.listaDatos[filaInicial][1]).toLowerCase();
var valorIpcMensual=(this.listaDatos[filaInicial][2]);
var valorIpcAnual=(this.listaDatos[filaInicial][3]);
var valorIpcCorrido=(this.listaDatos[filaInicial][4]);
var datosActuales=document.getElementById("datosActuales");
var mensaje =document.createTextNode("En " + valorMes + " de " + valorAño + ", la variación mensual del IPC fue " 
+ valorIpcMensual + "%," + " la variación año corrido fue " + valorIpcCorrido +"%, y la anual fue "
+ valorIpcAnual +"%.");
datosActuales.appendChild(mensaje);
//FIN DE CODIGO DE DATOS O MENSAJE ACTUAL DEL IPC
//INICIO DE CODIGO VALOR DEL DINERO EN EL TIEMPO
var añoInicial=document.getElementById("añoInicial");
var añoFinal=document.getElementById("añoFinal");
var totalFilas=(this.listaDatos.length)-1;
var valorAñoAbajo=(this.listaDatos[totalFilas][0]);
var iteraciones=(valorAño-valorAñoAbajo);
var i;
var listaDeAños=parseInt(valorAñoAbajo);
for(i=0;i<=iteraciones;i++)
{
  var opcion=document.createElement("option");
  opcion.value=listaDeAños+i;
  opcion.innerHTML=opcion.value;
  añoInicial.appendChild(opcion);

  var opcion2=document.createElement("option");
  opcion2.value=listaDeAños+i;
  opcion2.innerHTML=opcion2.value;
  añoFinal.appendChild(opcion2);
}

añoInicial.addEventListener("change", cambioMes);
añoFinal.addEventListener("change",cambioMes2);
var mesChange;
var datosfuncion=this.listaDatos;
function cambioMes()
{
mesChange=1;
mesesIniciales();
}
function cambioMes2()
{
  mesChange=0;
  mesesIniciales();
}

function mesesIniciales()
{
  var valorSeleccionadoA;
  var mesEscogido;
  if(mesChange==1)
  {
    valorSeleccionadoA=añoInicial.value;
    mesEscogido=document.getElementById("mesInicial");
  }
  else{
    valorSeleccionadoA=añoFinal.value;
    mesEscogido=document.getElementById("mesFinal");
  }
  var meses=["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
  var rep;
 
  var cuentan=mesEscogido.childElementCount;
      while (mesEscogido.firstChild)
      {
      mesEscogido.removeChild(mesEscogido.firstChild);
      }
  if(valorSeleccionadoA==valorAño)
  {
    for(rep=0;rep<=12;rep++)
    {
      var añoIterado=(datosfuncion[rep][0]);
      if(añoIterado==valorAño)
      {
        var opcion1=document.createElement("option");
        opcion1.value=meses[rep];
        opcion1.innerHTML=opcion1.value;
        mesEscogido.appendChild(opcion1);
      }
      else
      {
        break;
      }
    }
  }
  else
  {
    for(rep=0;rep<=11;rep++)
    {
        var opcion1=document.createElement("option");
        opcion1.value=meses[rep];
        opcion1.innerHTML=opcion1.value;
        mesEscogido.appendChild(opcion1);
      
    }
  }
  
}
//

//validador de inputs, solo permite numeros y los separa en miles.
var montoInicial=document.getElementById("montoInicial");
montoInicial.addEventListener("keypress",validarDigito);
montoInicial.addEventListener("keyup",monto1);
montoInicial.addEventListener("paste",validarDigito3);

var montoFinal=document.getElementById("montoFinal");
montoFinal.addEventListener("keypress",validarDigito);
montoFinal.addEventListener("keyup",monto2);
montoFinal.addEventListener("paste",validarDigito3);
var opciones;
function monto1()
{
  opciones=1;
  validarDigito2();
}
function monto2(){
  opciones=0;
  validarDigito2();
}
 
function validarDigito(e)
{
        const regex=/^[\d]+$/;
        var caracter=e.key; //.which;
        if (regex.test(caracter))
        {       
        }
        else
        {
            e.preventDefault();   
        }
}
function validarDigito2(p)
{
  //almacenar en una variable lo que se esta pegando, es decir
  //almacena lo que está en el portapapeles
  //var portapapeles=p.clipboardData.getData("text/plain");
  //fin
  var valor;
if(opciones==1)
{
  valor=montoInicial.value;
}
else{
  valor=montoFinal.value;
}
  var puntos=valor.indexOf(".");
  var comas=valor.indexOf(",");
  var digitos=/^[\d]+$/;
  
  if(puntos>=0){
    valor=valor.split(".").join("");
  }
  if(comas>=0){
    valor=valor.split(",").join("");
  } 
  valor=parseInt(valor);
  
  if(digitos.test(valor))
  {
    //p.preventDefault();
    var cadenaNumeros=String(valor).split('');
    const longitudCadenaNum=cadenaNumeros.length;
    if(longitudCadenaNum<=3)
    {    
    }
    else{
      var numeroDePuntos=Math.trunc(longitudCadenaNum/3);
      var i;
      var posicion;
      for(i=1;i<=numeroDePuntos;i++)
      {
       posicion=longitudCadenaNum-(3*i);
       if(posicion<=0)
       {
        break;
       }
       cadenaNumeros.splice(posicion,0,"."); 
      }
      valor=cadenaNumeros.join("");
    }
if(opciones==1)
{
  montoInicial.value=valor;
}
else{
  montoFinal.value=valor;
}
  }
  else{
    
    //p.preventDefault();
  }
}

function validarDigito3(evt)
{
  //almacenar en una variable lo que se esta pegando, es decir
  //almacena lo que está en el portapapeles
  var portapapeles=evt.clipboardData.getData("text/plain");
  //fin
  var puntos=portapapeles.indexOf(".");
  var comas=portapapeles.indexOf(",");
  var digitos=/^[\d]+$/;
  
  if(puntos>=0){
    portapapeles=portapapeles.split(".").join("");
  }
  if(comas>=0){
    portapapeles=portapapeles.split(",").join("");
  } 
  //valor=parseInt(valor);
  if(digitos.test(portapapeles))
  {
    //p.preventDefault();
    var cadenaNumeros=String(portapapeles).split('');
    const longitudCadenaNum=cadenaNumeros.length;
    if(longitudCadenaNum<=3)
    {    
    }
    else{
      var numeroDePuntos=Math.trunc(longitudCadenaNum/3);
      var i;
      var posicion;
      for(i=1;i<=numeroDePuntos;i++)
      {
       posicion=longitudCadenaNum-(3*i);
       if(posicion<=0)
       {
        break;
       }
       cadenaNumeros.splice(posicion,0,"."); 
      }
      portapapeles=cadenaNumeros.join("");      
    }
  }
  else{
    evt.preventDefault();
  }
}
//FIN DE CODIGO VALOR DEL DINERO EN EL TIEMPO
  //FIN CODIGO NUEVO
  //CONDICIONALES PARA LIQUIDAR VALOR DEL DINERO EN EL TIEMPO
  var boton=document.getElementById("boton");
  boton.addEventListener("click",ejecutarCalculo);
  function ejecutarCalculo()
  {
    
    var aI=añoInicial.value;
    var mI=mesInicial.value;
    var aF=añoFinal.value;
    var mF=mesFinal.value;
    var mtoI=montoInicial.value.split(".").join("");
    var cmaMtoI=mtoI.indexOf(",");
    if (cmaMtoI>=0)
    {
      mtoI=mtoI.replace(",",".");
    }
   mtoI=parseFloat(mtoI);
    var mtoF=montoFinal.value.split(".").join("");
    var cmaMtoF=mtoF.indexOf(",");
    if(cmaMtoF>=0)
    {
      mtoF=mtoF.replace(",",".");
    }
    mtoF=parseFloat(mtoF);
    //CONDICION PARA QUE FUNCIONE EL CALCULO con XOR
    if(aI!="" && mI!="" && aF!="" && mF!=""&& (mtoI>0 ^ mtoF>0))
    {
      var vlrmI=mesInicial.selectedIndex;
      var vlrmF=mesFinal.selectedIndex;
      var vf;
      var vp;
      var ti;
      var p=1;
      var ptoI;
      var ptoF;
      var iteracion;
      var iteracion2;
      var ubicacionCma;
      var longitudS;
      var string1;
      var string2;
      var vlrFut;
     //CONDICION PARA VALOR FUTURO
     if(aI==aF && vlrmI<=vlrmF && mtoI>0 ||(aI<aF && mtoI>0))
     {
      vlrFut=1;
      calculoFinal();
     }
          //CONDICION PARA VALOR PRESENTE
     if (aI==aF && vlrmI<=vlrmF && mtoF>0 ||(aI<aF && mtoF>0))
     {
      vlrFut=0;
      calculoFinal();
     }
     

    }
    else{
      alert("no se hizo nada, coloque correctamente los valores")
    }

    function calculoFinal()
    {
      for(iteracion=0;iteracion<=totalFilas;iteracion++)
      {
        if(aF==datosfuncion[iteracion][0]&&mF==datosfuncion[iteracion][1])
        {
          ptoF=iteracion;
        }
        if(aI==datosfuncion[iteracion][0]&&mI==datosfuncion[iteracion][1])
        {
          ptoI=iteracion;
        }
      }
      for(iteracion2=ptoI;iteracion2>=ptoF;iteracion2--)
      {
        
        ti=datosfuncion[iteracion2][2];
        ti=parseFloat((ti.replace(",",".")))/100;

        if (vlrFut==1)
        {
        vf=mtoI*(1+ti)**p;
       mtoI=vf;
        }
        else{
          vf=mtoF/(1+ti)**p;
       mtoF=vf;
        }
       
      }
      vf=(vf.toFixed(3)).replace(".",",");
      ubicacionCma=vf.indexOf(",");
      longitudS=vf.length;
      string1=vf.substring(0,ubicacionCma);
      string1=new Intl.NumberFormat('en-EN').format(string1).replace(/,/g,".");
      string2=vf.substring(ubicacionCma,longitudS);
      if (vlrFut==1)
      {
        montoFinal.value=string1+string2;
      }
      else{
        montoInicial.value=string1+string2;
      }
      
    }
  }
}).catch(err=>{
  console.log(err);
})
} // fin funcion getLista()
} // fin methods
}) // fin instancia