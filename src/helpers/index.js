const formatearDinero = (valor) => {
    const formatter = new Intl.NumberFormat('en-US', {
        currency: 'USD',
        style: 'currency',
        // maximumFractionDigits: 0
    }).format(valor);

    return formatter.replace(/,/g, ".");
};

const devolverDinero = (correos, plazo) => {
    let total;
    const valor = 1299;
    const valor12 = 8388;
    const valor24 = 14376;
    const valor48 = 23952;

    if (correos) {
        total = correos * 1;
    }

    if (plazo === 12) {
        total *= valor12 * 1.5;
    }else if (plazo === 24) {
        total *= valor24 * 1.5;
    }else if (plazo === 48) {
        total *= valor48 * 1.5;
    }else {
        total *= valor * 1.5;    
    }
    return total;
}

const calcularPagoMensual = (total, plazo) => {
    return total / plazo;
}

export {
    formatearDinero,
    devolverDinero,
    calcularPagoMensual
};