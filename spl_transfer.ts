import { getOrCreateAssociatedTokenAccount, transfer } from "@solana/spl-token";
import {
  Connection,
  Signer,
  PublicKey,
  TransactionSignature,
  Keypair,
} from "@solana/web3.js";
import key from "./key.json";
import tokenaddress from "./tokenaddress.json";
import { cluster } from "./commons";

/**
 * Transfers a specified amount of tokens from the sender's account to the receiver's account.
 *
 * @param {Connection} connection - The connection to the Solana network.
 * @param {Signer} sender - The signer of the transaction.
 * @param {PublicKey} tokenAccountReceiver - The public key of the receiver's account.
 * @param {number} amount - The amount of tokens to transfer.
 * @return {Promise<TransactionSignature>} A promise containing the transaction hash.
 */
const transferToken = async (
  connection: Connection,
  sender: Signer,
  tokenAccountReceiver: PublicKey,
  mint: PublicKey,
  amount: number
): Promise<TransactionSignature> => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    mint,
    tokenAccountReceiver
  );
  return transfer(
    connection,
    sender,
    sender.publicKey,
    tokenAccountReceiver,
    sender,
    amount
  );
};

(async () => {
  const connection = new Connection(cluster, "finalized");
  // Retrieve the keypair from the file
  const keypair = Keypair.fromSecretKey(new Uint8Array(new Uint8Array(key)));
  const tokenPublicKey = new PublicKey(tokenaddress);
  const to = Keypair.generate();
  console.log("To: ", to.publicKey.toBase58());
  await transferToken(connection, keypair, to.publicKey, tokenPublicKey, 1);
})();
