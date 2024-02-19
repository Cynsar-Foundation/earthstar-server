import * as Earthstar from "https://deno.land/x/earthstar@v10.2.2/mod.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import { delay } from "https://deno.land/std@0.215.0/async/delay.ts";
// Assuming `startServer` is a function that starts your server and returns a handle to stop it
import { EarthstarServer } from "./server.ts";
const serverHandle = new EarthstarServer();
// Start the server before running any tests
Deno.test({
  name: "[Setup] Start Earthstar Server",
  fn: async () => {
    await delay(1000);
    serverHandle.start();
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

// Add the data to share then check if it exists
Deno.test({
  name: "[Add Data to the Share and Check if it exists on Next Step ] Earthstar Server",
  fn: async () => {
    // Perform setup operations (like generating keypairs and signatures)
    const shareKeypair =
      await Earthstar.Crypto.generateShareKeypair("gardening");
    if (Earthstar.isErr(shareKeypair)) {
      throw new Error("Failed to generate share keypair");
    }
    const shareAddressToAdd = shareKeypair.shareAddress;
    const authorKeypair = await Earthstar.Crypto.generateAuthorKeypair("test");
    if (Earthstar.isErr(authorKeypair)) {
      throw new Error("Failed to generate author keypair");
    }

    const signature = await Earthstar.Crypto.sign(
      authorKeypair,
      shareAddressToAdd,
    );

    if (Earthstar.isErr(signature)) {
      throw new Error("Failed to sign the message");
    }

    // Construct the request URL
    const apiUrl = "http://localhost:8000/api/addShare"; // Adjust port and path as necessary
    const requestUrl = `${apiUrl}?addShare=${encodeURIComponent(shareAddressToAdd)}&authorAddress=${encodeURIComponent(authorKeypair.address)}&signature=${encodeURIComponent(signature)}`;

    // Make the request to the server
    const response = await fetch(requestUrl, {
      method: "POST", // Assuming POST method for your endpoint
    });

    // Assert the expected response
    assertEquals(
      response.status,
      200,
      "Expected HTTP status 200 for successful addition of share",
    );
    const responseBody = await response.text();
    assertEquals(
      responseBody,
      "Share added successfully",
      "Expected confirmation message in response body",
    );
    // Stop the server after the test
    // Assuming your `startServer` function provides a `stop` method on the returned handle
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

Deno.test({
  name: "[Add Share To ] Earthstar Server",
  fn: async () => {
    // Perform setup operations (like generating keypairs and signatures)
    const shareKeypair =
      await Earthstar.Crypto.generateShareKeypair("gardening");
    if (Earthstar.isErr(shareKeypair)) {
      throw new Error("Failed to generate share keypair");
    }
    const shareAddressToAdd = shareKeypair.shareAddress;
    const authorKeypair = await Earthstar.Crypto.generateAuthorKeypair("test");
    if (Earthstar.isErr(authorKeypair)) {
      throw new Error("Failed to generate author keypair");
    }

    const signature = await Earthstar.Crypto.sign(
      authorKeypair,
      shareAddressToAdd,
    );

    if (Earthstar.isErr(signature)) {
      throw new Error("Failed to sign the message");
    }

    // Construct the request URL
    const apiUrl = "http://localhost:8000/api/addShare"; // Adjust port and path as necessary
    const requestUrl = `${apiUrl}?addShare=${encodeURIComponent(shareAddressToAdd)}&authorAddress=${encodeURIComponent(authorKeypair.address)}&signature=${encodeURIComponent(signature)}`;

    // Make the request to the server
    const response = await fetch(requestUrl, {
      method: "POST", // Assuming POST method for your endpoint
    });

    // Assert the expected response
    assertEquals(
      response.status,
      200,
      "Expected HTTP status 200 for successful addition of share",
    );
    const responseBody = await response.text();
    assertEquals(
      responseBody,
      "Share added successfully",
      "Expected confirmation message in response body",
    );
    // Stop the server after the test
    // Assuming your `startServer` function provides a `stop` method on the returned handle
  },
  sanitizeOps: false,
  sanitizeResources: false,
});

Deno.test({
  name: "[Teardown] Stop Earthstar Server",
  fn: async () => {
    await serverHandle.stop();
  },
  sanitizeOps: false,
  sanitizeResources: false,
});
