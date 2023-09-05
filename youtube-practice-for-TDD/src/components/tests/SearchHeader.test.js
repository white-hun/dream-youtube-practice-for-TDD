import { Route } from "react-router-dom";
import { withRouter } from "../../tests/utils";
import SearchHeader from "../SearchHeader";
import renderer from "react-test-renderer";

describe("SearchHeader", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(withRouter(<Route path="/" element={<SearchHeader />} />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });
});
