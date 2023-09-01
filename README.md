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

---

## Deployed Addresses on Base (and verified) (Sept, 1st):

Comptroller: 0xAE56cb36b505aD6f2de48f87d0551Ea6dB324a18
Unitroller: 0x15b17a46acea1d7E263EA963e9D043AFb3401D8a
Oracle: 0x60Cb8F5fD64Ae3c5D99C6Ca6f6e7B43ECCEcedfF
Implementation 0x34324DAC7230EB2F5C3fF8ec2faE7794b43196E1
Fed: 0x9ded3aAC61a0f18a67C607C91068efF8EAa704AB
BAI: 0x2259ba575F7C66cF10d59a1Fe2F7BA77C5685770
BAI interestrate model: 0x229D988471EDF46B645A6FB660FA5c574e7aC67A
bUSD: 0x448FBB8a102B7750A789Fd6e5f4f9A4256798910
Eth interest rate model: 0xf3E5a11b5528f4fa6700dc63dc0919afB841cb3E
bETH: 0x7D7EB2AA30ebDCE8787B3e40cB10D328f92baeEc

---
