export const classNames = (...classNames: (string | null | undefined)[]): string => classNames.reduce<string>((acc, val) => val ? acc + ' ' + val : acc, '')
