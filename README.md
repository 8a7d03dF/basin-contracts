# Basin Finance – a fork of BAO Markets (a.k.a. HardSynths)

For those who want to dive into the protocol early we recommend familiarizing yourself with the compound protocol:

https://compound.finance/docs (Excellent documentation)

and after that Inverse Finance:

https://github.com/InverseFinance/anchor

The specific configurations and changes made to the protocol can be viewed in the Bao Docs:

https://docs.bao.finance/franchises/bao-markets

As part of Basin, we've made further changes to contracts/InverseFinance/Oracle.sol where there's a keeper role that can set the fixed price of any cToken, which we plan on doing in a 5 minute cadence to account for the (current) lack of Oracles on base.

This role can be deprecated later by setting the keeper to the 0 address.

# Deployed Mainnet Contracts

---

## Deployed Addresses:

Comptroller: 0x3593027225C06FA7d977E5D2D195CD79DA025735
Unitroller: 0xbA47ccbE10B6addD8385748311a4a9478e74F38D
Oracle: 0xf866D3730df96eD1c1E1d81a2E9a209392783Db0
Implementation 0x97D74db8ba3269E36054411F2Da6c91E2211cbe7
Fed: 0x05f25401E9ea0355B219098519F423870fcf64c0
BAI: 0x5c185329BC7720AebD804357043121D26036D1B3
BAI interest rate model: 0xC699aC8135E4cBa1e0346f7bf0f01BF0F0eeDC26
bUSD: 0xe69Bed0ec94D247f4a21dD42Da2B9995DCA551d6
Eth interest rate model: 0xAC764ee1D0a5D3542fcC7De8683239b6D0E6272f
bETH: 0x540EE31b264e8823e01795AA424fE89554672dc1
Stabilizer:0x594368C1A1A733581A546a4ac46bF1962547f427

---
