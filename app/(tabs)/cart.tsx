import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
  Alert,
} from 'react-native';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, MapPin, CreditCard } from 'lucide-react-native';
import { useCart } from '@/context/CartContext';

export default function CartScreen() {
  const { state, removeItem, updateQuantity, clearCart } = useCart();

  const handleCheckout = () => {
    if (state.items.length === 0) {
      Alert.alert('Panier vide', 'Ajoutez des produits à votre panier pour continuer.');
      return;
    }
    
    Alert.alert(
      'Commande confirmée!',
      `Votre commande de ${state.totalPrice.toLocaleString()} FC a été passée avec succès. Vous recevrez une confirmation par email.`,
      [
        {
          text: 'OK',
          onPress: () => clearCart(),
        },
      ]
    );
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    if (newQuantity < 1) {
      Alert.alert(
        'Supprimer l\'article',
        'Voulez-vous supprimer cet article de votre panier?',
        [
          { text: 'Annuler', style: 'cancel' },
          { text: 'Supprimer', onPress: () => removeItem(id), style: 'destructive' },
        ]
      );
    } else {
      updateQuantity(id, newQuantity);
    }
  };

  if (state.items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mon Panier</Text>
          <Text style={styles.subtitle}>0 article</Text>
        </View>
        
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconContainer}>
            <ShoppingBag size={64} color="#E5E5EA" />
          </View>
          <Text style={styles.emptyTitle}>Votre panier est vide</Text>
          <Text style={styles.emptySubtitle}>
            Découvrez nos produits et ajoutez-les à votre panier pour commencer vos achats.
          </Text>
          <TouchableOpacity style={styles.shopButton}>
            <Text style={styles.shopButtonText}>Commencer mes achats</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mon Panier</Text>
        <Text style={styles.subtitle}>
          {state.totalItems} article{state.totalItems > 1 ? 's' : ''}
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Cart Items */}
        <View style={styles.itemsSection}>
          {state.items.map((item) => (
            <View key={item.id} style={styles.cartItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              
              <View style={styles.itemDetails}>
                <Text style={styles.itemName} numberOfLines={2}>
                  {item.name}
                </Text>
                <Text style={styles.itemVendor}>{item.vendor}</Text>
                
                <View style={styles.itemPricing}>
                  <Text style={styles.itemPrice}>{item.price}</Text>
                  {item.originalPrice && (
                    <Text style={styles.itemOriginalPrice}>{item.originalPrice}</Text>
                  )}
                </View>
              </View>

              <View style={styles.itemActions}>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeItem(item.id)}
                >
                  <Trash2 size={16} color="#FF4444" />
                </TouchableOpacity>
                
                <View style={styles.quantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, item.quantity - 1)}
                  >
                    <Minus size={16} color="#666" />
                  </TouchableOpacity>
                  
                  <Text style={styles.quantityText}>{item.quantity}</Text>
                  
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    <Plus size={16} color="#666" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Delivery Info */}
        <View style={styles.deliverySection}>
          <View style={styles.deliveryHeader}>
            <MapPin size={20} color="#00B4A6" />
            <Text style={styles.deliveryTitle}>Livraison</Text>
          </View>
          <Text style={styles.deliveryAddress}>Gombe, Avenue Kasa-Vubu</Text>
          <Text style={styles.deliveryTime}>Livraison estimée: 30-45 min</Text>
          <Text style={styles.deliveryFee}>Frais de livraison: 1,500 FC</Text>
        </View>

        {/* Order Summary */}
        <View style={styles.summarySection}>
          <Text style={styles.summaryTitle}>Résumé de la commande</Text>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sous-total ({state.totalItems} articles)</Text>
            <Text style={styles.summaryValue}>{state.totalPrice.toLocaleString()} FC</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Frais de livraison</Text>
            <Text style={styles.summaryValue}>1,500 FC</Text>
          </View>
          
          <View style={styles.summaryDivider} />
          
          <View style={styles.summaryRow}>
            <Text style={styles.summaryTotalLabel}>Total</Text>
            <Text style={styles.summaryTotalValue}>
              {(state.totalPrice + 1500).toLocaleString()} FC
            </Text>
          </View>
        </View>

        {/* Payment Method */}
        <View style={styles.paymentSection}>
          <View style={styles.paymentHeader}>
            <CreditCard size={20} color="#8B5CF6" />
            <Text style={styles.paymentTitle}>Mode de paiement</Text>
          </View>
          <TouchableOpacity style={styles.paymentMethod}>
            <Text style={styles.paymentMethodText}>Paiement à la livraison</Text>
            <ArrowRight size={16} color="#666" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Checkout Button */}
      <View style={styles.checkoutContainer}>
        <TouchableOpacity style={styles.checkoutButton} onPress={handleCheckout}>
          <Text style={styles.checkoutButtonText}>
            Passer la commande • {(state.totalPrice + 1500).toLocaleString()} FC
          </Text>
        </TouchableOpacity>
      </View>
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
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  content: {
    flex: 1,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyIconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 32,
  },
  shopButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  shopButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  itemsSection: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingVertical: 8,
  },
  cartItem: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginRight: 12,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  itemVendor: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  itemPricing: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  itemOriginalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  itemActions: {
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  removeButton: {
    padding: 8,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 4,
  },
  quantityButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 6,
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginHorizontal: 12,
    minWidth: 20,
    textAlign: 'center',
  },
  deliverySection: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  deliveryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  deliveryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#1A1A1A',
    marginBottom: 4,
  },
  deliveryTime: {
    fontSize: 12,
    color: '#00B4A6',
    marginBottom: 4,
  },
  deliveryFee: {
    fontSize: 12,
    color: '#666',
  },
  summarySection: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1A1A1A',
  },
  summaryDivider: {
    height: 1,
    backgroundColor: '#E5E5EA',
    marginVertical: 12,
  },
  summaryTotalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  summaryTotalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  paymentSection: {
    backgroundColor: '#FFF',
    marginTop: 12,
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginBottom: 20,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  paymentMethod: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  paymentMethodText: {
    fontSize: 14,
    color: '#1A1A1A',
  },
  checkoutContainer: {
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
  },
  checkoutButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  checkoutButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
});