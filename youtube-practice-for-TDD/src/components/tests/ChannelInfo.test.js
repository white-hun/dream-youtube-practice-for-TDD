import { Route } from "react-router-dom";
import ChannelInfo from "../ChannelInfo";
import { render, screen, waitFor } from "@testing-library/react";
import { withAllContexts, withRouter } from "../../tests/utils";

describe("ChannelInfo", () => {
  const fakeYoutube = {
    channelImageURL: jest.fn(),
  };

  afterEach(() => fakeYoutube.channelImageURL.mockReset());

  it("renders correctly", async () => {
    fakeYoutube.channelImageURL.mockImplementation(() => "url");

    const { asFragment } = render(
      withAllContexts(
        withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />),
        fakeYoutube
      )
    );

    await waitFor(() => {
      screen.getByRole("img");
    });
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders without URL", () => {
    renderChannelInfoWithCallback(() => {
      throw new Error("error");
    });

    expect(screen.queryByRole("img")).toBeNull();
  });

  it("renders with URL", async () => {
    renderChannelInfoWithCallback("url");

    await waitFor(() => {
      expect(screen.getByRole("img")).toBeInTheDocument();
    });
  });

  function renderChannelInfoWithCallback(callback) {
    fakeYoutube.channelImageURL.mockImplementation(() => callback);
    render(
      withAllContexts(
        withRouter(<Route path="/" element={<ChannelInfo id="id" name="channel" />} />),
        fakeYoutube
      )
    );
  }
});
