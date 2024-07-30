const Local = require("../models/Usuario");
const obterLocal = require('./geoFinder')

const getCoordinatesFromCEP = async (cep) => {
  // Implementação da lógica para obter coordenadas a partir do CEP
  // Aqui você usaria um serviço externo ou uma função própria para calcular
  return { latitude: -23.55052, longitude: -46.633308 }; // Exemplo de retorno
};

Local.beforeCreate(async (local) => {
  const { latitude, longitude } = await obterLocal(local.cep)
  local.latitude = latitude;
  local.longitude = longitude;
})

Local.beforeUpdate(async (local) => {
    if (local.changed("cep")) {
      const { latitude, longitude } = await obterLocal(
        local.cep
      );
      local.latitude = latitude;
      local.longitude = longitude;
    }
  });

module.exports = Local;
