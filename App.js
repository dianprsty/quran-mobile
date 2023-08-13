import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import QuranMobile from './src';
import { store, persistor } from "./src/redux/store/store";
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

export default function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <NavigationContainer>
            <QuranMobile /> 
            <StatusBar style='auto' />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}
