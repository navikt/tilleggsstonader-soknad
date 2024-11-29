export function matchAllPathsExcluding(...stier: string[]): RegExp {
    const ekskluderteStier = stier.join('|');

    return new RegExp(`^(?!.*/(${ekskluderteStier})/).*`);
}
