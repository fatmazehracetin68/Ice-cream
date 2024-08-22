import {
  render,
  screen,
  fireEvent,
  getByRole,
  getByText,
  mauseEnter,
} from "@testing-library/react";
import Form from ".";
import "@testing-library/jest-dom";

test("Koşulların onay durumuna göre buton aktifliği", () => {
  render(<Form />);
  const button = screen.getByRole("button");
  const checkbox = screen.getByRole("checkbox");

  //checkbox tiklenmedi
  expect(checkbox).not.toBeChecked();
  //buton inaktif olmalı
  expect(button).toBeDisabled();

  //checkboxı tikle
  fireEvent.click(checkbox);
  //buton aktif mi kontrol et
  expect(button).toBeEnabled();
  //checkboxtan tik kalktı mı
  fireEvent.click(checkbox);
  //butoninaktif oldu mu kontrol et
  expect(button).toBeDisabled();
});

test("Butonun hover durumuna göre bildirim ekrana gelir", () => {
  render(<Form />);
  const checkbox = screen.getByRole("checkbox");
  const button = screen.getByRole("button");
  const alert = screen.getByText("Size gerçekten bir şey teslim etmeyeceğiz");

  //bildirim gözükmesin

  expect(alert).not.toBeVisible();
  //checkboxu tikeleyeceğiz
  fireEvent.click(checkbox);
  //hover yap
  fireEvent.mouseEnter(button);
  //ekranda bildirim var mı
  expect(alert).toBeVisible();
  //mauseu çek
  fireEvent.mouseLeave(button);
  //bildirim gitti
  expect(alert).not.toBeVisible();
});
