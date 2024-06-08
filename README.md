# Solana hands-on

Each user of the dApp will need to insert their Keypair or generate a new Keypair, the Keypair is a private key with a matching public key, used to sign transactions.

- [Create token using Solana SPL](https://github.com/solana-developers/program-examples/tree/main/tokens/create-token)
- [Explorer](https://explorer.solana.com/address/92Q1ssUD29baW5b85kbvhP1pYrhvUfnnnoGWZV8MxGd1?cluster=custom&customUrl=http%3A%2F%2Flocalhost%3A8899)

## Token Mint

Both fungible Token and NFT are created via Solana SPL Program.

You can create them by using the Rest library or [JS bindings](https://github.com/solana-labs/solana-program-library/tree/master/token/js).

Install the js package

```shell
npm i @solana/spl-token
```

### Token Decimals

Whenever we mint a token we need to specify decimals, let's understand what decimals are and why are needed whenever we create a token:
**decimals** is a numeric value that specifies the number of decimal places that the token can have. For example, a decimals value of 0 means the token cannot be divided and is only tradable in whole units. A value of 2, on the other hand, allows for two decimal places, enabling transactions of 0.01, 0.02, etc.
