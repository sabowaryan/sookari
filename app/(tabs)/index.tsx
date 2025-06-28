import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { Search, MapPin, Star, Heart, Plus, Truck, ShoppingCart } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import { Link } from 'expo-router';

const featuredProducts = [
  {
    id: 1,
    name: 'Fruits Tropicaux',
    price: '2500 FC',
    image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg',
    vendor: 'Marché Central',
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Légumes Frais',
    price: '1800 FC',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    vendor: 'Ferme Bio',
    rating: 4.6,
  },
  {
    id: 3,
    name: 'Poisson Frais',
    price: '3500 FC',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
    vendor: 'Marché Fleuve',
    rating: 4.9,
  },
];

const categories = [
  { id: 1, name: 'Alimentation', icon: '🍎', color: '#FF6B35' },
  { id: 2, name: 'Vêtements', icon: '👕', color: '#00B4A6' },
  { id: 3, name: 'Électronique', icon: '📱', color: '#FFD23F' },
  { id: 4, name: 'Maison', icon: '🏠', color: '#8B5CF6' },
];

export default function HomeScreen() {
  const { addItem, getItemQuantity } = useCart();

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      vendor: product.vendor,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.greeting}>Salut!</Text>
              <View style={styles.locationContainer}>
                <MapPin size={16} color="#666" />
                <Text style={styles.location}>Kinshasa, Gombe</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>
          
          <View style={styles.brandContainer}>
            <Text style={styles.brandName}>Sookari</Text>
            <Text style={styles.brandTagline}>Le Marché Connecté</Text>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Search size={20} color="#666" />
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher produits, vendeurs..."
              placeholderTextColor="#666"
            />
          </View>
        </View>

        {/* Categories */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Catégories</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.categoriesContainer}>
              {categories.map((category) => (
                <TouchableOpacity key={category.id} style={styles.categoryCard}>
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Text style={styles.categoryEmoji}>{category.icon}</Text>
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Featured Products */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Produits du Jour</Text>
            <TouchableOpacity>
              <Text style={styles.seeAll}>Voir tout</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.productsContainer}>
              {featuredProducts.map((product) => {
                const quantity = getItemQuantity(product.id);
                
                return (
                  <View key={product.id} style={styles.productCard}>
                    <Link href={`/product/${product.id}`} asChild>
                      <TouchableOpacity>
                        <View style={styles.productImageContainer}>
                          <Image source={{ uri: product.image }} style={styles.productImage} />
                          <TouchableOpacity style={styles.favoriteButton}>
                            <Heart size={16} color="#FF6B35" />
                          </TouchableOpacity>
                        </View>
                        <View style={styles.productInfo}>
                          <Text style={styles.productName}>{product.name}</Text>
                          <Text style={styles.productVendor}>{product.vendor}</Text>
                          <View style={styles.productFooter}>
                            <Text style={styles.productPrice}>{product.price}</Text>
                            <View style={styles.ratingContainer}>
                              <Star size={12} color="#FFD23F" fill="#FFD23F" />
                              <Text style={styles.rating}>{product.rating}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    </Link>
                    
                    <View style={styles.productActions}>
                      <TouchableOpacity 
                        style={[
                          styles.addToCartButton,
                          quantity > 0 && styles.addToCartButtonActive
                        ]}
                        onPress={() => handleAddToCart(product)}
                      >
                        <ShoppingCart size={16} color={quantity > 0 ? "#FFF" : "#FF6B35"} />
                        <Text style={[
                          styles.addToCartText,
                          quantity > 0 && styles.addToCartTextActive
                        ]}>
                          {quantity > 0 ? `Ajouté (${quantity})` : 'Ajouter'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Actions Rapides</Text>
          <View style={styles.quickActions}>
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#FF6B35' }]}>
                <Plus size={24} color="#FFF" />
              </View>
              <Text style={styles.actionTitle}>Vendre</Text>
              <Text style={styles.actionSubtitle}>Ajoutez vos produits</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.actionCard}>
              <View style={[styles.actionIcon, { backgroundColor: '#00B4A6' }]}>
                <Truck size={24} color="#FFF" />
              </View>
              <Text style={styles.actionTitle}>Livrer</Text>
              <Text style={styles.actionSubtitle}>Devenez livreur</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bottom Spacing */}
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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  location: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  profileButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    overflow: 'hidden',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  brandContainer: {
    alignItems: 'center',
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF6B35',
    letterSpacing: -1,
  },
  brandTagline: {
    fontSize: 14,
    color: '#00B4A6',
    fontWeight: '600',
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  seeAll: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  categoriesContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  categoryCard: {
    alignItems: 'center',
    width: 80,
  },
  categoryIcon: {
    width: 56,
    height: 56,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryEmoji: {
    fontSize: 24,
  },
  categoryName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    textAlign: 'center',
  },
  productsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  productCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productImageContainer: {
    position: 'relative',
  },
  productImage: {
    width: '100%',
    height: 140,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  favoriteButton: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  productInfo: {
    padding: 16,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  productVendor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 12,
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  productActions: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  addToCartButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    gap: 6,
  },
  addToCartButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  addToCartText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
  },
  addToCartTextActive: {
    color: '#FFF',
  },
  quickActions: {
    flexDirection: 'row',
    gap: 16,
  },
  actionCard: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  bottomSpacing: {
    height: 20,
  },
});