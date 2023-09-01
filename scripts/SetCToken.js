const { run, ethers } = require("hardhat");
async function main() {
  const unitrollerContractaddress =
    "0xbA47ccbE10B6addD8385748311a4a9478e74F38D";
  //We are addressing the Unitroller, which delegates to comptroller
  comptrollerContract = await ethers.getContractAt(
    "Comptroller",
    unitrollerContractaddress
  );

  const setWLTx = await comptrollerContract._setBorrowRestriction(
    ["0xe69Bed0ec94D247f4a21dD42Da2B9995DCA551d6"],
    [false]
  );
  await setWLTx.wait();
  console.log("Changed the cToken status");
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
