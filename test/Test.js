const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");

const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");

const { expect } = require("chai");
const { ethers } = require("hardhat");

// console.log(time)
// console.log(loadFixture);
// console.log(anyValue);

describe("MyTest", function () {
  //TODO: Gathering all the things we will need over and over agian
  async function runEveryTime() {
    const ONE_YEAR_IN_SECONDS = 356 * 24 * 60 * 60;
    const ONE_GWEI = 1000000000;
    const lockedAmount = ONE_GWEI;
    const unlockTime = (await time.latest()) + ONE_YEAR_IN_SECONDS;

    //GET ACCOUNTS:
    const [owner, otherAccount] = await ethers.getSigners();
    // console.log(owner);
    // console.log(otherAccount);

    const MyTest = await ethers.getContractFactory("MyTest");
    const myTest = await MyTest.deploy(unlockTime, { value: lockedAmount });
    await myTest.deployed();

    //To use these same things over and over again;
    return { myTest, unlockTime, lockedAmount, owner, otherAccount };
  }

  describe("Deployment", function () {
    //TODO: Checking unlock time:
    it("Should chcek unlocked time", async function () {
      const { myTest, unlockTime } = await loadFixture(runEveryTime); //Load fixture allows to run the function over and over again

      expect(await myTest.unlocktime()).to.equal(unlockTime);
    });

    //TODO: Checking the owner:
    it("Should check the owner", async function () {
      const { owner, myTest } = await loadFixture(runEveryTime);
      /*THINGS I DID FOR DEBUGGING, AS I WAS FACING TROUBLE TO FIND THE ADDRESS, Hehe :D
       const ab =`Address from contract ${(await myTest.owner())}`
       const ab2 = `Address from test ${owner.address}`;
       console.log(ab);
       console.log(ab2); */
      expect(await myTest.owner()).to.equal(owner.address);
    });

    //TODO: Checking the balance;
    it("Should check the balance", async function () {
      const { lockedAmount, myTest } = await loadFixture(runEveryTime);
      //Todo :Getting contract balacne
      const contractBalance = await ethers.provider.getBalance(myTest.address);
      // console.log(contractBalance);
      expect(contractBalance).to.equal(lockedAmount);
    });

    //TODO: Checking conditions
    it("It should fail if the unlock time is not from the future", async function () {
      const latestTime = await time.latest();
      // console.log(latestTime);
      const MyTest = await ethers.getContractFactory("MyTest");

      await expect(
        MyTest.deploy(latestTime, { value: "1" })
      ).to.be.revertedWith("Unlock time should be in future"); //! error msg should be exact ******
    });
  });

  describe("Withdrwal", function () {
    describe("Validations", function () {
      //Todo: Time check for the withdraw
      it("Should revert with the right if called too soon", async function () {
        const { myTest } = await loadFixture(runEveryTime);
        await expect(myTest.withdraw()).to.be.revertedWith(
          "Wait till the time period to be completed"
        );
      });
      //Todo: owner
      it("Should revert the message for the right owner", async function () {
        const { myTest, unlockTime, otherAccount } = await loadFixture(
          runEveryTime
        );

        const newTime = await time.increaseTo(unlockTime); //increasing current time to the future~ 'unlockTime'

        // console.log(newTime);
        //! Connected another account to check if it gives error
        await expect(
          myTest.connect(otherAccount).withdraw()
        ).to.be.revertedWith("You are not the owner");
      });
    });
  });

  //TODO: Lets check the EVENTS now
  describe("Events", function () {
    //Submit events
    it("Should emit the event on withdrawls", async function () {
      const { myTest, unlockTime, lockedAmount } = await loadFixture(
        runEveryTime
      );

      await time.increaseTo(unlockTime);
      await expect(myTest.withdraw())
        .to.emit(myTest, "Withdrawal")
        .withArgs(lockedAmount, anyValue);
    });


  });

  //
  runEveryTime();
});
