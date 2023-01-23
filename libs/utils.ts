export function cls(...classnames: string[]) {
    return classnames.join(" ");
}

export function convertUnitToKilo(number: number) {
    return number >= 1000
        ? Number((number / 1000).toFixed(2)).toLocaleString("en-AU") + "K"
        : number;
}
