import React, { Component, Fragment } from "react";

class PageRouter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pageNumbers: Math.ceil(this.props.dataRange / this.props.pagination),
      currentPage: (this.props.minRange - 1) / this.props.pagination
    };
  }

  renderPageNumbers = () => {
    return [...Array(this.state.pageNumbers).keys()].map(i => {
      let classNames = ["PageRouterNumbers"];
      if (this.state.currentPage === i) {
        classNames.push("ActivePage");
      }
      return (
        <div
          key={i}
          className={classNames.join(" ")}
          onClick={() => {
            this.props.updateRange(i * this.props.pagination + 1);
            this.setState({ currentPage: i });
          }}
        >{`${i + 1}`}</div>
      );
    });
  };

  render() {
    console.log(this.state.currentPage);
    return (
      <Fragment>
        <div className="PageRouter">
          <button
            disabled={this.state.currentPage < 1}
            className="PageRouterButtons"
            onClick={() => {
              this.props.updateRange(this.props.minRange - 10);
              this.setState({ currentPage: this.state.currentPage - 1 });
            }}
          >
            Previous
          </button>
          {this.renderPageNumbers()}
          <button
            disabled={this.state.currentPage > this.state.pageNumbers - 2}
            onClick={() => {
              this.props.updateRange(this.props.minRange + 10);
              this.setState({ currentPage: this.state.currentPage + 1 });
            }}
            className="PageRouterButtons"
          >
            Next
          </button>
        </div>
        <div style={{ "clear:": "both" }} />
      </Fragment>
    );
  }
}

export default PageRouter;
