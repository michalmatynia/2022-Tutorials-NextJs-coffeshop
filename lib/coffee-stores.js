import { createApi } from 'unsplash-js';

const unsplashApi = createApi({
  accessKey: process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY,
  // ...other fetch options
});

const getUrlForCoffeeStores = ({
  latLong = '',
  limit = 6,
  near = !latLong ? 'Warsaw' : '',
  query = 'coffee shop',
}) =>
  `https://api.foursquare.com/v3/places/search?ll=${latLong}&query=${query}&near=${near}&limit=${limit}`;

const getListCoffeeStorePhotos = async () => {
  const photos = await unsplashApi.search.getPhotos({
    query: 'coffee shop',
    page: 1,
    perPage: 40,
    // color: 'brown',
    orientation: 'squarish', // landscape, squarish, portrait
  });

  // console.log(photos.response.results);

  const unsplashResults = photos.response.results;
  const photosResponse = unsplashResults.map((result) => result.urls.small);

  return photosResponse;
};

export default async function fetchCoffeeStores({ latLong = '' }) {
  const photos = await getListCoffeeStorePhotos();
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: process.env.NEXT_PUBLIC_FOURSQUARE_AUTH,
    },
  };

  const response = await fetch(getUrlForCoffeeStores({ latLong }), options);

  const data = await response.json();

  if (!response.ok) {
    throw Error;
  }

  return data.results.map((res, index) => ({
    ...res,
    imgUrl: photos[index],
  }));
}
