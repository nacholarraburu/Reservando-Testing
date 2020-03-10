var expect = chai.expect;

describe("Testeando funcion reservarHorario(horario)", function(){


    it("Cuando se reserva un horario de un restaurant, el horario correspondiente se elimina del arreglo.", function(){

        var restoPrueba = new Restaurant();
        restoPrueba.horarios = ["13:00", "15:30", "18:00"]
        var horarioTestTrue = "13:00";

        restoPrueba.reservarHorario(horarioTestTrue);

        expect(restoPrueba.horarios).to.not.include(horarioTestTrue); 
        expect(restoPrueba.horarios.length).to.equal(2)
    })
    it("Cuando se reserva un horario que el restaurant no posee, el arreglo se mantiene igual.", function(){

        var restoPrueba = new Restaurant();
        restoPrueba.horarios = ["13:00", "15:30", "18:00"]
        var horarioTestFalse = "21:00"

        restoPrueba.reservarHorario(horarioTestFalse); 

        expect(restoPrueba.horarios.length).to.equal(3) 
    })
    it("Cuando se intenta reservar un horario pero no se le pasa ningún parámetro a la función, el arreglo se mantiene igual.", function(){

        var restoPrueba = new Restaurant();
        restoPrueba.horarios = ["13:00", "15:30", "18:00"]
        
        restoPrueba.reservarHorario();

        expect(restoPrueba.horarios.length).to.equal(3)  
    })
})

describe("Testeando funcion obtenerPuntuacion()", function(){

    it("Dado un restaurant con determinadas calificaciones, la puntuación (que es el promedio de ellas) se calcula correctamente", function(){
        var restoPrueba = new Restaurant();
        restoPrueba.calificaciones = [2, 3, 5, 10, 10];
        
        expect(restoPrueba.obtenerPuntuacion()).to.equal(6);
    })
    it("Dado un restaurant que no tiene ninguna calificación, la puntuación es igual a 0", function(){
        var restoPrueba = new Restaurant();
        restoPrueba.calificaciones = [];

        expect(restoPrueba.obtenerPuntuacion()).to.equal(0)
    })
})

describe("Testeando funcion calificar(nuevaCalificacion)", function(){

    it("Dado un numero con coma, la calificacion se mantiene igual", function(){
        var restoPrueba = new Restaurant()
        restoPrueba.calificaciones = []
        restoPrueba.calificar(2.5)

        expect(restoPrueba.calificaciones.length).to.equal(0)
    })

    it("Dado un numero entero entre 1 y 10, se agrega el numero a la calificacion", function(){
        var restoPrueba = new Restaurant()
        restoPrueba.calificaciones = []
        restoPrueba.calificar(7)

        expect(restoPrueba.calificaciones.length).to.equal(1)    
    })

    it("Dado un numero mayor a 10, la calificacion se mantiene igual", function(){
        var restoPrueba = new Restaurant()
        restoPrueba.calificaciones = []
        restoPrueba.calificar(13)

        expect(restoPrueba.calificaciones.length).to.equal(0)
    })

    it("No dando ningun valor, la calificacion se mantiene igual", function(){
        var restoPrueba = new Restaurant()
        restoPrueba.calificaciones = []
        restoPrueba.calificar()

        expect(restoPrueba.calificaciones.length).to.equal(0)    
    })

})

describe("Testeando funcion buscarRestaurante(id)",function(){

    it("Cuando se busca un id correcto, devuelve dicho restaurant", function(){
        
        expect(listado.buscarRestaurante(2).nombre).to.eql("Mandarín Kitchen")
    })
    it("Cuando se busca un id incorrecto, retorna false", function(){
        expect(listado.buscarRestaurante(27).nombre).to.be.undefined;
    })
    it("Cuando se busca un id vacio, retorna false", function(){
        expect(listado.buscarRestaurante(0).nombre).to.be.undefined;
    })
})

describe("Testeando la función obtenerRestaurantes()",function(){
    it("Si todos los filtros son correctos, se agrega el restaurant al listado", function(){
        var filtroPrueba = listado.obtenerRestaurantes("Hamburguesa", "Berlín","11:30")
        expect(filtroPrueba.length).to.eql(1)
    })
    it("Si un filtro es correctos se agrega el restaurant al listado", function(){
        var filtroPrueba = listado.obtenerRestaurantes("Hamburguesa", null,null)
        
        expect(filtroPrueba.length).to.eql(4)
    })
    it("Si algun filtro es incorrecto, no se agrega nada al listado", function(){
        var filtroPrueba = listado.obtenerRestaurantes("Hamburguesa")
        
        expect(filtroPrueba.length).to.eql(0)
    })
    it("Si todos los filtros son incorrectos, no se agrega nada al listado", function(){
        var filtroPrueba = listado.obtenerRestaurantes()
        
        expect(filtroPrueba.length).to.eql(0)
    })

})

describe("Testeando los métodos de Reserva",function(){
    it("Dado determinada cantidadPersonas(8) y precioPorPersona(350) el precioBase se calcula correctamente", function(){
        var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva1.precioBase()).to.eql(2800)
    })
    it("Dado determinada cantidadPersonas(8) y precioPorPersona(350) y descuento(DES1) el precioFinal se calcula correctamente", function(){
        var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");

        
        expect(reserva1.precioFinal()).to.eql(2450)
    })
    it("Dado determinada cantidadPersonas(8) y precioPorPersona(350) y descuento(DES1) el descuento se calcula correctamente", function(){
        var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva1.descuentos(reserva1.precioBase())).to.eql(630)
    })
    it("Dado determinada cantidadPersonas(8) y precioPorPersona(350) y descuento(DES1) el adicional se calcula correctamente", function(){
        var reserva1 = new Reserva (new Date(2018, 7, 24, 11, 00), 8, 350, "DES1");
        expect(reserva1.adicionales(reserva1.precioBase())).to.eql(280)
    })

    it("Dado determinada cantidadPersonas(2) y precioPorPersona(150) el precioBase se calcula correctamente", function(){
        var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        expect(reserva2.precioBase()).to.eql(300);
    })
    it("Dado determinada cantidadPersonas(2) y precioPorPersona(150) y descuento(DES200) el precioFinal se calcula correctamente", function(){
        var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        expect(reserva2.precioFinal()).to.eql(100);
    })
    it("Dado determinada cantidadPersonas(2) y precioPorPersona(150) y descuento(DES200) el descuento se calcula correctamente", function(){
        var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");
        expect(reserva2.descuentos(reserva2.precioBase())).to.eql(200)
    })
    it("Dado determinada cantidadPersonas(2) y precioPorPersona(150) y descuento(DES200) el adicional se calcula correctamente", function(){
        var reserva2 = new Reserva (new Date(2018, 7, 27, 14, 100), 2, 150, "DES200");;
        expect(reserva2.adicionales(reserva2.precioBase())).to.eql(0)
    })

})