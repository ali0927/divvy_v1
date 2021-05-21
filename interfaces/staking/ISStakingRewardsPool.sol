// SPDX-License-Identifier:  GPL-3.0

pragma solidity 0.7.5;
pragma abicoder v2;

abstract contract ISStakingRewardsPool {
    function stakeBehalf(address user, uint256 amount) external virtual;

    function emergencyWithdraw(uint256 amount) external virtual;
}
