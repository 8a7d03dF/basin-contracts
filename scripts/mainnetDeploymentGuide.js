const { ethers } = require("hardhat");

async function main() {
  var unitrollerContract;
  var comptrollerContract;
  var delegateContract;
  var originalcomptrollerAddress;
  var COREContract;
  var JumpRateModelContract;
  var mUSDContract;
  var fedContract;
  var oracleContract;
  var mEtherContract;
  var WhitePaperModelContract;
  var stabilizerContract;

  ////////////////////////////////////////
  //Contract Deployments
  ////////////////////////////////////////

  //Deploy Oracle
  const oracleFactory = await ethers.getContractFactory("Oracle");
  // oracleContract = await oracleFactory.deploy();
  const signer = ethers.provider.getSigner();

  oracleContract = new ethers.Contract(
    "0xa71c44771743d1d05d3a52b7162d6769fd89563b",
    oracleFactory.interface,
    signer
  );
  // await oracleContract.deployTransaction.wait();
  // console.log("Oracle Deployed");

  //Deploy Delegate (cERC20 Implementation)
  //
  const delegateFactory = await ethers.getContractFactory("CErc20Delegate");
  // delegateContract = await delegateFactory.deploy();
  delegateContract = new ethers.Contract(
    "0x1e0850524e6235770560112aCB741932EA5a4f4D",
    delegateFactory.interface,
    signer
  );

  // await delegateContract.deployTransaction.wait();

  // Deploy Comptroller
  const comptrollerFactory = await ethers.getContractFactory("Comptroller");
  // comptrollerContract = await comptrollerFactory.deploy();
  // await comptrollerContract.deployTransaction.wait();
  comptrollerContract = new ethers.Contract(
    "0x9b387E82b583570BeA149A910BDBC021c4DC0bC4",
    comptrollerFactory.interface,
    signer
  );
  originalcomptrollerAddress = comptrollerContract.address;

  // Deploy Unitroller
  const unitrollerFactory = await ethers.getContractFactory(
    "contracts/Comptroller/Unitroller.sol:Unitroller"
  );
  // unitrollerContract = await unitrollerFactory.deploy();
  // await unitrollerContract.deployTransaction.wait();
  unitrollerContract = new ethers.Contract(
    "0x24d763DC0CF7815E3Ce06A646a4E9363333142d8",
    unitrollerFactory.interface,
    signer
  );

  // //Set Implementation for Unitroller
  // const setPendingImplementationTx =
  //   await unitrollerContract._setPendingImplementation(
  //     comptrollerContract.address
  //   );
  // await setPendingImplementationTx.wait();
  // const setApproveNewImplementationTx = await comptrollerContract._become(
  //   unitrollerContract.address
  // );
  // await setApproveNewImplementationTx.wait();

  //We are addressing the Unitroller, which delegates to comptroller
  comptrollerContract = await ethers.getContractAt(
    "Comptroller",
    unitrollerContract.address
  );
  // console.log("Comptroller Deployed");

  // Deploy CORE (ERC20 token)
  const COREFactory = await ethers.getContractFactory("ERC20");
  COREContract = new ethers.Contract(
    "0x84CdB2C35C5A0C1Db6121411f4bC0Be504AE2F08",
    COREFactory.interface,
    signer
  );
  // COREContract = await COREFactory.deploy("BAI", "BAI", "18");
  // await COREContract.deployTransaction.wait();

  // Deploy InterestRateModels
  //For CORE (Fuse pool)
  let JumpRateModelFactory = await ethers.getContractFactory("JumpRateModelV2");
  JumpRateModelContract = new ethers.Contract(
    "0xB65361FaBf18B233aae64245c926A4C21e80e50E",
    JumpRateModelFactory.interface,
    signer
  );
  // JumpRateModelContract = await JumpRateModelFactory.deploy(
  //   "0", //uint baseRatePerYear
  //   "49999999998268800", //uint multiplierPerYear
  //   "1089999999998841600", //uint jumpMultiplierPerYear
  //   "800000000000000000" //uint kink_
  // );
  // await JumpRateModelContract.deployTransaction.wait();

  // //For USDC (Fuse pool)
  // USDCJumpRateModelContract = await JumpRateModelFactory.deploy(
  //   "0", //uint baseRatePerYear
  //   "49999999998268800", //uint multiplierPerYear
  //   "1089999999998841600", //uint jumpMultiplierPerYear
  //   "800000000000000000" //uint kink_
  // );
  // await USDCJumpRateModelContract.deployTransaction.wait();

  // For ETH
  const WhitePaperModelFactory = await ethers.getContractFactory(
    "WhitePaperInterestRateModel"
  );
  WhitePaperModelContract = new ethers.Contract(
    "0x2299363e62E5e98db5c9C7A733904b4E3A9b3cD2",
    WhitePaperModelFactory.interface,
    signer
  );
  // WhitePaperModelContract = await WhitePaperModelFactory.deploy(
  //   "19999999999728000",
  //   "99999999998640000"
  // );
  // await WhitePaperModelContract.deployTransaction.wait();
  // console.log("Interest Rates Deployed");

  //Deploy mUSD
  const mUSDFactory = await ethers.getContractFactory("CErc20Delegator");
  mUSDContract = new ethers.Contract(
    "0xc4aAD3EadF2010b85e1197E43B773055AE794FcE",
    mUSDFactory.interface,
    signer
  );
  // mUSDContract = await mUSDFactory.deploy(
  //   COREContract.address, //address underlying_
  //   unitrollerContract.address, //ComptrollerInterface comptroller_
  //   JumpRateModelContract.address, //InterestRateModel interestRateModel_
  //   "200000000000000000", //uint initialExchangeRateMantissa_
  //   "Basin Deposited BAI", //string memory name_
  //   "bBAI", //string memory symbol_
  //   "8", //uint8 decimals_
  //   delegateContract.address, //address implementation
  //   0 //Unused data entry
  // );
  // await mUSDContract.deployTransaction.wait();

  //Deploy mETH
  const mEtherFactory = await ethers.getContractFactory("CEther");
  // mEtherContract = await mEtherFactory.deploy(
  //   unitrollerContract.address, //ComptrollerInterface comptroller_
  //   WhitePaperModelContract.address, //InterestRateModel interestRateModel_
  //   "200000000000000000", //uint initialExchangeRateMantissa_
  //   "Basin Deposited ETH", //string memory name_
  //   "bETH", //string memory symbol_
  //   "8" //uint8 decimals_
  // );
  // await mEtherContract.deployTransaction.wait();
  mEtherContract = new ethers.Contract(
    "0x89179eb15b47DfAE28fb6848f5440ABeE3F58B78",
    mEtherFactory.interface,
    signer
  );
  console.log("bTokens Deployed");

  //Deploy Fed
  // const fedFactory = await ethers.getContractFactory("Fed");
  // fedContract = ethers.Contract(
  //   "0xf7C1F985A64C28543881ad1673b1a89eA5449C23",
  //   fedFactory.interface,
  //   signer
  // );
  // fedContract = await fedFactory.deploy(mUSDContract.address); //CErc20 ctoken_
  // await fedContract.deployTransaction.wait();
  // console.log("Fed Deployed");

  const stabilizerFactory = await ethers.getContractFactory(
    "contracts/InverseFinance/Stabilizer.sol:Stabilizer"
  );
  stabilizerContract = new ethers.Contract(
    "0x0e59B8b3b52Bd0734CC9f8998288AA6F6e1AEE07",
    stabilizerFactory.interface,
    signer
  );
  // stabilizerContract = await stabilizerFactory.deploy(
  //   COREContract.address, // CORE address
  //   "0xAC15714c08986DACC0379193e22382736796496f", // axlUSDC address on Base
  //   100, // 1% buy fee
  //   100, // 1% sell fee
  //   ethers.utils.parseEther("15000000") // 15 mil supply
  // );

  // ////////////////////////////////////////
  // //Configurations
  // ////////////////////////////////////////

  // //Set fixed 1USD price feed for CORE
  // const setSynthPriceTx = await oracleContract.setFixedPrice(
  //   mUSDContract.address,
  //   ethers.utils.parseEther("1")
  // );
  // await setSynthPriceTx.wait();
  // //Set Ethereum price feed (Chainlink)

  // const setEthPriceTx1 = await oracleContract.setFixedPrice(
  //   mEtherContract.address,
  //   ethers.utils.parseEther("1853")
  // );
  // await setEthPriceTx1.wait();

  // console.log("Price Feeds configured");

  // //Set the oracle for price queries
  // const setOracleTx = await comptrollerContract._setPriceOracle(
  //   oracleContract.address
  // );
  // await setOracleTx.wait();
  // //Set the close Factor
  // const setCloseFactorTx = await comptrollerContract._setCloseFactor(
  //   ethers.utils.parseEther("0.5")
  // );
  // await setCloseFactorTx.wait();
  // //Set Liquidation Incentive
  // const setLiquidationIncentiveTx =
  //   await comptrollerContract._setLiquidationIncentive(
  //     ethers.utils.parseEther("0.05")
  //   );
  // await setLiquidationIncentiveTx.wait();
  // //Create CORE Market
  // const setERC20MarketTx = await comptrollerContract._supportMarket(
  //   mUSDContract.address
  // );
  // await setERC20MarketTx.wait();
  // //Create ETH Market
  // const setEthMarketTx = await comptrollerContract._supportMarket(
  //   mEtherContract.address
  // );
  // await setEthMarketTx.wait();
  // // //Create USDC Market
  // // const setUSDCMarketTx = await comptrollerContract._supportMarket(
  // //   mUSDCContract.address
  // // );
  // // await setUSDCMarketTx.wait();
  // //Set the CollateralFactor for BAI
  // const setCollateralFactor1Tx = await comptrollerContract._setCollateralFactor(
  //   mUSDContract.address,
  //   ethers.utils.parseEther("0.25")
  // );
  // await setCollateralFactor1Tx.wait();
  // //Set the CollateralFactor for Eth
  // const setCollateralFactor2Tx = await comptrollerContract._setCollateralFactor(
  //   mEtherContract.address,
  //   ethers.utils.parseEther("0.75")
  // );
  // await setCollateralFactor2Tx.wait();
  // // //Set the CollateralFactor for USDC
  // // const setCollateralFactor3Tx = await comptrollerContract._setCollateralFactor(
  // //   mUSDCContract.address,
  // //   ethers.utils.parseEther("0.85")
  // // );
  // // await setCollateralFactor3Tx.wait();
  // //Set the IMFFactor for BAI
  // const setIMFFactor1Tx = await comptrollerContract._setIMFFactor(
  //   mUSDContract.address,
  //   ethers.utils.parseEther("0.04")
  // );
  // await setIMFFactor1Tx.wait();
  // //Set the IMFFactor for ETH
  // const setIMFFactor2Tx = await comptrollerContract._setIMFFactor(
  //   mEtherContract.address,
  //   ethers.utils.parseEther("0.04")
  // );
  // await setIMFFactor2Tx.wait();
  // // //Set the IMFFactor for USDC
  // // const setIMFFactor3Tx = await comptrollerContract._setIMFFactor(
  // //   mUSDCContract.address,
  // //   ethers.utils.parseEther("0.04")
  // // );
  // // await setIMFFactor3Tx.wait();
  // //Set the Maximum amount of borrowed CORE tokens (10mil)
  // const setBorrowCapTx = await comptrollerContract._setMarketBorrowCaps(
  //   [mUSDContract.address],
  //   [ethers.utils.parseEther("10000000")]
  // );
  // await setBorrowCapTx.wait();
  // console.log("Comptroller Configured");

  // //Set the ReserveFactor for CORE
  // const setReserveFactor1Tx = await mUSDContract._setReserveFactor(
  //   ethers.utils.parseEther("0.5")
  // );
  // await setReserveFactor1Tx.wait();
  // //Set the ReserveFactor for ETH
  // const setReserveFactor2Tx = await mEtherContract._setReserveFactor(
  //   ethers.utils.parseEther("0.5")
  // );
  // await setReserveFactor2Tx.wait();
  // // //Set the ReserveFactor for USDC
  // // const setReserveFactor3Tx = await mUSDCContract._setReserveFactor(
  // //   ethers.utils.parseEther("0.5")
  // // );
  // // await setReserveFactor3Tx.wait();
  // console.log("bTokens configured");

  // //Allow Fed to mint the CORE
  // var addMinterTx = await COREContract.addMinter(fedContract.address);
  // await addMinterTx.wait();
  // console.log("Fed Minters set");

  // //fed expension (minting 10mil BAI tokens and depositing them into the protocol)
  // const expansionTx = await fedContract.expansion(
  //   ethers.utils.parseEther("10000000")
  // );
  // expansionTx.wait();
  // console.log("Fed Expanded");

  //In order for the subgraph to work we accrue interest once for every mToken
  // var accrueTx = await mUSDContract.accrueInterest();
  // await accrueTx.wait();
  // // var accrueTx = await mUSDCContract.accrueInterest();
  // // await accrueTx.wait();
  // var accrueTx = await mEtherContract.accrueInterest();
  // await accrueTx.wait();
  console.log("Interests accrued");

  //Print all addresses
  console.log(
    "----------------------------------------------------------------------------"
  );
  console.log("Deployed Addresses:");
  console.log(
    "----------------------------------------------------------------------------"
  );
  console.log("Comptroller:               " + originalcomptrollerAddress);
  console.log("Unitroller:                " + unitrollerContract.address);
  console.log("Oracle:                    " + oracleContract.address);
  console.log("Implementation             " + delegateContract.address);
  // console.log("Fed:                       " + fedContract.address);
  console.log("BAI:                      " + COREContract.address);
  console.log("BAI interestrate model:   " + JumpRateModelContract.address);
  console.log("bUSD:                     " + mUSDContract.address);
  console.log("Eth interest rate model:   " + WhitePaperModelContract.address);
  console.log("bETH:                     " + mEtherContract.address);

  console.log("Stabilizer:                " + stabilizerContract.address);
  // console.log("Fed:                       " + fedContract.address);
  console.log(
    "----------------------------------------------------------------------------"
  );
  console.log(
    "----------------------------------------------------------------------------"
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
