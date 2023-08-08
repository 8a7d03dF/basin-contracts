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

Oracle:0x9Cd9e8f826646bC408F5BA070d7510A7ff3D38Bb
Delegate Impl: 0xc2dC1CFc6823b0C262Fff11bf58943b755b45cFD
Comptroller:0x0945507E29B66451FE4Ac31761595A850996c58F
BAI:0xA1f5847ed8F122a2F8077D7636575F5B8Be608AA
BAI IRM: 0x76bE68D93efD6f0E347710461797cF565a8C6AfD
bBAI:0xEEa780788646bb1eAfAdb07101CeD1FdAd643AB6
bETH:0x1D1293Fa7F61dCde7B16bd6482558fC80C4080f5
bETH IRM:0xaC633FEA70903B569864a5Ec6E8C43E237EA0767
Fed:0x8f2f8485c13dabe35774f4A63991Ccd474354ac0
Stabilizer:0xaf62d92006f5fFc0BA413bf87e70db2979Fffa94
