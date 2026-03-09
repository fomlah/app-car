import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, View, StyleSheet, TouchableOpacity, useWindowDimensions, FlatList, NativeScrollEvent, NativeSyntheticEvent, Image, ImageSourcePropType, Platform,  } from 'react-native';
import Text from '../components/CustomText';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';

const onboarding1 = require('../../assets/onboarding/onboarding-1.png');
const onboarding2 = require('../../assets/onboarding/onboarding-2.png');
const onboarding3 = require('../../assets/onboarding/onboarding-3.png');

type Slide = {
  key: string;
  title: string;
  highlight: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  imageSource: ImageSourcePropType;
  cta: string;
  layout: 'full' | 'circle' | 'tall';
};

export default function OnboardingScreen({ onDone }: { onDone: () => void }) {
  const { colors } = useTheme();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Slide>>(null);
  const [index, setIndex] = useState(0);
  const shimmerX = useRef(new Animated.Value(-1)).current;

  const slides: Slide[] = useMemo(
    () => [
      {
        key: 'income',
        title: 'تتبع دخلك من',
        highlight: 'كل المنصات',
        description:
          'سجل دخلك وأرباحك من أوبر وديدي في مكان واحد. تقارير دقيقة تساعدك تزيد دخلك.',
        icon: 'car-sport',
        imageSource: onboarding1,
        cta: 'التالي',
        layout: 'full',
      },
      {
        key: 'expenses',
        title: 'إدارة مصاريفك',
        highlight: 'بذكاء',
        description: 'تتبع تكاليف الوقود، الصيانة، وفواتير الهاتف لتعرف أرباحك الحقيقية بدقة.',
        icon: 'wallet',
        imageSource: onboarding2,
        cta: 'التالي',
        layout: 'circle',
      },
      {
        key: 'reports',
        title: 'تقارير أرباح',
        highlight: 'دقيقة',
        description:
          'تابع صافي دخلك اليومي والشهري. نقوم بحساب نفقاتك تلقائيًا لترى ربحك الحقيقي.',
        icon: 'bar-chart',
        imageSource: onboarding3,
        cta: 'ابدأ الآن',
        layout: 'tall',
      },
    ],
    []
  );

  useEffect(() => {
    if (slides[index]?.layout !== 'tall') return;
    shimmerX.setValue(-1);
    const anim = Animated.loop(
      Animated.timing(shimmerX, {
        toValue: 1,
        duration: 1400,
        easing: Easing.inOut(Easing.quad),
        useNativeDriver: true,
      })
    );
    anim.start();
    return () => anim.stop();
  }, [index, shimmerX, slides]);

  const handleScrollEnd = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const next = Math.round(e.nativeEvent.contentOffset.x / width);
    setIndex(Math.max(0, Math.min(slides.length - 1, next)));
  };

  const goNext = () => {
    if (index >= slides.length - 1) {
      onDone();
      return;
    }
    try {
      listRef.current?.scrollToIndex({ index: index + 1, animated: true });
    } catch {
      // ignore
    }
  };

  const goPrev = () => {
    if (index <= 0) return;
    try {
      listRef.current?.scrollToIndex({ index: index - 1, animated: true });
    } catch {
      // ignore
    }
  };

  const bg = '#102217';
  const primary = colors.primary;

  return (
    <View style={[styles.root, { backgroundColor: bg }]}>
      <View pointerEvents="none" style={[styles.glowBlob, { top: -140, left: -140, backgroundColor: `${primary}33` }]} />
      <View pointerEvents="none" style={[styles.glowBlob, { bottom: -120, right: -120, backgroundColor: `${primary}22` }]} />

      <View style={styles.topBar}>
        {index === slides.length - 1 ? (
          <View style={styles.topDots}>
            {slides.map((_, i) => (
              <View
                key={i}
                style={[
                  styles.dot,
                  {
                    backgroundColor: i === index ? primary : 'rgba(255,255,255,0.16)',
                    width: i === index ? 26 : 8,
                  },
                ]}
              />
            ))}
          </View>
        ) : (
          <View style={{ width: 48 }} />
        )}

        <TouchableOpacity onPress={onDone} activeOpacity={0.8}>
          <Text style={[styles.skipText, { color: '#a7b6ad' }]}>
            {index === slides.length - 1 ? 'تسجيل دخول' : 'تخطي'}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        ref={listRef}
        data={slides}
        keyExtractor={(s) => s.key}
        extraData={index}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScrollEnd}
        getItemLayout={(_, i) => ({ length: width, offset: width * i, index: i })}
        onScrollToIndexFailed={({ index: failedIndex }) => {
          listRef.current?.scrollToOffset({ offset: failedIndex * width, animated: true });
        }}
        renderItem={({ item }) => (
          <View style={[styles.slide, { width }]}>
            {/* Illustration Area */}
            {item.layout === 'full' ? (
              <View style={styles.fullWrap}>
                <View pointerEvents="none" style={[styles.fullGlowCircle, { backgroundColor: `${primary}3b` }]} />
                <View style={styles.fullCard}>
                  <Image source={item.imageSource} style={styles.fullImage} resizeMode="contain" />
                  <View style={[styles.floatIconBox, { top: 14, left: 14, backgroundColor: '#fff' }]}>
                    <Ionicons name="car" size={20} color="#000" />
                  </View>
                  <View style={[styles.floatCoin, { bottom: 18, right: 18 }]}>
                    <Ionicons name="logo-usd" size={18} color="#5a3f00" />
                  </View>
                </View>
              </View>
            ) : item.layout === 'circle' ? (
              <View style={styles.circleWrap}>
                <View pointerEvents="none" style={[styles.ring, { transform: [{ scale: 0.9 }], borderColor: `${primary}1a` }]} />
                <View pointerEvents="none" style={[styles.ring, { transform: [{ scale: 1.1 }], borderColor: `${primary}0f` }]} />
                <View style={[styles.circleCard, { borderColor: 'rgba(255,255,255,0.06)' }]}>
                  <Image source={item.imageSource} style={styles.circleImage} resizeMode="contain" />
                  <View style={[styles.circleOverlay, { borderColor: `${primary}4d` }]}>
                    <Ionicons name="flame" size={20} color={primary} />
                    <Ionicons name="build" size={20} color={primary} />
                  </View>
                </View>
              </View>
            ) : (
              <View style={styles.tallWrap}>
                <View style={styles.tallCard}>
                  <View pointerEvents="none" style={[styles.tallInnerGlow, { backgroundColor: `${primary}1a` }]} />
                  <Image source={item.imageSource} style={styles.tallImage} resizeMode="contain" />
                  <LinearGradient
                    colors={[bg, `${bg}33`, 'transparent']}
                    style={styles.tallFade}
                    start={{ x: 0.5, y: 1 }}
                    end={{ x: 0.5, y: 0 }}
                  />
                  {/* center shield */}
                  <View style={styles.tallCenterIconWrap}>
                    <View pointerEvents="none" style={[styles.tallCenterGlow, { backgroundColor: `${primary}33` }]} />
                    <Ionicons name="shield-checkmark" size={54} color={primary} />
                  </View>
                  {/* floating chart */}
                  <View style={styles.tallFloat}>
                    <Ionicons name="bar-chart" size={24} color={primary} />
                  </View>
                </View>
              </View>
            )}

            {/* Text */}
            <View style={styles.textWrap}>
              <Text style={[styles.title, { color: '#fff' }]}>
                {item.title}{' '}
                <Text style={{ color: primary }}>{item.highlight}</Text>
              </Text>
              {item.layout === 'full' ? (
                <View style={styles.underlineWrap}>
                  <View style={[styles.underline, { backgroundColor: `${primary}33` }]} />
                </View>
              ) : null}
              <Text style={[styles.desc, { color: 'rgba(255,255,255,0.72)' }]}>{item.description}</Text>
            </View>
          </View>
        )}
      />

      <View style={styles.bottom}>
        {index === 1 ? (
          <View style={styles.footerRow}>
            <TouchableOpacity
              onPress={goNext}
              activeOpacity={0.8}
              style={styles.prevInlineBtn}
            >
              <Text style={styles.prevInlineText}>السابق</Text>
            </TouchableOpacity>

            <View style={styles.dots}>
              {slides.map((_, i) => (
                <View
                  key={i}
                  style={[
                    styles.dot,
                    {
                      backgroundColor: i === index ? primary : 'rgba(255,255,255,0.16)',
                      width: i === index ? 26 : 8,
                    },
                  ]}
                />
              ))}
            </View>

            <TouchableOpacity
              onPress={goNext}
              activeOpacity={0.9}
              style={[styles.nextBtnCompact, { backgroundColor: primary }]}
            >
              <Ionicons name="arrow-back" size={18} color="#000" />
              <Text style={[styles.nextText, { color: '#000' }]}>{slides[index]?.cta}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            {index !== slides.length - 1 ? (
              <View style={styles.dotsBottomOnly}>
                {slides.map((_, i) => (
                  <View
                    key={i}
                    style={[
                      styles.dot,
                      {
                        backgroundColor: i === index ? primary : 'rgba(255,255,255,0.16)',
                        width: i === index ? 26 : 8,
                      },
                    ]}
                  />
                ))}
              </View>
            ) : null}

            <TouchableOpacity
              onPress={goNext}
              activeOpacity={0.9}
              style={[styles.ctaFull, { backgroundColor: primary }]}
            >
              {slides[index]?.layout === 'tall' ? (
                <View style={styles.shimmerWrap}>
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.shimmer,
                      {
                        transform: [
                          {
                            translateX: shimmerX.interpolate({
                              inputRange: [-1, 1],
                              outputRange: [-260, 260],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    <LinearGradient
                      colors={['transparent', 'rgba(255,255,255,0.22)', 'transparent']}
                      style={{ flex: 1 }}
                      start={{ x: 0, y: 0.5 }}
                      end={{ x: 1, y: 0.5 }}
                    />
                  </Animated.View>
                </View>
              ) : null}

              <Ionicons name="arrow-back" size={18} color="#000" />
              <Text style={[styles.ctaFullText, { color: '#000' }]}>{slides[index]?.cta}</Text>
            </TouchableOpacity>
          </>
        )}

        {Platform.OS === 'web' ? (
          <Text style={[styles.webHint, { color: 'rgba(255,255,255,0.55)' }]}>يمكنك السحب يمين/يسار للتنقل</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  glowBlob: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 999,
    opacity: 1,
    // @ts-ignore RN accepts string blur on web; native ignores
    filter: 'blur(120px)',
  },
  topBar: {
    paddingTop: 52,
    paddingHorizontal: 18,
    paddingBottom: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  topDots: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  skipText: {
    fontSize: 14,
    fontWeight: '800',
  },
  slide: {
    flex: 1,
    paddingHorizontal: 18,
    justifyContent: 'center',
  },
  fullWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 18,
  },
  fullGlowCircle: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 999,
    // @ts-ignore web only
    filter: 'blur(40px)',
  },
  fullCard: {
    width: '100%',
    maxWidth: 360,
    aspectRatio: 1,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.35)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    padding: 14,
  },
  fullImage: {
    width: '100%',
    height: '100%',
    opacity: 0.95,
  },
  floatIconBox: {
    position: 'absolute',
    width: 48,
    height: 48,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatCoin: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#FFD700',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleWrap: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  ring: {
    position: 'absolute',
    width: 320,
    height: 320,
    borderRadius: 999,
    borderWidth: 1,
  },
  circleCard: {
    width: 320,
    height: 320,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 26,
  },
  circleImage: {
    width: '100%',
    height: '100%',
    opacity: 0.92,
  },
  circleOverlay: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#102217',
    borderWidth: 1,
    borderRadius: 14,
    padding: 10,
    flexDirection: 'row',
    gap: 8,
  },
  tallWrap: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 16,
  },
  tallCard: {
    width: '100%',
    maxWidth: 360,
    aspectRatio: 4 / 5,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.02)',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  tallInnerGlow: {
    position: 'absolute',
    top: -60,
    left: -60,
    width: 260,
    height: 260,
    borderRadius: 999,
    // @ts-ignore web only
    filter: 'blur(80px)',
  },
  tallImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.92,
  },
  tallFade: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: '55%',
  },
  tallCenterIconWrap: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: [{ translateX: -27 }, { translateY: -27 }],
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tallCenterGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 999,
    // @ts-ignore web only
    filter: 'blur(40px)',
  },
  tallFloat: {
    position: 'absolute',
    top: '16%',
    right: '10%',
    padding: 10,
    borderRadius: 14,
    backgroundColor: 'rgba(22,46,33,0.8)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
  },
  textWrap: {
    alignItems: 'center',
    gap: 12,
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textAlign: 'center',
    lineHeight: 34,
  },
  underlineWrap: {
    height: 6,
    width: 160,
    marginTop: -6,
    overflow: 'hidden',
    borderRadius: 999,
  },
  underline: {
    height: 6,
    width: '100%',
  },
  desc: {
    fontSize: 15,
    lineHeight: 22,
    textAlign: 'center',
    maxWidth: 320,
    fontWeight: '600',
  },
  bottom: {
    paddingHorizontal: 18,
    paddingBottom: 22,
    paddingTop: 10,
    gap: 14,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotsBottomOnly: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    alignItems: 'center',
  },
  dot: {
    height: 8,
    borderRadius: 999,
  },
  nextBtnCompact: {
    height: 52,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  nextText: {
    fontSize: 16,
    fontWeight: '900',
  },
  prevInlineBtn: {
    height: 52,
    paddingHorizontal: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  prevInlineText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
    fontWeight: '800',
  },
  ctaFull: {
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    overflow: 'hidden',
    width: '100%',
  },
  ctaFullText: {
    fontSize: 17,
    fontWeight: '900',
  },
  shimmerWrap: {
    ...StyleSheet.absoluteFillObject,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 120,
    opacity: 1,
  },
  webHint: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '600',
  },
});
