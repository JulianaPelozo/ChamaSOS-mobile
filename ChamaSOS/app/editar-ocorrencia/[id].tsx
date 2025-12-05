import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, TextInput, Button, HelperText, RadioButton, useTheme } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

interface Ocorrencia {
  id: string;
  tipo: string;
  bairro: string;
  prioridade: 'Baixa' | 'Média' | 'Crítica';
  status: 'Ativa' | 'Encerrada';
}

export default function EditarOcorrenciaScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>(); // pega o id da ocorrência

  const [tipo, setTipo] = useState('');
  const [bairro, setBairro] = useState('');
  const [prioridade, setPrioridade] = useState<'Baixa' | 'Média' | 'Crítica'>('Baixa');
  const [status, setStatus] = useState<'Ativa' | 'Encerrada'>('Ativa');
  const [erro, setErro] = useState('');

  // Simula fetch do backend para popular o formulário
  useEffect(() => {
    if (id) {
      // TODO: Substituir pelo fetch real
      console.log('Buscando ocorrência com ID:', id);
      setTipo('Incêndio');
      setBairro('Boa Viagem');
      setPrioridade('Crítica');
      setStatus('Ativa');
    }
  }, [id]);

  const handleSalvar = () => {
    if (!tipo || !bairro) {
      setErro('Preencha todos os campos');
      return;
    }
    setErro('');
    
    // TODO: Chamar API PUT para atualizar ocorrência
    console.log('Salvando ocorrência', { id, tipo, bairro, prioridade, status });

    router.push('/ocorrencias'); // volta para a lista
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{ marginBottom: 16 }}>Editar Ocorrência</Title>

          <TextInput
            label="Tipo de Ocorrência"
            value={tipo}
            onChangeText={setTipo}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Bairro"
            value={bairro}
            onChangeText={setBairro}
            mode="outlined"
            style={styles.input}
          />

          <Title style={{ marginTop: 16, fontSize: 16 }}>Prioridade</Title>
          <RadioButton.Group onValueChange={setPrioridade} value={prioridade}>
            <View style={styles.radioRow}>
              <RadioButton value="Baixa" />
              <Title style={styles.radioLabel}>Baixa</Title>
              <RadioButton value="Média" />
              <Title style={styles.radioLabel}>Média</Title>
              <RadioButton value="Crítica" />
              <Title style={styles.radioLabel}>Crítica</Title>
            </View>
          </RadioButton.Group>

          <Title style={{ marginTop: 16, fontSize: 16 }}>Status</Title>
          <RadioButton.Group onValueChange={setStatus} value={status}>
            <View style={styles.radioRow}>
              <RadioButton value="Ativa" />
              <Title style={styles.radioLabel}>Ativa</Title>
              <RadioButton value="Encerrada" />
              <Title style={styles.radioLabel}>Encerrada</Title>
            </View>
          </RadioButton.Group>

          {erro ? <HelperText type="error">{erro}</HelperText> : null}

          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleSalvar}
          >
            Salvar Alterações
          </Button>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  card: { padding: 16 },
  input: { marginBottom: 12 },
  button: { marginTop: 20 },
  radioRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  radioLabel: { marginRight: 16 },
});
