import React, { useState, useCallback } from 'react';
import { ScrollView, StyleSheet, RefreshControl } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme, ActivityIndicator } from 'react-native-paper';
import { useRouter, useFocusEffect } from 'expo-router';
import { Ocorrencia, listarOcorrencias, deletarOcorrencia } from '../../src/services/ocorrenciaService';

export default function OcorrenciasScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const carregarOcorrencias = async () => {
    try {
      setLoading(true);
      const lista = await listarOcorrencias();
      setOcorrencias(lista);
    } catch (error) {
      console.error('Erro ao carregar ocorrências:', error);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      carregarOcorrencias();
    }, [])
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await carregarOcorrencias();
    setRefreshing(false);
  }, []);

  const handleDeletar = async (id: number) => {
    try {
      await deletarOcorrencia(id);
      await carregarOcorrencias();
    } catch (error) {
      console.error('Erro ao deletar ocorrência:', error);
    }
  };

  if (loading && ocorrencias.length === 0) {
    return (
      <ActivityIndicator 
        animating={true} 
        color={theme.colors.primary} 
        style={styles.loading} 
        size="large"
      />
    );
  }

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {ocorrencias.length === 0 ? (
        <Title style={styles.emptyText}>Nenhuma ocorrência registrada.</Title>
      ) : (
        ocorrencias.map((oc) => (
          <Card key={oc.id} style={styles.card}>
            <Card.Content>
              <Title>{oc.tipo}</Title>
              <Paragraph>Bairro: **{oc.bairro}**</Paragraph>
              <Paragraph>Status: **{oc.status}**</Paragraph>
              <Paragraph>Prioridade: **{oc.prioridade}**</Paragraph>
              <Paragraph>Criada em: {new Date(oc.createdAt).toLocaleDateString()} às {new Date(oc.createdAt).toLocaleTimeString()}</Paragraph>
            </Card.Content>
            <Card.Actions>
              <Button
                mode="outlined"
                onPress={() => router.push(`./nova-ocorrencia?id=${oc.id}`)}
              >
                Editar
              </Button>
              <Button
                mode="outlined"
                textColor={theme.colors.error}
                onPress={() => handleDeletar(oc.id)}
              >
                Deletar
              </Button>
            </Card.Actions>
          </Card>
        ))
      )}

      <Button
        mode="contained"
        style={{ marginTop: 16, backgroundColor: theme.colors.primary }}
        onPress={() => router.push('./nova-ocorrencia')}
      >
        Nova Ocorrência
      </Button>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  card: { marginBottom: 12 },
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { textAlign: 'center', marginTop: 50 },
});