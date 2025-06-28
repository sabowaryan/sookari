import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Dimensions,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter, Link } from 'expo-router';
import { ArrowLeft, Star, Heart, ShoppingCart, MapPin, Shield, Truck, MessageCircle, Minus, Plus, Play, Pause } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';
import { VideoView, useVideoPlayer } from 'expo-video';

const { width } = Dimensions.get('window');

// Enhanced product data with new properties
const allProducts = [
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
    colors: ['Rouge', 'Jaune', 'Vert'],
    sizes: ['500g', '1kg', '2kg'],
    deliveryPricePerKm: 200,
    paymentMethods: ['Paiement à la livraison', 'Mobile Money', 'Carte bancaire'],
    media: [
      { type: 'video', uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1128678/pexels-photo-1128678.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1132047/pexels-photo-1132047.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg' },
    ],
    userReviews: [
      {
        id: 1,
        userName: 'Marie K.',
        rating: 5,
        comment: 'Fruits excellents, très frais et savoureux. Livraison rapide!',
        date: '2024-01-15',
      },
      {
        id: 2,
        userName: 'Jean M.',
        rating: 4,
        comment: 'Bonne qualité, je recommande. Petit bémol sur l\'emballage.',
        date: '2024-01-10',
      },
    ],
  },
  {
    id: 2,
    name: 'Légumes Frais',
    price: '1800 FC',
    image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg',
    vendor: 'Ferme Bio',
    rating: 4.6,
    description: 'Légumes biologiques cultivés sans pesticides dans nos fermes locales. Tomates charnues, concombres croquants, et légumes verts fraîchement récoltés.',
    category: 'Alimentation',
    location: 'Ferme Bio, Kinshasa',
    deliveryTime: '45-60 min',
    inStock: true,
    reviews: 89,
    colors: ['Vert', 'Rouge'],
    sizes: ['1kg', '2kg', '5kg'],
    deliveryPricePerKm: 150,
    paymentMethods: ['Paiement à la livraison', 'Mobile Money'],
    media: [
      { type: 'image', uri: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg' },
    ],
    userReviews: [
      {
        id: 1,
        userName: 'Grace N.',
        rating: 5,
        comment: 'Légumes bio de qualité exceptionnelle!',
        date: '2024-01-12',
      },
    ],
  },
  {
    id: 3,
    name: 'Poisson Frais',
    price: '3500 FC',
    image: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg',
    vendor: 'Marché Fleuve',
    rating: 4.9,
    description: 'Poisson frais du fleuve Congo, pêché quotidiennement par nos pêcheurs locaux.',
    category: 'Alimentation',
    location: 'Marché Fleuve, Kinshasa',
    deliveryTime: '20-30 min',
    inStock: true,
    reviews: 203,
    colors: ['Naturel'],
    sizes: ['500g', '1kg', '1.5kg'],
    deliveryPricePerKm: 300,
    paymentMethods: ['Paiement à la livraison', 'Mobile Money', 'Carte bancaire'],
    media: [
      { type: 'image', uri: 'https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg' },
    ],
    userReviews: [
      {
        id: 1,
        userName: 'Paul M.',
        rating: 5,
        comment: 'Poisson très frais, excellent goût!',
        date: '2024-01-14',
      },
    ],
  },
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
    description: 'Mangues premium de la région du Kasaï, reconnues pour leur goût exceptionnel.',
    location: 'Kasaï, Congo',
    deliveryTime: '60-90 min',
    inStock: true,
    reviews: 156,
    colors: ['Jaune', 'Rouge-Jaune'],
    sizes: ['1kg', '2kg', '5kg'],
    deliveryPricePerKm: 250,
    paymentMethods: ['Paiement à la livraison', 'Mobile Money'],
    media: [
      { type: 'image', uri: 'https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1414651/pexels-photo-1414651.jpeg' },
    ],
    userReviews: [
      {
        id: 1,
        userName: 'Sarah K.',
        rating: 5,
        comment: 'Les meilleures mangues de Kinshasa!',
        date: '2024-01-13',
      },
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
    description: 'Chemise élégante en tissu wax authentique, confectionnée par nos artisans locaux.',
    location: 'Atelier Mode, Kinshasa',
    deliveryTime: '24-48h',
    inStock: true,
    reviews: 73,
    colors: ['Bleu', 'Rouge', 'Vert', 'Jaune'],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    deliveryPricePerKm: 100,
    paymentMethods: ['Paiement à la livraison', 'Mobile Money', 'Carte bancaire'],
    media: [
      { type: 'image', uri: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg' },
    ],
    userReviews: [
      {
        id: 1,
        userName: 'Michel T.',
        rating: 4,
        comment: 'Belle chemise, tissu de qualité.',
        date: '2024-01-11',
      },
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
    description: 'Smartphone Android dernière génération avec écran HD.',
    location: 'Tech Store, Kinshasa',
    deliveryTime: '2-4h',
    inStock: true,
    reviews: 45,
    colors: ['Noir', 'Blanc', 'Bleu'],
    sizes: ['64GB', '128GB', '256GB'],
    deliveryPricePerKm: 500,
    paymentMethods: ['Paiement à la livraison', 'Mobile Money', 'Carte bancaire', 'Virement bancaire'],
    media: [
      { type: 'video', uri: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' },
      { type: 'image', uri: 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg' },
    ],
    userReviews: [
      {
        id: 1,
        userName: 'David L.',
        rating: 4,
        comment: 'Bon rapport qualité-prix.',
        date: '2024-01-09',
      },
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
    description: 'Haricots verts biologiques cultivés sans produits chimiques.',
    location: 'Ferme Bio, Kinshasa',
    deliveryTime: '45-60 min',
    inStock: true,
    reviews: 234,
    colors: ['Vert'],
    sizes: ['500g', '1kg', '2kg'],
    deliveryPricePerKm: 150,
    paymentMethods: ['Paiement à la livraison', 'Mobile Money'],
    media: [
      { type: 'image', uri: 'https://images.pexels.com/photos/143133/pexels-photo-143133.jpeg' },
      { type: 'image', uri: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg' },
    ],
    userReviews: [
      {
        id: 1,
        userName: 'Anne M.',
        rating: 5,
        comment: 'Haricots très frais et croquants!',
        date: '2024-01-16',
      },
    ],
  },
];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const { addItem, getItemQuantity } = useCart();
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  
  const product = allProducts.find(p => p.id === parseInt(id as string));
  const cartQuantity = product ? getItemQuantity(product.id) : 0;

  // Video player for the first video (if any)
  const firstVideoMedia = product?.media.find(media => media.type === 'video');
  const player = useVideoPlayer(firstVideoMedia?.uri || '', player => {
    player.loop = true;
    player.muted = true;
  });

  // Calculate delivery cost (simulated 5km distance)
  const deliveryDistance = 5;
  const deliveryCost = product ? product.deliveryPricePerKm * deliveryDistance : 0;

  // Get similar products (same category, different vendor or same vendor, different product)
  const similarProducts = allProducts.filter(p => 
    p.id !== product?.id && 
    (p.category === product?.category || p.vendor === product?.vendor)
  ).slice(0, 4);

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

  // Set default selections
  React.useEffect(() => {
    if (product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
    if (product.sizes.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        vendor: product.vendor,
        category: product.category,
      });
    }
  };

  const renderMediaItem = (media: any, index: number) => {
    if (media.type === 'video') {
      return (
        <View key={index} style={styles.mediaContainer}>
          <VideoView
            style={styles.productImage}
            player={player}
            allowsFullscreen
            allowsPictureInPicture
          />
          <TouchableOpacity 
            style={styles.videoPlayButton} 
            onPress={() => {
              if (player.playing) {
                player.pause();
              } else {
                player.play();
              }
            }}
          >
            {player.playing ? (
              <Pause size={32} color="#FFF" />
            ) : (
              <Play size={32} color="#FFF" />
            )}
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <Image 
          key={index} 
          source={{ uri: media.uri }} 
          style={styles.productImage} 
        />
      );
    }
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

        {/* Product Media */}
        <ScrollView 
          horizontal 
          pagingEnabled 
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(event) => {
            const index = Math.round(event.nativeEvent.contentOffset.x / width);
            setCurrentMediaIndex(index);
          }}
        >
          {product.media.map((media, index) => renderMediaItem(media, index))}
        </ScrollView>

        {/* Media Indicators */}
        <View style={styles.mediaIndicators}>
          {product.media.map((_, index) => (
            <View
              key={index}
              style={[
                styles.indicator,
                currentMediaIndex === index && styles.activeIndicator
              ]}
            />
          ))}
        </View>

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

          {/* Color Selection */}
          {product.colors.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Couleur</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.optionsContainer}>
                  {product.colors.map((color) => (
                    <TouchableOpacity
                      key={color}
                      style={[
                        styles.optionButton,
                        selectedColor === color && styles.optionButtonActive
                      ]}
                      onPress={() => setSelectedColor(color)}
                    >
                      <Text style={[
                        styles.optionText,
                        selectedColor === color && styles.optionTextActive
                      ]}>
                        {color}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Size Selection */}
          {product.sizes.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Taille</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.optionsContainer}>
                  {product.sizes.map((size) => (
                    <TouchableOpacity
                      key={size}
                      style={[
                        styles.optionButton,
                        selectedSize === size && styles.optionButtonActive
                      ]}
                      onPress={() => setSelectedSize(size)}
                    >
                      <Text style={[
                        styles.optionText,
                        selectedSize === size && styles.optionTextActive
                      ]}>
                        {size}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

          {/* Quantity Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quantité</Text>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(Math.max(1, quantity - 1))}
              >
                <Minus size={20} color="#666" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => setQuantity(quantity + 1)}
              >
                <Plus size={20} color="#666" />
              </TouchableOpacity>
            </View>
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
                <Text style={styles.deliveryText}>Adresse: Gombe, Avenue Kasa-Vubu</Text>
              </View>
              <View style={styles.deliveryItem}>
                <Truck size={16} color="#00B4A6" />
                <Text style={styles.deliveryText}>Livraison en {product.deliveryTime}</Text>
              </View>
              <View style={styles.deliveryItem}>
                <Shield size={16} color="#00B4A6" />
                <Text style={styles.deliveryText}>Distance: {deliveryDistance}km • Coût: {deliveryCost.toLocaleString()} FC</Text>
              </View>
            </View>
          </View>

          {/* Payment Methods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Modes de paiement acceptés</Text>
            <View style={styles.paymentMethods}>
              {product.paymentMethods.map((method, index) => (
                <View key={index} style={styles.paymentMethod}>
                  <Text style={styles.paymentMethodText}>• {method}</Text>
                </View>
              ))}
            </View>
          </View>

          {/* User Reviews */}
          <View style={styles.section}>
            <View style={styles.reviewsHeader}>
              <Text style={styles.sectionTitle}>Avis des utilisateurs</Text>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>Voir tous</Text>
              </TouchableOpacity>
            </View>
            {product.userReviews.map((review) => (
              <View key={review.id} style={styles.reviewItem}>
                <View style={styles.reviewHeader}>
                  <Text style={styles.reviewUserName}>{review.userName}</Text>
                  <View style={styles.reviewRating}>
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={12}
                        color={i < review.rating ? "#FFD23F" : "#E5E5EA"}
                        fill={i < review.rating ? "#FFD23F" : "#E5E5EA"}
                      />
                    ))}
                  </View>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            ))}
          </View>

          {/* Similar Products */}
          {similarProducts.length > 0 && (
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Produits similaires</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.similarProductsContainer}>
                  {similarProducts.map((similarProduct) => (
                    <Link key={similarProduct.id} href={`/product/${similarProduct.id}`} asChild>
                      <TouchableOpacity style={styles.similarProductCard}>
                        <Image source={{ uri: similarProduct.image }} style={styles.similarProductImage} />
                        <Text style={styles.similarProductName} numberOfLines={2}>
                          {similarProduct.name}
                        </Text>
                        <Text style={styles.similarProductPrice}>{similarProduct.price}</Text>
                        <View style={styles.similarProductRating}>
                          <Star size={10} color="#FFD23F" fill="#FFD23F" />
                          <Text style={styles.similarProductRatingText}>{similarProduct.rating}</Text>
                        </View>
                      </TouchableOpacity>
                    </Link>
                  ))}
                </View>
              </ScrollView>
            </View>
          )}

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
            {cartQuantity > 0 
              ? `Ajouter ${quantity} au panier (${cartQuantity} déjà ajouté${cartQuantity > 1 ? 's' : ''})` 
              : product.inStock 
                ? `Ajouter ${quantity} au panier` 
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
  mediaContainer: {
    position: 'relative',
  },
  productImage: {
    width: width,
    height: 300,
  },
  videoPlayButton: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mediaIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E5EA',
  },
  activeIndicator: {
    backgroundColor: '#FF6B35',
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
  optionsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  optionButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  optionButtonActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  optionText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  optionTextActive: {
    color: '#FFF',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 4,
    alignSelf: 'flex-start',
  },
  quantityButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 8,
  },
  quantityText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: 'center',
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
    flex: 1,
  },
  paymentMethods: {
    gap: 8,
  },
  paymentMethod: {
    paddingVertical: 4,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  reviewItem: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  reviewUserName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  reviewRating: {
    flexDirection: 'row',
    gap: 2,
  },
  reviewDate: {
    fontSize: 12,
    color: '#666',
    marginLeft: 'auto',
  },
  reviewComment: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  similarProductsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  similarProductCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 12,
    width: 140,
  },
  similarProductImage: {
    width: '100%',
    height: 80,
    borderRadius: 8,
    marginBottom: 8,
  },
  similarProductName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  similarProductPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  similarProductRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  similarProductRatingText: {
    fontSize: 10,
    color: '#666',
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