import { StyleSheet, View, Text, Pressable, StyleSheetProperties } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

type Props = {
  label: string;
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  action: () => void;
  active?: boolean;
  style?: any;
};

export default function Button({ label, action, icon, active = true, style }: Props) {
  const borderStyle = active ? styles.border : {};

  return (
    <View style={{...styles.buttonContainer, ...borderStyle}}>
      <Pressable style={styles.button} onPress={action}>
        <MaterialCommunityIcons name={icon} size={30} style={styles.buttonIcon} />
        <Text style={{...styles.buttonLabel, ...style}}>{label}</Text>
      </Pressable>
    </View >
  );
}

const styles = StyleSheet.create({
  border: {
    borderWidth: 4,
    borderColor: '#ffd33d',
    borderRadius: 18
  },
  buttonContainer: {
    width: 320,
    height: 68,
    margin: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',

    backgroundColor: '#fff'
  },
  buttonLabel: {
    // color: '#fff',
    fontSize: 16,
    color: '#25292e',
    height: '100%',
    alignContent: 'center',
    justifyContent: 'center',
    textAlignVertical: 'center',
    maxWidth: 250,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
