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
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { ShoppingBag, Truck, Store, ArrowRight, Star, Users, MapPin } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const { session, loading } = useAuth();
  const router = useRouter();
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  useEffect(() => {
    // Redirect if already authenticated
    if (!loading && session) {
      router.replace('/(tabs)');
      return;
    }

    // Start animations
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
  }, [session, loading]);

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
              <Users size={20} color="#FF6B35" />
              <Text style={styles.statNumber}>10K+</Text>
              <Text style={styles.statLabel}>Utilisateurs</Text>
            </View>
            <View style={styles.statItem}>
              <Store size={20} color="#00B4A6" />
              <Text style={styles.statNumber}>500+</Text>
              <Text style={styles.statLabel}>Vendeurs</Text>
            </View>
            <View style={styles.statItem}>
              <Star size={20} color="#FFD23F" />
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
                <ShoppingBag size={24} color="#FFF" />
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
                <Store size={24} color="#FFF" />
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
                <Truck size={24} color="#FFF" />
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
          <MapPin size={16} color="#00B4A6" />
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

      {/* Action Buttons */}
      <Animated.View 
        style={[
          styles.actionContainer,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <Link href="/(auth)/register" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Créer un compte</Text>
            <ArrowRight size={20} color="#FFF" />
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>J'ai déjà un compte</Text>
          </TouchableOpacity>
        </Link>

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
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 40,
  },
  heroSection: {
    alignItems: 'center',
    marginBottom: 40,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logoImage: {
    width: 100,
    height: 100,
    borderRadius: 25,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  brandName: {
    fontSize: 36,
    fontWeight: '800',
    color: '#FF6B35',
    marginBottom: 8,
    letterSpacing: -1,
  },
  brandTagline: {
    fontSize: 18,
    color: '#00B4A6',
    fontWeight: '600',
    textAlign: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 16,
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
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  featuresContainer: {
    marginBottom: 32,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 24,
  },
  featuresList: {
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  locationBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E8F5F3',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignSelf: 'center',
    marginBottom: 24,
  },
  locationText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#00B4A6',
    marginLeft: 6,
  },
  ctaContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ctaTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  actionContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 16,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
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
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  termsText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 8,
  },
  termsLink: {
    color: '#FF6B35',
    fontWeight: '600',
  },
});