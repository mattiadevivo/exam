import {
  getOrCreateAssociatedTokenAccount,
  getAccount,
  mintTo,
  getMint,
} from "@solana/spl-token";
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  Signer,
} from "@solana/web3.js";
import { cluster, tokenAccountFile } from "./commons";
import key from "./key.json";
import tokenaddress from "./tokenaddress.json";
import fs from "fs";

const mintToken = async (
  connection: Connection,
  payerAndMintAccount: Signer,
  mint: PublicKey
) => {
  // Get the token account associated with the new token
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payerAndMintAccount,
    mint,
    payerAndMintAccount.publicKey
  );
  console.log("Associated token account", tokenAccount.address.toBase58());
  fs.writeFileSync(
    tokenAccountFile,
    JSON.stringify(tokenAccount.address.toBase58())
  );
  let tokenAccountInfo = await getAccount(connection, tokenAccount.address);

  console.log("Token account balance", tokenAccountInfo.amount);
  // 0
  // Let's mint some tokens
  await mintTo(
    connection,
    payerAndMintAccount,
    mint,
    tokenAccount.address,
    payerAndMintAccount.publicKey,
    100 * LAMPORTS_PER_SOL
  );
  const mintInfo = await getMint(connection, mint);
  console.log("Token supply after mint", mintInfo.supply);
  // See token account balance
  tokenAccountInfo = await getAccount(connection, tokenAccount.address);
  console.log("Token account balance after mint", tokenAccountInfo.amount);
  // 100
  return mint;
};

(async () => {
  const connection = new Connection(cluster, "finalized");
  // Retrieve the keypair from the file
  const keypair = Keypair.fromSecretKey(new Uint8Array(new Uint8Array(key)));
  console.log("Account public key:", keypair.publicKey.toBase58());
  const tokenPublicKey = new PublicKey(tokenaddress);
  // Our account will be both the payer, the mint account, and the freeze account manager for the token
  await mintToken(connection, keypair, tokenPublicKey);
})();
