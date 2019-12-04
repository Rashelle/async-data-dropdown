import React from "react";
import Dropdown from "./Dropdown";
import ZeitgoldApiService from "./zeitgoldApiService";

const EXERCISE_BUSINESS_ID =
  "QnVzaW5lc3NOb2RlOmI0OTllOGVlLTliZWUtNGE5NC1iNGJjLTZkZmRkNzI5ZTFkYQ==";

class BusinessSuppliersDropdown extends React.Component {
  state = {
    businessSuppliers: []
  };

  componentDidMount() {
    ZeitgoldApiService.getBusinessSuppliers(EXERCISE_BUSINESS_ID).then(
      businessSuppliers => {
        this.setState({ businessSuppliers });
      }
    );
  }

  render() {
    const { businessSuppliers } = this.state;
    const listOptions = businessSuppliers
      .filter(supplier => supplier.displayName)
      .map(supplier => ({
        id: supplier.id,
        title: supplier.displayName
      }));

    return (
      <Dropdown
        placeholder="Select Business Supplier"
        list={listOptions}
        resultsDefaultText={"No results"}
      />
    );
  }
}

export default BusinessSuppliersDropdown;
