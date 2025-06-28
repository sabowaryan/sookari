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
  const { confirmation_url } = useLocalSearchParams();
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleConfirmEmail = async () => {
    if (!confirmation_url || typeof confirmation_url !== 'string') {
      setError('Lien de confirmation invalide');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Extract token and type from the confirmation URL
      const url = new URL(confirmation_url);
      const token = url.searchParams.get('token');
      const type = url.searchParams.get('type');

      if (!token || !type) {
        throw new Error('Token ou type manquant dans l\'URL de confirmation');
      }

      // Verify the email using Supabase
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: type as any,
      });

      if (error) {
        throw error;
      }

      setConfirmed(true);
      
      // Redirect to login after a short delay
      setTimeout(() => {
        router.replace('/(auth)/login');
      }, 2000);

    } catch (error: any) {
      console.error('Email confirmation error:', error);
      setError(error.message || 'Une erreur est survenue lors de la confirmation');
    } finally {
      setLoading(false);
    }
  };

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
            Votre adresse email a été confirmée avec succès. Vous allez être redirigé vers la page de connexion.
          </Text>

          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#FF6B35" />
            <Text style={styles.loadingText}>Redirection en cours...</Text>
          </View>
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
            onPress={() => router.replace('/(auth)/login')}
          >
            <Text style={styles.backButtonText}>Retour à la connexion</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <View style={styles.iconBackground}>
            <Mail size={48} color="#FF6B35" />
          </View>
        </View>

        <Text style={styles.title}>Confirmer votre email</Text>
        <Text style={styles.subtitle}>
          Cliquez sur le bouton ci-dessous pour confirmer votre adresse email et activer votre compte Sookari.
        </Text>

        <TouchableOpacity 
          style={[styles.confirmButton, loading && styles.confirmButtonDisabled]}
          onPress={handleConfirmEmail}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <>
              <CheckCircle size={20} color="#FFF" />
              <Text style={styles.confirmButtonText}>Confirmer mon email</Text>
            </>
          )}
        </TouchableOpacity>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            En confirmant votre email, vous pourrez accéder à toutes les fonctionnalités de Sookari et commencer à acheter, vendre ou livrer sur notre plateforme.
          </Text>
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 24,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  confirmButtonDisabled: {
    opacity: 0.6,
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B35',
  },
  infoText: {
    fontSize: 12,
    color: '#666',
    lineHeight: 18,
    textAlign: 'center',
  },
});