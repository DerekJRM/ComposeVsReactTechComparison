import { TextInput } from 'react-native';
import { styles } from '../styles/globalStyles';

export default function AuthInput({ style, ...props }) {
  return (
    <TextInput 
      style={[styles.input, style]}
      autoCapitalize="none"
      {...props}
    />
  );
}