import { useLocalStorageState } from "../../utils/utils";
import {
  Account,
  Keypair,
  clusterApiUrl,
  Connection,
  PublicKey,
  Transaction,
  TransactionInstruction,
  SendOptions,
  AccountChangeCallback,
  Context,
  AccountInfo,
  Commitment,
} from "@solana/web3.js";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { notify } from "../../utils/notifications";
import { ExplorerLink } from "../../components/ExplorerLink";
import { setProgramIds } from "../../utils/ids";
import { WalletAdapter } from "./wallet";
import { cache, getMultipleAccounts, MintParser } from "./accounts";
import {
  TokenListProvider,
  ENV as ChainID,
  TokenInfo,
} from "@solana/spl-token-registry";

export type ENV = "mainnet-beta" | "testnet" | "devnet" | "localnet";

export const ENDPOINTS = [
  {
    name: "mainnet-beta" as ENV,
    endpoint: "https://solana-api.projectserum.com/",
    chainID: ChainID.MainnetBeta,
  },
  {
    name: "testnet" as ENV,
    endpoint: clusterApiUrl("testnet"),
    chainID: ChainID.Testnet,
  },
  {
    name: "devnet" as ENV,
    endpoint: clusterApiUrl("devnet"),
    chainID: ChainID.Devnet,
  },
  {
    name: "localnet" as ENV,
    endpoint: "http://127.0.0.1:8899",
    chainID: ChainID.Devnet,
  },
];

const DEFAULT = ENDPOINTS[0].endpoint;
const DEFAULT_SLIPPAGE = 0.25;
const DEFAULT_COMMITMENT = "confirmed";

interface ConnectionConfig {
  connection: Connection;
  sendConnection: Connection;
  endpoint: string;
  slippage: number;
  setSlippage: (val: number) => void;
  env: ENV;
  setEndpoint: (val: string) => void;
  tokens: TokenInfo[];
  tokenMap: Map<string, TokenInfo>;
}

const ConnectionContext = React.createContext<ConnectionConfig>({
  endpoint: DEFAULT,
  setEndpoint: () => { },
  slippage: DEFAULT_SLIPPAGE,
  setSlippage: (val: number) => { },
  connection: new Connection(DEFAULT, DEFAULT_COMMITMENT),
  sendConnection: new Connection(DEFAULT, DEFAULT_COMMITMENT),
  env: ENDPOINTS[0].name,
  tokens: [],
  tokenMap: new Map<string, TokenInfo>(),
});

export function ConnectionProvider({ children = undefined as any }) {
  const [endpoint, setEndpoint] = useLocalStorageState(
    "connectionEndpts",
    ENDPOINTS[0].endpoint
  );

  const [slippage, setSlippage] = useLocalStorageState(
    "slippage",
    DEFAULT_SLIPPAGE.toString()
  );

  const connection = useMemo(
    () => new Connection(endpoint, DEFAULT_COMMITMENT),
    [endpoint]
  );
  const sendConnection = useMemo(
    () => new Connection(endpoint, DEFAULT_COMMITMENT),
    [endpoint]
  );

  const chain =
    ENDPOINTS.find((end) => end.endpoint === endpoint) || ENDPOINTS[0];
  const env = chain.name;

  const [tokens, setTokens] = useState<TokenInfo[]>([]);
  const [tokenMap, setTokenMap] = useState<Map<string, TokenInfo>>(new Map());
  useEffect(() => {
    cache.clear();
    // fetch token files
    (async () => {
      const res = await new TokenListProvider().resolve();
      const list = res
        .filterByChainId(chain.chainID)
        .excludeByTag("nft")
        .getList();
      const knownMints = list.reduce((map, item) => {
        map.set(item.address, item);
        return map;
      }, new Map<string, TokenInfo>());

      const accounts = await getMultipleAccounts(
        connection,
        [...knownMints.keys()],
        "single"
      );
      accounts.keys.forEach((key, index) => {
        const account = accounts.array[index];
        if (!account) {
          return;
        }

        cache.add(new PublicKey(key), account, MintParser);
      });

      setTokenMap(knownMints);
      setTokens(list);
    })();
  }, [connection, chain]);

  setProgramIds(env);

  // The websocket library solana/web3.js uses closes its websocket connection when the subscription list
  // is empty after opening its first time, preventing subsequent subscriptions from receiving responses.
  // This is a hack to prevent the list from every getting empty
  useEffect(() => {
    const id = connection.onAccountChange(new Account().publicKey, () => { });
    return () => {
      connection.removeAccountChangeListener(id);
    };
  }, [connection]);

  useEffect(() => {
    const id = connection.onSlotChange(() => null);
    return () => {
      connection.removeSlotChangeListener(id);
    };
  }, [connection]);

  useEffect(() => {
    const id = sendConnection.onAccountChange(
      new Account().publicKey,
      () => { }
    );
    return () => {
      sendConnection.removeAccountChangeListener(id);
    };
  }, [sendConnection]);

  useEffect(() => {
    const id = sendConnection.onSlotChange(() => null);
    return () => {
      sendConnection.removeSlotChangeListener(id);
    };
  }, [sendConnection]);

  return (
    <ConnectionContext.Provider
      value={{
        endpoint,
        setEndpoint,
        slippage: parseFloat(slippage),
        setSlippage: (val) => setSlippage(val.toString()),
        connection,
        sendConnection,
        tokens,
        tokenMap,
        env,
      }}
    >
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnection() {
  return useContext(ConnectionContext).connection as Connection;
}

export function useSendConnection() {
  return useContext(ConnectionContext)?.sendConnection;
}

export function useConnectionConfig() {
  const context = useContext(ConnectionContext);
  return {
    endpoint: context.endpoint,
    setEndpoint: context.setEndpoint,
    env: context.env,
    tokens: context.tokens,
    tokenMap: context.tokenMap,
  };
}

export function useSlippageConfig() {
  const { slippage, setSlippage } = useContext(ConnectionContext);
  return { slippage, setSlippage };
}

const getErrorForTransaction = async (connection: Connection, txid: string) => {
  // wait for all confirmation before geting transaction
  await connection.confirmTransaction(txid, "max");

  const tx = await connection.getParsedConfirmedTransaction(txid);

  const errors: string[] = [];
  if (tx?.meta && tx.meta.logMessages) {
    tx.meta.logMessages.forEach((log) => {
      const regex = /Error: (.*)/gm;
      let m;
      while ((m = regex.exec(log)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
          regex.lastIndex++;
        }

        if (m.length > 1) {
          errors.push(m[1]);
        }
      }
    });
  }

  return errors;
};

export const sendTransaction = async (
  connection: Connection,
  env: ENV,
  wallet: WalletAdapter,
  instructions: TransactionInstruction[],
  awaitConfirmation = true
): Promise<[ok: boolean, txid: string]> => {
  if (!wallet?.publicKey) {
    throw new Error("Wallet is not connected");
  }

  let transaction = new Transaction();
  instructions.forEach((instruction) => transaction.add(instruction));
  transaction.recentBlockhash = (
    await connection.getRecentBlockhash()
  ).blockhash;
  transaction.feePayer = wallet.publicKey;
  transaction = await wallet.signTransaction(transaction);
  notify({
    message: "Sending transaction...",
    type: "info",
  });
  let options: SendOptions = {
    skipPreflight: true,
    preflightCommitment: "singleGossip",
  };
  const txid = await connection.sendRawTransaction(
    transaction.serialize(),
    options
  );

  let ok = true;

  if (awaitConfirmation) {
    const status = (
      await connection.confirmTransaction(
        txid,
        options && (options.preflightCommitment as any)
      )
    ).value;

    if (status?.err) {
      ok = false;
      const errors = await getErrorForTransaction(connection, txid);
      notify({
        message: "Transaction failed...",
        description: (
          <>
            {errors.map((err) => (
              <div>{err}</div>
            ))}
            <ExplorerLink address={txid} cluster={env} type="transaction" />
          </>
        ),
        type: "error",
      });
    }
  }

  return [ok, txid];
};

/**
 * Fetch an account for the specified public key and subscribe a callback
 * to be invoked whenever the specified account changes.
 *
 * @param connection Connection to use
 * @param publicKey Public key of the account to monitor
 * @param callback Function to invoke whenever the account is changed
 * @param commitment Specify the commitment level account changes must reach before notification
 * @return subscription id
 */

export const getAccountInfoAndSubscribe = function (
  connection: Connection,
  publicKey: PublicKey,
  callback: AccountChangeCallback,
  commitment?: Commitment | undefined
): number {
  let latestSlot: number = -1;

  let subscriptionId = connection.onAccountChange(
    publicKey,
    (acc: AccountInfo<Buffer>, context: Context) => {
      if (context.slot >= latestSlot) {
        latestSlot = context.slot;
        callback(acc, context);
      }
    },
    commitment
  );

  connection
    .getAccountInfoAndContext(publicKey, commitment)
    .then((response) => {
      if (response.context.slot >= latestSlot) {
        latestSlot = response.context.slot;
        if (response.value) {
          callback(response.value, response.context);
        }
      }
    });

  return subscriptionId;
};