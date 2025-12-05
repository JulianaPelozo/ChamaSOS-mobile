import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, Title, TextInput, Button, HelperText, RadioButton, useTheme } from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function NovaOcorrenciaScreen() {
  const theme = useTheme();
  const router = useRouter();

  const params = useLocalSearchParams<{ id?: string }>();
  const idParam = params.id; 

  const [tipo, setTipo] = useState('');
  const [bairro, setBairro] = useState('');
  const [prioridade, setPrioridade] = useState<'Baixa' | 'Média' | 'Crítica'>('Baixa');
  const [status, setStatus] = useState<'Ativa' | 'Encerrada'>('Ativa');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (idParam) {
      setTipo('Incêndio');
      setBairro('Boa Viagem');
      setPrioridade('Crítica');
      setStatus('Ativa');
    }
  }, [idParam]);

  const handleSalvar = () => {
    if (!tipo || !bairro) {
      setErro('Preencha todos os campos');
      return;
    }
    setErro('');
    console.log('Salvando ocorrência', { id: idParam, tipo, bairro, prioridade, status });

    router.push('./ocorrencias');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{ marginBottom: 16 }}>
            {idParam ? 'Editar Ocorrência' : 'Nova Ocorrência'}
          </Title>

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
          <RadioButton.Group
            onValueChange={(value) => setPrioridade(value as 'Baixa' | 'Média' | 'Crítica')}
            value={prioridade}
          >
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
          <RadioButton.Group
            onValueChange={(value) => setStatus(value as 'Ativa' | 'Encerrada')}
            value={status}
          >
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
            {idParam ? 'Salvar Alterações' : 'Cadastrar Ocorrência'}
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
  radioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  radioLabel: { marginRight: 16 },
  button: { marginTop: 24 },
});