const { run, ethers } = require("hardhat");
async function main() {
  const COREFactoryAddress = "0xa1f5847ed8f122a2f8077d7636575f5b8be608aa";
  const COREFactory = await ethers.getContractAt("ERC20", COREFactoryAddress);
  const stabilizerFactory = await ethers.getContractFactory(
    "contracts/InverseFinance/Stabilizer.sol:Stabilizer"
  );
  stabilizerContract = await stabilizerFactory.deploy(
    COREFactory.address, // CORE address
    "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb", // DAI on Base
    100, // 1% buy fee
    100, // 1% sell fee
    ethers.utils.parseEther("15000000") // 15 mil supply
  );
  await stabilizerContract.deployTransaction.wait();

  const setMinterTx = await COREFactory.addMinter(stabilizerContract.address);
  await setMinterTx.wait();
  console.log("BAI minter set to DAI stabilizer contract");

  await run("verify:verify", {
    address: stabilizerContract.address,
    constructorArguments: [
      COREFactory.address,
      "0x50c5725949A6F0c72E6C4a641F24049A917DB0Cb",
      100,
      100,
      ethers.utils.parseEther("15000000"),
    ],
  });
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
