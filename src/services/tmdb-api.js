const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = `https://api.themoviedb.org/3`;
const discoverEndpoint = '/discover/tv';
const searchEndpoint = '/search/tv';
const detailsEndpoint = '/tv';
const providersEndpoint = "/watch/providers/tv"

export const getShowsByProviderId = async (id) => {
  const request = await fetch(
    BASE_URL +
      discoverEndpoint +
      `?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&with_watch_providers=${id}&watch_region=CA`
  );
  const response = await request.json();
  const shows = await response.results;
  return shows;
};

export const getShowsByAllProviders = (providers) => {
  const responses = [];
  Object.keys(providers).forEach((provider) => {
    responses.push(
      getShowsByProviderId(providers[provider].id).then((shows) => [
        providers[provider].displayName,
        shows,
      ])
    );
  });
  return Promise.all(responses);
};

export const searchShows = async (query, pageNumber) => {
  const URL =
    BASE_URL +
    searchEndpoint +
    `?api_key=${API_KEY}&language=en-US&page=${pageNumber}&include_adult=false&query=${query}`;
  const request = await fetch(URL);
  const response = await request.json();
  return response;
};

export const getShowDetails = async (id) => {
  const URL =
    BASE_URL + detailsEndpoint + `/${id}?api_key=${API_KEY}&language=en-US`;
  const request = await fetch(URL);
  const response = await request.json();
  const details = response;
  return details;
};

export const getProviders = async () => {
  const URL =
    BASE_URL + providersEndpoint + `?api_key=${API_KEY}&language=en-US&watch_region=CA`;
  const request = await fetch(URL);
  const response = await request.json();
  const providers = response.results;
  return providers;
}
