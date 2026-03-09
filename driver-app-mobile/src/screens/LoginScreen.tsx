import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError('يرجى ملء جميع الحقول');
      return;
    }
    setError('');
    setLoading(true);
    const result = await login(email, password);
    if (!result.success) {
      setError(result.error || 'حدث خطأ');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: '#112117' }]}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Ionicons name="car-sport" size={36} color="#20df6c" />
          </View>
          <Text style={styles.title}>مرحباً بك مجدداً</Text>
          <Text style={styles.subtitle}>سجل الدخول لمتابعة أرباحك ومصروفاتك</Text>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Email */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>البريد الإلكتروني</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={20} color="#9db9a8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="example@driver.com"
              placeholderTextColor="#5a7a6a"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              textAlign="left"
            />
          </View>
        </View>

        {/* Password */}
        <View style={styles.fieldContainer}>
          <Text style={styles.label}>كلمة المرور</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={20} color="#9db9a8" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor="#5a7a6a"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              textAlign="left"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
              <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9db9a8" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Forgot Password */}
        <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={styles.forgotBtn}>
          <Text style={styles.forgotText}>هل نسيت كلمة المرور؟</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
          style={[styles.loginBtn, loading && styles.loginBtnDisabled]}
          onPress={handleLogin}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#112117" />
          ) : (
            <>
              <Text style={styles.loginBtnText}>تسجيل الدخول</Text>
              <Ionicons name="arrow-back" size={20} color="#112117" />
            </>
          )}
        </TouchableOpacity>

        {/* Register Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>ليس لديك حساب؟ </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.footerLink}>سجل الآن</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  logoContainer: { alignItems: 'center', marginBottom: 40, gap: 12 },
  logoBox: {
    width: 80, height: 80, borderRadius: 20,
    backgroundColor: 'rgba(32,223,108,0.1)',
    borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)',
    justifyContent: 'center', alignItems: 'center',
  },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', textAlign: 'center' },
  subtitle: { fontSize: 14, color: '#9db9a8', textAlign: 'center' },
  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.1)',
    borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
    borderRadius: 12, padding: 12, marginBottom: 16,
  },
  errorText: { color: '#f87171', fontSize: 14, textAlign: 'center', fontWeight: '500' },
  fieldContainer: { marginBottom: 16 },
  label: { fontSize: 12, fontWeight: '600', color: '#20df6c', marginBottom: 6, textAlign: 'right' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#203328', borderRadius: 12,
    borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    height: 56, overflow: 'hidden',
  },
  inputIcon: { paddingHorizontal: 16 },
  input: { flex: 1, color: '#fff', fontSize: 16, height: 56, paddingRight: 8 },
  eyeBtn: { paddingHorizontal: 16 },
  forgotBtn: { alignSelf: 'flex-start', marginBottom: 24 },
  forgotText: { color: '#9db9a8', fontSize: 14 },
  loginBtn: {
    backgroundColor: '#20df6c', borderRadius: 12, height: 56,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    shadowColor: '#20df6c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
    elevation: 5,
  },
  loginBtnDisabled: { opacity: 0.5 },
  loginBtnText: { color: '#112117', fontSize: 18, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { color: '#9db9a8', fontSize: 14 },
  footerLink: { color: '#20df6c', fontSize: 14, fontWeight: '700' },
});
