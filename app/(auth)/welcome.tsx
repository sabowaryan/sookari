import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Link } from 'expo-router';
import { ShoppingBag, Truck, Store } from 'lucide-react-native';

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Logo and Brand */}
        <View style={styles.brandContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg' }}
            style={styles.logoImage}
          />
          <Text style={styles.brandName}>Sookari</Text>
          <Text style={styles.brandTagline}>Le Marché Connecté de Kinshasa</Text>
        </View>

        {/* Features */}
        <View style={styles.featuresContainer}>
          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#FF6B35' }]}>
              <ShoppingBag size={24} color="#FFF" />
            </View>
            <Text style={styles.featureTitle}>Acheter</Text>
            <Text style={styles.featureDescription}>
              Découvrez des produits locaux de qualité
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#00B4A6' }]}>
              <Store size={24} color="#FFF" />
            </View>
            <Text style={styles.featureTitle}>Vendre</Text>
            <Text style={styles.featureDescription}>
              Vendez vos produits à toute la ville
            </Text>
          </View>

          <View style={styles.featureItem}>
            <View style={[styles.featureIcon, { backgroundColor: '#FFD23F' }]}>
              <Truck size={24} color="#FFF" />
            </View>
            <Text style={styles.featureTitle}>Livrer</Text>
            <Text style={styles.featureDescription}>
              Gagnez de l'argent en livrant
            </Text>
          </View>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaContainer}>
          <Text style={styles.ctaTitle}>Rejoignez la communauté Sookari</Text>
          <Text style={styles.ctaSubtitle}>
            Connectez-vous avec les commerçants et clients de Kinshasa
          </Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View style={styles.actionContainer}>
        <Link href="/(auth)/register" asChild>
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Créer un compte</Text>
          </TouchableOpacity>
        </Link>

        <Link href="/(auth)/login" asChild>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Se connecter</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
    marginBottom: 16,
  },
  brandName: {
    fontSize: 32,
    fontWeight: '800',
    color: '#FF6B35',
    marginBottom: 8,
  },
  brandTagline: {
    fontSize: 16,
    color: '#00B4A6',
    fontWeight: '600',
    textAlign: 'center',
  },
  featuresContainer: {
    marginBottom: 48,
  },
  featureItem: {
    alignItems: 'center',
    marginBottom: 32,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  ctaTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 8,
  },
  ctaSubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
  },
  actionContainer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
  },
});