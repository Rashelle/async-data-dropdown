import React from "react";
import { string, array } from "prop-types";
import "./Dropdown.css";

class Dropdown extends React.Component {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

    this.state = {
      listOpen: false,
      filteredList: [],
      userInput: ""
    };
  }

  toggleList = () => {
    this.setState({
      listOpen: !this.state.listOpen
    });
  };

  searchInputChanged = e => {
    const { list } = this.props;
    const userInput = e.target.value;
    const filteredList = list.filter(item =>
      item.title.toLowerCase().startsWith(userInput.toLowerCase())
    );
    this.setState({ filteredList, userInput });
  };

  getDisplayedList = () => {
    const { list } = this.props;
    const { userInput, filteredList } = this.state;

    return userInput.length > 0 ? filteredList : list;
  };

  onInputWrapperClicked = () => {
    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  onCloseIconClicked = () => this.setState({ userInput: "" });

  renderItemsContainer() {
    const { resultsDefaultText , errorText } = this.props;
    const { userInput } = this.state;
    const displayedList = this.getDisplayedList();

    return (
      <div className="list-container">
        {errorText ? errorText : displayedList
          .filter(item => item.title)
          .map(item => (
            <div key={item.id} className="list-item">
              {item.title}
            </div>
          ))}
        {userInput.length > 0 && displayedList.length == 0 && (
          <div className="results-default-text">{resultsDefaultText}</div>
        )}
      </div>
    );
  }

  render() {
    const { placeholder } = this.props;
    const { listOpen, userInput } = this.state;

    return (
      <div className="dropdown-container">
        <div
          className="dropdown-input-wrapper"
          onClick={this.onInputWrapperClicked}
        >
          <input
            className="dropdown-input"
            name="search-input"
            type="text"
            value={userInput}
            placeholder={placeholder}
            onFocus={this.toggleList}
            onBlur={this.toggleList}
            onChange={this.searchInputChanged}
            ref={this.inputRef}
          />

          <span className="close-icon" onClick={this.onCloseIconClicked} />
        </div>

        {listOpen && this.renderItemsContainer()}
      </div>
    );
  }
}

Dropdown.propTypes = {
  placeholder: string,
  list: array,
  resultsDefaultText: string,
  errorText: string
};

Dropdown.defaultProps = {
  placeholder: "Start Typing..",
  list: [],
  resultsDefaultText: "No results"
};

export default Dropdown;
