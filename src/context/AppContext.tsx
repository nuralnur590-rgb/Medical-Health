import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Doctor, Appointment, NotificationItem, ChatMessage } from '../types';

interface AppContextType {
  userProfile: {
    fullName: string;
    email: string;
    phone: string;
    dob: string;
  };
  updateProfile: (profile: { fullName: string; email: string; phone: string; dob: string }) => void;
  doctors: Doctor[];
  favorites: string[];
  toggleFavorite: (doctorId: string) => void;
  appointments: Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id'>) => void;
  cancelAppointment: (id: string) => void;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string) => void;
}

const initialDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Olivia Turner, M.D.',
    title: 'Professional Doctor',
    specialty: 'Dermato-Endocrinology',
    rating: 4.9,
    reviewsCount: 60,
    experienceYears: 15,
    price: 80,
    about: 'Dr. Olivia Turner specializes in hormonal skin conditions, acne management, and photodermatitis treatment.',
    careerPath: 'Senior Dermatologist at Central Health Hospital for 10 years, leading dermatology researcher.',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300',
  },
  {
    id: '2',
    name: 'Dr. Alexander Bennett, Ph.D.',
    title: 'Professional Doctor',
    specialty: 'Dermato-Genetics',
    rating: 4.8,
    reviewsCount: 40,
    experienceYears: 12,
    price: 70,
    about: 'Expert in genetic skin disorders, rare conditions, and customized gene-targeted treatments.',
    careerPath: 'PhD in Medical Genetics from Stanford University. Published 25+ academic articles.',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=300',
  },
  {
    id: '3',
    name: 'Dr. Sophia Martinez, Ph.D.',
    title: 'Professional Doctor',
    specialty: 'Cosmetic Bioengineering',
    rating: 4.9,
    reviewsCount: 150,
    experienceYears: 10,
    price: 90,
    about: 'Focuses on non-invasive cosmetic procedures, anti-aging therapies, and skin rejuvenation.',
    careerPath: 'Consultant for leading aesthetic clinics worldwide.',
    gender: 'Female',
    avatar: 'https://images.unsplash.com/photo-1594824813566-7885a3977336?w=300',
  },
  {
    id: '4',
    name: 'Dr. Michael Davidson, M.D.',
    title: 'Professional Doctor',
    specialty: 'Nano-Dermatology',
    rating: 4.7,
    reviewsCount: 90,
    experienceYears: 8,
    price: 65,
    about: 'Specialist in topical delivery systems, nanoparticle treatments, and psoriasis therapies.',
    careerPath: 'Attending physician at BioSkin Clinic, developer of targeted dermal formulas.',
    gender: 'Male',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300',
  },
];

const initialAppointments: Appointment[] = [
  {
    id: 'app-1',
    doctorId: '1',
    doctorName: 'Dr. Olivia Turner, M.D.',
    doctorSpecialty: 'Dermato-Endocrinology',
    date: 'Sunday, 12 June',
    time: '9:30 AM - 10:00 AM',
    patientName: 'John Doe',
    patientAge: 28,
    patientGender: 'Male',
    problemDescription: 'Acne breakout on cheeks and neck.',
    status: 'Upcoming',
    price: 80,
  },
  {
    id: 'app-2',
    doctorId: '2',
    doctorName: 'Dr. Alexander Bennett, Ph.D.',
    doctorSpecialty: 'Dermato-Genetics',
    date: 'Friday, 20 June',
    time: '2:30 PM - 3:00 PM',
    patientName: 'John Doe',
    patientAge: 28,
    patientGender: 'Male',
    problemDescription: 'Dry skin patch consultation.',
    status: 'Upcoming',
    price: 70,
  },
];

const initialNotifications: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Scheduled Appointment',
    message: 'Your appointment with Dr. Olivia Turner is set for June 12.',
    time: '2 M ago',
    type: 'appointment',
    isRead: false,
  },
  {
    id: 'notif-2',
    title: 'Medical History Update',
    message: 'Your laboratory skin analysis results have been uploaded.',
    time: '5 D ago',
    type: 'system',
    isRead: true,
  },
];

const initialChatMessages: ChatMessage[] = [
  { id: '1', senderId: 'doc', text: 'Hello John! How can I help you today?', time: '09:00', isDoctor: true },
  { id: '2', senderId: 'user', text: 'Hi Doctor, I have a skin irritation on my forearm.', time: '09:30', isDoctor: false },
  { id: '3', senderId: 'doc', text: 'Could you share details on when it started?', time: '09:43', isDoctor: true },
];

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    fullName: 'John Doe',
    email: 'johndoe@example.com',
    phone: '+123 567 89000',
    dob: '15 / 08 / 1995',
  });

  const [doctors] = useState<Doctor[]>(initialDoctors);
  const [favorites, setFavorites] = useState<string[]>(['1']);
  const [appointments, setAppointments] = useState<Appointment[]>(initialAppointments);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(initialChatMessages);

  const updateProfile = (profile: { fullName: string; email: string; phone: string; dob: string }) => {
    setUserProfile(profile);
  };

  const toggleFavorite = (doctorId: string) => {
    setFavorites((prev) =>
      prev.includes(doctorId) ? prev.filter((id) => id !== doctorId) : [...prev, doctorId]
    );
  };

  const addAppointment = (appData: Omit<Appointment, 'id'>) => {
    const newApp: Appointment = {
      ...appData,
      id: `app-${Date.now()}`,
    };
    setAppointments((prev) => [newApp, ...prev]);
  };

  const cancelAppointment = (id: string) => {
    setAppointments((prev) =>
      prev.map((app) => (app.id === id ? { ...app, status: 'Cancelled' } : app))
    );
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  };

  const sendChatMessage = (text: string) => {
    const newMessage: ChatMessage = {
      id: `msg-${Date.now()}`,
      senderId: 'user',
      text,
      time: 'Just now',
      isDoctor: false,
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  return (
    <AppContext.Provider
      value={{
        userProfile,
        updateProfile,
        doctors,
        favorites,
        toggleFavorite,
        appointments,
        addAppointment,
        cancelAppointment,
        notifications,
        markNotificationAsRead,
        chatMessages,
        sendChatMessage,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};