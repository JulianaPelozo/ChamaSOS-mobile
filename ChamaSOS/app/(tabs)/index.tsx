import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, Chip, Text, FAB, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

export default function DashboardScreen() {
  const theme = useTheme();
  const router = useRouter();

  const stats = {
    ocorrenciasHoje: 12,
    ocorrenciasAtivas: 5,
    tempoMedioResposta: '8.5min',
    bairrosCriticos: ['Boa Viagem', 'Casa Amarela', 'Ibura'],
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Card style={styles.welcomeCard}>
          <Card.Content>
            <Title style={{ color: theme.colors.primary }}>
              Bombeiro Silva, seja bem-vindo!
            </Title>
            <Paragraph>Região Metropolitana do Recife</Paragraph>
            <Paragraph>Turno: 07:00 - 19:00</Paragraph>
          </Card.Content>
        </Card>

        <Card style={styles.statsCard}>
          <Card.Content>
            <Title>Estatísticas do Dia</Title>
            <View style={styles.statsGrid}>
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={{ color: theme.colors.primary }}>
                  {stats.ocorrenciasHoje}
                </Text>
                <Text variant="bodyMedium">Ocorrências hoje</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="displaySmall" style={{ color: theme.colors.error }}>
                  {stats.ocorrenciasAtivas}
                </Text>
                <Text variant="bodyMedium">Ativas</Text>
              </View>
              <View style={styles.statItem}>
                <Text variant="displaySmall">{stats.tempoMedioResposta}</Text>
                <Text variant="bodyMedium">Tempo médio</Text>
              </View>
            </View>
          </Card.Content>
        </Card>

        <Card style={styles.criticalCard}>
          <Card.Content>
            <Title>Bairros com Mais Ocorrências</Title>
            <View style={styles.chipContainer}>
              {stats.bairrosCriticos.map((bairro, index) => (
                <Chip
                  key={index}
                  mode="outlined"
                  style={styles.chip}
                  textStyle={{ color: theme.colors.error }}
                >
                  {bairro}
                </Chip>
              ))}
            </View>
          </Card.Content>
        </Card>

        
        <Card style={styles.quickActions}>
          <Card.Content>
            <Title>Ações Rápidas</Title>
            <View style={styles.actionsGrid}>
              <Button
                mode="contained"
                icon="fire"
                style={styles.actionButton}
                onPress={() => router.push('./nova-ocorrencia')}
              >
                Nova Ocorrência
              </Button>

              <Button
                mode="outlined"
                icon="format-list-bulleted"
                style={styles.actionButton}
                onPress={() => router.push('./ocorrencias')}
              >
                Ver Todas
              </Button>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>

      <FAB
        icon="plus"
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        onPress={() => router.push('./nova-ocorrencia')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 16, gap: 16 },
  welcomeCard: { elevation: 4 },
  statsCard: { elevation: 2 },
  criticalCard: { elevation: 2 },
  quickActions: { elevation: 2, marginBottom: 80 },
  statsGrid: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  statItem: { alignItems: 'center' },
  chipContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginTop: 8 },
  chip: { marginRight: 4 },
  actionsGrid: { flexDirection: 'row', gap: 12, marginTop: 16 },
  actionButton: { flex: 1 },
  fab: { position: 'absolute', margin: 16, right: 0, bottom: 0 },
});
