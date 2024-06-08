import { createMint, getMint } from "@solana/spl-token";
import { Connection, Keypair, PublicKey, Signer } from "@solana/web3.js";

import key from "./key.json";
import { cluster, tokenFile } from "./commons";
import fs from "fs";

/**
 * Creates a new token with the specified parameters.
 *
 * @param {Connection} connection - The connection to the Solana network.
 * @param {Signer} payer - The signer of the transaction.
 * @param {PublicKey} mintAccount - The mint account used to create the token.
 * @param {PublicKey | null} [freezeAccount=null] - The freeze account associated with the mint account.

 */
const createToken = async (
  connection: Connection,
  payer: Signer,
  mintAccount: PublicKey,
  freezeAccount: PublicKey | null = null
) => {
  // To create a token with spl-token, we need to create a new mint account
  const mint = await createMint(
    connection,
    payer,
    mintAccount,
    freezeAccount,
    9 // 9 decimals
  );
  console.log("Token address", mint.toBase58());
  fs.writeFileSync(tokenFile, JSON.stringify(mint.toBase58()));
  // New tokens initially have no supply and are owned by the mint authority
  let mintInfo = await getMint(connection, mint);
  console.log("Token supply", mintInfo.supply);
};

(async () => {
  const connection = new Connection(cluster, "finalized");
  // Retrieve the keypair from the file
  const keypair = Keypair.fromSecretKey(new Uint8Array(new Uint8Array(key)));
  console.log("Account public key:", keypair.publicKey.toBase58());
  // Our account will be both the payer, the mint account, and the freeze account manager for the token
  await createToken(connection, keypair, keypair.publicKey, keypair.publicKey);
})();
