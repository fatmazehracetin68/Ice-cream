import { render, screen, fireEvent } from "@testing-library/react";
import Scoops from ".";
import userEvent from "@testing-library/user-event";

test("Apiden alınan veriler için ekrana kartlar basılır", async () => {
  render(<Scoops />);
  //getByRole asenkron elementleri alamaz . imgde apiden geldiği için getByrole göremiyor
  const images = await screen.findAllByAltText("çeşit-resim");
  //cart sayısı birden fazla mı
  expect(images.length).toBeGreaterThanOrEqual(1);
});

test("çeşitlerin ekleme azaltma işlevlerinin toplam fiyata etkisi", async () => {
  const user = userEvent.setup();
  render(<Scoops />);
  const addBtns = await screen.findAllByRole("button", { name: "Ekle" });
  const delBtns = await screen.findAllByRole("button", { name: "Azalt" });
  const total = screen.getByTestId("total");

  // API'den gelen veriler tamamen yüklendikten sonra kontrolü başlatın

  //başlangıçta toplam 0 mı diye kontrol ederiz
  expect(total).toHaveTextContent(/^0$/);

  await user.click(addBtns[2]);
  expect(total).toHaveTextContent(/^20$/);

  await user.dblClick(addBtns[1]);
  expect(total).toHaveTextContent(/^60$/);

  await user.click(delBtns[1]);
  expect(total).toHaveTextContent(/^40$/);

  await user.click(delBtns[1]);
  expect(total).toHaveTextContent(/^20$/);

  await user.click(delBtns[2]);
  expect(total).toHaveTextContent(/^0$/);
});
