import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import { Truck, Clock, MapPin, DollarSign, CircleCheck as CheckCircle, Navigation, Phone } from 'lucide-react-native';

const deliveryRequests = [
  {
    id: 1,
    orderNumber: '#SK001234',
    customer: 'Marie Kabamba',
    pickup: 'Marché Central, Kinshasa',
    destination: 'Gombe, Avenue Kasa-Vubu',
    distance: '3.2 km',
    payment: '2500 FC',
    time: '15 min',
    priority: 'urgent',
    items: 'Fruits et légumes (2kg)',
  },
  {
    id: 2,
    orderNumber: '#SK001235',
    customer: 'Jean Mukendi',
    pickup: 'Boutique Mode, Limete',
    destination: 'Kinshasa, Bandalungwa',
    distance: '5.7 km',
    payment: '3500 FC',
    time: '25 min',
    priority: 'normal',
    items: 'Vêtements (1 sac)',
  },
  {
    id: 3,
    orderNumber: '#SK001236',
    customer: 'Grace Nsimba',
    pickup: 'Tech Store, Ma Campagne',
    destination: 'Kalamu, Victoire',
    distance: '4.1 km',
    payment: '4000 FC',
    time: '20 min',
    priority: 'normal',
    items: 'Smartphone + accessoires',
  },
];

const activeDeliveries = [
  {
    id: 1,
    orderNumber: '#SK001230',
    customer: 'Paul Mbuyi',
    destination: 'Lemba, Université',
    status: 'pickup',
    payment: '3000 FC',
    estimatedTime: '10 min',
  },
  {
    id: 2,
    orderNumber: '#SK001231',
    customer: 'Sarah Kimba',
    destination: 'Ngaliema, Bel Air',
    status: 'delivery',
    payment: '4500 FC',
    estimatedTime: '5 min',
  },
];

export default function DeliveriesContent() {
  const [activeTab, setActiveTab] = useState<'available' | 'active' | 'stats'>('available');

  const getStatusColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return '#FF4444';
      case 'normal': return '#00B4A6';
      default: return '#666';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pickup': return 'Récupération';
      case 'delivery': return 'En livraison';
      default: return status;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>Livraisons</Text>
          <Text style={styles.subtitle}>Gagnez en livrant à Kinshasa</Text>
        </View>
        <View style={styles.statusIndicator}>
          <View style={styles.onlineStatus} />
          <Text style={styles.statusText}>En ligne</Text>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'available' && styles.tabActive]}
          onPress={() => setActiveTab('available')}
        >
          <Text style={[styles.tabText, activeTab === 'available' && styles.tabTextActive]}>
            Disponibles
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.tabActive]}
          onPress={() => setActiveTab('active')}
        >
          <Text style={[styles.tabText, activeTab === 'active' && styles.tabTextActive]}>
            En cours ({activeDeliveries.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'stats' && styles.tabActive]}
          onPress={() => setActiveTab('stats')}
        >
          <Text style={[styles.tabText, activeTab === 'stats' && styles.tabTextActive]}>
            Statistiques
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Available Deliveries */}
        {activeTab === 'available' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Nouvelles demandes</Text>
            {deliveryRequests.map((request) => (
              <View key={request.id} style={styles.deliveryCard}>
                <View style={styles.cardHeader}>
                  <View style={styles.orderInfo}>
                    <Text style={styles.orderNumber}>{request.orderNumber}</Text>
                    <View style={[styles.priorityBadge, { backgroundColor: getStatusColor(request.priority) }]}>
                      <Text style={styles.priorityText}>
                        {request.priority === 'urgent' ? 'URGENT' : 'NORMAL'}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.customerName}>{request.customer}</Text>
                </View>

                <View style={styles.routeInfo}>
                  <View style={styles.routeItem}>
                    <View style={styles.routeIcon}>
                      <View style={styles.pickupDot} />
                    </View>
                    <Text style={styles.routeText}>{request.pickup}</Text>
                  </View>
                  <View style={styles.routeLine} />
                  <View style={styles.routeItem}>
                    <View style={styles.routeIcon}>
                      <MapPin size={12} color="#FF6B35" />
                    </View>
                    <Text style={styles.routeText}>{request.destination}</Text>
                  </View>
                </View>

                <View style={styles.deliveryDetails}>
                  <View style={styles.detailItem}>
                    <Navigation size={16} color="#666" />
                    <Text style={styles.detailText}>{request.distance}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <Clock size={16} color="#666" />
                    <Text style={styles.detailText}>{request.time}</Text>
                  </View>
                  <View style={styles.detailItem}>
                    <DollarSign size={16} color="#00B4A6" />
                    <Text style={[styles.detailText, styles.paymentText]}>{request.payment}</Text>
                  </View>
                </View>

                <Text style={styles.itemsText}>Articles: {request.items}</Text>

                <TouchableOpacity style={styles.acceptButton}>
                  <CheckCircle size={20} color="#FFF" />
                  <Text style={styles.acceptButtonText}>Accepter la livraison</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}

        {/* Active Deliveries */}
        {activeTab === 'active' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Livraisons en cours</Text>
            {activeDeliveries.map((delivery) => (
              <View key={delivery.id} style={styles.activeDeliveryCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.orderNumber}>{delivery.orderNumber}</Text>
                  <Text style={styles.customerName}>{delivery.customer}</Text>
                </View>

                <View style={styles.statusContainer}>
                  <View style={[styles.statusBadge, { backgroundColor: '#00B4A6' }]}>
                    <Text style={styles.statusBadgeText}>{getStatusText(delivery.status)}</Text>
                  </View>
                  <Text style={styles.estimatedTime}>ETA: {delivery.estimatedTime}</Text>
                </View>

                <View style={styles.destinationContainer}>
                  <MapPin size={16} color="#FF6B35" />
                  <Text style={styles.destinationText}>{delivery.destination}</Text>
                </View>

                <View style={styles.activeDeliveryActions}>
                  <TouchableOpacity style={styles.actionButton}>
                    <Navigation size={16} color="#FFF" />
                    <Text style={styles.actionButtonText}>Navigation</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.actionButton, styles.callButton]}>
                    <Phone size={16} color="#FFF" />
                    <Text style={styles.actionButtonText}>Appeler</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Statistics */}
        {activeTab === 'stats' && (
          <View style={styles.content}>
            <Text style={styles.sectionTitle}>Mes statistiques</Text>
            
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>47</Text>
                <Text style={styles.statLabel}>Livraisons ce mois</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>94,500 FC</Text>
                <Text style={styles.statLabel}>Revenus ce mois</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>4.9</Text>
                <Text style={styles.statLabel}>Note moyenne</Text>
              </View>
              <View style={styles.statCard}>
                <Text style={styles.statNumber}>12 min</Text>
                <Text style={styles.statLabel}>Temps moyen</Text>
              </View>
            </View>

            <View style={styles.achievementSection}>
              <Text style={styles.achievementTitle}>Réalisations</Text>
              <View style={styles.achievementCard}>
                <View style={styles.achievementIcon}>
                  <Truck size={24} color="#FFD23F" />
                </View>
                <View style={styles.achievementInfo}>
                  <Text style={styles.achievementName}>Livreur Expert</Text>
                  <Text style={styles.achievementDesc}>Plus de 50 livraisons réussies</Text>
                </View>
              </View>
            </View>
          </View>
        )}
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
    paddingBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  statusIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  onlineStatus: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFF',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  tab: {
    flex: 1,
    paddingVertical: 16,
    alignItems: 'center',
  },
  tabActive: {
    borderBottomWidth: 2,
    borderBottomColor: '#FF6B35',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#FF6B35',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 16,
  },
  deliveryCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orderNumber: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FFF',
  },
  customerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  routeInfo: {
    marginBottom: 16,
  },
  routeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  routeIcon: {
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickupDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00B4A6',
  },
  routeLine: {
    width: 2,
    height: 16,
    backgroundColor: '#E5E5EA',
    marginLeft: 7,
    marginVertical: 4,
  },
  routeText: {
    fontSize: 14,
    color: '#1A1A1A',
    flex: 1,
  },
  deliveryDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  detailText: {
    fontSize: 12,
    color: '#666',
  },
  paymentText: {
    color: '#00B4A6',
    fontWeight: '600',
  },
  itemsText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 16,
  },
  acceptButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  acceptButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  activeDeliveryCard: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#00B4A6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  estimatedTime: {
    fontSize: 12,
    color: '#666',
  },
  destinationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  destinationText: {
    fontSize: 14,
    color: '#1A1A1A',
    flex: 1,
  },
  activeDeliveryActions: {
    flexDirection: 'row',
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 6,
  },
  callButton: {
    backgroundColor: '#00B4A6',
  },
  actionButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFF',
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  achievementSection: {
    marginTop: 8,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  achievementCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  achievementIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF8E1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 2,
  },
  achievementDesc: {
    fontSize: 12,
    color: '#666',
  },
});