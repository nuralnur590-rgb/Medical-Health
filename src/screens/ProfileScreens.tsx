import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Image, FlatList } from 'react-native';
import { useApp } from '../context/AppContext';

const PRIMARY_COLOR = '#2864F5';

export const ProfileScreen = ({ navigation }: any) => {
  const { userProfile } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <Text style={styles.title}>My Profile</Text>

        <View style={{ alignItems: 'center', marginBottom: 20 }}>
          <Image source={{ uri: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150' }} style={styles.profileImg} />
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 10 }}>{userProfile.fullName}</Text>
          <Text style={{ color: '#666' }}>{userProfile.email}</Text>
        </View>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('EditProfile')}>
          <Text style={styles.menuText}>👤 Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Chat')}>
          <Text style={styles.menuText}>💬 Messages / Chat</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Settings')}>
          <Text style={styles.menuText}>⚙️ Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { marginTop: 20 }]} onPress={() => navigation.replace('Auth')}>
          <Text style={[styles.menuText, { color: '#FF4D4D' }]}>🚪 Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const EditProfileScreen = ({ navigation }: any) => {
  const { userProfile, updateProfile } = useApp();
  const [fullName, setFullName] = useState(userProfile.fullName);
  const [email, setEmail] = useState(userProfile.email);
  const [phone, setPhone] = useState(userProfile.phone);
  const [dob, setDob] = useState(userProfile.dob);

  const handleSave = () => {
    updateProfile({ fullName, email, phone, dob });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 15 }}>
          <Text style={{ color: PRIMARY_COLOR, fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>

        <Text style={styles.label}>Full Name</Text>
        <TextInput style={styles.input} value={fullName} onChangeText={setFullName} />

        <Text style={styles.label}>Phone Number</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />

        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Date Of Birth</Text>
        <TextInput style={styles.input} value={dob} onChangeText={setDob} />

        <TouchableOpacity style={styles.primaryBtn} onPress={handleSave}>
          <Text style={styles.btnText}>Update Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export const NotificationsScreen = ({ navigation }: any) => {
  const { notifications } = useApp();

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 20, flex: 1 }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 15 }}>
          <Text style={{ color: PRIMARY_COLOR, fontSize: 16 }}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>

        <ScrollView showsVerticalScrollIndicator={false}>
          {notifications.map((n) => (
            <View key={n.id} style={[styles.card, !n.isRead && { borderColor: PRIMARY_COLOR, borderWidth: 1 }]}>
              <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{n.title}</Text>
              <Text style={{ color: '#666', marginTop: 4, fontSize: 13 }}>{n.message}</Text>
              <Text style={{ color: '#888', fontSize: 11, marginTop: 8 }}>{n.time}</Text>
            </View>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export const ChatScreen = ({ navigation }: any) => {
  const { chatMessages, sendChatMessage } = useApp();
  const [text, setText] = useState('');

  const handleSend = () => {
    if (text.trim()) {
      sendChatMessage(text.trim());
      setText('');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ padding: 15, borderBottomWidth: 1, borderBottomColor: '#EEE', backgroundColor: '#fff' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={{ color: PRIMARY_COLOR }}>← Back</Text>
        </TouchableOpacity>
        <Text style={{ fontWeight: 'bold', fontSize: 16, marginTop: 4 }}>Dr. Olivia Turner</Text>
      </View>

      <FlatList
        data={chatMessages}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 15 }}
        renderItem={({ item }) => (
          <View style={[styles.chatBubble, item.isDoctor ? styles.docBubble : styles.userBubble]}>
            <Text style={{ color: item.isDoctor ? '#333' : '#fff' }}>{item.text}</Text>
            <Text style={{ fontSize: 10, color: item.isDoctor ? '#888' : '#E0E8FF', marginTop: 4, textAlign: 'right' }}>{item.time}</Text>
          </View>
        )}
      />

      <View style={styles.chatInputRow}>
        <TextInput style={styles.chatInput} placeholder="Write Here..." value={text} onChangeText={setText} />
        <TouchableOpacity style={styles.sendBtn} onPress={handleSend}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Send</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FC' },
  title: { fontSize: 22, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  profileImg: { width: 90, height: 90, borderRadius: 45 },
  menuItem: { backgroundColor: '#fff', padding: 16, borderRadius: 14, marginBottom: 10 },
  menuText: { fontSize: 15, fontWeight: '600', color: '#333' },
  label: { fontSize: 13, color: '#666', marginTop: 10, marginBottom: 4 },
  input: { backgroundColor: '#fff', borderRadius: 12, padding: 12, borderWidth: 1, borderColor: '#E0E0E0' },
  primaryBtn: { backgroundColor: PRIMARY_COLOR, paddingVertical: 14, borderRadius: 25, alignItems: 'center', marginTop: 20 },
  btnText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  card: { backgroundColor: '#fff', padding: 14, borderRadius: 14, marginBottom: 10 },
  chatBubble: { padding: 12, borderRadius: 16, marginBottom: 10, maxWidth: '80%' },
  docBubble: { backgroundColor: '#fff', alignSelf: 'flex-start' },
  userBubble: { backgroundColor: PRIMARY_COLOR, alignSelf: 'flex-end' },
  chatInputRow: { flexDirection: 'row', padding: 10, backgroundColor: '#fff', alignItems: 'center' },
  chatInput: { flex: 1, backgroundColor: '#F7F8FC', padding: 10, borderRadius: 20, marginRight: 8 },
  sendBtn: { backgroundColor: PRIMARY_COLOR, paddingVertical: 10, paddingHorizontal: 16, borderRadius: 20 },
});