import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { CheckCircle, XCircle, Mail } from 'lucide-react-native';
import { supabase } from '@/lib/supabase';

export default function EmailConfirmScreen() {
  const router = useRouter();
  const { token_hash, type } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-confirm when component mounts if we have the required parameters
  useEffect(() => {
    if (token_hash && type && !confirmed && !loading) {
      handleConfirmEmail();
    }
  }, [token_hash, type]);

  const handleConfirmEmail = async () => {
    if (!token_hash || !type || typeof token_hash !== 'string' || typeof type !== 'string') {
      setError('Lien de confirmation invalide. Paramètres manquants.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Verify the email using Supabase with the direct token_hash and type
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token_hash,
        type: type as any,
      });

      if (error) {
        throw error;
      }

      setConfirmed(true);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 3000);

    } catch (error: any) {
      console.error('Email confirmation error:', error);
      setError(error.message || 'Une erreur est survenue lors de la confirmation');
    } finally {
      setLoading(false);
    }
  };

  // Show error state if no required parameters
  if (!token_hash || !type) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconBackground, styles.errorBackground]}>
              <XCircle size={48} color="#FF4444" />
            </View>
          </View>

          <Text style={styles.title}>Lien invalide</Text>
          <Text style={styles.subtitle}>
            Ce lien de confirmation n'est pas valide ou a expiré. Veuillez demander un nouveau lien de confirmation.
          </Text>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.replace('/(auth)/register')}
          >
            <Text style={styles.backButtonText}>Retour à l'inscription</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (confirmed) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconBackground, styles.successBackground]}>
              <CheckCircle size={48} color="#4CAF50" />
            </View>
          </View>

          <Text style={styles.title}>Email confirmé!</Text>
          <Text style={styles.subtitle}>
            Votre adresse email a été confirmée avec succès. Vous allez être redirigé vers la page de connexion dans quelques secondes.
          </Text>

          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF6B35" />
            <Text style={styles.loadingText}>Redirection en cours...</Text>
          </View>

          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.confirmButtonText}>Aller à la connexion</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <View style={[styles.iconBackground, styles.errorBackground]}>
              <XCircle size={48} color="#FF4444" />
            </View>
          </View>

          <Text style={styles.title}>Erreur de confirmation</Text>
          <Text style={styles.subtitle}>{error}</Text>

          <TouchableOpacity 
            style={styles.retryButton}
            onPress={handleConfirmEmail}
          >
            <Text style={styles.retryButtonText}>Réessayer</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.replace('/(auth)/register')}
          >
            <Text style={styles.backButtonText}>Retour à l'inscription</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  // Loading state while confirming
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Mail size={48} color="#FF6B35" />
          </View>
        </View>

        <Text style={styles.title}>Confirmation en cours...</Text>
        <Text style={styles.subtitle}>
          Nous confirmons votre adresse email. Veuillez patienter quelques instants.
        </Text>

        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Confirmation de votre email...</Text>
        </View>
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
    paddingTop: 80,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 32,
  },
  iconBackground: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 6,
  },
  successBackground: {
    backgroundColor: '#E8F5E8',
  },
  errorBackground: {
    backgroundColor: '#FFEBEE',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  confirmButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    marginTop: 20,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  retryButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFF',
  },
  backButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E5EA',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  loadingContainer: {
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
});