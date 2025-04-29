import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';

const dummyOutfits = Array.from({ length: 20 }, (_, index) => ({ id: index + 1 }));

export default function UsersScreen() {
  const [searchActive, setSearchActive] = useState(false);
  const [activeTab, setActiveTab] = useState('Outfits');

  const renderOutfitsGrid = () => (
    <View style={styles.grid}>
      {dummyOutfits.map((item) => (
        <View key={item.id} style={styles.outfitCard}>
          <Text style={styles.outfitText}>Outfit Picture</Text>
        </View>
      ))}
    </View>
  );

  const renderUsersList = () => (
    <View style={{ width: '100%' }}>
      {dummyOutfits.map((item) => (
        <View key={item.id} style={styles.userCard}>
          <Text style={styles.userIcon}>👤</Text>
          <Text style={styles.userName}>drake</Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>STYLoFiT</Text>

      {searchActive ? (
        <TouchableOpacity onPress={() => setSearchActive(false)} style={styles.backButton}>
          <Text style={styles.backButtonText}>←</Text>
        </TouchableOpacity>
      ) : null}

      <TextInput
        style={styles.searchBar}
        placeholder="Search ..."
        placeholderTextColor="#999"
        onFocus={() => setSearchActive(true)}
      />

      {searchActive && (
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('Outfits')} style={[styles.tab, activeTab === 'Outfits' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Outfits' && styles.activeTabText]}>Outfits</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('Users')} style={[styles.tab, activeTab === 'Users' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Users' && styles.activeTabText]}>Users</Text>
          </TouchableOpacity>
        </View>
      )}

      {searchActive ? (
        activeTab === 'Outfits' ? renderOutfitsGrid() : renderUsersList()
      ) : (
        renderOutfitsGrid() // default view
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#5a3e2b',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  backButtonText: {
    fontSize: 24,
    color: '#5a3e2b',
  },
  searchBar: {
    width: '90%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    width: '100%',
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderColor: '#5a3e2b',
  },
  tabText: {
    fontSize: 16,
    color: '#888',
  },
  activeTabText: {
    color: '#5a3e2b',
    fontWeight: 'bold',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    width: '100%',
  },
  outfitCard: {
    width: '30%',
    aspectRatio: 1,
    marginRight: '3.33%',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  outfitText: {
    textAlign: 'center',
    color: '#333',
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  userIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  userName: {
    fontSize: 16,
    color: '#333',
  },
});
