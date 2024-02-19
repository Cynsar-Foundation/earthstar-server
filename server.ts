import * as Earthstar from "https://deno.land/x/earthstar@v10.2.2/mod.ts";
import {
  type IServerExtension,
  type Peer,
  Replica,
  ReplicaDriverFs,
  AuthorKeypair,
} from "https://deno.land/x/earthstar@v10.2.2/mod.ts";
class AddShareExtension implements IServerExtension {
  private peer: Peer | null = null;
  //private crypto: Earthstar.Crytpo; // Ensure this is initialized correctly

  constructor() {}

  async register(peer: Peer) {
    this.peer = peer;
  }

  async handler(req: Request): Promise<Response | null> {
    const url = new URL(req.url);
    if (url.pathname !== "/api/addShare") {
      return null; // Not the endpoint this extension handles
    }

    const addShare = url.searchParams.get("addShare");
    const authAddress = url.searchParams.get("authorAddress");
    const signature = url.searchParams.get("signature");
    console.log("Req for adding shares", addShare);
    if (!addShare || !authAddress || !signature) {
      console.log("Error", addShare, authAddress, signature);
      return new Response("Missing required parameters", { status: 400 });
    }

    const isValidSignature = await Earthstar.Crypto.verify(
      authAddress,
      signature,
      addShare,
    );

    if (!isValidSignature) {
      return new Response("Invalid signature", { status: 403 });
    }

    const replica = new Replica({
      driver: new ReplicaDriverFs(addShare, "./data"),
    });

    this.peer?.addReplica(replica);

    return new Response("Share added successfully", { status: 200 });
  }
}

class EarthstarServer {
  server: Earthstar.Server | null = null;

  start() {
    const addShareExtension = new AddShareExtension();

    this.server = new Earthstar.Server([
      new Earthstar.ExtensionKnownShares({
        knownSharesPath: "./known_shares.json",
        onCreateReplica: (address) => {
          return new Earthstar.Replica({
            driver: new Earthstar.ReplicaDriverFs(address, "./data"),
          });
        },
      }),
      new Earthstar.ExtensionSyncWeb(),
      addShareExtension,
    ]);
  }

  async stop() {
    if (this.server) {
      // Properly close or stop the server based on Earthstar documentation or your application logic
      this.server.close();
    }
  }
}

// Export the EarthstarServer class for use in other modules, such as tests
export { EarthstarServer };
