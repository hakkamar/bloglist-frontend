//import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import BlogForm from "./BlogForm";
import userEvent from "@testing-library/user-event";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const user = userEvent.setup();
  const createBlog = jest.fn();

  render(<BlogForm createBlog={createBlog} />);
  /*
  const input = screen.getByRole('textbox')

     Huom myös  getByPlaceholderText...
     ja querySelector + id

    Komento getByText  etsii elementtiä missä on ainoastaan parametrina teksti eikä mitään muuta.
    Jos halutaan etsiä komponenttia joka sisältää tekstin, voidaan joko lisätä komennolle ekstraoptio:
    const element = screen.getByText(
        'Does not work anymore :(', { exact: false })

    On tärkeä huomata, että toisin kuin muut ByText-komennoista, findByText palauttaa promisen!

  */

  const input = screen.getAllByRole("textbox");

  const sendButton = screen.getByText("Create");

  await user.type(input[0], "testing a form...");
  await user.type(input[1], "testing a form...");
  await user.type(input[2], "testing a form...");

  //screen.debug(input);

  await user.click(sendButton);

  expect(createBlog.mock.calls).toHaveLength(1);
  //expect(createBlog.mock.calls[0][0].content).toBe("testing a form...");
  //console.log("createBlog.mock.calls[0][0]", createBlog.mock.calls[0][0]);
  expect(createBlog.mock.calls[0][0].title).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].author).toBe("testing a form...");
  expect(createBlog.mock.calls[0][0].url).toBe("testing a form...");
});
