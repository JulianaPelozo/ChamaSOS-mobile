import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { TextInput, Button, Title, Subheading, useTheme, HelperText } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { Lock, User } from 'lucide-react-native';

export default function LoginScreen() {
  const theme = useTheme();
  const router = useRouter();

  const [matricula, setMatricula] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = () => {
    setError('');
    setLoading(true);

    setTimeout(() => {
      setLoading(false);

      if (matricula === '12345' && senha === '12345') {
        router.replace('/(tabs)');
      } else {
        setError('Matrícula ou senha inválida.');
      }
    }, 2000);
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      
      <View style={styles.header}>
        <Title style={[styles.title, { color: theme.colors.primary }]}>
          Chama SOS
        </Title>

        <Subheading style={styles.subtitle}>
          Acesso Restrito
        </Subheading>

        <Image
          source={require("../assets/icon.jpg")}
          style={styles.logo}
        />
      </View>

      {/* FORM */}
      <View style={styles.form}>
        
        <TextInput
          label="Matrícula"
          value={matricula}
          onChangeText={setMatricula}
          mode="outlined"
          left={<TextInput.Icon icon={() => <User size={20} color={theme.colors.primary} />} />}
          keyboardType="numeric"
          autoCapitalize="none"
          style={styles.input}
          disabled={loading}
        />

        <TextInput
          label="Senha"
          value={senha}
          onChangeText={setSenha}
          mode="outlined"
          secureTextEntry
          left={<TextInput.Icon icon={() => <Lock size={20} color={theme.colors.primary} />} />}
          autoCapitalize="none"
          style={styles.input}
          disabled={loading}
        />

        {error ? (
          <HelperText type="error" visible={!!error} style={{ marginTop: 8 }}>
            {error}
          </HelperText>
        ) : null}

        <Button
          mode="contained"
          onPress={handleLogin}
          loading={loading}
          disabled={loading}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          contentStyle={styles.buttonContent}
          labelStyle={styles.buttonLabel}
        >
          Entrar
        </Button>
      </View>

      {/* RODAPÉ */}
      <View style={styles.rodape}>
        <Subheading style={styles.rodapeTexto}>
          Sistema de Gestão de Ocorrências
        </Subheading>

        <Subheading style={styles.versao}>
          v1.0.0
        </Subheading>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'space-between',
  },

  header: {
    alignItems: 'center',
    marginTop: 50,
  },

  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },

  subtitle: {
    color: '#666666',
    marginTop: 4,
    marginBottom: 10,
  },

logo: {
    height: 180,
    width: 190,
    borderRadius: 40,
    marginTop: 40,
  },

  form: {
    width: '100%',
  },

  input: {
    marginBottom: 15,
  },

  button: {
    marginTop: 20,
    borderRadius: 8,
  },

  buttonContent: {
    paddingVertical: 8,
  },

  buttonLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
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
