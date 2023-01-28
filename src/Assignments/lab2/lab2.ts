import { inputNumber } from "../../Utils";

const recursivelyProduct = (n: number, x = 1): number => {
  if (x > n) {
    return 1;
  }
  return (Math.sin(x) / (x ** 2 + 1)) * recursivelyProduct(n, x + 1);
};

const loopProduct = (n: number, x = 1): number => {
  let result = 1;
  while (x <= n) {
    result *= Math.sin(x) / (x ** 2 + 1);
    x++;
  }
  return result;
};

(async () => {
  const { n } = await inputNumber({
    name: "n",
    message: "Please enter number n: ",
  });

  console.time("recursion");
  const recursion = recursivelyProduct(n);
  console.timeEnd("recursion");

  console.time("loop");
  const loop = loopProduct(n);
  console.timeEnd("loop");

  console.log({
    recursion,
    loop,
  });
})();
