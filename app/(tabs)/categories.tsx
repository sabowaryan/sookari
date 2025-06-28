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
} from 'react-native';
import { Search, Filter, Grid2x2 as Grid, List, Star, ShoppingCart } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import { Link } from 'expo-router';

const categories = [
  { id: 1, name: 'Tout', icon: '🛒', count: 1250 },
  { id: 2, name: 'Alimentation', icon: '🍎', count: 350 },
  { id: 3, name: 'Vêtements', icon: '👕', count: 280 },
  { id: 4, name: 'Électronique', icon: '📱', count: 120 },
  { id: 5, name: 'Maison', icon: '🏠', count: 200 },
  { id: 6, name: 'Beauté', icon: '💄', count: 150 },
  { id: 7, name: 'Sport', icon: '⚽', count: 90 },
  { id: 8, name: 'Livres', icon: '📚', count: 60 },
];

const products = [
  {
    id: 4,
    name: 'Mangues de Kasaï',
    price: '1500 FC',
    originalPrice: '2000 FC',
    image: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
    vendor: 'Fruits Paradise',
    rating: 4.8,
    discount: 25,
    category: 'Alimentation',
  },
  {
    id: 5,
    name: 'Chemise Wax Moderne',
    price: '8500 FC',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    vendor: 'Mode Africaine',
    rating: 4.6,
    category: 'Vêtements',
  },
  {
    id: 6,
    name: 'Smartphone Android',
    price: '125000 FC',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    vendor: 'Tech Store',
    rating: 4.5,
    category: 'Électronique',
  },
  {
    id: 7,
    name: 'Haricots Verts Bio',
    price: '800 FC',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
    vendor: 'Ferme Bio Kinshasa',
    rating: 4.9,
    category: 'Alimentation',
  },
];

export default function CategoriesScreen() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { addItem, getItemQuantity } = useCart();

  const filteredProducts = products.filter(product => 
    selectedCategory === 1 || product.category === categories.find(c => c.id === selectedCategory)?.name
  );

  const handleAddToCart = (product: typeof products[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      vendor: product.vendor,
      category: product.category,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Catégories</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            style={styles.viewToggle}
            onPress={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? 
              <List size={20} color="#666" /> : 
              <Grid size={20} color="#666" />
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher dans les produits..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#666"
          />
        </View>
      </View>

      {/* Categories Horizontal List */}
      <View style={styles.categoriesSection}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.categoriesContainer}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryChip,
                  selectedCategory === category.id && styles.categoryChipActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                <Text style={styles.categoryIcon}>{category.icon}</Text>
                <Text style={[
                  styles.categoryText,
                  selectedCategory === category.id && styles.categoryTextActive
                ]}>
                  {category.name}
                </Text>
                <View style={[
                  styles.categoryCount,
                  selectedCategory === category.id && styles.categoryCountActive
                ]}>
                  <Text style={[
                    styles.categoryCountText,
                    selectedCategory === category.id && styles.categoryCountTextActive
                  ]}>
                    {category.count}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Products Grid/List */}
      <ScrollView style={styles.productsSection} showsVerticalScrollIndicator={false}>
        <View style={viewMode === 'grid' ? styles.productsGrid : styles.productsList}>
          {filteredProducts.map((product) => {
            const quantity = getItemQuantity(product.id);
            
            return (
              <View
                key={product.id}
                style={viewMode === 'grid' ? styles.productCardGrid : styles.productCardList}
              >
                <Link href={`/product/${product.id}`} asChild>
                  <TouchableOpacity>
                    <View style={styles.productImageContainer}>
                      <Image source={{ uri: product.image }} style={styles.productImage} />
                      {product.discount && (
                        <View style={styles.discountBadge}>
                          <Text style={styles.discountText}>-{product.discount}%</Text>
                        </View>
                      )}
                    </View>
                    
                    <View style={styles.productInfo}>
                      <Text style={styles.productName} numberOfLines={2}>
                        {product.name}
                      </Text>
                      <Text style={styles.productVendor}>{product.vendor}</Text>
                      
                      <View style={styles.productPricing}>
                        <Text style={styles.productPrice}>{product.price}</Text>
                        {product.originalPrice && (
                          <Text style={styles.originalPrice}>{product.originalPrice}</Text>
                        )}
                      </View>
                      
                      <View style={styles.productFooter}>
                        <View style={styles.productRating}>
                          <Star size={12} color="#FFD23F" fill="#FFD23F" />
                          <Text style={styles.ratingText}>{product.rating}</Text>
                        </View>
                      </View>
                    </View>
                  </TouchableOpacity>
                </Link>
                
                <View style={styles.productActions}>
                  <TouchableOpacity 
                    style={[
                      styles.addToCartButtonSmall,
                      quantity > 0 && styles.addToCartButtonSmallActive
                    ]}
                    onPress={() => handleAddToCart(product)}
                  >
                    <ShoppingCart size={14} color={quantity > 0 ? "#FFF" : "#FF6B35"} />
                    {quantity > 0 && (
                      <Text style={styles.addToCartQuantity}>{quantity}</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </View>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    backgroundColor: '#FFF',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  viewToggle: {
    padding: 8,
  },
  filterButton: {
    padding: 8,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFF',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  categoriesSection: {
    backgroundColor: '#FFF',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: '#FF6B35',
  },
  categoryIcon: {
    fontSize: 16,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  categoryCount: {
    backgroundColor: '#E5E5EA',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  categoryCountActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  categoryCountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666',
  },
  categoryCountTextActive: {
    color: '#FFF',
  },
  productsSection: {
    flex: 1,
    paddingTop: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    gap: 16,
  },
  productsList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  productCardGrid: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    width: '47%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  productCardList: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    flexDirection: 'row',
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
    height: 120,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  discountText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  productInfo: {
    padding: 12,
  },
  productName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  productVendor: {
    fontSize: 11,
    color: '#666',
    marginBottom: 8,
  },
  productPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  productFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 11,
    color: '#666',
  },
  productActions: {
    position: 'absolute',
    bottom: 12,
    right: 12,
  },
  addToCartButtonSmall: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    gap: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  addToCartButtonSmallActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  addToCartQuantity: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
});