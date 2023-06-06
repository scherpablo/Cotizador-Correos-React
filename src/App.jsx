import { useState, useEffect } from "react"
import Swal from 'sweetalert2';
import Header from "./components/Header"
import Button from "./components/Button"
import { formatearDinero, devolverDinero, calcularPagoMensual } from "./helpers/index.js";

function App() {
  const [correos, setCorreos] = useState(5);
  const [meses, setMeses] = useState(1);
  const [total, setTotal] = useState(0);
  const [pago, setPago] = useState(0);

  function textoCorreos() {
    if (correos === 1) {
      return "correo";
    }
    return "correos";
  }

  function textoMeses() {
    if (meses === 1) {
      return "Mes";
    }
    return "Meses";
  }

  function textoCuotas() {
    if (meses === 1) {
      return "cuota";
    }
    return "cuotas";
  }

  useEffect(() => {
    setTotal(devolverDinero(correos, meses));
  }, [correos, meses]);

  useEffect(() => {
    setPago(calcularPagoMensual(total, meses));
  }, [total, meses]);

  const MIN = 1;
  const MAX = 10;
  const STEP = 1;

  function handleChange(e) {
    setCorreos(+e.target.value)
  }

  function handleClickDecremento() {
    const valor = correos - STEP;

    if (valor < MIN) {
      Swal.fire(
        'Cantidad no valida',
        'presiona OK para continuar',
        'error'
      )
      return;
    }
    setCorreos(valor);
  }

  function handleClickIncremento() {
    const valor = correos + STEP;

    if (valor > MAX) {
      Swal.fire(
        'Cantidad no valida',
        'presiona OK para continuar',
        'error'
      )
      return;
    }
    setCorreos(valor);
  }

  const span = "de pagos";

  return (
    <div className="my-10 max-w-lg mx-auto bg-indigo-100 shadow-md pl-10 pr-10 pt-5 pb-5 rounded-lg border border-indigo-300">
      <Header />
      <div className="flex justify-between my-5">
        <Button
          operador="-"
          fn={handleClickDecremento}
        />
        <Button
          operador="+"
          fn={handleClickIncremento}
        />
      </div>

      <input
        type="range"
        className="w-full h-6 accent-black hover:accent-black mt-3"
        onChange={handleChange}
        min={MIN}
        max={MAX}
        step={STEP}
        value={correos}
      />

      <p className="text-center text-4xl my-1 font-extrabold text-indigo-600">{correos} {textoCorreos()}</p>

      <select className="mt-3 w-full p-2 bg-indigo-100 border border-indigo-500 rounded-lg text-center text-xl font-extrabold text-black"
        value={meses}
        onChange={e => setMeses(+e.target.value)}>
        <option value="1">1 Mes</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
        <option value="48">48 Meses</option>
      </select>

      <div className="my-5 space-y-3 bg-indigo-200 rounded-xl p-5 ">
        <h2 className="text-4xl font-extrabold text-center">Resumen
          <span className="text-indigo-600 font-extrabold"> {span} </span>
          <p className="text-xl text-center font-extrabold mt-5">* Período <span className="text-indigo-600 font-extrabold">{meses} {textoMeses()}</span> *</p>
          <p className="text-xl text-center font-extrabold mt-2">* 1 pago de <span className="text-green-600 font-extrabold">{formatearDinero(total)}</span> *</p>
          <p className="text-xl text-center font-extrabold mt-2">* {meses} {textoCuotas()} de <span className="text-indigo-600 font-extrabold">{formatearDinero(pago)}</span> *</p>
        </h2>
        <div className="text-center">
          <a href="https://www.mercadopago.com.ar">
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
              Abona por MP
            </button>
          </a>
        </div>
      </div>
      <p className="text-xs text-center font-bold text-gray-800">El servicio incluye contratación del dominio, alojamiento en servidores y configuración de correo electrónico.</p>
      <p className="text-xs text-center font-bold mt-1 text-gray-800">Si tienes alguna duda puedes contactarme al 1132069043.</p>
    </div>
  )
}

export default App
