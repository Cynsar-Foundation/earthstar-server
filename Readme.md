# Earthstar Meets CF

## Overview

This project leverages Earthstar, an open-source library for building peer-to-peer (p2p) applications, to create and deploy static websites on a private distributed network. By using Earthstar's sync capabilities, website content is replicated across multiple devices in a network, ensuring high availability and resilience. The project is designed for individuals and organizations that require a decentralized approach to hosting—enhancing privacy and control over their content.

## Features

1. Earthstar is an offline-first database.
2. Earthstar is a key-value database which supports author versions.
3. Earthstar data is mutable.
4. Earthstar databases can sync
5. Earthstar databases are private
6. Earthstar works in the browser

## Requirements

To run this project, you will need:

- Deno

## Installation

To get started with this project, follow these instructions:

1. Clone the repository:
    ```sh
    git clone earthstar-server
    cd
    ```
2. Now you need to create your shareAddress and a secret though we are not going to use the secret at this point.
    ```sh
    deno
    import * as Earthstar from "https://deno.land/x/earthstar/mod.ts";
    let shareKeypair = await Earthstar.Crypto.generateShareKeypair("gardening");
    ```
3. Copy and paste the shareAddress in known_shares.json
    ```sh
    "+gardening.......",
    ```
4. Run deno:
    ```sh
    deno run server.ts
    ```
This will run a local server that can sync your data only if the known_shares are provided.Remember this is a private network unlike regular peer to peer network where peers are discovered. In Earthstar discovery takes places given you have a shareAddress beforehand.

## Usage

- Use the CF Earthstar CLI or an Earthstar-enabled application to publish and sync your static website content across your private network.
- There is a [repository](https://github.com/cynsar-foundation/earthlink) includes a simple static site generator. Create your assets (HTML, CSS, JS) within the designated folders and run the build script to prepare them for distribution: (Use the shareAddress and secret from the above)
    ```sh
    deno run deploy --name projectName -shareAddress address --secret secret
    ```
- Distribute the built assets across the network using Earthstar's sync functionality:
    ```sh
    deno sync --address 'https://pub.cynsar.foundation' || 'http://localhost:8080'
    ```
- Your website is now hosted and distributed on the private network and can be accessed through any peer with the content synced.
- Your website will be available on the network here `https://serve.cynsar.foundation/{projectName}`

## Contributing

We encourage contributions to this project. Please fork the repository, make your changes, and submit a pull request for review. If you're planning to propose significant changes or would like to discuss ideas and issues, it's best to open an issue first to get feedback from the maintainers.

## Troubleshooting

If you encounter any issues or have questions, refer to the Earthstar documentation or open an issue in this repository's issue tracker.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

## Acknowledgements

- The Earthstar Project - for offering the tools and resources that make this project possible.

## Disclaimer

This project is in development and should not be considered production-ready. Use at your own risk and always ensure you comply with local regulations regarding data sharing and privacy.
