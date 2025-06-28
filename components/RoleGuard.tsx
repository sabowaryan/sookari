import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { UserRoleType } from '@/lib/supabase';
import { Shield, CircleAlert as AlertCircle } from 'lucide-react-native';

interface RoleGuardProps {
  requiredRole: UserRoleType;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showRequestButton?: boolean;
}

export default function RoleGuard({ 
  requiredRole, 
  children, 
  fallback,
  showRequestButton = true 
}: RoleGuardProps) {
  const { hasRole, requestRole, loading } = useAuth();

  const handleRequestRole = async () => {
    try {
      const { error } = await requestRole(requiredRole);
      if (error) {
        console.error('Error requesting role:', error);
      }
    } catch (error) {
      console.error('Error requesting role:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Vérification des permissions...</Text>
      </View>
    );
  }

  if (hasRole(requiredRole)) {
    return <>{children}</>;
  }

  if (fallback) {
    return <>{fallback}</>;
  }

  const getRoleDisplayName = (role: UserRoleType) => {
    switch (role) {
      case 'seller':
        return 'vendeur';
      case 'delivery_driver':
        return 'livreur';
      case 'customer':
        return 'client';
      default:
        return role;
    }
  };

  const getRoleDescription = (role: UserRoleType) => {
    switch (role) {
      case 'seller':
        return 'Pour vendre vos produits sur Sookari, vous devez avoir le rôle de vendeur.';
      case 'delivery_driver':
        return 'Pour effectuer des livraisons, vous devez avoir le rôle de livreur.';
      case 'customer':
        return 'Accès client requis pour cette fonctionnalité.';
      default:
        return `Le rôle ${role} est requis pour accéder à cette fonctionnalité.`;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Shield size={48} color="#FF6B35" />
      </View>
      
      <Text style={styles.title}>Accès restreint</Text>
      <Text style={styles.description}>
        {getRoleDescription(requiredRole)}
      </Text>

      {showRequestRole && (
        <TouchableOpacity 
          style={styles.requestButton}
          onPress={handleRequestRole}
        >
          <Text style={styles.requestButtonText}>
            Demander le rôle de {getRoleDisplayName(requiredRole)}
          </Text>
        </TouchableOpacity>
      )}

      <View style={styles.infoContainer}>
        <AlertCircle size={16} color="#666" />
        <Text style={styles.infoText}>
          Une fois votre demande approuvée, vous pourrez accéder à cette section.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: '#F8F9FA',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  requestButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginBottom: 24,
  },
  requestButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    flex: 1,
  },
});