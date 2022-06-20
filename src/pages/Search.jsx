import { useLocation, useSearchParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchShows } from '../services/tmdb-api';
import Pagination from "../components/Pagination";

const SearchPage = ({ watchList, toggle }) => {
  const [data, setData] = useState(null);
  const [pageLimit, setPageLimit] = useState(null);
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');
  const page = searchParams.get('page');

  useEffect(() => {
    searchShows(query, 1).then(response => setPageLimit(response.total_pages));

    if (searchParams.has("page")) {
      if (page < 1 || page > pageLimit) {
        searchParams.set("page", 1);
        setSearchParams(searchParams);
      }
    }

    if (query !== "") {
      searchShows(query, searchParams.get("page")).then(response => {
        setData(response);
      });
    }
  }, [location]);

  return (
    <>
      {data && 
        <Pagination
          currentPageNumber={data.page}
          pageLimit={data.total_pages}
          searchResults={data.results}
          watchList={watchList}
          toggle={toggle}
        />
      }
    </>
  );
};

export default SearchPage;
