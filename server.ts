import * as Earthstar from "https://deno.land/x/earthstar@v10.2.2/mod.ts";

new Earthstar.Server([
  new Earthstar.ExtensionKnownShares({
    knownSharesPath: "./known_shares.json",
    onCreateReplica: (address) => {
      console.log(`Creating replica for known ${address}...`);
      return new Earthstar.Replica({
        driver: new Earthstar.ReplicaDriverFs(address, "./data"),
      });
    },
  }),
  new Earthstar.ExtensionSyncWeb(),
]);
