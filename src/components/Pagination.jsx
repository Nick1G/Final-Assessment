import { useState, useEffect } from "react";
import { useSearchParams, useLocation } from "react-router-dom";
import { searchShows } from "../services/tmdb-api";
import TitleList from "./TitleList";

const Pagination = ({ currentPageNumber, pageLimit, initialResults, watchList, toggle }) => {
  const [currentPage, setCurrentPage] = useState(currentPageNumber);
  const [searchResults, setSearchResults] = useState(initialResults);
  const [params, setParams] = useSearchParams();
  const location = useLocation();

  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  const changePage = (e) => {
    const pageNumber = e.target.textContent;
    setCurrentPage(pageNumber);
  };

  const getPaginationGroup = () => {
    let start = Math.floor((currentPage - 1) / 5) * 5;
    return new Array(5).fill().map((_, index) => start + index + 1);
  }

  useEffect(() => {
    params.set("page", currentPage);
    setParams(params);
  }, [currentPage]);

  useEffect(() => {
    console.log("this should work");
    const query = params.get("query");
    const page = params.get("page");
    if (query !== "") {
      if (!(page > pageLimit) && !(page < 1)) {
        searchShows(query, page).then(response => setSearchResults(response.results));
      }
    }
  }, [location]);

  return (
    <>
    <TitleList name="Results" titles={searchResults} watchList={watchList} toggle={toggle}/>
    {currentPage === pageLimit && 
      <h1>End of Results</h1>
    }
    <div className="pagination">
      {currentPage > 1 && 
        <button onClick={previousPage} className="previous">Prev</button>
      }
      {/* {getPaginationGroup().map((item, index) => {
        return <button
          key={index}
          onClick={(event) => changePage(event)}
        >
          {item}
        </button>
      })} */}
      {currentPage < pageLimit &&
        <button onClick={nextPage} className="next">Next</button>
      }
    </div>
    </>
  );
};

export default Pagination;