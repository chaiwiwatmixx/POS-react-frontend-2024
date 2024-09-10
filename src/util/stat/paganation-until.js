//changeCount pagination
export const changeCount = (
  change,
  data,
  itemsPerPage,
  currentPage,
  setCurrentPage
) => {
  const limit = Math.ceil(data.length / itemsPerPage);
  if (
    (change === -1 && currentPage <= 1) ||
    (change === 1 && currentPage >= limit)
  ) {
    return;
  }
  setCurrentPage((prevPage) => prevPage + change);
};
