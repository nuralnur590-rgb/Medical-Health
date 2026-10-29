import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useApp } from '../context/AppContext';

const PRIMARY_COLOR = '#2864F5';

export const AppointmentsScreen = ({ navigation }: any) => {
  const { appointments, cancelAppointment } = useApp();
  const [tab, setTab] = useState<'Upcoming' | 'Completed' | 'Cancelled'>('Upcoming');

  const filtered = appointments.filter((a) => a.status === tab);

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20, flex: 1 }}>
        <Text style={styles.title}>All Appointments</Text>

        <View style={styles.tabRow}>
          {['Upcoming', 'Completed', 'Cancelled'].map((t) => (
            <TouchableOpacity
              key={t}
              style={[styles.tabBtn, tab === t && styles.activeTabBtn]}
              onPress={() => setTab(t as any)}
            >
              <Text style={[styles.tabText, tab === t && { color: '#fff' }]}>{t}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filtered.length === 0 ? (
            <Text style={{ textAlign: 'center', color: '#888', marginTop: 40 }}>No {tab.toLowerCase()} appointments.</Text>
          ) : (
            filtered.map((app) => (
              <View key={app.id} style={styles.card}>
                <Text style={{ fontWeight: 'bold', fontSize: 16 }}>{app.doctorName}</Text>
                <Text style={{ color: PRIMARY_COLOR, marginTop: 2 }}>{app.doctorSpecialty}</Text>
                <Text style={{ color: '#666', fontSize: 13, marginTop: 8 }}>📅 {app.date} | 🕒 {app.time}</Text>
                <Text style={{ color: '#333', fontSize: 13, marginTop: 4 }}>Patient: {app.patientName}</Text>

                {tab === 'Upcoming' && (
                  <View style={{ flexDirection: 'row', gap: 10, marginTop: 12 }}>
                    <TouchableOpacity
                      style={[styles.smallBtn, { backgroundColor: '#FF4D4D' }]}
                      onPress={() => {
                        cancelAppointment(app.id);
                        Alert.alert('Cancelled', 'Appointment has been cancelled.');
                      }}
                    >
                      <Text style={styles.smallBtnText}>Cancel</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export const PaymentScreen = ({ route, navigation }: any) => {
  const { amount = 80, doctorName = 'Doctor' } = route.params || {};

  const handlePay = () => {
    Alert.alert('Success', 'Payment was successful!', [
      { text: 'OK', onPress: () => navigation.replace('MainTabs') },
    ]);
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: PRIMARY_COLOR }]}>
      <View style={{ flex: 1, padding: 24, justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.checkCircle}>
          <Text style={{ fontSize: 40, color: PRIMARY_COLOR }}>✓</Text>
        </View>
        <Text style={{ fontSize: 28, color: '#fff', fontWeight: 'bold', marginTop: 20 }}>Congratulations!</Text>
        <Text style={{ color: '#E0E8FF', textAlign: 'center', marginTop: 8 }}>
          Payment of ${amount} for consultation with {doctorName} is confirmed.
        </Text>

        <TouchableOpacity style={styles.whiteBtn} onPress={handlePay}>
          <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', fontSize: 16 }}>Done</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  tabRow: { flexDirection: 'row', backgroundColor: '#E0E8FF', borderRadius: 20, padding: 4, marginBottom: 15 },
  tabBtn: { flex: 1, paddingVertical: 8, alignItems: 'center', borderRadius: 16 },
  activeTabBtn: { backgroundColor: PRIMARY_COLOR },
  tabText: { fontWeight: 'bold', fontSize: 13, color: '#666' },
  card: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 12 },
  smallBtn: { paddingVertical: 6, paddingHorizontal: 14, borderRadius: 12 },
  smallBtnText: { color: '#fff', fontWeight: 'bold', fontSize: 12 },
  checkCircle: { width: 90, height: 90, borderRadius: 45, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' },
  whiteBtn: { backgroundColor: '#fff', paddingVertical: 14, paddingHorizontal: 50, borderRadius: 25, marginTop: 40 },
});