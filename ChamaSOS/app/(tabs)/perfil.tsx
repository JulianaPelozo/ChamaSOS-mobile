import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Avatar, Card, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

export default function PerfilScreen() {
  const theme = useTheme();

  return (
    <View style={styles.container}>
      <Card style={styles.profileCard}>
        <Card.Content style={styles.profileContent}>
          <Avatar.Image 
            size={100} 
            source={{ uri: 'https://api.dicebear.com/7.x/avataaars/svg?seed=bombeiro' }}
            style={styles.avatar}
          />
          <Text variant="headlineSmall" style={styles.name}>
            Bombeiro Silva
          </Text>
          <Text variant="bodyMedium" style={styles.matricula}>
            Matrícula: 12345
          </Text>
          <Text variant="bodyMedium" style={styles.unidade}>
            Unidade: 1º Grupamento - Santo Amaro
          </Text>
          <Text variant="bodyMedium" style={styles.turno}>
            Turno: 07:00 - 19:00
          </Text>
        </Card.Content>
      </Card>

      <Card style={styles.actionsCard}>
        <Card.Content>
          <Button 
            mode="contained" 
            icon="logout"
            style={styles.logoutButton}
            onPress={() => console.log('Logout')}
          >
            Sair
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFF5F5',
  },
  profileCard: {
    marginBottom: 16,
    alignItems: 'center',
    paddingVertical: 24,
  },
  profileContent: {
    alignItems: 'center',
  },
  avatar: {
    marginBottom: 16,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  matricula: {
    color: '#666666',
    marginBottom: 4,
  },
  unidade: {
    color: '#666666',
    marginBottom: 4,
  },
  turno: {
    color: '#666666',
    marginBottom: 4,
  },
  actionsCard: {
    marginBottom: 16,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
  },
});