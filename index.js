import { initialize } from "zokrates-js";
import {check_value} from "./main.js";

// Import the WebAssembly module
import("./static/rust_code_bg.wasm").then((wasm) => {
  // Initialize Zokrates
  initialize().then((zokratesProvider) => {
    const source = "def main(private field a) -> field { return a + a; }";

    // Compilation
    const artifacts = zokratesProvider.compile(source);

    // Get the input_value from your Rust code
    const input_value = wasm.check_value("@Mirza68MB", "@Mirza68MB");

    // Computation
    const { witness, output } = zokratesProvider.computeWitness(
      artifacts,
      [input_value]
    );
    console.log("🚀 ~ file: index.mjs:11 ~ initialize ~ output:", output);

    // Run setup
    const keypair = zokratesProvider.setup(artifacts.program);

    // Generate proof
    const proof = zokratesProvider.generateProof(
      artifacts.program,
      witness,
      keypair.pk
    );

    // Export solidity verifier
    const verifier = zokratesProvider.exportSolidityVerifier(keypair.vk);

    // Or verify off-chain
    const isVerified = zokratesProvider.verify(keypair.vk, proof);
    console.log("🚀 ~ file: index.mjs:28 ~ initialize ~ isVerified:", isVerified);
  });
});
