const { readFileSync, writeFileSync } = require("fs");
const { initialize } = require("./witness_calculator.js");

async function generateWitness(wasmFile, inputFile, outputFile) {
    const buffer = readFileSync(wasmFile);
    const witnessCalculator = await initialize(buffer);
    
    const input = JSON.parse(readFileSync(inputFile, "utf8"));
    const witness = await witnessCalculator.calculateWitness(input, true);
    
    writeFileSync(outputFile, witness.join("\n"), "utf8");
    console.log("Witness generated successfully.");
}

const wasmFile = process.argv[2];
const inputFile = process.argv[3];
const outputFile = process.argv[4];

generateWitness(wasmFile, inputFile, outputFile).catch(console.error);
