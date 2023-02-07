

export const range = (min: number, max: number): number[] => {
    return Array.apply(0, Array(max)).map((element, index) => index + min)
}
