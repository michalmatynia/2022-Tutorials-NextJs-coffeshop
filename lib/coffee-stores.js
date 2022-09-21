const getUrlForCoffeeStores = (
  limit = 1,
  near = 'Toronto',
  latLong = '',
  query = ''
) =>
  `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&near=${near}&limit=${limit}`;

export default async function fetchCoffeeStores() {
  // export default fetchCoffeeStores = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.FOURSQUARE_AUTH,
    },
  };

  const response = await fetch(getUrlForCoffeeStores(6, 'Szczecin'), options);

  const data = await response.json();

  if (!response.ok) {
    throw Error;
  }

  return data.results;
}
