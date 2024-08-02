const Local = require("../models/Usuario");
const { obterLocal, obterLink } = require('./geoFinder')

const obterLocal = async (cep) => {
  //  obter coordenadas a partir do CEP
  
  return "???"; 
};

Local.beforeCreate(async (local) => {
  const { latitude, longitude } = await obterLocal(local.cep)
  local.latitude = latitude;
  local.longitude = longitude;
})

Local.beforeUpdate(async (local) => {
   
      const { lat, lng } = await obterLocal(
        local.cep
      );
      local.latitude = lat;
      local.longitude = lng;
    
  });

module.exports = Local;
