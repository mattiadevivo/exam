import { Keypair } from "@solana/web3.js";
import fs from "fs";

const filenName = "key.json";

const generateKeypair = () => {
  const keypair = Keypair.generate();
  console.log("Public key:", keypair.publicKey.toBase58());
  fs.writeFileSync(filenName, `[${keypair.secretKey}]`);
};

generateKeypair();
