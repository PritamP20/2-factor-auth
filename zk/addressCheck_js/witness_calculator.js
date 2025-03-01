const fs = require("fs");

async function initialize(buffer) {
    const wasmModule = await WebAssembly.instantiate(buffer, {
        runtime: {},  // Ensure the "runtime" module exists (even if empty)
        env: {
            memory: new WebAssembly.Memory({ initial: 256 }),
            abort: () => console.log("Abort called in WASM")
        }
    });

    return {
        calculateWitness: async (input, sanityCheck) => {
            const witnessSize = wasmModule.instance.exports.getWitnessSize();
            const witness = new Array(witnessSize).fill(0);
            wasmModule.instance.exports.calculateWitness(witness, input, sanityCheck);
            return witness;
        }
    };
}

module.exports.initialize = initialize;
