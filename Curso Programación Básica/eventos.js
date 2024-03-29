var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
};

document.addEventListener("keydown",dibujarTeclado);
var cuadrito = document.getElementById("area_de_dibujo");
var papel = cuadrito.getContext("2d");
var x = 150;
var y = 150;

dibujarLinea("Violet", 149, 149, 151, 151, papel);

function dibujarLinea(color, x_inicial, y_inicial, x_final, y_final, lienzo){

    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = 5;
    lienzo.moveTo(x_inicial, y_inicial);
    lienzo.lineTo(x_final, y_final);
    lienzo.stroke();
    lienzo.closePath();
}

function dibujarTeclado(evento){

    var colorcito = "Violet";
    var movimiento = 10;

    switch(evento.keyCode){
        case teclas.UP:
            dibujarLinea(colorcito, x, y, x, y-movimiento, papel);
            y = y - movimiento;
        break;
        case teclas.DOWN:
            dibujarLinea(colorcito, x, y, x, y+movimiento, papel);
            y = y + movimiento;
        break;
        case teclas.LEFT:
            dibujarLinea(colorcito, x, y, x-movimiento, y, papel);
            x = x - movimiento;
        break;
        case teclas.RIGHT:
            dibujarLinea(colorcito, x, y, x+movimiento, y, papel);
            x = x + movimiento;
        break;
    }
}