import { Route } from "react-router-dom";
import { withRouter } from "../../tests/utils";
import SearchHeader from "../SearchHeader";
import renderer from "react-test-renderer";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("SearchHeader", () => {
  it("renders correctly", () => {
    const component = renderer
      .create(withRouter(<Route path="/" element={<SearchHeader />} />))
      .toJSON();
    expect(component).toMatchSnapshot();
  });

  it("renders with keyword correctly", () => {
    render(withRouter(<Route path="/:keyword" element={<SearchHeader />} />, "/bts"));
    expect(screen.getByDisplayValue("bts")).toBeInTheDocument();
  });

  it("navigates to results page on search button click", async () => {
    const searchKeyword = "fake-keyword";

    render(
      withRouter(
        <>
          <Route path="/home" element={<SearchHeader />} />
          <Route
            path={`videos/${searchKeyword}`}
            element={<p>{`Search result for ${searchKeyword}`}</p>}
          />
        </>,
        "/home"
      )
    );

    const searchButton = screen.getByRole("button");
    const searchInput = screen.getByRole("textbox");

    userEvent.type(searchInput, searchKeyword);
    userEvent.click(searchButton);

    await waitFor(() => {
      expect(screen.getByText(`Search result for ${searchKeyword}`)).toBeInTheDocument();
    });
  });
});
