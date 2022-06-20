import { useState, useEffect } from "react";

const Pagination = ({ currentPageNumber, pageLimit, dataLimit }) => {
  const [pages] = useState(pageLimit);
  const [currentPage, setCurrentPage] = useState(currentPageNumber);
};

export default Pagination;