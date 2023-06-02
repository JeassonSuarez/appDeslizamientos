import React, { useEffect, useState } from "react";

const Data = () => {
  const [claseDato, setClaseDato] = useState("");
  const [dato, setDato] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/listarDatos`, {
      type: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        console.log(respuesta);
        respuesta.hay ? setDato([...respuesta.data]) : alert("No hay datos");
        // console.log(respuesta.data);
      });
  }, []);

  setTimeout(() => {
    fetch(`http://localhost:3000/listarDatos`, {
      type: "no-cors",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((respuesta) => respuesta.json())
      .then((respuesta) => {
        respuesta.hay ? setDato([...respuesta.data]) : alert("No hay datos");
        // console.log(respuesta.data);
      });
  }, 60000);

  return (
    <div className="div-data">
      <div className="data-div numeroLectura">
        <h2>#</h2>
        {dato.map((e, i) => {
          return (
            <p
              key={i}
              className={
                parseFloat(e[3]) < 263
                  ? "muybajo"
                  : parseFloat(e[3]) < 525
                  ? "bajo"
                  : parseFloat(e[3]) < 728
                  ? "medio"
                  : "alto"
              }
            >
              {i + 1}
            </p>
          );
        })}
      </div>
      <div className="data-div nombreSensor">
        <h2>Sensor</h2>
        {dato.map((e, i) => {
          return (
            <p
              key={i}
              className={
                parseFloat(e[3]) < 263
                  ? "muybajo"
                  : parseFloat(e[3]) < 525
                  ? "bajo"
                  : parseFloat(e[3]) < 728
                  ? "medio"
                  : "alto"
              }
            >
              {e[1]}
            </p>
          );
        })}
      </div>
      <div className="data-div fecha">
        <h2>Fecha</h2>
        {dato.map((e, i) => {
          const fecha = new Date(e[2]);

          const year = fecha.getFullYear();
          const month = ("0" + (fecha.getMonth() + 1)).slice(-2);
          const day = ("0" + fecha.getDate()).slice(-2);
          const hours = ("0" + fecha.getHours()).slice(-2);
          const minutes = ("0" + fecha.getMinutes()).slice(-2);

          const fechaFormateada = `${year}/${month}/${day} ${hours}:${minutes}`;
          return (
            <p
              key={i}
              className={
                parseFloat(e[3]) < 263
                  ? "muybajo"
                  : parseFloat(e[3]) < 525
                  ? "bajo"
                  : parseFloat(e[3]) < 728
                  ? "medio"
                  : "alto"
              }
            >
              {fechaFormateada}
            </p>
          );
        })}
      </div>
      <div className="data-div lectura">
        <h2>Dato</h2>
        {dato.map((e, i) => {
          return (
            <p
              key={i}
              className={
                parseFloat(e[3]) < 263
                  ? "muybajo"
                  : parseFloat(e[3]) < 525
                  ? "bajo"
                  : parseFloat(e[3]) < 728
                  ? "medio"
                  : "alto"
              }
            >
              {e[3]}
            </p>
          );
        })}
      </div>
    </div>
  );
};

export default Data;
