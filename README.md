# Includes:

```const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
```
``` Dealing with accounts: getting Contract balance```

```Dealing with Time```

### Rule of Thumb: Every line of contract logic should contain a corresponding test.

# Two main sources of security problems:
  1. Bugs in the blockchain infrastructure:
    - Protocols
    - EVM
  2. Bugs or Vulnerabilities in the smart contract code
    - Developer mistakes or unanticipated
    - code execution

# Multiple well known smart contract attacks:
    - Reentrancy attack
    - Cross-function race conditions
    - Integer overflow
    - DoS attack (revert, block gas limit)
    - Forcibly sending ether to a contract
    - TX reordering attacks
    - Timestamp dependence attack

# Bug vs Vulnerability
  - A bug is when an issue leads to a planned scenario not executing,or executing incorrectly.

- A vulnerability is when an issue leads to an unplanned scenario executing

- Tests do not prevent vulnerabilities.


# Types of Tests
  1. Unit tests
    Simple tests that verify a single behavior or component within a smart contract
  2. Integration tests: 
    More complex tests that validate etotaeen interactions between multiple oeere Components, including off-chain eror components such as oracles

# Tools:
  - Waffle
  - Mocha
  - Chai
  - Solidity Coverage 
  - Mocks: By imitating original, useful for local or unit tests