import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { Link, useRouter } from 'expo-router';
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react-native';
import { useAuth } from '@/context/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({});

  const { signIn } = useAuth();
  const router = useRouter();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email) {
      newErrors.email = 'L\'email est requis';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Format d\'email invalide';
    }

    if (!password) {
      newErrors.password = 'Le mot de passe est requis';
    } else if (password.length < 6) {
      newErrors.password = 'Le mot de passe doit contenir au moins 6 caractères';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async () => {
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const { error } = await signIn(email, password);

      if (error) {
        if (error.message.includes('Email not confirmed')) {
          setErrors({ 
            general: 'Votre email n\'a pas encore été confirmé. Veuillez vérifier votre boîte de réception et cliquer sur le lien de confirmation avant de vous connecter.' 
          });
        } else if (error.message.includes('Invalid login credentials')) {
          setErrors({ general: 'Email ou mot de passe incorrect' });
        } else {
          setErrors({ general: error.message });
        }
      } else {
        router.replace('/(tabs)');
      }
    } catch (error) {
      setErrors({ general: 'Une erreur est survenue. Veuillez réessayer.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Link href="/(auth)/welcome" asChild>
          <TouchableOpacity style={styles.backButton}>
            <ArrowLeft size={24} color="#1A1A1A" />
          </TouchableOpacity>
        </Link>
        <Text style={styles.headerTitle}>Connexion</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Bon retour!</Text>
          <Text style={styles.subtitle}>Connectez-vous à votre compte Sookari</Text>
        </View>

        {errors.general && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{errors.general}</Text>
          </View>
        )}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email</Text>
            <View style={[styles.inputContainer, errors.email && styles.inputError]}>
              <Mail size={20} color="#666" />
              <TextInput
                style={styles.textInput}
                placeholder="votre@email.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
            {errors.email && <Text style={styles.inputErrorText}>{errors.email}</Text>}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Mot de passe</Text>
            <View style={[styles.inputContainer, errors.password && styles.inputError]}>
              <Lock size={20} color="#666" />
              <TextInput
                style={styles.textInput}
                placeholder="Votre mot de passe"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                onPress={() => setShowPassword(!showPassword)}
                style={styles.eyeButton}
              >
                {showPassword ? (
                  <EyeOff size={20} color="#666" />
                ) : (
                  <Eye size={20} color="#666" />
                )}
              </TouchableOpacity>
            </View>
            {errors.password && <Text style={styles.inputErrorText}>{errors.password}</Text>}
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Mot de passe oublié?</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.loginButton, loading && styles.loginButtonDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <Text style={styles.loginButtonText}>Se connecter</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Pas encore de compte? </Text>
          <Link href="/(auth)/register" asChild>
            <TouchableOpacity>
              <Text style={styles.footerLink}>Créer un compte</Text>
            </TouchableOpacity>
          </Link>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A1A',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  titleContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  errorContainer: {
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FEB2B2',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  errorText: {
    fontSize: 14,
    color: '#E53E3E',
    textAlign: 'center',
  },
  form: {
    marginBottom: 32,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E5E5EA',
  },
  inputError: {
    borderColor: '#E53E3E',
  },
  textInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#1A1A1A',
  },
  eyeButton: {
    padding: 4,
  },
  inputErrorText: {
    fontSize: 12,
    color: '#E53E3E',
    marginTop: 4,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  loginButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
});