
export let gas_cost=0;
//returns gas for rapid time (within 15s)
//https://www.gasnow.org/
export const getGas = async function(){
  fetch("https://www.gasnow.org/api/v3/gas/price?utm_source=85734", {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.json())
  .then(res => {
    gas_cost = res.data.rapid //this is wei amount. to convert to Gwei divide by 1000000000
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}
