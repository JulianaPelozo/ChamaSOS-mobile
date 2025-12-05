import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  HelperText,
  useTheme,
} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();
  
  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  const handleLogin = async () => {
    if (!matricula || !senha) {
      setErro('Preencha matrícula e senha');
      return;
    }

    setLoading(true);
    setErro('');

    setTimeout(() => {
      setLoading(false);
      
      if (matricula === '12345' && senha === '12345') {
        router.replace('/(tabs)');
      } else {
        setErro('Matrícula ou senha incorretos');
      }
    }, 1500);
  };

  const handleLoginDemo = () => {
    setMatricula('12345');
    setSenha('12345');
    handleLogin();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <MaterialCommunityIcons
            name="fire-truck"
            size={80}
            color={theme.colors.primary}
          />
          <Text variant="headlineMedium" style={styles.titulo}>
            CHAMA SOS
          </Text>
          <Text variant="bodyMedium" style={styles.subtitulo}>
            Corpo de Bombeiros - RMR
          </Text>
        </View>

        <Card style={styles.loginCard}>
          <Card.Content>
            <Text variant="titleLarge" style={styles.loginTitulo}>
              Acesso do Bombeiro
            </Text>

            <TextInput
              label="Matrícula"
              value={matricula}
              onChangeText={setMatricula}
              mode="outlined"
              style={styles.input}
              left={<TextInput.Icon icon="badge-account" />}
              keyboardType="numeric"
              error={!!erro}
            />

            <TextInput
              label="Senha"
              value={senha}
              onChangeText={setSenha}
              mode="outlined"
              style={styles.input}
              secureTextEntry={!mostrarSenha}
              left={<TextInput.Icon icon="lock" />}
              right={
                <TextInput.Icon
                  icon={mostrarSenha ? 'eye-off' : 'eye'}
                  onPress={() => setMostrarSenha(!mostrarSenha)}
                />
              }
              error={!!erro}
            />

            {erro ? (
              <HelperText type="error" style={styles.erro}>
                {erro}
              </HelperText>
            ) : null}

            <Button
              mode="contained"
              onPress={handleLogin}
              loading={loading}
              disabled={loading}
              style={styles.loginButton}
              contentStyle={styles.loginButtonContent}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>

            <Button
              mode="outlined"
              onPress={handleLoginDemo}
              style={styles.demoButton}
              icon="fire-extinguisher">
              Acesso de Demonstração
            </Button>

            <View style={styles.ajudaContainer}>
              <Button
                mode="text"
                onPress={() => console.log('Esqueci senha')}
                textColor={theme.colors.primary}>
                Esqueci minha senha
              </Button>
              <Button
                mode="text"
                onPress={() => console.log('Ajuda')}
                textColor={theme.colors.onSurfaceVariant}>
                Precisa de ajuda?
              </Button>
            </View>
          </Card.Content>
        </Card>

        <View style={styles.rodape}>
          <Text variant="bodySmall" style={styles.rodapeTexto}>
            Sistema de Gerenciamento de Ocorrências
          </Text>
          <Text variant="bodySmall" style={styles.rodapeTexto}>
            Região Metropolitana do Recife
          </Text>
          <Text variant="bodySmall" style={styles.versao}>
            Versão 1.0.0
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  titulo: {
    fontWeight: 'bold',
    color: '#B71C1C',
    marginTop: 16,
    letterSpacing: 1,
  },
  subtitulo: {
    color: '#666666',
    marginTop: 4,
  },
  loginCard: {
    elevation: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
  },
  loginTitulo: {
    textAlign: 'center',
    marginBottom: 24,
    fontWeight: 'bold',
    color: '#333333',
  },
  input: {
    marginBottom: 16,
  },
  erro: {
    marginBottom: 16,
  },
  loginButton: {
    marginTop: 8,
    paddingVertical: 6,
    backgroundColor: '#D32F2F',
  },
  loginButtonContent: {
    height: 48,
  },
  demoButton: {
    marginTop: 12,
    borderColor: '#D32F2F',
  },
  ajudaContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rodape: {
    marginTop: 40,
    alignItems: 'center',
  },
  rodapeTexto: {
    color: '#666666',
    textAlign: 'center',
  },
  versao: {
    color: '#999999',
    marginTop: 8,
  },
});