import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { User, Settings, ShoppingBag, Heart, CreditCard, CircleHelp as HelpCircle, Bell, MapPin, Star, ChevronRight, Shield, LogOut } from 'lucide-react-native';

const menuItems = [
  {
    id: 1,
    title: 'Mes commandes',
    subtitle: 'Voir l\'historique des achats',
    icon: ShoppingBag,
    color: '#FF6B35',
    badge: '3',
  },
  {
    id: 2,
    title: 'Mes favoris',
    subtitle: 'Produits sauvegardés',
    icon: Heart,
    color: '#FF4444',
    badge: '12',
  },
  {
    id: 3,
    title: 'Mes ventes',
    subtitle: 'Gérer mes annonces',
    icon: ShoppingBag,
    color: '#00B4A6',
    badge: '7',
  },
  {
    id: 4,
    title: 'Paiement & Facturation',
    subtitle: 'Moyens de paiement',
    icon: CreditCard,
    color: '#8B5CF6',
  },
  {
    id: 5,
    title: 'Adresses',
    subtitle: 'Gérer les adresses de livraison',
    icon: MapPin,
    color: '#FFD23F',
  },
  {
    id: 6,
    title: 'Notifications',
    subtitle: 'Préférences de notification',
    icon: Bell,
    color: '#FF9800',
  },
  {
    id: 7,
    title: 'Confidentialité & Sécurité',
    subtitle: 'Paramètres de sécurité',
    icon: Shield,
    color: '#4CAF50',
  },
  {
    id: 8,
    title: 'Aide & Support',
    subtitle: 'Centre d\'aide et contact',
    icon: HelpCircle,
    color: '#666',
  },
  {
    id: 9,
    title: 'Paramètres',
    subtitle: 'Configuration de l\'app',
    icon: Settings,
    color: '#666',
  },
];

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Profile */}
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg' }}
              style={styles.profileImage}
            />
            <TouchableOpacity style={styles.editImageButton}>
              <Settings size={16} color="#FFF" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.profileInfo}>
            <Text style={styles.userName}>Marie Kabamba</Text>
            <Text style={styles.userEmail}>marie.kabamba@gmail.com</Text>
            <Text style={styles.userLocation}>Kinshasa, Gombe</Text>
          </View>

          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Modifier le profil</Text>
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>24</Text>
            <Text style={styles.statLabel}>Commandes</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <View style={styles.ratingContainer}>
              <Star size={16} color="#FFD23F" fill="#FFD23F" />
              <Text style={styles.statNumber}>4.8</Text>
            </View>
            <Text style={styles.statLabel}>Évaluation</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>7</Text>
            <Text style={styles.statLabel}>Ventes</Text>
          </View>
        </View>

        {/* Menu Items */}
        <View style={styles.menuSection}>
          {menuItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.menuItem}>
              <View style={styles.menuItemLeft}>
                <View style={[styles.menuIcon, { backgroundColor: `${item.color}15` }]}>
                  <item.icon size={20} color={item.color} />
                </View>
                <View style={styles.menuTextContainer}>
                  <View style={styles.menuTitleContainer}>
                    <Text style={styles.menuTitle}>{item.title}</Text>
                    {item.badge && (
                      <View style={styles.badge}>
                        <Text style={styles.badgeText}>{item.badge}</Text>
                      </View>
                    )}
                  </View>
                  <Text style={styles.menuSubtitle}>{item.subtitle}</Text>
                </View>
              </View>
              <ChevronRight size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfoSection}>
          <View style={styles.brandContainer}>
            <Text style={styles.brandName}>Sookari</Text>
            <Text style={styles.brandTagline}>Le Marché Connecté de Kinshasa</Text>
          </View>
          
          <Text style={styles.versionText}>Version 1.0.0</Text>
          
          <TouchableOpacity style={styles.logoutButton}>
            <LogOut size={20} color="#FF4444" />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
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
  profileHeader: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
    alignItems: 'center',
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  editImageButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  userName: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  userLocation: {
    fontSize: 12,
    color: '#00B4A6',
    fontWeight: '500',
  },
  editProfileButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    paddingHorizontal: 24,
    paddingVertical: 10,
  },
  editProfileText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  statsSection: {
    backgroundColor: '#FFF',
    flexDirection: 'row',
    paddingVertical: 20,
    marginTop: 12,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  statDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 8,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  menuSection: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingVertical: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuTextContainer: {
    flex: 1,
  },
  menuTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  badge: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 18,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#FFF',
  },
  menuSubtitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  appInfoSection: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  brandContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  brandName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FF6B35',
    marginBottom: 4,
  },
  brandTagline: {
    fontSize: 12,
    color: '#00B4A6',
    fontWeight: '500',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF4444',
  },
  bottomSpacing: {
    height: 20,
  },
});