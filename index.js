async function fetchQuery({ data, url, service, qa = false }) {
  //Recibe data como objeto y lo transforma de formData o un array
  // Objeto: {nombre:"valor"}, Array : [['nombre','valor']]
  try {
    const formData = new FormData();
    //tratamos segun sea objeto o array
    // console.log(typeof data)
    let optionService = false;
    if (!Array.isArray(data)) {
      optionService = data.optionService && data.optionService;
      for (const key in data) {
        formData.append(key, data[key]);
      }
    } else {
      data.forEach((item) => {
        formData.append(item[0], item[1]);
        if (item[0] === "optionService") optionService = item[1];
      });
    }
    const response = await fetch(
      //Lo enviamos a la url y servicio seleccionado
      //cuando activamos qa, coloca una bandera para identificar en caso de que sea un solo service
      url + service + (qa && optionService ? "?" + optionService : ""),
      {
        method: "POST",
        body: formData,
      }
    );
    //Retornamos la respuesta del servidor
    return await response.json();
  } catch (error) {
    //Imprimimos el error, y retornamos array vacio
    console.error("Error:", error);
    return [];
  }
}
module.exports = { fetchQuery };