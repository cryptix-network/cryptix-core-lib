# JavaScript Data Primitives Library for Cryptix

Based on the popular [Bitcore library](https://github.com/bitpay/bitcore)
developed by BitPay for the Bitcoin and [Cryptixcore](https://github.com/aspectron/kaspa-core-lib)
developed by ASPECTRON Inc., Cryptixcore library provides primitives for
interfacing with the Cryptix network.

## Get Started

```sh
git clone https://github.com/cryptix-network/cryptix-core-lib
```

Adding Cryptixcore to your app's `package.json`:

```json
"dependencies": {
    "@cryptix/core-lib": "*"
}
```

## Cryptix adaptation

Cryptix core library provides primitives such as Transaction and UTXO
data structures customized for use with the next-generation
high-performance Cryptix network.

## Documentation

The complete docs are hosted here: [bitcore documentation](https://github.com/bitpay/bitcore).
There's also a [bitcore API reference](https://github.com/bitpay/bitcore/blob/master/packages/bitcore-node/docs/api-documentation.md)
available generated from the JSDocs of the project, where you'll find
low-level details on each bitcore utility.

## Building the Browser Bundle

To build a `cryptixcore-lib` full bundle for the browser:

```sh
gulp browser
```

This will generate files named `cryptixcore-lib.js` and
`cryptixcore-lib.min.js`.

# License

Code released under [the MIT license](https://github.com/bitpay/bitcore/blob/master/LICENSE).

Bitcore - Copyright 2013-2019 BitPay, Inc. Bitcore is a trademark
maintained by BitPay, Inc.

Cryptixcore - Copyright 2020 ASPECTRON Inc.

Cryptixcore - Copyright 2024 Cryptix.
