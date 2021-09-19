const MAX_ALLOWED = 60, MIN_ALLOWED = 5, MIN_VAL = 5.5, MAX_VAL = 1060, E = 2.718;
const scaleBetween = (unscaledNum: number, minAllowed: number, maxAllowed: number, min: number, max: number) => {
    return Math.ceil((maxAllowed - minAllowed) * (unscaledNum - min) / (max - min) + minAllowed);
}
export const getDuration = (multiplier: number) => {
    multiplier = Math.log(multiplier)*60+5;
    return scaleBetween(multiplier, MIN_ALLOWED, MAX_ALLOWED, MIN_VAL, MAX_VAL);
}
export const getMappedMultiplier = (time: number) => {
    let unscaledMultiplier = (((MAX_VAL-MIN_VAL)/(MAX_ALLOWED-MIN_ALLOWED))*(time-MIN_ALLOWED)+MIN_VAL);
    unscaledMultiplier = (unscaledMultiplier-5)/60;
    return Math.pow(E, unscaledMultiplier);
}
