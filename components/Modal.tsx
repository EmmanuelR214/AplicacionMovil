// DrawerComponent.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import tw from 'tailwind-react-native-classnames';

interface DrawerComponentProps {
  visible: boolean;
  onClose: () => void;
}

export const DrawerComponent: React.FC<DrawerComponentProps> = ({ visible, onClose }) => {
  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={stylesDrawer.overlay}>
        <View style={stylesDrawer.drawer}>
          <TouchableOpacity onPress={onClose} style={stylesDrawer.closeButton}>
            <Text style={tw`text-white text-lg`}>Cerrar</Text>
          </TouchableOpacity>
          {/* Opciones del Drawer */}
          <Text style={tw`text-white font-bold text-2xl mb-4`}>Opciones</Text>
          <TouchableOpacity style={tw`mb-4`}>
            <Text style={tw`text-white text-lg`}>Configuración</Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`mb-4`}>
            <Text style={tw`text-white text-lg`}>Salir</Text>
          </TouchableOpacity>
          {/* Agrega más opciones según sea necesario */}
        </View>
      </View>
    </Modal>
  );
};

const stylesDrawer = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  drawer: {
    backgroundColor: '#333',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
});
