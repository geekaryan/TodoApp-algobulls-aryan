import styles from "./Pagination.module.css";

const Pagination = ({
  dataPerPage,
  totalData,
  currentPage,
  handlePageChange,
}) => {
  //making an empty array of PageNumbers..
  const pageNumbers = [];
  //Iterating such that totalData that is the length of data in array divide by how much data we have to show in per page..
  //we are pushing i in our empty array..
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={styles.pagination}>
      {/* mapping through the array adding onClick for setting the page and displaying the number */}
      {pageNumbers.map((number) => (
        <button
          key={number}
          className={number === styles.currentPage ? "active" : ""}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
