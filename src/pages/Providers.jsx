import { useState, useEffect } from "react";
import { getProviders, getShowsByProviderId } from "../services/tmdb-api";
import ProviderList from "../components/ProviderList";
import TitleList from "../components/TitleList";
import { useSearchParams, useLocation } from "react-router-dom";

const ProvidersPage = ({ watchList, toggle }) => {
  const [providers, setProviders] = useState(null);
  const [providerMovies, setProviderMovies] = useState(null);
  const [displayName, setDisplayName] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const searchId = searchParams.get("id");

  useEffect(() => {
    getProviders().then((results) => setProviders(results));
  }, []);

  useEffect(() => {
    if (searchParams.has("id")) {
      if (!Number.isInteger(parseInt(searchId))) {
        searchParams.delete("id");
        setSearchParams(searchParams);
        return;
      }

      if (providers) {
        setDisplayName(providers.find(provider => provider.provider_id == searchId).provider_name);
      }
      else {
        searchParams.delete("id");
        setSearchParams(searchParams);
        return;
      }

      getShowsByProviderId(searchId).then(results => setProviderMovies(results));
    }
    else {
      setProviderMovies(null);
    }
  }, [location]);

  return (
    <>
      {!providerMovies && providers ? 
        <ProviderList name="TV Providers" providers={providers}/> :
        <>
          {providerMovies &&
            <TitleList name={displayName} titles={providerMovies} watchList={watchList} toggle={toggle}/>
          }
        </>
      }
    </>
  );
};

export default ProvidersPage;