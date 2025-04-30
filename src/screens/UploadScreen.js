// src/screens/UploadScreen.js
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  Modal,
  Pressable,
  Alert
} from 'react-native';
import { MaterialIcons, FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function UploadScreen({ navigation }) {
  const [image, setImage] = useState(null);
  const [tags, setTags] = useState([]);
  const [caption, setCaption] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [tagPosition, setTagPosition] = useState({ x: 0, y: 0 });
  const [currentTag, setCurrentTag] = useState(null);
  const [tagModalVisible, setTagModalVisible] = useState(false);
  const [brand, setBrand] = useState('');
  const [name, setName] = useState('');
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [clothingType, setClothingType] = useState('');
  const [clothingTypeModalVisible, setClothingTypeModalVisible] = useState(false);
  const [material, setMaterial] = useState('');
  const [color, setColor] = useState('');
  const [location, setLocation] = useState('');
  const [size, setSize] = useState('M');
  const [note, setNote] = useState('');
  const [editingTagIndex, setEditingTagIndex] = useState(-1);
  
  const imageRef = useRef(null);

  // Size options
  const sizeOptions = ['XS', 'S', 'M', 'L', 'XL'];
  
  // Clothing type options
  const clothingTypes = [
    { id: 'pants', name: 'Pants' },
    { id: 'top', name: 'Top' },
    { id: 'shoes', name: 'Shoes' },
    { id: 'accessories', name: 'Accessories' },
    { id: 'undergarments', name: 'Under Garments' },
    { id: 'others', name: 'Others' },
  ];

  // Mock brands for search demo
  const mockBrands = [
    { id: 1, name: 'Nike', popularity: '100,000 users' },
    { id: 2, name: 'Adidas', popularity: '90,000 users' },
    { id: 3, name: 'Gucci', popularity: '80,000 users' },
    { id: 4, name: 'Zara', popularity: '70,000 users' },
    { id: 5, name: 'H&M', popularity: '60,000 users' },
  ];
  
  const [filteredBrands, setFilteredBrands] = useState(mockBrands);
  const [searchQuery, setSearchQuery] = useState('');
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Reset other states when a new image is selected
      setTags([]);
      setCaption('');
      setIsAddingTag(false);
    }
  };

  const handleImagePress = (event) => {
    if (!isAddingTag || !image) return;
    
    imageRef.current.measure((fx, fy, width, height, px, py) => {
      // Get coordinates relative to the image
      const { locationX, locationY } = event.nativeEvent;
      
      // Save position as percentages for responsive positioning
      const xPercent = (locationX / width) * 100;
      const yPercent = (locationY / height) * 100;
      
      setTagPosition({ x: xPercent, y: yPercent });
      setEditingTagIndex(-1); // New tag
      setCurrentTag({
        position: { x: xPercent, y: yPercent },
        brand: '',
        name: '',
        type: '',
        material: '',
        color: '',
        location: '',
        size: 'M',
        note: ''
      });
      setTagModalVisible(true);
      setIsAddingTag(false);
    });
  };

  const handleAddTag = () => {
    setIsAddingTag(true);
  };

  const saveTag = () => {
    const newTag = {
      position: tagPosition,
      brand,
      name,
      type: clothingType,
      material,
      color,
      location,
      size,
      note
    };
    
    if (editingTagIndex >= 0) {
      // Update existing tag
      const updatedTags = [...tags];
      updatedTags[editingTagIndex] = newTag;
      setTags(updatedTags);
    } else {
      // Add new tag
      setTags([...tags, newTag]);
    }
    
    // Reset form fields
    setBrand('');
    setName('');
    setClothingType('');
    setMaterial('');
    setColor('');
    setLocation('');
    setSize('M');
    setNote('');
    setTagModalVisible(false);
  };

  const handleEditTag = (index) => {
    const tag = tags[index];
    setBrand(tag.brand);
    setName(tag.name);
    setClothingType(tag.type);
    setMaterial(tag.material);
    setColor(tag.color);
    setLocation(tag.location);
    setSize(tag.size);
    setNote(tag.note);
    setTagPosition(tag.position);
    setEditingTagIndex(index);
    setTagModalVisible(true);
  };

  const handleDeleteTag = (index) => {
    const updatedTags = tags.filter((_, i) => i !== index);
    setTags(updatedTags);
  };

  const handleSearchBrand = (query) => {
    setSearchQuery(query);
    const filtered = mockBrands.filter(brand => 
      brand.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBrands(filtered);
  };

  const selectBrand = (selectedBrand) => {
    setBrand(selectedBrand.name);
    setSearchModalVisible(false);
  };

  const selectClothingType = (type) => {
    setClothingType(type.name);
    setClothingTypeModalVisible(false);
  };

  const handleUpload = () => {
    // Here you would upload to Firestore
    // For now we'll just show an alert and navigate back
    Alert.alert(
      "Success",
      "Your outfit has been uploaded!",
      [
        { 
          text: "OK", 
          onPress: () => navigation.navigate('Home')
        }
      ]
    );
    
    // In a real implementation, you would save to Firestore:
    // const outfitData = {
    //   image: imageUri, // You would upload this to Firebase Storage first
    //   caption,
    //   tags,
    //   timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    //   userId: currentUser.uid
    // };
    // 
    // firebase.firestore().collection('outfits').add(outfitData)
    //   .then(() => navigation.navigate('Home'))
    //   .catch(error => Alert.alert("Error", error.message));
  };

  const addNewBrand = () => {
    Alert.alert(
      "Add New Brand",
      "Request to add a new brand has been sent for approval",
      [{ text: "OK" }]
    );
    setSearchModalVisible(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>New Outfit</Text>
        {isAddingTag && (
          <Text style={styles.tagModeText}>
            Tap on the image to add a tag
          </Text>
        )}
      </View>

      <View style={styles.imageContainer}>
        {image ? (
          <TouchableOpacity 
            activeOpacity={0.9}
            onPress={handleImagePress}
          >
            <Image
              ref={imageRef}
              source={{ uri: image }}
              style={styles.image}
              resizeMode="cover"
            />
            
            {/* Show existing tags */}
            {tags.map((tag, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.tagMarker,
                  {
                    left: `${tag.position.x}%`,
                    top: `${tag.position.y}%`,
                  }
                ]}
                onPress={() => handleEditTag(index)}
              >
                <View style={styles.tagDot}>
                  <Text style={styles.tagNumber}>{index + 1}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
            <MaterialIcons name="add-photo-alternate" size={50} color="#83715D" />
            <Text style={styles.placeholderText}>Add Photo</Text>
          </TouchableOpacity>
        )}
      </View>

      {image && (
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.actionButton, !isAddingTag ? styles.primaryButton : styles.secondaryButton]}
            onPress={handleAddTag}
          >
            <Text style={styles.buttonText}>
              {isAddingTag ? 'Cancel Adding Tag' : 'Add Tag'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.actionButton, styles.primaryButton]} 
            onPress={pickImage}
          >
            <Text style={styles.buttonText}>Change Photo</Text>
          </TouchableOpacity>
        </View>
      )}

      {image && tags.length > 0 && (
        <View style={styles.tagsList}>
          <Text style={styles.sectionTitle}>Tags ({tags.length})</Text>
          {tags.map((tag, index) => (
            <View key={index} style={styles.tagItem}>
              <View style={styles.tagNumberCircle}>
                <Text style={styles.tagItemNumber}>{index + 1}</Text>
              </View>
              <View style={styles.tagInfo}>
                <Text style={styles.tagBrand}>{tag.brand || 'No Brand'}</Text>
                <Text style={styles.tagName}>{tag.name || 'Unnamed Item'} • {tag.type || 'Unspecified Type'}</Text>
              </View>
              <TouchableOpacity onPress={() => handleEditTag(index)}>
                <FontAwesome name="edit" size={20} color="#83715D" />
              </TouchableOpacity>
              <TouchableOpacity 
                style={styles.deleteButton} 
                onPress={() => handleDeleteTag(index)}
              >
                <FontAwesome name="trash" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      )}

      {image && (
        <View style={styles.captionContainer}>
          <Text style={styles.sectionTitle}>Caption</Text>
          <TextInput
            style={styles.captionInput}
            placeholder="Write a caption for your outfit..."
            value={caption}
            onChangeText={setCaption}
            multiline
          />
        </View>
      )}

      {image && (
        <TouchableOpacity 
          style={[styles.uploadButton, tags.length === 0 ? styles.disabledButton : styles.primaryButton]} 
          onPress={handleUpload}
          disabled={tags.length === 0}
        >
          <Text style={styles.uploadButtonText}>Upload Outfit</Text>
        </TouchableOpacity>
      )}

      {/* Tag Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={tagModalVisible}
        onRequestClose={() => setTagModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Tag Outfit</Text>
              <TouchableOpacity onPress={() => setTagModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.modalScroll}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Brand:</Text>
                <TouchableOpacity 
                  style={styles.input}
                  onPress={() => setSearchModalVisible(true)}
                >
                  <Text style={brand ? styles.inputText : styles.placeholderInput}>
                    {brand || "Select Brand"}
                  </Text>
                  <MaterialIcons name="search" size={20} color="#83715D" />
                </TouchableOpacity>
              </View>
                
              <View style={styles.formGroup}>
                <Text style={styles.label}>Name:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Item name"
                  value={name}
                  onChangeText={setName}
                />
              </View>
                
              <View style={styles.formGroup}>
                <Text style={styles.label}>Type of Clothing:</Text>
                <TouchableOpacity 
                  style={styles.input}
                  onPress={() => setClothingTypeModalVisible(true)}
                >
                  <Text style={clothingType ? styles.inputText : styles.placeholderInput}>
                    {clothingType || "Select Type"}
                  </Text>
                  <MaterialIcons name="arrow-drop-down" size={20} color="#83715D" />
                </TouchableOpacity>
              </View>
                
              <View style={styles.formGroup}>
                <Text style={styles.label}>Material:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Cotton, Polyester, etc."
                  value={material}
                  onChangeText={setMaterial}
                />
              </View>
                
              <View style={styles.formGroup}>
                <Text style={styles.label}>Color:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Item color"
                  value={color}
                  onChangeText={setColor}
                />
              </View>
                
              <View style={styles.formGroup}>
                <Text style={styles.label}>Location:</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Where you bought it"
                  value={location} // map integration later
                  onChangeText={setLocation}
                />
              </View>
                
              <View style={styles.formGroup}>
                <Text style={styles.label}>Size:</Text>
                <View style={styles.sizeContainer}>
                  {sizeOptions.map((option) => (
                    <TouchableOpacity 
                      key={option}
                      style={[
                        styles.sizeOption,
                        size === option && styles.selectedSize
                      ]}
                      onPress={() => setSize(option)}
                    >
                      <Text 
                        style={[
                          styles.sizeText,
                          size === option && styles.selectedSizeText
                        ]}
                      >
                        {option}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
                
              <View style={styles.formGroup}>
                <Text style={styles.label}>Note:</Text>
                <TextInput
                  style={[styles.input, styles.multilineInput]}
                  placeholder="Any additional notes about this item"
                  value={note}
                  onChangeText={setNote}
                  multiline
                  numberOfLines={3}
                />
              </View>
            </ScrollView>
              
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.backButton]}
                onPress={() => setTagModalVisible(false)}
              >
                <Text style={styles.buttonText}>Back</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]}
                onPress={saveTag}
              >
                <Text style={styles.buttonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Brand Search Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={searchModalVisible}
        onRequestClose={() => setSearchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Search Brand</Text>
              <TouchableOpacity onPress={() => setSearchModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.searchContainer}>
              <MaterialIcons name="search" size={20} color="#83715D" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search Brand..."
                value={searchQuery}
                onChangeText={handleSearchBrand}
                autoFocus
              />
            </View>
            
            <ScrollView style={styles.brandList}>
              {filteredBrands.map((brand) => (
                <TouchableOpacity 
                  key={brand.id}
                  style={styles.brandItem}
                  onPress={() => selectBrand(brand)}
                >
                  <View style={styles.brandInfo}>
                    <Text style={styles.brandName}>{brand.name}</Text>
                    <Text style={styles.brandPopularity}>{brand.popularity} using this brand</Text>
                  </View>
                  <MaterialCommunityIcons 
                    name="checkbox-marked-circle" 
                    size={24}
                    color={brand.name === searchQuery ? "#4CAF50" : "transparent"} 
                  />
                </TouchableOpacity>
              ))}
              
              {filteredBrands.length === 0 && (
                <View style={styles.noBrandsContainer}>
                  <Text style={styles.noBrandsText}>No brands found</Text>
                  <TouchableOpacity 
                    style={styles.addBrandButton}
                    onPress={addNewBrand}
                  >
                    <Text style={styles.addBrandText}>Add New Brand</Text>
                  </TouchableOpacity>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Clothing Type Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={clothingTypeModalVisible}
        onRequestClose={() => setClothingTypeModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Type of Clothing</Text>
              <TouchableOpacity onPress={() => setClothingTypeModalVisible(false)}>
                <MaterialIcons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.typeList}>
              {clothingTypes.map((type) => (
                <TouchableOpacity 
                  key={type.id}
                  style={styles.typeItem}
                  onPress={() => selectClothingType(type)}
                >
                  <View style={styles.typeCircle}>
                    {type.name === clothingType && (
                      <View style={styles.selectedDot} />
                    )}
                  </View>
                  <Text style={styles.typeName}>{type.name}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

// Color constants from your HomePage
const COLORS = {
  primary: '#83715D',
  light: '#EAEAE9',
  white: '#FFFFFF',
  grey: '#F5F5F5',
  textDark: '#333333',
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        backgroundColor: COLORS.primary,
        paddingTop: 50,
        paddingBottom: 20,
        paddingHorizontal: 20,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: COLORS.white,
        textAlign: 'center',
    },
    tagModeText: {
        color: COLORS.white,
        textAlign: 'center',
        marginTop: 8,
        fontSize: 14,
    },
    imageContainer: {
        padding: 20,
        alignItems: 'center',
    },
    image: {
        width: width - 40,
        height: (width - 40) * 1.2,
        borderRadius: 15,
    },
    imagePlaceholder: {
        width: width - 40,
        height: (width - 40) * 1.2,
        borderRadius: 15,
        backgroundColor: COLORS.light,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
    },
    placeholderText: {
        marginTop: 10,
        fontSize: 16,
        color: COLORS.primary,
        fontWeight: '500',
    },
    actionButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    actionButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    primaryButton: {
        backgroundColor: COLORS.primary,
    },
    secondaryButton: {
        backgroundColor: '#FF6B6B',
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    buttonText: {
        color: COLORS.white,
        fontWeight: '600',
        fontSize: 14,
    },
    tagsList: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: COLORS.textDark,
    },
    tagItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 12,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        marginBottom: 10,
    },
    tagNumberCircle: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    tagItemNumber: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    tagInfo: {
        flex: 1,
    },
    tagBrand: {
        fontWeight: 'bold',
        fontSize: 14,
        color: COLORS.textDark,
    },
    tagName: {
        color: COLORS.textDark,
        fontSize: 12,
    },
    deleteButton: {
        marginLeft: 10,
    },
    captionContainer: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    captionInput: {
        borderWidth: 1,
        borderColor: COLORS.light,
        borderRadius: 10,
        padding: 12,
        height: 100,
        backgroundColor: COLORS.white,
        textAlignVertical: 'top',
    },
    uploadButton: {
        backgroundColor: COLORS.primary,
        marginHorizontal: 20,
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 40,
    },
    uploadButtonText: {
        color: COLORS.white,
        fontSize: 16,
        fontWeight: 'bold',
    },
    tagMarker: {
        position: 'absolute',
        width: 26,
        height: 26,
        marginLeft: -13,
        marginTop: -13,
    },
    tagDot: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: COLORS.white,
    },
    tagNumber: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: 12,
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: COLORS.white,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingBottom: 20,
        maxHeight: '90%',
    },
    modalHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.textDark,
    },
    modalScroll: {
        maxHeight: '70%',
    },
    formGroup: {
        marginHorizontal: 15,
        marginTop: 15,
    },
    label: {
        fontSize: 14,
        color: COLORS.textDark,
        marginBottom: 5,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.light,
        borderRadius: 8,
        padding: 12,
        backgroundColor: COLORS.white,
        color: COLORS.textDark,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputText: {
        color: COLORS.textDark,
    },
    placeholderInput: {
        color: '#999',
    },
    multilineInput: {
        height: 80,
        textAlignVertical: 'top',
    },
    sizeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    sizeOption: {
        flex: 1,
        padding: 10,
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.light,
        marginHorizontal: 2,
        borderRadius: 8,
    },
    selectedSize: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    sizeText: {
        color: COLORS.textDark,
    },
    selectedSizeText: {
        color: COLORS.white,
        fontWeight: 'bold',
    },
    modalActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        marginTop: 20,
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        marginHorizontal: 5,
    },
    backButton: {
        backgroundColor: '#CCCCCC',
    },
    saveButton: {
        backgroundColor: COLORS.primary,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: COLORS.light,
        borderRadius: 10,
        margin: 15,
    },
    searchIcon: {
        marginRight: 10,
    },
    searchInput: {
        flex: 1,
        padding: 5,
    },
    brandList: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    brandItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    brandInfo: {
        flex: 1,
    },
    brandName: {
        fontSize: 16,
        fontWeight: '500',
        color: COLORS.textDark,
    },
    brandPopularity: {
        fontSize: 12,
        color: '#999',
    },
    noBrandsContainer: {
        alignItems: 'center',
        padding: 20,
    },
    noBrandsText: {
        fontSize: 16,
        color: '#999',
        marginBottom: 15,
    },
    addBrandButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    addBrandText: {
        color: COLORS.white,
        fontWeight: '600',
    },
    typeList: {
        paddingHorizontal: 15,
        marginBottom: 20,
    },
    typeItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.light,
    },
    typeCircle: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.primary,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: COLORS.primary,
    },
    typeName: {
        fontSize: 16,
        color: COLORS.textDark,
    },
});