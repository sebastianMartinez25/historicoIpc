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
      var ti;
      var tasaAcum;
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
     else if (aI==aF && vlrmI<=vlrmF && mtoF>0 ||(aI<aF && mtoF>0))
     {
      vlrFut=0;
      calculoFinal();
     }
     else{
      alert("NUNCA la fecha inicial puede ser mayor que la fecha final, puede ser menor o igual");
     }

    }
    else{
      alert("no se hizo nada, coloque correctamente los valores")
    }

    function calculoFinal()
    {
      var inflacion_Acumulada=document.getElementById("inflacion_Acumulada");
      //var cuentaHijosTexto=inflacion_Acumulada.childElementCount;
      while (inflacion_Acumulada.firstChild)
      {
      inflacion_Acumulada.removeChild(inflacion_Acumulada.firstChild);
      }

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
        if(isNaN(tasaAcum))
        {
          tasaAcum=(1+ti)*(1+0)-1;
        }
        else
        {
          tasaAcum=(1+ti)*(1+tasaAcum)-1;
        }

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
      tasaAcum=(tasaAcum*100).toFixed(3).replace(".",",");
      var uComa=tasaAcum.indexOf(",");
      longString=tasaAcum.length;
      cad1=tasaAcum.substring(0,uComa);
      cad1=new Intl.NumberFormat('en-EN').format(cad1).replace(/,/g,".");
      cad2=tasaAcum.substring(uComa,longString);
      tasaAcum=cad1+cad2;
      //MENSAJE FINAL DE LA INFLACION ACUMULADA

var mensajeInfla =document.createTextNode("Desde el mes de " + mI + " de " + aI + " hasta el mes de " 
+ mF + " de " + aF + " la inflación acumulada en COLOMBIA fue de " +tasaAcum + "%" + ", por lo tanto, sus inversiones tuvieron que haber generado rentabilidades mayores al "
+ tasaAcum +"%");
inflacion_Acumulada.appendChild(mensajeInfla);
///
    }
  }
}).catch(err=>{
  console.log(err);
})
} // fin funcion getLista()
} // fin methods
}) // fin instancia

//JAVASCRIPT PURO- POR FUERA DE VUEJS

var rentabilidad=document.getElementById("rentabilidad");
rentabilidad.value=0+","+0;
var inflac=document.getElementById("inflac");
inflac.value=0+","+0;

var rentabilidadReal=document.getElementById("rentabilidadReal");

rentabilidad.addEventListener("keydown",rentability);
rentabilidad.addEventListener("paste",prohibido_paste_cut);
rentabilidad.addEventListener("cut",prohibido_paste_cut);
rentabilidad.addEventListener("dragstart",prohibido_paste_cut);

inflac.addEventListener("keydown",inflation);
inflac.addEventListener("paste",prohibido_paste_cut);
inflac.addEventListener("cut",prohibido_paste_cut);
inflac.addEventListener("dragstart",prohibido_paste_cut);

rentabilidadReal.addEventListener("paste", prohibido_paste_cut);
rentabilidadReal.addEventListener("cut", prohibido_paste_cut);
rentabilidadReal.addEventListener("dragstart", prohibido_paste_cut);
rentabilidadReal.addEventListener("keydown", prohibido_Backspace);

function prohibido_Backspace(e)
{
e.preventDefault();
alert("NO PUEDE EDITAR ESTE CAMPO, EL RESULTADO SOLO SE MODIFICA CUANDO DA CLICK EN EL BOTÓN CALCULAR");

}

function prohibido_paste_cut(e)
{
e.preventDefault();
}
var activador;
function rentability(e)
{
  activador=1;
  validarNumber(e);
}
function inflation(e)
{
  activador=0;
  validarNumber(e);
}
//rentabilidad.addEventListener("keyup",validarPorcentaje);

function validarNumber(e)
{
const porcentaje=/^[\d]+$/;
var digitado=e.key;

            var cursorInicial;
            var cursorFinal;
            var valorNew;

            if (activador==1)
            {
              cursorInicial=rentabilidad.selectionStart;
              cursorFinal=rentabilidad.selectionEnd;
              valorNew=rentabilidad.value;
            }
            else
            {
              cursorInicial=inflac.selectionStart;
              cursorFinal=inflac.selectionEnd;
              valorNew=inflac.value;
            }

            var coma=valorNew.indexOf(",");
            var largo=valorNew.length;
            var parteI=(valorNew.substring(0,coma));
            var longI=parteI.length;
            var parteF=((valorNew.substring(coma+1, largo)));
            var longF=parteF.length;
            var caracteresInput=valorNew.split("");
          var longCaracteresInput=valorNew.length;
          var dataFinal;
          var dividirmiles;
          var partidaComa;
          var extensionComa;
          var comaFinal;

          console.log(longCaracteresInput);
//PRIMER IF VALIDA SI EL VALOR DIGITADO ES UN NUMERO
if (porcentaje.test(digitado))
    {
           //CODIGO PARA SELECCIONAR Y REEMPLAZAR POR NÚMEROS 
  console.log("cursorInicial "+cursorInicial);
  console.log("cursor Final "+cursorFinal);
  console.log("coma "+coma);
  console.log("long "+largo);
  console.log("long Array "+longCaracteresInput +largo);
  var ciclo;
  var cI=parseInt(cursorInicial); 
  var cF=parseInt(cursorFinal);
  var ptosABorrar=[];
  // VALIDA SI DONDE ESTA EL CURSOR HAY UNA COMA
  //INICIO PRUEBAS CURSOR
  /*if(rentabilidad.value[cursorInicial]==",")
  {
    console.log("hay coma");
  }*/
  ////PRUEBAS DE CURSOR
  if(valorNew[cursorInicial]==",")
  {
    console.log("hay coma2");
    ciclo=(cursorFinal-coma);
    while(cI<=cF)
  {
    console.log("ci "+(cI));
    ptosABorrar.push(cI);
    cI+=1;  
    console.log("cursorI " +ptosABorrar);
  } 
  
  }
  // SI NO ES UNA COMA, HAGA ESTO:
  else{
    ciclo=(cursorFinal-cursorInicial)-1;
    while(cI<cF)
  {
    ptosABorrar.push(cI);
    cI+=1;  
    console.log("cursorI " +ptosABorrar);
  } 

  }
  var ciclos;
  var cicla=0;
  console.log("CICLO: "+ciclo);   
  for(ciclos=0;ciclos<=ciclo;ciclos++)
  {
    if(caracteresInput[ptosABorrar[ciclos]-cicla]==",")
    {
    if(ciclos<=0)
    {caracteresInput.splice(ptosABorrar[ciclos],1,digitado,",");
    console.log(caracteresInput);
    cicla=0;
    }
    else
    {
      cicla=cicla;
      console.log(caracteresInput);
    }                
    }
    else{
    if (ciclos>0)
    {  
      caracteresInput.splice(ptosABorrar[ciclos]-cicla,1);
      cicla+=1; 
    }
    else{
      caracteresInput.splice(ptosABorrar[ciclos],1,digitado);
      console.log(caracteresInput);
    }
    } 
  }
  
  if(caracteresInput[caracteresInput.length-1]==",")
  {
    caracteresInput.push(0);
  }
  if(caracteresInput[0]==0 && caracteresInput[1]!=",")
  {
    caracteresInput.splice(0,1);
  }
  console.log(caracteresInput);
      
//////FIN
if(ciclo>0)
{
   e.preventDefault();
   dataFinal=caracteresInput.join("");
   dataFinal=dataFinal.split(".").join("");
   extensionComa=dataFinal.length;
   partidaComa=dataFinal.indexOf(",");
   comaFinal=dataFinal.substring(partidaComa,extensionComa);
   dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");
   console.log("dividir miles" + dividirmiles);

   if(activador==1){rentabilidad.value=dividirmiles+comaFinal;}
   else{inflac.value=dividirmiles+comaFinal;} 
  console.log("yeahh");
}
else 
{   
  console.log("fuckk");
///INICIO PARA AJUSTAR NUMEROS EN LA PARTEI Y LA PARTEF
  if (cursorInicial>coma)
          {
            console.log("despuescom");
          }
          else if(cursorInicial<=coma){
            console.log("antescoma");
            if(valorNew[cursorInicial-1]==0 && valorNew[cursorInicial-2]===undefined)
            {
              
              e.preventDefault();
              if(activador==1){rentabilidad.value=digitado+","+parteF;
              rentabilidad.selectionStart=1;
              rentabilidad.selectionEnd=1;}
              else{inflac.value=digitado+","+parteF;
              inflac.selectionStart=1;
              inflac.selectionEnd=1;} 
            }
            else if(valorNew[cursorInicial-1]===undefined && digitado==0)
            {
              e.preventDefault();              
            }
            else
            {
              e.preventDefault();
              valorNew=valorNew.split("");
              valorNew.splice(cursorInicial,0,digitado);
              dataFinal=valorNew.join("");
              dataFinal=dataFinal.split(".").join("");
              extensionComa=dataFinal.length;
            partidaComa=dataFinal.indexOf(",");
            comaFinal=dataFinal.substring(partidaComa,extensionComa);
            dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");
            if(activador==1){rentabilidad.value=dividirmiles+comaFinal;}
            else{inflac.value=dividirmiles+comaFinal;}
            
            }
            
          }
      ///////////FIN
        }
        }

        else if(digitado==="ArrowLeft" || digitado==="ArrowRight"|| digitado==="Backspace")
        {
          if(digitado==="Backspace")
          {          
          if (cursorInicial===cursorFinal)
          {
            
            if(caracteresInput[cursorInicial-1]===","|| caracteresInput[cursorInicial-1]==0)
          {
            
           if(caracteresInput[cursorInicial-1]==0)
           {
            var longitudtext;
            if(cursorInicial>coma)
            {
             longitudtext=(largo-1)-(coma);
              if(longitudtext>1)
              {}
              else{ e.preventDefault();
                if(activador==1){rentabilidad.selectionStart=cursorInicial-1;
                  rentabilidad.selectionEnd=cursorInicial-1;}
            else{inflac.selectionStart=cursorInicial-1;
                inflac.selectionEnd=cursorInicial-1;}
                
              }
            }
            else
            {
              
              longitudtext=coma;
              if(longitudtext>1)
              {
                console.log("weyy");
                e.preventDefault();
                valorNew=valorNew.split("");
                valorNew.splice(cursorInicial-1,1);
                dataFinal=valorNew.join("");
                dataFinal=dataFinal.split(".").join("");
                extensionComa=dataFinal.length;
              partidaComa=dataFinal.indexOf(",");
              comaFinal=dataFinal.substring(partidaComa,extensionComa);
              dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");
              if(activador==1){rentabilidad.value=dividirmiles+comaFinal;}
            else{inflac.value=dividirmiles+comaFinal; }
                
                /////////////////////////////////
              }
              else{ e.preventDefault();
                if(activador==1){rentabilidad.selectionStart=cursorInicial-1;
                  rentabilidad.selectionEnd=cursorInicial-1;}
            else{inflac.selectionStart=cursorInicial-1;
                inflac.selectionEnd=cursorInicial-1;}
              }
            }
            
           }
           else{
            e.preventDefault();
            if(activador==1){rentabilidad.selectionStart=cursorInicial-1;
              rentabilidad.selectionEnd=cursorInicial-1;}
        else{inflac.selectionStart=cursorInicial-1;
            inflac.selectionEnd=cursorInicial-1;}
           }
           
          }
          else{
            if (cursorInicial>coma)
            {
              
              if(longF-1===0)
              {
                //rentabilidad.value=parseInt(parteI)+","+0;
              dataFinal=parteI.toString().split(".").join("");
              dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");
              if(activador==1){rentabilidad.value=dividirmiles+","+0;
              rentabilidad.selectionStart=0;
              rentabilidad.selectionEnd=0;}
            else{inflac.value=dividirmiles+","+0;
            inflac.selectionStart=0;
            inflac.selectionEnd=0;}
              
                  console.log("aas "+longCaracteresInput);
                setTimeout(espera,0.1);
                var ctime=setTimeout(espera,0.1);
                function espera()
                {
                  console.log("waitttt");
                  if(activador==1){rentabilidad.selectionStart=longCaracteresInput;
                    rentabilidad.selectionEnd=longCaracteresInput;}
            else{inflac.selectionStart=longCaracteresInput;
                inflac.selectionEnd=longCaracteresInput;}
                  
                }
                clearTimeout(ctime);
              }
              else{}
            }
            else{ 
              console.log("borranding");
              if(longI-1===0)
              {
                console.log("rentabilidad.selectionStart" +rentabilidad.selectionStart+cursorInicial);
                if(cursorInicial<1)
                {   
                  dataFinal=parteI+","+parteF;
                }
                else{
                  dataFinal=0+","+parteF;
                }
                dataFinal=dataFinal.toString().split(".").join("");
                extensionComa=dataFinal.length;
                partidaComa=dataFinal.indexOf(",");
                comaFinal=dataFinal.substring(partidaComa,extensionComa);
                dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");

                if(activador==1){rentabilidad.value=dividirmiles+comaFinal;
                  rentabilidad.selectionStart=0;
                  rentabilidad.selectionEnd=0;}
            else{inflac.value=dividirmiles+comaFinal;
                inflac.selectionStart=0;
                inflac.selectionEnd=0;}
                
              }
              else if(valorNew[cursorInicial-2 ]===undefined &&
                valorNew[cursorInicial]==0)
                
              {
                
                e.preventDefault();
                var parteUna=parteI.split("");
                var longParteUna=parteUna.length-1;
                console.log(longParteUna);
                var bucle;
                var ingreso=0;
                for(bucle=1;bucle<=longParteUna;bucle++)
                {
                  if(parteUna[bucle]>0)
                  {
                    ingreso=1;
                    break;
                  }
                }
                if(ingreso==0)
                {
                  parteUna=0;
                }
                else
                {
                  console.log(bucle);
                  console.log(coma);      
                 parteUna=valorNew.substring(bucle,coma);
                }
                dataFinal=parteUna.toString().split(".").join("");
                dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");
                
                console.log(valorNew.selectionStart);
                if(activador==1){rentabilidad.value=dividirmiles+","+parteF;
                rentabilidad.selectionStart=0;
                rentabilidad.selectionEnd=0;}
            else{inflac.value=dividirmiles+","+parteF;
            inflac.selectionStart=0;
            inflac.selectionEnd=0;}
              }
              else
              {
                e.preventDefault();
                valorNew=valorNew.split("");
                console.log(valorNew);
                console.log(cursorInicial);
                if(valorNew[cursorInicial-1]=="," || cursorInicial==0)
                {
                  console.log("aquitoy");
                }
                else
                {
                  valorNew.splice(cursorInicial-1,1);
                  console.log(valorNew);
                dataFinal=valorNew.join("");
                dataFinal=dataFinal.split(".").join("");
                extensionComa=dataFinal.length;
              partidaComa=dataFinal.indexOf(",");
              comaFinal=dataFinal.substring(partidaComa,extensionComa);
              dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");
              if(activador==1){rentabilidad.value=dividirmiles+comaFinal;}
            else{inflac.value=dividirmiles+comaFinal; }
              
              //rentabilidad.selectionStart=0;
                //rentabilidad.selectionEnd=0;
                }
              }
            }
          }
          }

          else
          {
            console.log(cursorInicial);
            console.log(cursorFinal);
            var posicionBorrados=[];
            while(cursorInicial<cursorFinal)
            {
              e.preventDefault();
              if(caracteresInput[cursorInicial]===",")
              {
                cursorInicial+=1;
              }
              else
              {
                posicionBorrados.push(cursorInicial);
                cursorInicial+=1;
              }
              
            }
            var rep;
            var longitudPosicionBorrados=posicionBorrados.length;
            var borrar;
            for (rep=0;rep<longitudPosicionBorrados;rep++)
            {
              borrar=posicionBorrados[rep];
                caracteresInput.splice(borrar-rep,1);
            }
            var newComa=caracteresInput.indexOf(",");
            var newlength=caracteresInput.length-1;
            var rentabilidadRes;
            console.log(newComa);
            console.log(newlength);
            //NUEVA PARTE INICIAL
            var partOne=caracteresInput.join("").substring(0,newComa).split('');
            var longPartOne=partOne.length-1;
            var partTwo=caracteresInput.join("").substring(newComa,newlength+1).split('');
            var ite;
            var entro=0;
           
            for(ite=0;ite<=longPartOne;ite++)
            {
              if(partOne[ite-ite]==0)
              {
                partOne.splice(ite-ite,1);
                entro=1;
              }
              else
              {break;
              }
            }
            if (newComa>=2 && entro==1)
            { 
                caracteresInput=partOne.join("")+partTwo.join("");
            }
            else
            {
              caracteresInput=caracteresInput.join("");
            }
            //////
      //estructurar mejor este codigo
            if(newComa==newlength && newComa>=1)
            {
              rentabilidadRes=caracteresInput+0;
              console.log("aui1");
            }
            if(newComa==0 && newlength>=1)
            {
             rentabilidadRes=0+caracteresInput;
             console.log("aui2");
            }
            if(newComa==0 && newlength==0)
            {
              rentabilidadRes=0+caracteresInput+0;
              console.log("aui3");
            }
            if(newlength>newComa && newComa>=1)
            {
              rentabilidadRes=caracteresInput;
              console.log("aui4");
            }
            console.log(rentabilidadRes);
   dataFinal=rentabilidadRes.split(".").join("");
   extensionComa=dataFinal.length;
   partidaComa=dataFinal.indexOf(",");
   comaFinal=dataFinal.substring(partidaComa,extensionComa);
   dividirmiles=new Intl.NumberFormat('en-EN').format(parseFloat(dataFinal)).replace(/,/g,".");

   //rentabilidad.value=rentabilidadRes;
   if(activador==1){rentabilidad.value=dividirmiles+comaFinal;
    rentabilidad.selectionStart=0;
    rentabilidad.selectionEnd=0;}
            else{inflac.value=dividirmiles+comaFinal;
              inflac.selectionStart=0;
              inflac.selectionEnd=0;}
          }        
          }
        }
        else{          
          e.preventDefault();
        }
        //CREAR CHECKBX
        var valorNegativo=document.getElementById("valorNegativo");
        var valorNegativoDos=document.getElementById("valorNegativoDos");

        var vInput;
        setTimeout(waittt,0.1);
                var cltime=setTimeout(waittt,0.1);
                function waittt()
                { 
                  console.log(rentabilidad.value +" & " +valorNew);
                  if(activador==1){vInput=rentabilidad.value.split(",").join("");}
            else{vInput=inflac.value.split(",").join("");}
                    
                    vInput=vInput.split(".").join("");
                  vInput=parseInt(vInput);
                  console.log(vInput);
                  if(activador==1)
                  {
                    if(vInput>0 && valorNegativo.childElementCount==0)
                    {
                    var crearInput=document.createElement('INPUT');
                    crearInput.setAttribute("type","checkbox");
                    crearInput.setAttribute("id","negativoUno");
                    valorNegativo.appendChild(crearInput);
                    } 
                    if(vInput<=0 && valorNegativo.childElementCount>0)
                    {
                      valorNegativo.removeChild(valorNegativo.firstChild);
                    }
                  }
            else
            {
              if(vInput>0 && valorNegativoDos.childElementCount==0)
                    {
                    var crearInput=document.createElement('INPUT');
                    crearInput.setAttribute("type","checkbox");
                    crearInput.setAttribute("id","negativoDos");
                    valorNegativoDos.appendChild(crearInput);
                    } 
                    if(vInput<=0 && valorNegativoDos.childElementCount>0)
                    {
                      valorNegativoDos.removeChild(valorNegativoDos.firstChild);
                    }
            }   
                }
                clearTimeout(cltime);   
          
        
        //FIN CHECKBOX
}

var boton_calcular=document.getElementById("calcular");
boton_calcular.addEventListener("click",rentabilidadR);

function rentabilidadR()
{
  var vlrRent=parseFloat(rentabilidad.value.split(".").join("").replace(/,/g,"."))/100;
var vlrInflac=parseFloat(inflac.value.split(".").join("").replace(/,/g,"."))/100;
  //VALIDAR SI ESTA MARCADO EL CHECK      
if(valorNegativo.childElementCount>0)
{
  var checkUno=document.getElementById("negativoUno");
  if(checkUno.checked===true)
{
  vlrRent=vlrRent*-1;
}
  console.log(checkUno.checked);
}
if(valorNegativoDos.childElementCount>0)
{
  var checkDos=document.getElementById("negativoDos");
  console.log(checkDos.checked);
  if(checkDos.checked===true)
  {
    vlrInflac=vlrInflac*-1;
  }
}
//FIN VALIDACION DELCHECK
console.log(vlrRent);
console.log(vlrInflac);
var vlrRentReal;
  vlrRentReal=(((1+vlrRent)/(1+vlrInflac)-1)*100).toFixed(5);
console.log(vlrRentReal);
//////
      /*var ubiCma=vlrRentReal.indexOf(",");
      var vlrUno=vlrRentReal.substring(0,ubiCma);*/ 
      vlrRentReal=vlrRentReal.toString().replace(".",","); 
      var ubiPto1=vlrRentReal.toString().lastIndexOf(",");  
      var longvlrRentReal=vlrRentReal.length;
      var vlrDos=vlrRentReal.toString().substring(ubiPto1,longvlrRentReal);
vlrRentReal=new Intl.NumberFormat('en-EN').format(parseFloat(vlrRentReal)).replace(/,/g,".");
//var ubiPto2=vlrRentReal.toString().lastIndexOf(".");
/*var vlrDos=vlrRentReal.substring(ubiCma,longvlrRentReal);*/
console.log(vlrRentReal);
//console.log(vlrUno);
if(ubiPto1<0)
{
  rentabilidadReal.value=vlrRentReal+","+0;
}
else
{
 rentabilidadReal.value=vlrRentReal+vlrDos; 
}
}
//FIN JAVASCRIPT PURO