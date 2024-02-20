//import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

describe("<Blog />", () => {
  let blog;

  beforeEach(() => {
    blog = {
      author: "Testi Author",
      title: "Testi Title",
      likes: 0,
      url: "Testi url",
    };
  });

  test("renders content /div", () => {
    const { container } = render(<Blog blog={blog} />);

    //screen.debug();
    const div = container.querySelector(".blog");
    expect(div).toHaveTextContent("Testi Title by Testi Author");
  });

  test("renders content /element ", () => {
    render(<Blog blog={blog} />);

    const element = screen.getByText("Testi Title by Testi Author");
    //screen.debug(element);
    expect(element).toBeDefined();
  });

  test("Not renders url /element ", () => {
    render(<Blog blog={blog} />);

    const element = screen.getByText("Testi Title by Testi Author");
    //screen.debug(element);
    expect(element).not.toHaveTextContent("Testi url");
  });
});

test("clicking the button shows the rest data of blog", async () => {
  const blog = {
    author: "Testi Author",
    title: "Testi Title",
    likes: 0,
    url: "Testi url",
    user: null,
  };

  const mockHandler = jest.fn();

  render(<Blog blog={blog} asetaKlikkaus={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);

  // Napin painallus Rederöi uuudelleen laajemman blogin ja siinä ei ole enää samaa nappia.
  // joten napin painallus on onnistunut, vaikka ei näytäkään 1, vaan 0...
  expect(mockHandler.mock.calls).toHaveLength(0);
  //... tutkitaan siis, renderöityikö nyt url, mitä ei ennen näkynyt
  const element = screen.getByText("Testi url");
  expect(element).toHaveTextContent("Testi url");
});

test("clicking like twice", async () => {
  let useri = {
    username: "hakkis",
    name: "Marko Hakkarainen",
    id: "65c4e837f4c49749442da098",
  };

  const blog = {
    author: "Testi Author",
    title: "Testi Title",
    likes: 0,
    url: "Testi url",
    user: useri,
  };

  const mockHandler = jest.fn();
  render(<Blog blog={blog} updatedBlogObject={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");

  await user.click(button);

  const likeButton = screen.getByText("Like");
  await user.click(likeButton);
  await user.click(likeButton);
  expect(mockHandler.mock.calls).toHaveLength(2);
});
