import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { searchShows } from '../services/tmdb-api';
import TitleList from '../components/TitleList';
import Pagination from "../components/Pagination";

const SearchPage = ({ watchList, toggle }) => {
  const [data, setData] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const query = params.get('query');
  const page = params.get('page');

  useEffect(() => {
    if (query) {
      searchShows(query, page).then(response => {
        setData(response);
      });
    }
  }, [query]);

  return (
    <>
      {/* {titles ? (
        <TitleList
          name={`shows matching your search: "${query}"`}
          titles={titles}
          watchList={watchList}
          toggle={toggle}
        />
      ) : (
        <h2>No matching results</h2>
      )} */}
      {data && 
        <Pagination
          currentPageNumber={data.page}
          pageLimit={data.total_pages}
          dataLimit={data.total_results}
        />
      }
    </>
  );
};

export default SearchPage;
