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
  ActivityIndicator,
} from 'react-native-paper';
import { useRouter, useLocalSearchParams } from 'expo-router';
import {
  Ocorrencia,
  buscarOcorrencia,
  criarOcorrencia,
  atualizarOcorrencia,
} from '../src/services/ocorrenciaService'; 

const mapToFormState = (ocorrencia: Ocorrencia) => ({
    tipo: ocorrencia.tipo,
    bairro: ocorrencia.bairro,
    prioridade: ocorrencia.prioridade,
    status: ocorrencia.status,
    numVitimas: String(ocorrencia.numVitimas),
    custo: String(ocorrencia.custo),
    batalhao: ocorrencia.batalhao ?? '',
    descricao: ocorrencia.descricao ?? '',
});

export default function NovaOcorrenciaScreen() {
  const theme = useTheme();
  const router = useRouter();
  const params = useLocalSearchParams<{ id?: string }>();
  const idParam = params.id ? Number(params.id) : null;
  const isEditing = !!idParam;

  const [tipo, setTipo] = useState('');
  const [bairro, setBairro] = useState('');
  const [prioridade, setPrioridade] = useState<'Baixa' | 'Média' | 'Crítica'>('Baixa');
  const [status, setStatus] = useState<'Ativa' | 'Encerrada'>('Ativa');
  const [numVitimas, setNumVitimas] = useState('');
  const [custo, setCusto] = useState('');
  const [batalhao, setBatalhao] = useState('');
  const [descricao, setDescricao] = useState('');
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEditing) {
      setLoading(true);
      buscarOcorrencia(idParam)
        .then((data) => {
          const formState = mapToFormState(data);
          setTipo(formState.tipo);
          setBairro(formState.bairro);
          setPrioridade(formState.prioridade);
          setStatus(formState.status);
          setNumVitimas(formState.numVitimas);
          setCusto(formState.custo);
          setBatalhao(formState.batalhao);
          setDescricao(formState.descricao);
        })
        .catch((err) => {
          console.error('Erro ao buscar ocorrência:', err);
          setErro('Ocorrência não encontrada ou erro de rede.');
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [idParam, isEditing]);

  const handleSalvar = async () => {
    if (!tipo || !bairro) {
      setErro('Campos obrigatórios: tipo e bairro.');
      return;
    }

    setSaving(true);
    setErro('');

    const dadosOcorrencia = {
      tipo,
      bairro,
      prioridade,
      status,
      numVitimas: Number(numVitimas) || 0,
      custo: Number(custo) || 0,
      batalhao: batalhao || undefined,
      descricao: descricao || undefined,
    };

    try {
      if (isEditing) {
        await atualizarOcorrencia(idParam, dadosOcorrencia);
      } else {
        await criarOcorrencia(dadosOcorrencia);
      }
      
      router.replace('/(tabs)/ocorrencias');
    } catch (err) {
      console.error('Erro ao salvar ocorrência:', err);
      setErro('Erro ao salvar no servidor. Tente novamente.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
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
    <ScrollView contentContainerStyle={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Title style={{ marginBottom: 16 }}>
            {isEditing ? 'Editar Ocorrência' : 'Nova Ocorrência'}
          </Title>

          <TextInput
            label="Tipo de Ocorrência *"
            value={tipo}
            onChangeText={setTipo}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Bairro *"
            value={bairro}
            onChangeText={setBairro}
            mode="outlined"
            style={styles.input}
          />

          <TextInput
            label="Número de Vítimas"
            value={numVitimas}
            onChangeText={(text) => setNumVitimas(text.replace(/[^0-9]/g, ''))} 
            mode="outlined"
            keyboardType="numeric"
            style={styles.input}
          />

          <TextInput
            label="Custo da Ocorrência (R$)"
            value={custo}
            onChangeText={(text) => setCusto(text.replace(/[^0-9,.]/g, ''))} 
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

          {isEditing && (
            <>
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
            </>
          )}

          {erro ? <HelperText type="error">{erro}</HelperText> : null}

          <Button
            mode="contained"
            style={[styles.button, { backgroundColor: theme.colors.primary }]}
            onPress={handleSalvar}
            loading={saving}
            disabled={saving}
          >
            {isEditing ? 'Salvar Alterações' : 'Cadastrar Ocorrência'}
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
  loading: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});