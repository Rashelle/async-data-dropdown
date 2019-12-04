import React from "react";
import Dropdown from "./Dropdown";
import ZeitgoldApiService from "./zeitgoldApiService";

const EXERCISE_BUSINESS_ID =
  "QnVzaW5lc3NOb2RlOmI0OTllOGVlLTliZWUtNGE5NC1iNGJjLTZkZmRkNzI5ZTFkYQ==";
const PLACEHOLDER_TEXT= "Select Business Supplier"
const NO_RESULTS_TEXT = "No results"

class BusinessSuppliersDropdown extends React.Component {
  state = {
    businessSuppliers: [],
    apiError: false
  };

  async componentDidMount() {
    try {
      const businessSuppliers = await ZeitgoldApiService.getBusinessSuppliers(
        EXERCISE_BUSINESS_ID
      );
      this.setState({ businessSuppliers });
    } catch (e) {
      this.setState({ apiError: true });
    }
  }

  render() {
    const { businessSuppliers, apiError } = this.state;
    const errorText = apiError ? "Error Loading Business Suppliers" : null;
    const listOptions = businessSuppliers
      .filter(supplier => supplier.displayName)
      .map(supplier => ({
        id: supplier.id,
        title: supplier.displayName
      }));

    return (
      <Dropdown
        errorText={errorText}
        placeholder={PLACEHOLDER_TEXT}
        list={listOptions}
        resultsDefaultText={NO_RESULTS_TEXT}
      />
    );
  }
}

export default BusinessSuppliersDropdown;
