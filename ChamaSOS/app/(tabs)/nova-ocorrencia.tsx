import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  HelperText,
  RadioButton,
  useTheme,
} from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';

export default function NovaOcorrenciaScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const idParam = params.id;

  const [tipo, setTipo] = useState('');
  const [bairro, setBairro] = useState('');
  const [prioridade, setPrioridade] = useState<'Baixa' | 'Média' | 'Crítica'>('Baixa');
  const [status, setStatus] = useState<'Ativa' | 'Encerrada'>('Ativa');
  const [numVitimas, setNumVitimas] = useState(0);
  const [custo, setCusto] = useState(0);
  const [batalhao, setBatalhao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');

  useEffect(() => {
    if (idParam) {
      setTipo('Incêndio');
      setBairro('Boa Viagem');
      setPrioridade('Crítica');
      setStatus('Ativa');
      setNumVitimas(2);
      setCusto(1500);
      setBatalhao('1º Grupamento - Santo Amaro');
      setDescricao('Descrição exemplo da ocorrência.');
    }
  }, [idParam]);

  const handleSalvar = () => {
    if (!tipo || !bairro || !batalhao) {
      setErro('Preencha todos os campos obrigatórios');
      return;
    }

    setErro('');
    const ocorrenciaData = {
      id: idParam,
      tipo,
      bairro,
      prioridade,
      status,
      numVitimas,
      custo,
      batalhao,
      descricao,
    };

    console.log('Salvando ocorrência', ocorrenciaData);

    
    axios.post('/ocorrencias', ocorrenciaData)

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

          <TextInput
            label="Número de Vítimas"
            value={numVitimas.toString()}
            onChangeText={(text) => setNumVitimas(Number(text))}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Custo da Ocorrência (R$)"
            value={custo.toString()}
            onChangeText={(text) => setCusto(Number(text))}
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Batalhão Chamado"
            value={batalhao}
            onChangeText={setBatalhao}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Descrição"
            value={descricao}
            onChangeText={setDescricao}
            mode="outlined"
            multiline
            numberOfLines={4}
            style={[styles.input, { height: 100 }]}
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
