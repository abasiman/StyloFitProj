import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function UsersScreen() {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.profileTitle}>PROFILE</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
            <Icon name="settings-outline" size={24} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={styles.profileImage} />
      </View>

      <View style={styles.userInfoContainer}>
        <Text style={styles.userName}>Good Name</Text>
        <Text style={styles.userBio}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Blablabla
        </Text>
        <Text style={styles.zodiac}>Zodiac 1999</Text>
        <TouchableOpacity style={styles.editButton} onPress={() => navigation.navigate('EditProfile')}>
       <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

      </View>

      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>29</Text>
          <Text style={styles.statLabel}>outfits</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>15,7k</Text>
          <Text style={styles.statLabel}>followers</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>298</Text>
          <Text style={styles.statLabel}>following</Text>
        </View>
        <View style={styles.stat}>
          <Text style={styles.statNumber}>30,2M</Text>
          <Text style={styles.statLabel}>likes</Text>
        </View>
      </View>

      <Text style={styles.myOutfitsTitle}>My Outfits</Text>

      <View style={styles.outfitsGrid}>
        {[...Array(6)].map((_, index) => (
          <View key={index} style={styles.outfitBox}>
            <Text style={styles.outfitText}>Outfit Picture</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff' },
  topContainer: {
    backgroundColor: '#8C7661',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  profileTitle: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  profileImage: {
    width: 100,
    height: 100,
    backgroundColor: '#ccc',
    borderRadius: 50,
    alignSelf: 'center',
    marginTop: 10,
  },
  userInfoContainer: {
    alignItems: 'center',
    padding: 15,
  },
  userName: {
    fontWeight: 'bold',
    fontSize: 18,
    marginVertical: 5,
  },
  userBio: {
    textAlign: 'center',
    color: '#555',
    paddingHorizontal: 20,
    fontSize: 13,
  },
  zodiac: {
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  editButton: {
    marginTop: 10,
    borderColor: '#8C7661',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  editButtonText: {
    color: '#8C7661',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 20,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#eee',
    marginHorizontal: 20,
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
  },
  statLabel: {
    fontSize: 12,
    color: '#777',
  },
  myOutfitsTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginVertical: 10,
    marginLeft: 20,
  },
  outfitsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20,
  },
  outfitBox: {
    width: '40%',
    height: 120,
    backgroundColor: '#f2f2f2',
    marginVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  outfitText: {
    color: '#888',
  },
});
