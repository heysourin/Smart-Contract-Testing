const { expect } = require("chai");
const { ethers } = require("hardhat");
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");

describe("My first contract unit test", function () {
  async function runEveryTime() {
    const DECIMALS = "18";
    const INITIAL_PRICE = "200000000000000000000";

    MockV3Aggregator = await ethers.getContractFactory("MockV3Aggregator");
    mockV3Aggregator = await MockV3Aggregator.deploy(DECIMALS, INITIAL_PRICE);
    await mockV3Aggregator.deployed();

    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    const myFistContract = await MyFirstContract.deploy();
    await myFistContract.deployed();

    return { myFistContract };
  }

  it("Initial value is set to zero", async function () {
    const { myFistContract } = await loadFixture(runEveryTime);
    expect((await myFistContract.getNumber()).toString()).to.equal("0");
  });

  it("Retrieve returns a value previosly stored", async function () {
    const { myFistContract } = await loadFixture(runEveryTime);
    await myFistContract.setNumber(77);
    expect((await myFistContract.getNumber()).toString()).to.equal("77");
  });

  // it("gets a price feed value", async function () {
  //   const { myFistContract } = await loadFixture(runEveryTime);
  //   let result = await myFirstContract.getLatestPrice();
  //   console.log("price:" + new ethers.BigNumber.from(result._hex).toString());
  //   expect(new ethers.BigNumber.from(result._hex).toString())
  //     .equals(INITIAL_PRICE)
  //     .toString();
  // });
});
