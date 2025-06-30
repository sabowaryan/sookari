import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Animated,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ShoppingBag, Truck, Store, ArrowRight, Star, Users, MapPin } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';
import { SignIn, SignUp } from '@stackframe/react';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Redirige si déjà authentifié
    if (!loading && user) {
      router.replace('/(tabs)');
      return;
    }

    // Démarre les animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, [user, loading]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <View style={styles.loadingContent}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg' }}
            style={styles.loadingLogo}
          />
          <Text style={styles.loadingText}>Sookari</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }],
            },
          ]}
        >
          {/* Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.brandContainer}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg' }}
                style={styles.logoImage}
              />
              <Text style={styles.brandName}>Sookari</Text>
              <Text style={styles.brandTagline}>Le Marché Connecté de Kinshasa</Text>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
              <View style={styles.statItem}>
                <Users size={18} color="#FF6B35" />
                <Text style={styles.statNumber}>10K+</Text>
                <Text style={styles.statLabel}>Utilisateurs</Text>
              </View>
              <View style={styles.statItem}>
                <Store size={18} color="#00B4A6" />
                <Text style={styles.statNumber}>500+</Text>
                <Text style={styles.statLabel}>Vendeurs</Text>
              </View>
              <View style={styles.statItem}>
                <Star size={18} color="#FFD23F" />
                <Text style={styles.statNumber}>4.8</Text>
                <Text style={styles.statLabel}>Note App</Text>
              </View>
            </View>
          </View>

          {/* Features */}
          <View style={styles.featuresContainer}>
            <Text style={styles.featuresTitle}>Tout ce dont vous avez besoin</Text>
            
            <View style={styles.featuresList}>
              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#FF6B35' }]}>
                  <ShoppingBag size={20} color="#FFF" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Acheter Local</Text>
                  <Text style={styles.featureDescription}>
                    Découvrez des produits frais et authentiques de Kinshasa
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#00B4A6' }]}>
                  <Store size={20} color="#FFF" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Vendre Facilement</Text>
                  <Text style={styles.featureDescription}>
                    Mettez vos produits en ligne et atteignez plus de clients
                  </Text>
                </View>
              </View>

              <View style={styles.featureItem}>
                <View style={[styles.featureIcon, { backgroundColor: '#FFD23F' }]}>
                  <Truck size={20} color="#FFF" />
                </View>
                <View style={styles.featureContent}>
                  <Text style={styles.featureTitle}>Livraison Rapide</Text>
                  <Text style={styles.featureDescription}>
                    Livraison dans toute la ville en moins d'une heure
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* Location Badge */}
          <View style={styles.locationBadge}>
            <MapPin size={14} color="#00B4A6" />
            <Text style={styles.locationText}>Disponible à Kinshasa</Text>
          </View>

          {/* Call to Action */}
          <View style={styles.ctaContainer}>
            <Text style={styles.ctaTitle}>Prêt à commencer?</Text>
            <Text style={styles.ctaSubtitle}>
              Rejoignez des milliers d'utilisateurs qui font confiance à Sookari
            </Text>
          </View>
        </Animated.View>
      </ScrollView>

      {/* Fixed Action Buttons */}
      <Animated.View 
        style={[
          styles.actionContainer,
          {
            opacity: fadeAnim,
          },
        ]}
      >
        <SignUp fullPage={false} />
        <View style={{ height: 16 }} />
        <SignIn fullPage={false} />
        <Text style={styles.termsText}>
          En continuant, vous acceptez nos{' '}
          <Text style={styles.termsLink}>Conditions d'utilisation</Text>
        </Text>
      </Animated.View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 200, // Space for fixed buttons
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingLogo: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  loadingText: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF6B35',
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF6B35',
    marginBottom: 6,
    letterSpacing: -1,
  },
  brandTagline: {
    fontSize: 16,
    color: '#00B4A6',
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    width: '100%',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 6,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    fontWeight: '500',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 24,
  },
  featuresTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 20,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  featureDescription: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5F3',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    alignSelf: 'center',
    marginBottom: 20,
  },
  locationText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#00B4A6',
    marginLeft: 4,
  },
  ctaContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 6,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 32,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 14,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#E5E5EA',
    borderRadius: 14,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  termsText: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 4,
  },
  termsLink: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});