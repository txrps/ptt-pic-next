import { describe, it } from "vitest";
import { render } from "@testing-library/react";
import Content from "@/components/layout/content";
import Footer from "@/components/layout/footer";
import Header from "@/components/layout/header";

const sampleProps = {
  children: <></>,
};

describe("Component Content", () => {
  it("Render Content", () => {
    render(<Content {...sampleProps}></Content>);
  });

  it("Render footer", () => {
    render(<Footer></Footer>);
  });

  it("Render Header", () => {
    render(<Header></Header>);
  });
});
