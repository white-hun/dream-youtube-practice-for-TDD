import { Route } from "react-router-dom";
import ChannelInfo from "../../components/ChannelInfo";
import RelatedVideos from "../../components/RelatedVideos";
import { withRouter } from "../../tests/utils";
import { render, screen } from "@testing-library/react";
import VideoDetail from "../VideoDetail";
import { fakeVideo } from "../../tests/videos";

jest.mock("../../components/ChannelInfo");
jest.mock("../../components/RelatedVideos");

describe("VideoDetail", () => {
  afterEach(() => {
    ChannelInfo.mockReset();
    RelatedVideos.mockReset();
  });

  it("renders video item details", () => {
    render(
      withRouter(<Route path="/" element={<VideoDetail />} />, {
        pathname: "/",
        state: { video: fakeVideo },
      })
    );
    const { title, channelId, channelTitle } = fakeVideo.snippet;
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(RelatedVideos.mock.calls[0][0]).toStringEqual({ id: fakeVideo.id });
    expect(ChannelInfo.mock.calls[0][0]).toStringEqual({ id: channelId, name: channelTitle });
  });
});
