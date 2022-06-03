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
}

añoInicial.addEventListener("change", mesesIniciales);
var datosfuncion=this.listaDatos;
function mesesIniciales()
{
  var valorSeleccionadoAi=añoInicial.value;
  var meses=["ENERO","FEBRERO","MARZO","ABRIL","MAYO","JUNIO","JULIO","AGOSTO","SEPTIEMBRE","OCTUBRE","NOVIEMBRE","DICIEMBRE"];
  var rep;
  var mesInicial=document.getElementById("mesInicial");
 
  var cuentan=mesInicial.childElementCount;
  
      while (mesInicial.firstChild)
      {
      mesInicial.removeChild(mesInicial.firstChild);
      }
  if(valorSeleccionadoAi==valorAño)
  {
    for(rep=0;rep<=12;rep++)
    {
      var añoIterado=(datosfuncion[rep][0]);
      if(añoIterado==valorAño)
      {
        var opcion1=document.createElement("option");
        opcion1.value=meses[rep];
        opcion1.innerHTML=opcion1.value;
        mesInicial.appendChild(opcion1);
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
        mesInicial.appendChild(opcion1);
      
    }
  }
  
}


//FIN DE CODIGO VALOR DEL DINERO EN EL TIEMPO
  //FIN CODIGO NUEVO
}).catch(err=>{
  console.log(err);
})
} // fin funcion getLista()
} // fin methods
}) // fin instancia