import { render, screen } from "@testing-library/react";
import Profile from "./Profile";

test("renders and check", () => {
  render(<Profile />);
  const linkElement = screen.getByText('Welcome');
  expect(linkElement).toBeInTheDocument();
});
