export function parseLocalizedNumber(val: string): number {
    if (!val) return 0;

    // Replace Arabic-Indic numerals with Latin numerals
    const arabicNumbers = [/٠/g, /١/g, /٢/g, /٣/g, /٤/g, /٥/g, /٦/g, /٧/g, /٨/g, /٩/g];
    let standardStr = val;

    for (let i = 0; i < 10; i++) {
        standardStr = standardStr.replace(arabicNumbers[i], i.toString());
    }

    // Handle Arabic comma/decimal separator if any
    standardStr = standardStr.replace(/٫/g, '.').replace(/,/g, '.');

    const parsed = parseFloat(standardStr);
    return isNaN(parsed) ? 0 : parsed;
}
