import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function AuthButton({ 
  title, 
  onPress, 
  style, 
  textStyle,
  ...props 
}) {
  return (
    <TouchableOpacity 
      style={[styles.buttonBase, style]} 
      onPress={onPress}
      {...props}
    >
      <Text style={[styles.buttonTextBase, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}