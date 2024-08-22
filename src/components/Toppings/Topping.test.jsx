import { render, screen } from "@testing-library/react";
import Toppings from "./index";
import userEvent from "@testing-library/user-event";

test("sosları ekleme ve çıkarma işlemlerinin toplam fiyata etkisi", async () => {
  const user = userEvent.setup();

  render(<Toppings />);

  const total = screen.getByTestId("total");

  const cards = await screen.findAllByTestId("card");

  expect(total).toHaveTextContent(/^0$/);

  await user.click(cards[3]);

  expect(total).toHaveTextContent(/^3$/);

  await user.click(cards[4]);

  expect(total).toHaveTextContent(/^6$/);

  await user.click(cards[4]);

  expect(total).toHaveTextContent(/^3$/);

  await user.click(cards[3]);

  expect(total).toHaveTextContent(/^0$/);
});

test("soslar sepete eklendiği zaman active class'ı alır", async () => {
  const user = userEvent.setup();

  render(<Toppings />);

  const cards = await screen.findAllByTestId("card");

  cards.forEach((card) => expect(card).not.toHaveClass("active"));

  await user.click(cards[0]);

  expect(cards[0]).toHaveClass("active");

  await user.click(cards[0]);

  expect(cards[0]).not.toHaveClass("active");
});
