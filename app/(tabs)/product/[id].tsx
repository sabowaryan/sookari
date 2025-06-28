import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Star, Heart, ShoppingCart, MapPin, Shield, Truck, MessageCircle } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';

const { width } = Dimensions.get('window');

// Combined product data from both screens
const allProducts = [
  // Featured products from home screen
  {
    id: 1,
    name: 'Fruits Tropicaux',
    price: '2500 FC',
    image: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg',
    vendor: 'Marché Central',
    rating: 4.8,
    description: 'Sélection de fruits tropicaux frais de saison, cueillis à maturité parfaite. Mangues juteuses, ananas sucrés, et papayes crémeuses directement du verger. Riches en vitamines et saveurs authentiques du Congo.',
    category: 'Alimentation',
    location: 'Marché Central, Kinshasa',
    deliveryTime: '30-45 min',
    inStock: true,
    reviews: 127,
    images: [
      'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg',
      'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg',
      'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg',
    ],
  },
  {
    id: 2,
    name: 'Légumes Frais',
    price: '1800 FC',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    vendor: 'Ferme Bio',
    rating: 4.6,
    description: 'Légumes biologiques cultivés sans pesticides dans nos fermes locales. Tomates charnues, concombres croquants, et légumes verts fraîchement récoltés. Parfait pour une alimentation saine et équilibrée.',
    category: 'Alimentation',
    location: 'Ferme Bio, Kinshasa',
    deliveryTime: '45-60 min',
    inStock: true,
    reviews: 89,
    images: [
      'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
      'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
    ],
  },
  {
    id: 3,
    name: 'Poisson Frais',
    price: '3500 FC',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
    vendor: 'Marché Fleuve',
    rating: 4.9,
    description: 'Poisson frais du fleuve Congo, pêché quotidiennement par nos pêcheurs locaux. Tilapia, capitaine et autres espèces locales de première qualité. Idéal pour vos plats traditionnels congolais.',
    category: 'Alimentation',
    location: 'Marché Fleuve, Kinshasa',
    deliveryTime: '20-30 min',
    inStock: true,
    reviews: 203,
    images: [
      'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
      'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg',
    ],
  },
  // Products from categories screen
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
    description: 'Mangues premium de la région du Kasaï, reconnues pour leur goût exceptionnel et leur texture fondante. Récoltées à parfaite maturité et transportées avec soin pour préserver toute leur saveur.',
    location: 'Kasaï, Congo',
    deliveryTime: '60-90 min',
    inStock: true,
    reviews: 156,
    images: [
      'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg',
      'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg',
    ],
  },
  {
    id: 5,
    name: 'Chemise Wax Moderne',
    price: '8500 FC',
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
    vendor: 'Mode Africaine',
    rating: 4.6,
    category: 'Vêtements',
    description: 'Chemise élégante en tissu wax authentique, confectionnée par nos artisans locaux. Design moderne alliant tradition et style contemporain. Parfaite pour toutes occasions, du bureau aux événements.',
    location: 'Atelier Mode, Kinshasa',
    deliveryTime: '24-48h',
    inStock: true,
    reviews: 73,
    images: [
      'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg',
      'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg',
    ],
  },
  {
    id: 6,
    name: 'Smartphone Android',
    price: '125000 FC',
    image: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
    vendor: 'Tech Store',
    rating: 4.5,
    category: 'Électronique',
    description: 'Smartphone Android dernière génération avec écran HD, appareil photo haute résolution et batterie longue durée. Garantie 1 an, livré avec chargeur et protection d\'écran.',
    location: 'Tech Store, Kinshasa',
    deliveryTime: '2-4h',
    inStock: true,
    reviews: 45,
    images: [
      'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg',
      'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg',
    ],
  },
  {
    id: 7,
    name: 'Haricots Verts Bio',
    price: '800 FC',
    image: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
    vendor: 'Ferme Bio Kinshasa',
    rating: 4.9,
    category: 'Alimentation',
    description: 'Haricots verts biologiques cultivés sans produits chimiques. Fraîchement cueillis, croquants et savoureux. Riches en fibres et nutriments essentiels pour une alimentation équilibrée.',
    location: 'Ferme Bio, Kinshasa',
    deliveryTime: '45-60 min',
    inStock: true,
    reviews: 234,
    images: [
      'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg',
      'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    ],
  },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem, getItemQuantity } = useCart();
  
  const product = allProducts.find(p => p.id === parseInt(id as string));
  const quantity = product ? getItemQuantity(product.id) : 0;

  if (!product) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Produit non trouvé</Text>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <Text style={styles.backButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const handleAddToCart = () => {
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
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Heart size={24} color="#FF6B35" />
          </TouchableOpacity>
        </View>

        {/* Product Images */}
        <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
          {product.images.map((image, index) => (
            <Image key={index} source={{ uri: image }} style={styles.productImage} />
          ))}
        </ScrollView>

        {/* Product Info */}
        <View style={styles.productInfo}>
          {product.discount && (
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>-{product.discount}% DE RÉDUCTION</Text>
            </View>
          )}

          <Text style={styles.productName}>{product.name}</Text>
          
          <View style={styles.vendorContainer}>
            <Text style={styles.vendorName}>Vendu par {product.vendor}</Text>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD23F" fill="#FFD23F" />
              <Text style={styles.rating}>{product.rating}</Text>
              <Text style={styles.reviewCount}>({product.reviews} avis)</Text>
            </View>
          </View>

          <View style={styles.priceContainer}>
            <Text style={styles.price}>{product.price}</Text>
            {product.originalPrice && (
              <Text style={styles.originalPrice}>{product.originalPrice}</Text>
            )}
          </View>

          {/* Stock Status */}
          <View style={styles.stockContainer}>
            <View style={[styles.stockDot, { backgroundColor: product.inStock ? '#4CAF50' : '#FF4444' }]} />
            <Text style={[styles.stockText, { color: product.inStock ? '#4CAF50' : '#FF4444' }]}>
              {product.inStock ? 'En stock' : 'Rupture de stock'}
            </Text>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{product.description}</Text>
          </View>

          {/* Delivery Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Livraison</Text>
            <View style={styles.deliveryInfo}>
              <View style={styles.deliveryItem}>
                <MapPin size={16} color="#00B4A6" />
                <Text style={styles.deliveryText}>{product.location}</Text>
              </View>
              <View style={styles.deliveryItem}>
                <Truck size={16} color="#00B4A6" />
                <Text style={styles.deliveryText}>Livraison en {product.deliveryTime}</Text>
              </View>
              <View style={styles.deliveryItem}>
                <Shield size={16} color="#00B4A6" />
                <Text style={styles.deliveryText}>Paiement sécurisé</Text>
              </View>
            </View>
          </View>

          {/* Vendor Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>À propos du vendeur</Text>
            <View style={styles.vendorInfo}>
              <View style={styles.vendorDetails}>
                <Text style={styles.vendorInfoName}>{product.vendor}</Text>
                <View style={styles.vendorRating}>
                  <Star size={14} color="#FFD23F" fill="#FFD23F" />
                  <Text style={styles.vendorRatingText}>{product.rating} • Vendeur vérifié</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <MessageCircle size={16} color="#FF6B35" />
                <Text style={styles.contactButtonText}>Contacter</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Add to Cart Button */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity 
          style={[
            styles.addToCartButton,
            !product.inStock && styles.addToCartButtonDisabled
          ]}
          onPress={handleAddToCart}
          disabled={!product.inStock}
        >
          <ShoppingCart size={20} color="#FFF" />
          <Text style={styles.addToCartButtonText}>
            {quantity > 0 
              ? `Ajouté au panier (${quantity})` 
              : product.inStock 
                ? 'Ajouter au panier' 
                : 'Produit indisponible'
            }
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  productImage: {
    width: width,
    height: 300,
  },
  productInfo: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 100,
  },
  discountBadge: {
    backgroundColor: '#FF4444',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  discountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#FFF',
  },
  productName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  vendorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  vendorName: {
    fontSize: 14,
    color: '#666',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  reviewCount: {
    fontSize: 12,
    color: '#666',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  price: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
  },
  originalPrice: {
    fontSize: 18,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  stockContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
  },
  stockDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  stockText: {
    fontSize: 14,
    fontWeight: '600',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  deliveryInfo: {
    gap: 12,
  },
  deliveryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  deliveryText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  vendorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  vendorDetails: {
    flex: 1,
  },
  vendorInfoName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  vendorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  vendorRatingText: {
    fontSize: 12,
    color: '#666',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  contactButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FF6B35',
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  addToCartButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addToCartButtonDisabled: {
    backgroundColor: '#E5E5EA',
  },
  addToCartButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingHorizontal: 24,
    paddingVertical: 12,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});