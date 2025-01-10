import React from "react";
import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

const mockYear = 2025;
jest
  .spyOn(globalThis.Date.prototype, "getFullYear")
  .mockReturnValue(mockYear as unknown as number);

describe("Footer Component", () => {
  it("renders the footer container", () => {
    render(<Footer />);
    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
  });

  it("displays the correct copyright text with the current year", () => {
    render(<Footer />);
    const textElement = screen.getByText(
      `© ${mockYear} Products App. All rights reserved.`
    );
    expect(textElement).toBeInTheDocument();
  });

  it("renders the links with correct href attributes", () => {
    render(<Footer />);
    const aboutLink = screen.getByRole("link", { name: /about us/i });
    const contactLink = screen.getByRole("link", { name: /contact/i });
    const privacyLink = screen.getByRole("link", { name: /privacy policy/i });

    expect(aboutLink).toHaveAttribute("href", "/about");
    expect(contactLink).toHaveAttribute("href", "/contact");
    expect(privacyLink).toHaveAttribute("href", "/privacy");
  });

  it("applies the correct styles to links", () => {
    render(<Footer />);
    const links = screen.getAllByRole("link");
    links.forEach((link) => {
      expect(link).toHaveStyle(`color: #007bff`);
      expect(link).toHaveStyle(`text-decoration: underline`);
    });
  });
});
