const axios = require("axios");
const { response } = require("express");
const linkMapApi = "https://cep.awesomeapi.com.br/json"; // 05424020
//https://cep.awesomeapi.com.br/:format/:cep

/*versão nominatim
https://nominatim.openstreetmap.org/search?format=json&country=Brazil&lmit=1 */

async function obterLocal(cep) {
  try {
    const resposta = await axios.get(`${linkMapApi}/${cep}`);
    //NOMINATIM: axios.get(`${linkMap}&postalcode=${cep}`);

    if (!resposta.data || !resposta.data.length === 0) {
      throw new Error ("CEP não encontrado!");
    }

    //NOMINATIM: const { lat, lon, display_name } = resposta.data[0]

    //latitude, longitude = data.lat, data.lng // do professor
    const { lat, lng } = resposta.data; //desestruturando
    /*const lat = resposta.data.lat;
    const lng = resposta.data.lng;
*/
    //NOMINATIM: return { lat, lon, display_name }
    return resposta.data;
  } catch (error) {
    throw new Error("Erro ao obter CEP!");
  }
}

//axios retorna isso:
/*{
--->data: {},<---        // Os dados retornados pela requisição
    status: 200,         // O código de status HTTP da resposta
    statusText: "OK",    // O texto do status HTTP
    headers: {},         // Os cabeçalhos HTTP da resposta
    config: {},          // A configuração da requisição original
    request: {}          // O objeto de requisição HTTP (geralmente presente apenas no navegador)
  }*/

async function obterLink(coordenadas) {
  try {
    const { lat, lon } = coordenadas;
    const linkGmaps = `hhtp://www.googlemaps.com/,maps?q=${lat}, ${lon}`
    return linkGmaps
  } catch (error) {}
}

module.exports = obterLocal, obterLink