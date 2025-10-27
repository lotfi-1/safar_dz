import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import { useLanguage } from "../contexts/LanguageProvider";

interface ButtonProps {
  text?: string;
  suffix?: React.ReactNode,
  children: React.ReactNode[]
}

const PrimaryButton: React.FC<ButtonProps> = ({ text, suffix, children }) => {
  const { colors } = useTheme();
  const { fontFamily } = useLanguage();
  return <View style={{
    "backgroundColor": colors.primary,
    ...style.container
  }}>
    <Text style={{
      "fontFamily": fontFamily,
      "color": colors.white
    }}>
      {text}
    </Text>

  </View>;
}

const style = StyleSheet.create({
  container: {
    "justifyContent": "center",
    "alignItems": "center"
  }
});