import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../contexts/AuthContext';

export default function RegisterScreen({ navigation }: any) {
  const { register } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('يرجى ملء جميع الحقول');
      return;
    }
    if (password.length < 6) {
      setError('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
      return;
    }
    if (password !== confirmPassword) {
      setError('كلمة المرور غير متطابقة');
      return;
    }
    setError('');
    setLoading(true);
    const result = await register(name, email, password);
    if (!result.success) {
      setError(result.error || 'حدث خطأ');
    }
    setLoading(false);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>إنشاء حساب جديد</Text>
          <Text style={styles.subtitle}>ابدأ بتتبع دخلك من منصات النقل اليوم</Text>
        </View>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {/* Name */}
        <View style={styles.inputRow}>
          <Ionicons name="person-outline" size={20} color="#9db9a8" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="الاسم الكامل"
            placeholderTextColor="#9db9a8"
            value={name}
            onChangeText={setName}
            textAlign="right"
          />
        </View>

        {/* Email */}
        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={20} color="#9db9a8" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="البريد الإلكتروني"
            placeholderTextColor="#9db9a8"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textAlign="left"
          />
        </View>

        {/* Password */}
        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={20} color="#9db9a8" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="كلمة المرور"
            placeholderTextColor="#9db9a8"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            textAlign="left"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeBtn}>
            <Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={20} color="#9db9a8" />
          </TouchableOpacity>
        </View>

        {/* Confirm Password */}
        <View style={styles.inputRow}>
          <Ionicons name="lock-closed-outline" size={20} color="#9db9a8" style={styles.icon} />
          <TextInput
            style={styles.input}
            placeholder="تأكيد كلمة المرور"
            placeholderTextColor="#9db9a8"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showPassword}
            textAlign="left"
          />
        </View>

        {/* Register Button */}
        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleRegister}
          disabled={loading}
          activeOpacity={0.8}
        >
          {loading ? (
            <ActivityIndicator color="#112117" />
          ) : (
            <>
              <Text style={styles.btnText}>إنشاء الحساب</Text>
              <Ionicons name="arrow-back" size={20} color="#112117" />
            </>
          )}
        </TouchableOpacity>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>لديك حساب بالفعل؟ </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>تسجيل الدخول</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#112117' },
  scroll: { flexGrow: 1, justifyContent: 'center', paddingHorizontal: 24, paddingVertical: 40 },
  header: { marginBottom: 32 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff', textAlign: 'right', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#9db9a8', textAlign: 'right' },
  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
    borderRadius: 12, padding: 12, marginBottom: 16,
  },
  errorText: { color: '#f87171', fontSize: 14, textAlign: 'center', fontWeight: '500' },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#1c2e24',
    borderRadius: 12, borderWidth: 2, borderColor: 'transparent', height: 56,
    marginBottom: 12, overflow: 'hidden',
  },
  icon: { paddingHorizontal: 16 },
  input: { flex: 1, color: '#fff', fontSize: 16, height: 56, paddingRight: 8 },
  eyeBtn: { paddingHorizontal: 16 },
  btn: {
    backgroundColor: '#20df6c', borderRadius: 12, height: 56,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8,
    marginTop: 16,
    shadowColor: '#20df6c', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8,
    elevation: 5,
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#112117', fontSize: 18, fontWeight: '700' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 32 },
  footerText: { color: '#9db9a8', fontSize: 14 },
  footerLink: { color: '#fff', fontSize: 14, fontWeight: '600' },
});
