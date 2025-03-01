pragma circom 2.0;

// Equality check template
template IsEqual() {
    signal input in0;
    signal input in1;
    signal output out;

    signal diff;
    diff <== in0 - in1; 

    signal isZero;
    isZero <== (diff * diff === 0); // If diff is 0, then it's a match
    out <== isZero;  // Output 1 if in0 == in1, otherwise 0
}

// Address Blocklist Checker
template AddressCheck(n) {
    signal input address;
    signal input blacklist[n];
    signal output is_flagged;

    component equalChecks[n];
    signal intermediateSum[n + 1]; 

    intermediateSum[0] <== 0; // Initialize first value

    for (var i = 0; i < n; i++) {
        equalChecks[i] = IsEqual();
        equalChecks[i].in0 <== address;
        equalChecks[i].in1 <== blacklist[i];

        intermediateSum[i + 1] <== intermediateSum[i] + equalChecks[i].out; // Update sum at each step
    }

    signal isNonZero;
    isNonZero <== intermediateSum[n] > 0; // Properly enforce binary output

    is_flagged <== isNonZero; // Assign output flag
}

// Create an instance with 3 blocked addresses
component main = AddressCheck(3);
