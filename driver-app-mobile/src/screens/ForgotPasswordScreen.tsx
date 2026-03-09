import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet, ActivityIndicator,  } from 'react-native';
import Text from '../components/CustomText';
import TextInput from '../components/CustomTextInput';

import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../contexts/ThemeContext';
import { authAPI } from '../services/api';

export default function ForgotPasswordScreen({ navigation }: any) {
  const { colors } = useTheme();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleReset = async () => {
    if (!email) {
      setError('يرجى إدخال البريد الإلكتروني');
      return;
    }
    setError('');
    setMessage('');
    setLoading(true);
    try {
      const data = await authAPI.resetPassword(email);
      setMessage('تم إرسال كلمة المرور الجديدة إلى بريدك الإلكتروني');
    } catch (err: any) {
      setError(err.message || 'حدث خطأ');
    }
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Ionicons name="arrow-forward" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Ionicons name="lock-open-outline" size={48} color="#20df6c" style={{ marginBottom: 24 }} />
        <Text style={styles.title}>استعادة كلمة المرور</Text>
        <Text style={styles.subtitle}>أدخل بريدك الإلكتروني وسنرسل لك كلمة مرور جديدة</Text>

        {error ? (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {message ? (
          <View style={styles.successBox}>
            <Ionicons name="checkmark-circle" size={18} color="#20df6c" />
            <Text style={styles.successText}>{message}</Text>
          </View>
        ) : null}

        <View style={styles.inputRow}>
          <Ionicons name="mail-outline" size={20} color="#9db9a8" style={{ paddingHorizontal: 16 }} />
          <TextInput
            style={styles.input}
            placeholder="البريد الإلكتروني"
            placeholderTextColor="#5a7a6a"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            textAlign="left"
          />
        </View>

        <TouchableOpacity
          style={[styles.btn, loading && styles.btnDisabled]}
          onPress={handleReset}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#112117" />
          ) : (
            <Text style={styles.btnText}>إرسال</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')} style={{ marginTop: 24 }}>
          <Text style={styles.linkText}>العودة لتسجيل الدخول</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#112117' },
  header: { paddingTop: 48, paddingHorizontal: 16 },
  backBtn: { width: 40, height: 40, borderRadius: 20, justifyContent: 'center', alignItems: 'center' },
  content: { flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 24 },
  title: { fontSize: 24, fontWeight: '800', color: '#fff', textAlign: 'center', marginBottom: 8 },
  subtitle: { fontSize: 14, color: '#9db9a8', textAlign: 'center', marginBottom: 32, lineHeight: 22 },
  errorBox: {
    backgroundColor: 'rgba(239,68,68,0.1)', borderWidth: 1, borderColor: 'rgba(239,68,68,0.2)',
    borderRadius: 12, padding: 12, marginBottom: 16, width: '100%',
  },
  errorText: { color: '#f87171', fontSize: 14, textAlign: 'center' },
  successBox: {
    flexDirection: 'row', alignItems: 'center', gap: 8,
    backgroundColor: 'rgba(32,223,108,0.1)', borderWidth: 1, borderColor: 'rgba(32,223,108,0.2)',
    borderRadius: 12, padding: 12, marginBottom: 16, width: '100%',
  },
  successText: { color: '#20df6c', fontSize: 14, flex: 1 },
  inputRow: {
    flexDirection: 'row', alignItems: 'center', backgroundColor: '#203328',
    borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.05)',
    height: 56, width: '100%', overflow: 'hidden', marginBottom: 16,
  },
  input: { flex: 1, color: '#fff', fontSize: 16, height: 56, paddingRight: 8 },
  btn: {
    backgroundColor: '#20df6c', borderRadius: 12, height: 56, width: '100%',
    alignItems: 'center', justifyContent: 'center',
  },
  btnDisabled: { opacity: 0.5 },
  btnText: { color: '#112117', fontSize: 18, fontWeight: '700' },
  linkText: { color: '#9db9a8', fontSize: 14, fontWeight: '600' },
});
