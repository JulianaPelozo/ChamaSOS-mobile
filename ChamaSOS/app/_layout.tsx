import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';


const theme = {
...MD3LightTheme,
colors: {
...MD3LightTheme.colors,
primary: '#D32F2F',
primaryContainer: '#FFCDD2',
secondary: '#B71C1C',
secondaryContainer: '#FFEBEE',
error: '#C62828',
background: '#FFF5F5',
surface: '#FFFFFF',
surfaceVariant: '#FFEBEE',
onPrimary: '#FFFFFF',
onSecondary: '#FFFFFF',
onSurface: '#1A1A1A'
}
};


export default function RootLayout() {
return (
<SafeAreaProvider>
<PaperProvider theme={theme}>
<Stack screenOptions={{ headerShown: false }}>
<Stack.Screen name="index" />
<Stack.Screen name="login" />
<Stack.Screen name="(tabs)" />
</Stack>
</PaperProvider>
</SafeAreaProvider>
);
}