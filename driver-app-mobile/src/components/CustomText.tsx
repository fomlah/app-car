import React from 'react';
import { Text as RNText, TextProps, StyleSheet, TextStyle } from 'react-native';

function getCairoFont(fontWeight?: string | number) {
    if (!fontWeight) return 'Cairo_400Regular';
    const weight = String(fontWeight);
    if (weight === 'bold' || weight === '700') return 'Cairo_700Bold';
    if (weight === '600') return 'Cairo_600SemiBold';
    if (weight === '800' || weight === '900') return 'Cairo_800ExtraBold';
    if (weight === 'normal' || weight === '400' || weight === '500') return 'Cairo_400Regular';
    return 'Cairo_400Regular';
}

export default function CustomText({ style, ...props }: TextProps) {
    const flattenedStyle = StyleSheet.flatten(style || {}) || {};

    const fontFamily = getCairoFont(flattenedStyle.fontWeight);

    const newStyle: TextStyle = { ...flattenedStyle, fontFamily };
    if (newStyle.fontWeight) delete newStyle.fontWeight;

    return <RNText style={newStyle} {...props} />;
}
