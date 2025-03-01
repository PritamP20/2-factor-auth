#include "circom.hpp"
#include "calcwit.hpp"
#define NSignals 26
#define NComponents 4
#define NOutputs 1
#define NInputs 4
#define NVars 9
#define NPublic 5
#define __P__ "21888242871839275222246405745257275088548364400416034343698204186575808495617"

/*
AddressCheck
n=3
*/
void AddressCheck_483f7867e2bf0e6d(Circom_CalcWit *ctx, int __cIdx) {
    FrElement _sigValue[1];
    FrElement _sigValue_1[1];
    FrElement _sigValue_2[1];
    FrElement _sigValue_3[1];
    FrElement _tmp_2[1];
    FrElement _tmp_6[1];
    FrElement i[1];
    FrElement _sigValue_4[1];
    FrElement _sigValue_5[1];
    FrElement _sigValue_6[1];
    FrElement _sigValue_7[1];
    FrElement _tmp_7[1];
    FrElement _tmp_8[1];
    FrElement _tmp_10[1];
    FrElement _tmp_9[1];
    FrElement _tmp_11[1];
    FrElement _sigValue_8[1];
    FrElement _sigValue_9[1];
    FrElement _tmp_12[1];
    FrElement _sigValue_10[1];
    int _intermediateSum_sigIdx_;
    int _offset_2;
    int _compIdx;
    int _offset_7;
    int _in0_sigIdx_;
    int _address_sigIdx_;
    int _compIdx_1;
    int _offset_9;
    int _in1_sigIdx_;
    int _blacklist_sigIdx_;
    int _offset_11;
    int _offset_13;
    int _compIdx_2;
    int _offset_15;
    int _out_sigIdx_;
    int _offset_17;
    int _compIdx_3;
    int _offset_23;
    int _in0_sigIdx__1;
    int _compIdx_4;
    int _offset_25;
    int _in1_sigIdx__1;
    int _offset_27;
    int _offset_29;
    int _compIdx_5;
    int _offset_31;
    int _out_sigIdx__1;
    int _offset_33;
    int _isNonZero_sigIdx_;
    int _offset_39;
    int _offset_41;
    int _is_flagged_sigIdx_;
    Circom_Sizes _sigSizes_intermediateSum;
    Circom_Sizes _compSizes;
    Circom_Sizes _compSizes_1;
    Circom_Sizes _sigSizes_blacklist;
    Circom_Sizes _compSizes_2;
    Circom_Sizes _compSizes_3;
    Circom_Sizes _compSizes_4;
    Circom_Sizes _compSizes_5;
    PFrElement _loopCond;
    Fr_copy(&(_tmp_6[0]), ctx->circuit->constants +1);
    Fr_copy(&(i[0]), ctx->circuit->constants +1);
    _intermediateSum_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x8298ed461aa8ac17LL /* intermediateSum */);
    _address_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x1737f69e334c12b3LL /* address */);
    _blacklist_sigIdx_ = ctx->getSignalOffset(__cIdx, 0xeef04f104476752cLL /* blacklist */);
    _isNonZero_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x169bca8b8905f8eeLL /* isNonZero */);
    _is_flagged_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x91956744773c5ffcLL /* is_flagged */);
    _sigSizes_intermediateSum = ctx->getSignalSizes(__cIdx, 0x8298ed461aa8ac17LL /* intermediateSum */);
    _sigSizes_blacklist = ctx->getSignalSizes(__cIdx, 0xeef04f104476752cLL /* blacklist */);
    /* signal input address */
    /* signal input blacklist[n] */
    /* signal output is_flagged */
    /* component equalChecks[n] */
    /* signal intermediateSum[n+1] */
    /* intermediateSum[0] <== 0 */
    _offset_2 = _intermediateSum_sigIdx_;
    ctx->setSignal(__cIdx, __cIdx, _offset_2, (ctx->circuit->constants + 0));
    /* for (var i = 0;i < n;i++) */
    /* equalChecks[i] = IsEqual() */
    /* equalChecks[i].in0 <== address */
    _compIdx = ctx->getSubComponentOffset(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
    _compSizes = ctx->getSubComponentSizes(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
    _offset_7 = _compIdx;
    _in0_sigIdx_ = ctx->getSignalOffset(_offset_7, 0x2b9fc3192bd4624aLL /* in0 */);
    ctx->multiGetSignal(__cIdx, __cIdx, _address_sigIdx_, _sigValue, 1);
    ctx->setSignal(__cIdx, _offset_7, _in0_sigIdx_, _sigValue);
    /* equalChecks[i].in1 <== blacklist[i] */
    _compIdx_1 = ctx->getSubComponentOffset(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
    _compSizes_1 = ctx->getSubComponentSizes(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
    _offset_9 = _compIdx_1;
    _in1_sigIdx_ = ctx->getSignalOffset(_offset_9, 0x2b9fc4192bd463fdLL /* in1 */);
    _offset_11 = _blacklist_sigIdx_;
    ctx->multiGetSignal(__cIdx, __cIdx, _offset_11, _sigValue_1, 1);
    ctx->setSignal(__cIdx, _offset_9, _in1_sigIdx_, _sigValue_1);
    /* intermediateSum[i+1] <== intermediateSum[i] + equalChecks[i].out */
    _offset_13 = _intermediateSum_sigIdx_;
    ctx->multiGetSignal(__cIdx, __cIdx, _offset_13, _sigValue_2, 1);
    _compIdx_2 = ctx->getSubComponentOffset(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
    _compSizes_2 = ctx->getSubComponentSizes(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
    _offset_15 = _compIdx_2;
    _out_sigIdx_ = ctx->getSignalOffset(_offset_15, 0x19f79b1921bbcfffLL /* out */);
    ctx->multiGetSignal(__cIdx, _offset_15, _out_sigIdx_, _sigValue_3, 1);
    Fr_add(_tmp_2, _sigValue_2, _sigValue_3);
    _offset_17 = _intermediateSum_sigIdx_ + 1*_sigSizes_intermediateSum[1];
    ctx->setSignal(__cIdx, __cIdx, _offset_17, _tmp_2);
    _loopCond = _tmp_6;
    while (Fr_isTrue(_loopCond)) {
        /* equalChecks[i] = IsEqual() */
        /* equalChecks[i].in0 <== address */
        _compIdx_3 = ctx->getSubComponentOffset(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
        _compSizes_3 = ctx->getSubComponentSizes(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
        _offset_23 = _compIdx_3 + Fr_toInt(i)*_compSizes_3[1];
        _in0_sigIdx__1 = ctx->getSignalOffset(_offset_23, 0x2b9fc3192bd4624aLL /* in0 */);
        ctx->multiGetSignal(__cIdx, __cIdx, _address_sigIdx_, _sigValue_4, 1);
        ctx->setSignal(__cIdx, _offset_23, _in0_sigIdx__1, _sigValue_4);
        /* equalChecks[i].in1 <== blacklist[i] */
        _compIdx_4 = ctx->getSubComponentOffset(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
        _compSizes_4 = ctx->getSubComponentSizes(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
        _offset_25 = _compIdx_4 + Fr_toInt(i)*_compSizes_4[1];
        _in1_sigIdx__1 = ctx->getSignalOffset(_offset_25, 0x2b9fc4192bd463fdLL /* in1 */);
        _offset_27 = _blacklist_sigIdx_ + Fr_toInt(i)*_sigSizes_blacklist[1];
        ctx->multiGetSignal(__cIdx, __cIdx, _offset_27, _sigValue_5, 1);
        ctx->setSignal(__cIdx, _offset_25, _in1_sigIdx__1, _sigValue_5);
        /* intermediateSum[i+1] <== intermediateSum[i] + equalChecks[i].out */
        _offset_29 = _intermediateSum_sigIdx_ + Fr_toInt(i)*_sigSizes_intermediateSum[1];
        ctx->multiGetSignal(__cIdx, __cIdx, _offset_29, _sigValue_6, 1);
        _compIdx_5 = ctx->getSubComponentOffset(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
        _compSizes_5 = ctx->getSubComponentSizes(__cIdx, 0xd09c6b5e3da80036LL /* equalChecks */);
        _offset_31 = _compIdx_5 + Fr_toInt(i)*_compSizes_5[1];
        _out_sigIdx__1 = ctx->getSignalOffset(_offset_31, 0x19f79b1921bbcfffLL /* out */);
        ctx->multiGetSignal(__cIdx, _offset_31, _out_sigIdx__1, _sigValue_7, 1);
        Fr_add(_tmp_7, _sigValue_6, _sigValue_7);
        Fr_add(_tmp_8, i, (ctx->circuit->constants + 1));
        _offset_33 = _intermediateSum_sigIdx_ + Fr_toInt(_tmp_8)*_sigSizes_intermediateSum[1];
        ctx->setSignal(__cIdx, __cIdx, _offset_33, _tmp_7);
        Fr_copyn(_tmp_10, i, 1);
        Fr_add(_tmp_9, i, (ctx->circuit->constants + 1));
        Fr_copyn(i, _tmp_9, 1);
        Fr_lt(_tmp_11, i, (ctx->circuit->constants + 2));
        _loopCond = _tmp_11;
    }
    /* signal isNonZero */
    /* isNonZero * intermediateSum[n] ==> intermediateSum[n] */
    ctx->multiGetSignal(__cIdx, __cIdx, _isNonZero_sigIdx_, _sigValue_8, 1);
    _offset_39 = _intermediateSum_sigIdx_ + 3*_sigSizes_intermediateSum[1];
    ctx->multiGetSignal(__cIdx, __cIdx, _offset_39, _sigValue_9, 1);
    Fr_mul(_tmp_12, _sigValue_8, _sigValue_9);
    _offset_41 = _intermediateSum_sigIdx_ + 3*_sigSizes_intermediateSum[1];
    ctx->setSignal(__cIdx, __cIdx, _offset_41, _tmp_12);
    /* is_flagged <== isNonZero */
    ctx->multiGetSignal(__cIdx, __cIdx, _isNonZero_sigIdx_, _sigValue_10, 1);
    ctx->setSignal(__cIdx, __cIdx, _is_flagged_sigIdx_, _sigValue_10);
    ctx->finished(__cIdx);
}
/*
IsEqual
*/
void IsEqual_a4ccc896f031163f(Circom_CalcWit *ctx, int __cIdx) {
    FrElement _sigValue[1];
    FrElement _sigValue_1[1];
    FrElement _tmp[1];
    FrElement _sigValue_2[1];
    FrElement _sigValue_3[1];
    FrElement _tmp_1[1];
    FrElement _sigValue_4[1];
    FrElement _tmp_2[1];
    int _in0_sigIdx_;
    int _in1_sigIdx_;
    int _diff_sigIdx_;
    int _isZero_sigIdx_;
    int _out_sigIdx_;
    _in0_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x2b9fc3192bd4624aLL /* in0 */);
    _in1_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x2b9fc4192bd463fdLL /* in1 */);
    _diff_sigIdx_ = ctx->getSignalOffset(__cIdx, 0xc9fcc6675752105aLL /* diff */);
    _isZero_sigIdx_ = ctx->getSignalOffset(__cIdx, 0xd00dafe9dde3ed53LL /* isZero */);
    _out_sigIdx_ = ctx->getSignalOffset(__cIdx, 0x19f79b1921bbcfffLL /* out */);
    /* signal input in0 */
    /* signal input in1 */
    /* signal output out */
    /* signal diff <== in0 - in1 */
    ctx->multiGetSignal(__cIdx, __cIdx, _in0_sigIdx_, _sigValue, 1);
    ctx->multiGetSignal(__cIdx, __cIdx, _in1_sigIdx_, _sigValue_1, 1);
    Fr_sub(_tmp, _sigValue, _sigValue_1);
    ctx->setSignal(__cIdx, __cIdx, _diff_sigIdx_, _tmp);
    /* signal isZero <== diff * diff */
    ctx->multiGetSignal(__cIdx, __cIdx, _diff_sigIdx_, _sigValue_2, 1);
    ctx->multiGetSignal(__cIdx, __cIdx, _diff_sigIdx_, _sigValue_3, 1);
    Fr_mul(_tmp_1, _sigValue_2, _sigValue_3);
    ctx->setSignal(__cIdx, __cIdx, _isZero_sigIdx_, _tmp_1);
    /* out <== 1 - isZero */
    ctx->multiGetSignal(__cIdx, __cIdx, _isZero_sigIdx_, _sigValue_4, 1);
    Fr_sub(_tmp_2, (ctx->circuit->constants + 1), _sigValue_4);
    ctx->setSignal(__cIdx, __cIdx, _out_sigIdx_, _tmp_2);
    ctx->finished(__cIdx);
}
// Function Table
Circom_ComponentFunction _functionTable[2] = {
     AddressCheck_483f7867e2bf0e6d
    ,IsEqual_a4ccc896f031163f
};
