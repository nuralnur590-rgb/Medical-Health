import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import { useApp } from '../context/AppContext';

const PRIMARY_COLOR = '#2864F5';

export const DoctorsScreen = ({ navigation }: any) => {
  const { doctors, favorites, toggleFavorite } = useApp();
  const [filter, setFilter] = useState<'All' | 'Female' | 'Male'>('All');

  const filteredDoctors = doctors.filter((doc) => {
    if (filter === 'All') return true;
    return doc.gender === filter;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20 }}>
        <Text style={styles.title}>Doctors List</Text>
        <View style={styles.filterRow}>
          {['All', 'Female', 'Male'].map((f) => (
            <TouchableOpacity
              key={f}
              style={[styles.filterChip, filter === f && styles.activeFilterChip]}
              onPress={() => setFilter(f as any)}
            >
              <Text style={[styles.filterText, filter === f && { color: '#fff' }]}>{f}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredDoctors.map((doc) => (
            <TouchableOpacity
              key={doc.id}
              style={styles.card}
              onPress={() => navigation.navigate('DoctorProfile', { doctorId: doc.id })}
            >
              <Image source={{ uri: doc.avatar }} style={styles.avatar} />
              <View style={{ flex: 1, marginLeft: 12 }}>
                <Text style={styles.docName}>{doc.name}</Text>
                <Text style={styles.docSpecialty}>{doc.specialty}</Text>
                <Text style={{ color: PRIMARY_COLOR, fontWeight: 'bold', marginTop: 4 }}>⭐ {doc.rating} | ${doc.price}</Text>
              </View>
              <TouchableOpacity onPress={() => toggleFavorite(doc.id)}>
                <Text style={{ fontSize: 22 }}>{favorites.includes(doc.id) ? '❤️' : '🤍'}</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export const DoctorProfileScreen = ({ route, navigation }: any) => {
  const { doctorId } = route.params;
  const { doctors } = useApp();
  const doctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 15 }}>
          <Text style={{ color: PRIMARY_COLOR, fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>

        <View style={styles.profileHeader}>
          <Image source={{ uri: doctor.avatar }} style={styles.largeAvatar} />
          <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 10 }}>{doctor.name}</Text>
          <Text style={{ color: PRIMARY_COLOR, fontSize: 15, marginTop: 2 }}>{doctor.specialty}</Text>
          <Text style={{ color: '#666', marginTop: 4 }}>{doctor.experienceYears} years experience</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Doctor</Text>
          <Text style={styles.bodyText}>{doctor.about}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Career Path</Text>
          <Text style={styles.bodyText}>{doctor.careerPath}</Text>
        </View>

        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Booking', { doctorId: doctor.id })}
        >
          <Text style={styles.btnText}>Make Appointment (${doctor.price})</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const BookingScreen = ({ route, navigation }: any) => {
  const { doctorId } = route.params;
  const { doctors, addAppointment } = useApp();
  const doctor = doctors.find((d) => d.id === doctorId) || doctors[0];

  const [selectedTime, setSelectedTime] = useState('10:00 AM');
  const [patientName, setPatientName] = useState('Jane Doe');
  const [age, setAge] = useState('30');
  const [gender, setGender] = useState<'Male' | 'Female'>('Female');
  const [problem, setProblem] = useState('');

  const timeSlots = ['9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '2:00 PM', '2:30 PM', '3:00 PM'];

  const handleProceedToPayment = () => {
    addAppointment({
      doctorId: doctor.id,
      doctorName: doctor.name,
      doctorSpecialty: doctor.specialty,
      date: 'Month 24, Year',
      time: selectedTime,
      patientName,
      patientAge: parseInt(age, 10) || 25,
      patientGender: gender,
      problemDescription: problem || 'General Consultation',
      status: 'Upcoming',
      price: doctor.price,
    });

    navigation.navigate('Payment', { amount: doctor.price, doctorName: doctor.name });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 15 }}>
          <Text style={{ color: PRIMARY_COLOR, fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>

        <Text style={styles.title}>Schedule & Details</Text>
        <Text style={{ fontSize: 16, color: PRIMARY_COLOR, fontWeight: 'bold', marginBottom: 15 }}>{doctor.name}</Text>

        <Text style={styles.sectionTitle}>Available Time</Text>
        <View style={styles.timeGrid}>
          {timeSlots.map((slot) => (
            <TouchableOpacity
              key={slot}
              style={[styles.timeChip, selectedTime === slot && styles.activeTimeChip]}
              onPress={() => setSelectedTime(slot)}
            >
              <Text style={[styles.timeText, selectedTime === slot && { color: '#fff' }]}>{slot}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Patient Details</Text>
        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={patientName} onChangeText={setPatientName} />

        <Text style={styles.label}>Age</Text>
        <TextInput style={styles.input} keyboardType="numeric" value={age} onChangeText={setAge} />

        <Text style={styles.label}>Describe Your Problem</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          multiline
          placeholder="Enter your symptoms or skin condition details..."
          value={problem}
          onChangeText={setProblem}
        />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleProceedToPayment}>
          <Text style={styles.btnText}>Proceed to Payment</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  card: { flexDirection: 'row', backgroundColor: '#fff', padding: 14, borderRadius: 16, marginBottom: 12, alignItems: 'center' },
  avatar: { width: 55, height: 55, borderRadius: 27.5 },
  largeAvatar: { width: 100, height: 100, borderRadius: 50 },
  docName: { fontWeight: 'bold', fontSize: 16, color: '#333' },
  docSpecialty: { color: '#666', fontSize: 13, marginTop: 2 },
  filterRow: { flexDirection: 'row', marginBottom: 15 },
  filterChip: { paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, backgroundColor: '#fff', marginRight: 10 },
  activeFilterChip: { backgroundColor: PRIMARY_COLOR },
  filterText: { fontWeight: 'bold', color: '#333' },
  profileHeader: { alignItems: 'center', marginBottom: 20 },
  section: { backgroundColor: '#fff', padding: 16, borderRadius: 16, marginBottom: 15 },
  sectionTitle: { fontSize: 16, fontWeight: 'bold', color: '#333', marginBottom: 8 },
  bodyText: { color: '#666', lineHeight: 20 },
  primaryBtn: { backgroundColor: PRIMARY_COLOR, paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginTop: 15 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  timeGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 20 },
  timeChip: { paddingHorizontal: 14, paddingVertical: 10, borderRadius: 12, backgroundColor: '#fff', borderWidth: 1, borderColor: '#DDD' },
  activeTimeChip: { backgroundColor: PRIMARY_COLOR, borderColor: PRIMARY_COLOR },
  timeText: { fontSize: 12, fontWeight: 'bold', color: '#333' },
  label: { fontSize: 13, color: '#666', marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E0E0E0' },
});