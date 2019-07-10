import React, { Component } from "react";
import InfiniteScroll from "react-infinite-scroller";

class InfiniteTable extends Component {
  state = {
    data: [],
    loading: false
  };

  renderItems = (start, end) => {
    let items = [];
    for (let i = start; i < end + 1; i++) {
      items.push(<div className="item">{i}</div>);
    }
    this.setState({ data: this.state.data.concat(items), loading: false });
  };

  loadFunc = () => {
    console.log("loading more");
    this.setState({ loading: true });
    let start = this.state.data.length + 1;
    this.renderItems(start, start + 99);
  };

  render() {
    return (
      <div>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={this.state.data.length < 1000}
          loader={
            <div className="loader" key={0}>
              Loading ...
            </div>
          }
        >
          {this.state.data}
        </InfiniteScroll>
      </div>
    );
  }
}

export default InfiniteTable;
