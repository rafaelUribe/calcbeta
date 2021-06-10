var inputvalorfactura =  document.getElementById("vf")
var inputcxa = document.getElementById("cxa") 
var inputmf = document.getElementById("mf")
var inputvr = document.getElementById("vr")
var inputplazo = document.getElementById("pz")
var inputpago = document.getElementById("pago")
var inputiva = document.getElementById("iva")
var inputrenta = document.getElementById("pagomasiva")
var inputgi = document.getElementById("gi")
var inputi = document.getElementById("i")
var inputprcvr = document.getElementById("%vr")
var inputprccxa = document.getElementById("%cxa")
var inputprcgi = document.getElementById("%gi")

inputvalorfactura.addEventListener("input", updateParameters)
inputcxa.addEventListener("input", updateParameters)
inputvr.addEventListener("input", updateParameters)
inputplazo.addEventListener("input", updateParameters)
inputrenta.addEventListener("input", updateParameters)
inputgi.addEventListener("input", updateParameters)  

var vf
var mf
var cxa
var vr
var plazo
var pago
var iva
var renta
var gastosivestigacion
var tasa
var percentvr 
var percentcxa
var percentgastosdeinv
var prciva = 1.16

console.log(inputmf)


function updateParameters() {
    obtenerValorFactura()
    obtenerComisionPorApertura()
    obtenerMontoFinanciar()
    obtenerResidual()
    obtenerPlazo()
    obtenerRentaTotal()
    obtenerPagoSinIva()
    obtenerIva()
    obtenerGastosDeInv()
    obtenerTasa()
    obtenerPorcentajeVR()
    obtenerGastosDeInv()
    obtenerPorcentajeGI()
}

function obtenerValorFactura() { 
    vf = parseFloat(inputvalorfactura.value)
}

function obtenerComisionPorApertura() {
    if(inputcxa.value > 0 & inputvalorfactura.value > 0) {
        cxa = parseFloat(inputcxa.value)
        let prc = (cxa/vf)*100
        inputprccxa.innerText = `${prc.toFixed(8)}%`
    }   else {
        inputprccxa.innerText = 0
    }
}

function obtenerMontoFinanciar() {
    mfcorto = 0
    if(vf > 0 & cxa > 0) {
        mf = vf - cxa
        mfcortoStr = mf.toFixed(8)
        mfcorto = parseFloat(mfcortoStr)
    }
    inputmf.innerHTML = mfcorto  
}

function obtenerResidual() {
    vr = parseFloat(inputvr.value)
}

function obtenerPlazo() {
    plazo = parseFloat(inputplazo.value)
}

function obtenerRentaTotal() {
    renta = parseFloat(inputrenta.value)
}

function obtenerPagoSinIva() {
    pagocorto = 0
    if(renta > 0) {
        pago = renta/prciva
        pagocortoStr = pago.toFixed(8)
        pagocorto = parseFloat(pagocortoStr)
    }
    inputpago.innerHTML = pagocorto
}

function obtenerIva() {
    ivacorto = 0
    if(renta > 0) {
        iva = pago * .16
        ivacortoStr = iva.toFixed(8)
        ivacorto = parseFloat(ivacortoStr)
    }
    inputiva.innerHTML = ivacorto
}

function obtenerGastosDeInv() {
    gastosivestigacion = parseFloat(inputgi.value)
}


function obtenerPorcentajeVR() {
    percentvrcorto = 0
    if(vr > 0 & vf > 0) {
        percentvr = vr/vf * 100
        percentvrcortoStr = percentvr.toFixed(8)
        percentvrcorto = parseFloat(percentvrcortoStr)
    }
    inputprcvr.innerHTML = `${percentvrcorto}%`
}

function obtenerPorcentajeGI() {
    percentgastosdeinvcorto = 0
    if(vf > 0 & gastosivestigacion > 0) {
        percentgastosdeinv = gastosivestigacion/mf * 100
        percentgastosdeinvcortoStr = percentgastosdeinv.toFixed(3)
        percentgastosdeinvcorto = parseFloat(percentgastosdeinvcortoStr)
    }
    inputprcgi.innerHTML = percentgastosdeinvcorto
}

function obtenerTasa() {
    tasa = getRate(plazo, pago, -mf, vr, 0, 0.1)
    tasa = tasa * 100
    inputi.innerHTML = tasa.toFixed(2)
}

function getRate(periods, payment, present, future, type, guess) {
    guess = (guess === undefined) ? 0.01 : guess;
    future = (future === undefined) ? 0 : future;
    type = (type === undefined) ? 0 : type;
  
    var epsMax = 1e-10;
  
    var iterMax = 10;
  
    var y, y0, y1, x0, x1 = 0,
      f = 0,
      i = 0;
    var rate = guess;
    if (Math.abs(rate) < epsMax) {
      y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
    } else {
      f = Math.exp(periods * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = present + payment * periods + future;
    y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
    i = x0 = 0;
    x1 = rate;
    while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
      rate = (y1 * x0 - y0 * x1) / (y1 - y0);
      x0 = x1;
      x1 = rate;
        if (Math.abs(rate) < epsMax) {
          y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
        } else {
          f = Math.exp(periods * Math.log(1 + rate));
          y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }
      y0 = y1;
      y1 = y;
      ++i;
    }
    return rate*12;
};

