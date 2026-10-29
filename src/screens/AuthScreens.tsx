import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, SafeAreaView, ScrollView } from 'react-native';

const PRIMARY_COLOR = '#2864F5';

export const SplashScreen = ({ navigation }: any) => {
  return (
    <View style={[styles.container, { backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center' }]}>
      <View style={styles.logoCircle}>
        <Text style={{ fontSize: 32, color: PRIMARY_COLOR, fontWeight: 'bold' }}>✚</Text>
      </View>
      <Text style={styles.splashTitle}>Skin Firsts</Text>
      <Text style={styles.splashSubtitle}>Dermatology Center</Text>
      <TouchableOpacity style={styles.whiteBtn} onPress={() => navigation.navigate('Welcome')}>
        <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 16 }}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

export const WelcomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff', padding: 24, justifyContent: 'center' }]}>
      <View style={{ alignItems: 'center', marginBottom: 40 }}>
        <View style={styles.logoCircleBlue}>
          <Text style={{ fontSize: 32, color: '#fff', fontWeight: 'bold' }}>✚</Text>
        </View>
        <Text style={styles.brandTitle}>Skin Firsts</Text>
        <Text style={styles.brandSubtitle}>Dermatology Center</Text>
        <Text style={styles.welcomeText}>
          Professional skin care consultations, online appointment booking, and dermatological services at your fingertips.
        </Text>
      </View>

      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.secondaryBtn} onPress={() => navigation.navigate('SignUp')}>
        <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 16 }}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export const LoginScreen = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff', padding: 24 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, color: PRIMARY_COLOR }}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>Welcome Back</Text>
        <Text style={styles.subHeading}>Please enter your credentials to log in.</Text>

        <Text style={styles.label}>Email or Mobile Number</Text>
        <TextInput style={styles.input} placeholder="example@example.com" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="********" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity onPress={() => navigation.navigate('SetPassword')}>
          <Text style={{ color: PRIMARY_COLOR, textAlign: 'right', marginBottom: 20 }}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.replace('MainTabs')}>
          <Text style={styles.btnText}>Log In</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: '#666' }}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const SignUpScreen = ({ navigation }: any) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff', padding: 24 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: 18, color: PRIMARY_COLOR }}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.heading}>New Account</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} placeholder="John Doe" value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} placeholder="example@example.com" value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Mobile Number</Text>
        <TextInput style={styles.input} placeholder="+123 567 89000" value={mobile} onChangeText={setMobile} />

        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} placeholder="********" secureTextEntry value={password} onChangeText={setPassword} />

        <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.replace('MainTabs')}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
          <Text style={{ color: '#666' }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold' }}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export const SetPasswordScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: '#fff', padding: 24 }]}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 20 }}>
        <Text style={{ fontSize: 18, color: PRIMARY_COLOR }}>← Back</Text>
      </TouchableOpacity>

      <Text style={styles.heading}>Set Password</Text>
      <Text style={styles.subHeading}>Create a new strong password for your account.</Text>

      <Text style={styles.label}>Password</Text>
      <TextInput style={styles.input} placeholder="********" secureTextEntry />

      <Text style={styles.label}>Confirm Password</Text>
      <TextInput style={styles.input} placeholder="********" secureTextEntry />

      <TouchableOpacity style={styles.primaryBtn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Create New Password</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  logoCircle: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  logoCircleBlue: { width: 80, height: 80, borderRadius: 40, backgroundColor: PRIMARY_COLOR, justifyContent: 'center', alignItems: 'center', marginBottom: 15 },
  splashTitle: { fontSize: 32, color: '#fff', fontWeight: 'bold' },
  splashSubtitle: { fontSize: 16, color: '#E0E8FF', marginTop: 4 },
  brandTitle: { fontSize: 28, color: PRIMARY_COLOR, fontWeight: 'bold' },
  brandSubtitle: { fontSize: 14, color: '#666', marginTop: 2 },
  welcomeText: { textAlign: 'center', color: '#666', marginTop: 15, paddingHorizontal: 10, lineHeight: 20 },
  whiteBtn: { backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 40, borderRadius: 25, marginTop: 40 },
  primaryBtn: { backgroundColor: PRIMARY_COLOR, paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginTop: 10 },
  secondaryBtn: { backgroundColor: '#E8EEFF', paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginTop: 12 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  heading: { fontSize: 26, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  subHeading: { fontSize: 14, color: '#666', marginBottom: 24 },
  label: { fontSize: 14, color: '#333', fontWeight: '600', marginBottom: 6, marginTop: 10 },
  input: { backgroundColor: '#F7F8FC', borderRadius: 12, padding: 14, borderWidth: 1, borderColor: '#E0E0E0', fontSize: 15 },
});
