import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Camera, Plus, Upload, MapPin, DollarSign, Package } from 'lucide-react-native';

const categories = [
  'Alimentation',
  'Vêtements', 
  'Électronique',
  'Maison',
  'Beauté',
  'Sport',
  'Livres',
  'Autres'
];

const conditions = [
  { id: 'new', label: 'Neuf', color: '#00B4A6' },
  { id: 'excellent', label: 'Excellent', color: '#4CAF50' },
  { id: 'good', label: 'Bon état', color: '#FFD23F' },
  { id: 'fair', label: 'État correct', color: '#FF9800' },
];

export default function SellScreen() {
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [location, setLocation] = useState('');
  const [images, setImages] = useState<string[]>([]);

  const handleAddImage = () => {
    // Simulate adding an image
    const sampleImages = [
      'https://images.pexels.com/photos/4199098/pexels-photo-4199098.jpeg',
      'https://images.pexels.com/photos/4210782/pexels-photo-4210782.jpeg',
      'https://images.pexels.com/photos/4210851/pexels-photo-4210851.jpeg',
    ];
    
    if (images.length < 5) {
      setImages([...images, sampleImages[images.length % sampleImages.length]]);
    }
  };

  const handlePublish = () => {
    if (!productName || !description || !price || !category) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs obligatoires');
      return;
    }
    
    Alert.alert(
      'Succès!', 
      'Votre produit a été publié avec succès sur Sookari!',
      [
        { text: 'OK', onPress: () => {
          // Reset form
          setProductName('');
          setDescription('');
          setPrice('');
          setCategory('');
          setCondition('');
          setLocation('');
          setImages([]);
        }}
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Vendre sur Sookari</Text>
          <Text style={styles.subtitle}>Ajoutez votre produit en quelques clics</Text>
        </View>

        {/* Images Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Photos du produit *</Text>
          <Text style={styles.sectionSubtitle}>Ajoutez jusqu'à 5 photos</Text>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.imagesContainer}>
              {images.map((image, index) => (
                <View key={index} style={styles.imagePreview}>
                  <Image source={{ uri: image }} style={styles.previewImage} />
                </View>
              ))}
              
              {images.length < 5 && (
                <TouchableOpacity style={styles.addImageButton} onPress={handleAddImage}>
                  <Camera size={24} color="#666" />
                  <Text style={styles.addImageText}>Ajouter photo</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>
        </View>

        {/* Product Details */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Détails du produit</Text>
          
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Nom du produit *</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Ex: Mangues de Kasaï fraîches"
              value={productName}
              onChangeText={setProductName}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Description *</Text>
            <TextInput
              style={[styles.textInput, styles.textArea]}
              placeholder="Décrivez votre produit en détail..."
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Prix (FC) *</Text>
            <View style={styles.priceContainer}>
              <DollarSign size={20} color="#666" />
              <TextInput
                style={styles.priceInput}
                placeholder="0"
                value={price}
                onChangeText={setPrice}
                keyboardType="numeric"
              />
              <Text style={styles.currency}>FC</Text>
            </View>
          </View>
        </View>

        {/* Category Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégorie *</Text>
          <View style={styles.categoryGrid}>
            {categories.map((cat) => (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryButton,
                  category === cat && styles.categoryButtonActive
                ]}
                onPress={() => setCategory(cat)}
              >
                <Text style={[
                  styles.categoryButtonText,
                  category === cat && styles.categoryButtonTextActive
                ]}>
                  {cat}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Condition Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>État du produit</Text>
          <View style={styles.conditionContainer}>
            {conditions.map((cond) => (
              <TouchableOpacity
                key={cond.id}
                style={[
                  styles.conditionButton,
                  condition === cond.id && { backgroundColor: cond.color }
                ]}
                onPress={() => setCondition(cond.id)}
              >
                <Text style={[
                  styles.conditionButtonText,
                  condition === cond.id && styles.conditionButtonTextActive
                ]}>
                  {cond.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Location */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Localisation</Text>
          <View style={styles.locationContainer}>
            <MapPin size={20} color="#666" />
            <TextInput
              style={styles.locationInput}
              placeholder="Ex: Gombe, Kinshasa"
              value={location}
              onChangeText={setLocation}
            />
          </View>
        </View>

        {/* Publish Button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
            <Package size={20} color="#FFF" />
            <Text style={styles.publishButtonText}>Publier le produit</Text>
          </TouchableOpacity>
          
          <Text style={styles.disclaimer}>
            En publiant, vous acceptez nos conditions d'utilisation et notre politique de confidentialité.
          </Text>
        </View>

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  imagesContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 12,
    overflow: 'hidden',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  addImageButton: {
    width: 100,
    height: 100,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addImageText: {
    fontSize: 11,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  priceInput: {
    flex: 1,
    paddingVertical: 12,
    fontSize: 16,
    color: '#1A1A1A',
    marginLeft: 8,
  },
  currency: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  categoryButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  categoryButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  categoryButtonTextActive: {
    color: '#FFF',
  },
  conditionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  conditionButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  conditionButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  conditionButtonTextActive: {
    color: '#FFF',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  locationInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1A1A1A',
  },
  publishButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  publishButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  disclaimer: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  bottomSpacing: {
    height: 20,
  },
});