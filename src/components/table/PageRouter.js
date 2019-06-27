import React from "react";

const PageRouter = ({
  pagination,
  minRange,
  maxRange,
  dataRange,
  updateRange
}) => {
  const pageNumbers = Math.ceil(dataRange / pagination);
  const currentPage = (minRange - 1) / pagination;

  const renderPageNumbers = () => {
    return [...Array(pageNumbers).keys()].map(i => {
      let classNames = ["PageRouterNumbers"];
      if (currentPage === i) {
        classNames.push("ActivePage");
      }
      return <div key={i} className={classNames.join(" ")}>{`${i + 1}`}</div>;
    });
  };

  return (
    <div className="PageRouter">
      <button disabled={currentPage < 2} className="PageRouterButtons">
        Previous
      </button>
      {renderPageNumbers()}
      <button className="PageRouterButtons">Next</button>
    </div>
  );
};

export default PageRouter;
