import { Keypair, Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";

import key from "./key.json";
import { cluster } from "./commons";

// Retrieve the keypair from the file
const keypair = Keypair.fromSecretKey(new Uint8Array(new Uint8Array(key)));
console.log("Account public key:", keypair.publicKey.toBase58());

// Create connection to Solana network (start local validator with `npm run testnet` command)
const connection = new Connection(cluster, "finalized");

(async () => {
  try {
    // Airdrop 10 SOL to our keypair
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      10 * LAMPORTS_PER_SOL
    );

    console.log(
      `Success! Check out your TX here: https://explorer.solana.com/tx/${airdropSignature}?cluster=custom&customUrl=${cluster}`
    );
  } catch (error) {
    console.error(error);
  }
})();
