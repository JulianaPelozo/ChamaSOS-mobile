import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, Paragraph, Button, useTheme } from 'react-native-paper';
import { useRouter } from 'expo-router';

interface Ocorrencia {
  id: string;
  tipo: string;
  bairro: string;
  prioridade: 'Baixa' | 'Média' | 'Crítica';
  status: 'Ativa' | 'Encerrada';
  horario: string;
}

export default function OcorrenciasScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [ocorrencias, setOcorrencias] = useState<Ocorrencia[]>([]);

  useEffect(() => {
    // Simulação fetch
    setOcorrencias([
      { id: '1', tipo: 'Incêndio', bairro: 'Boa Viagem', prioridade: 'Crítica', status: 'Ativa', horario: '07:30' },
      { id: '2', tipo: 'Resgate', bairro: 'Casa Amarela', prioridade: 'Média', status: 'Encerrada', horario: '08:15' },
      { id: '3', tipo: 'Vazamento', bairro: 'Ibura', prioridade: 'Baixa', status: 'Ativa', horario: '09:00' },
    ]);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {ocorrencias.map((oc) => (
        <Card key={oc.id} style={styles.card}>
          <Card.Content>
            <Title>{oc.tipo}</Title>
            <Paragraph>Bairro: {oc.bairro}</Paragraph>
            <Paragraph>Status: {oc.status}</Paragraph>
            <Paragraph>Prioridade: {oc.prioridade}</Paragraph>
            <Paragraph>Horário: {oc.horario}</Paragraph>
          </Card.Content>
          <Card.Actions>
            <Button
              mode="outlined"
              onPress={() =>
                router.push({
                  pathname: '/(tabs)/nova-ocorrencia',
                  params: { id: oc.id },
                } as const)
              }
            >
              Editar
            </Button>
          </Card.Actions>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, gap: 12 },
  card: { marginBottom: 12 },
});
