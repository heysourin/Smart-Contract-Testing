const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("My first contract unit test", function () {
  before(async function () {
    const MyFirstContract = await ethers.getContractFactory("MyFirstContract");
    const myFistContract = await MyFirstContract.deploy();
    await myFistContract.deployed();
  });

  beforeEach(async function () {
    await myFistContract.setNumber(0);
  });

  it("Initial value is set to 0", async function () {
    expect(await myFistContract.getNumber().toString()).to.equal(0);
  });

  it("Retrieve returns a value previosly stored", async function () {
    await myFistContract.setNumber(77);
    expect(await myFistContract.getNumber().toString()).to.equal(77);
  });
  
});
