import { fakeVideo as video } from "../../tests/videos";
import { render, screen } from "@testing-library/react";
import { withRouter } from "../../tests/utils";
import VideoCard from "../VideoCard";
import { Route } from "react-router-dom";
import { formatAgo } from "../../util/date";

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
});
