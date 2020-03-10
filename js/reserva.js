var Reserva = function(horarioReserva, cantidadPersonas, precioPersona, codigoDescuento){
    this.horarioReserva = horarioReserva;
    this.cantidadPersonas = cantidadPersonas;
    this.precioPersona = precioPersona;
    this.codigoDescuento = codigoDescuento
}


Reserva.prototype.precioBase = function(){
    return this.cantidadPersonas * this.precioPersona;
}


Reserva.prototype.precioFinal = function(){

    var precioBase = this.precioBase();
    var adicionales = this.adicionales(precioBase)
    var descuentos = this.descuentos(precioBase)

    return precioBase + adicionales - descuentos; 
}


Reserva.prototype.adicionales = function(numero){
    return this.adicionalPorFinde(numero) + this.adicionalPorHora (numero);
};

Reserva.prototype.adicionalPorFinde = function (numero){
    var adicion = 0;
    var diaEnNumeros = this.horarioReserva.getDay();

    if(diaEnNumeros === 5 || diaEnNumeros === 6 || diaEnNumeros === 0) {
        adicion = numero * 0.10
    }
    return adicion
}

Reserva.prototype.adicionalPorHora = function (numero){
    var adicion = 0;
    var horaEnNumeros = this.horarioReserva.getHours()
    var horaPico = (horaEnNumeros >= 13 && horaEnNumeros <=14) || (horaEnNumeros >= 20 && horaEnNumeros <=21);

    if(horaPico){
        adicion = numero * 0.05
    }
    return adicion;
}


Reserva.prototype.descuentos = function(numero){
    return this.descuentoPorPersona(numero) + this.descuentoPorCodigo (numero);
}

Reserva.prototype.descuentoPorPersona = function (numero){
    var descuento = 0

    if(this.cantidadPersonas >= 4 && this.cantidadPersonas <= 6){
        descuento = (numero * 0.05)
    }
    if(this.cantidadPersonas === 7 || this.cantidadPersonas === 8){
        descuento = (numero * 0.10)
    }
    if(this.cantidadPersonas > 8){
        descuento = (numero * 0.15)
    }

    return descuento
    
}

Reserva.prototype.descuentoPorCodigo = function(numero){
    var descuento = 0

    if(this.codigoDescuento === "DES15"){
        descuento =  (numero * 0.15)
    }
    if(this.codigoDescuento === "DES200"){
        descuento =  200   
    }
    if(this.codigoDescuento === "DES1"){
        descuento =  this.precioPersona
    }
    return descuento

}