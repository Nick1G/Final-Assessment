import { useState, useEffect } from "react";
import { getProviders, getShowsByProviderId } from "../services/tmdb-api";
import ProviderList from "../components/ProviderList";
import TitleList from "../components/TitleList";
import { useSearchParams, useLocation } from "react-router-dom";

const ProvidersPage = ({ watchList, toggle }) => {
  const [providers, setProviders] = useState(null);
  const [providerMovies, setProviderMovies] = useState(null);
  const [searchParams] = useSearchParams();
  const location = useLocation();

  useEffect(() => {
    getProviders().then((results) => setProviders(results));
  }, []);

  useEffect(() => {
    searchParams.has("id") ?
      getShowsByProviderId(searchParams.get("id")).then(results => setProviderMovies(results)) :
      setProviderMovies(null);
  }, [location]);

  return (
    <>
      {!providerMovies && providers ? 
        <ProviderList name="Providers" providers={providers}/> :
        <>
          {providerMovies && 
            <TitleList name="Results" titles={providerMovies} watchList={watchList} toggle={toggle}/>
          }
        </>
      }
    </>
  );
};

export default ProvidersPage;