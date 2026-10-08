export const toBanglaNumber = (value) => {
  return new Intl.NumberFormat("bn-BD").format(Number(value));
};

export const unitText = {
  kg: "প্রতি কেজি",
  liter: "প্রতি লিটার",
  litre: "প্রতি লিটার",
  dozen: "প্রতি ডজন",
  piece: "প্রতি পিস",
};