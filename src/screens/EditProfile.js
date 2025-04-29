import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';

const { width } = Dimensions.get('window');

export default function EditProfile() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('Lucky Blue Smith');
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. BlablablaZodiac 1999');
  const [photo, setPhoto] = useState(null);

  const handleChangePhoto = () => {
    launchImageLibrary({ mediaType: 'photo' }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setPhoto(response.assets[0].uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.topCurve} />

      <Text style={styles.title}>EDIT PROFILE</Text>

      <TouchableOpacity onPress={handleChangePhoto}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatar} />
        )}
      </TouchableOpacity>

      <Text style={styles.changePhoto} onPress={handleChangePhoto}>change photo</Text>

      <Text style={styles.label}>Username</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter username"
        />
        <Icon name="create-outline" size={18} color="#555" style={styles.icon} />
      </View>

      <Text style={styles.label}>Bio</Text>
      <View style={styles.bioContainer}>
        <TextInput
          style={styles.bioInput}
          value={bio}
          multiline
          onChangeText={setBio}
          placeholder="Write something about you"
        />
        <Icon name="create-outline" size={18} color="#555" style={styles.icon} />
      </View>

      <Text style={styles.charCount}>{bio.length}/500</Text>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', alignItems: 'center' },
  topCurve: {
    position: 'absolute',
    top: 0,
    width: width,
    height: 200,
    backgroundColor: '#8C7661',
    borderBottomLeftRadius: 120,
    borderBottomRightRadius: 120,
    zIndex: -1,
  },
  title: {
    marginTop: 60,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#fff',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#b5a99d',
    marginTop: 20,
  },
  changePhoto: {
    color: '#8C9C8C',
    fontSize: 12,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 40,
    marginTop: 25,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginHorizontal: 30,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 5,
    width: width - 60,
  },
  textInput: {
    flex: 1,
    fontSize: 14,
  },
  bioContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    marginHorizontal: 30,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 5,
    width: width - 60,
  },
  bioInput: {
    flex: 1,
    fontSize: 14,
    minHeight: 60,
  },
  icon: {
    marginLeft: 6,
    marginTop: 4,
  },
  charCount: {
    alignSelf: 'flex-end',
    marginRight: 40,
    marginTop: 5,
    fontSize: 12,
    color: '#888',
  },
  saveButton: {
    backgroundColor: '#8C9C8C',
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 50,
    marginTop: 30,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    letterSpacing: 1,
    textTransform: 'lowercase',
  },
});
