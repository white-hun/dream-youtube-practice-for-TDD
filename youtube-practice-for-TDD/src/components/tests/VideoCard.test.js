import { fakeVideo as video } from "../../tests/videos";
import { render, screen, waitFor } from "@testing-library/react";
import { withRouter } from "../../tests/utils";
import VideoCard from "../VideoCard";
import { Route, useLocation } from "react-router-dom";
import { formatAgo } from "../../util/date";
import userEvent from "@testing-library/user-event";

describe("VideoCard", () => {
  const { title, channelTitle, publishedAt, thumbnails } = video.snippet;

  it("render video items", async () => {
    render(withRouter(<Route path="/" element={<VideoCard video={video} />} />));

    const image = screen.getByRole("img");
    expect(image.src).toBe(thumbnails.medium.url);
    expect(image.alt).toBe(title);
    expect(screen.getByText(title)).toBeInTheDocument();
    expect(screen.getByText(channelTitle)).toBeInTheDocument();
    expect(screen.getByText(formatAgo(publishedAt))).toBeInTheDocument();
  });

  it("navigates to detailed video page with video state when chlicked", async () => {
    function LocationStateDisplay() {
      return <pre>{JSON.stringify(useLocation().state)}</pre>;
    }

    render(
      withRouter(
        <>
          <Route path="/" element={<VideoCard video={video} />} />
          <Route path={`/videos/watch/${video.id}`} element={<LocationStateDisplay />} />
        </>
      )
    );

    const card = screen.getByRole("listitem");
    userEvent.click(card);
    await waitFor(() => {
      expect(screen.getByText(JSON.stringify({ video }))).toBeInTheDocument();
    });
  });
});
