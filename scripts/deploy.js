const hre = require("hardhat");
// console.log(hre);

async function main() {
  const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  const ONE_YEAR_IN_SECONDS = 356 * 24 * 60 * 60;
  const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECONDS;

  const lockedAmount = hre.ethers.utils.parseEther("1");
  console.log(lockedAmount);

  const MyTest = await hre.ethers.getContractFactory("MyTest");
  const myTest = await MyTest.deploy(unlockTime, { value: lockedAmount });

  await myTest.deployed();

  console.log(`Contract contains 1 ETH & address: ${myTest.address}`);
  console.log(myTest);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
