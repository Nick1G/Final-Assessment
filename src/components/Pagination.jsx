import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import TitleList from "./TitleList";

const Pagination = ({ currentPageNumber, pageLimit, searchResults, watchList, toggle }) => {
  const [currentPage, setCurrentPage] = useState(currentPageNumber);
  const [params, setParams] = useSearchParams();
  const query = params.get("query");

  const nextPage = () => {
    setCurrentPage((prevState) => prevState + 1);
  };

  const previousPage = () => {
    setCurrentPage((prevState) => prevState - 1);
  };

  useEffect(() => {
    params.set("page", currentPage);
    setParams(params);
  }, [currentPage]);

  return (
    <>
      <TitleList name={`Results for query "${query}"`} titles={searchResults} watchList={watchList} toggle={toggle}/>
      {(currentPage >= pageLimit || !pageLimit) &&
        <h2 className="end">End of Results</h2>
      }
      <div className="pagination">
        {(currentPage > 1 && currentPage <= pageLimit) &&
          <button onClick={previousPage} className="previous">Prev</button>
        }
        {currentPage < pageLimit &&
          <button onClick={nextPage} className="next">Next</button>
        }
      </div>
    </>
  );
};

export default Pagination;