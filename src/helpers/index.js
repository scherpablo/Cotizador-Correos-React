const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
    }).format(valor);

    return formatter.replace(/,/g, ".");
};

// const devolverDinero = (correos, plazo) => {
//     let total;
//     const valor = 1299;
//     const valor12 = 8388;
//     const valor24 = 14376;
//     const valor48 = 23952;

//     if (correos) {
//         total = correos;
//     }

//     if (plazo === 12) {
//         total *= valor12 * 1.5;
//     }else if (plazo === 24) {
//         total *= valor24 * 1.5;
//     }else if (plazo === 48) {
//         total *= valor48 * 1.5;
//     }else {
//         total *= valor * 1.5;    
//     }
//     return total;
// }
const devolverDinero = (correos, plazo) => {
    let total = 0;

    const precios = {
        1: 1299,
        12: 8388,
        24: 14376,
        48: 23952
    };

    if (correos) {
        total = correos;
    }

    const precioPlazo = precios[plazo] || precios[1];
    total *= precioPlazo * 1.5;

    return total;
}

const calcularPagoMensual = (total, plazo) => {
    return total / plazo;
}

function textoPluralSingular(valor, textoSingular, textoPlural) {
    if (valor === 1) {
        return textoSingular;
    }
    return textoPlural;
}

function textoCorreos(correos) {
    return textoPluralSingular(correos, "correo", "correos");
}

function textoMeses(meses) {
    return textoPluralSingular(meses, "Mes", "Meses");
}

function textoCuotas(meses) {
    return textoPluralSingular(meses, "cuota", "cuotas");
}


export {
    formatearDinero,
    devolverDinero,
    calcularPagoMensual
};