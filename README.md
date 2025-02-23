# ic-js

A collection of library for interfacing with the Internet Computer.

The libraries are still in active development, and new features will incrementally be available.

## Libraries

- [nns](/packages/nns): interfacing with the **ledger** and **governance** canisters of the Network Nervous System (NNS)
- [sns](/packages/sns): interacting with a Service Nervous System (SNS) project
- [cmc](/packages/cmc): interfacing with the **cmc** canister of the IC
- [ledger](/packages/ledger): interacting with ICRC compatible **ledgers**
- [ckBTC](/packages/ckbtc): interfacing with **ckBTC**
- [ic-management](/packages/ic-management): interfacing with the **IC management canister**
- [utils](/packages/utils): a collection of utilities and constants
- [nns-proto](/packages/nns-proto): the protobuf source used by `nns-js` to support hardware wallets

## Installation

Install any library of this repo in your project from [npm](https://www.npmjs.com):

```bash
npm i @dfinity/utils
npm i @dfinity/ledger
npm i @dfinity/nns-proto @dfinity/nns
npm i @dfinity/sns
npm i @dfinity/cmc
npm i @dfinity/ckbtc
```

You may be using all libraries in your project - as we do in [NNS-dapp](https://github.com/dfinity/nns-dapp/).
That is s why, to help tree-shaking and avoid duplication of code, the libraries of this project are referencing [agent-js](https://github.com/dfinity/agent-js) and [utils](/packages/utils) as peer dependencies.

Therefore, be sure that the needed `agent-js` and [utils](/packages/utils) dependencies are available in your project or install these as following:

```bash
npm i @dfinity/agent @dfinity/candid @dfinity/principal @dfinity/utils
```

## Links

Here are some useful links:

- See the [HACKING](/HACKING.md) document for some information about local development
