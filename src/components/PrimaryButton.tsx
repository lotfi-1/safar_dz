import { PressableProps, StyleSheet, Text, Pressable } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import { useLanguage } from "../contexts/LanguageProvider";
import React from "react";

interface ButtonProps {
  type?: "priamry" | "secondary",
  props: PressableProps,
  text?: string;
  suffix?: React.ReactNode,
}

const PrimaryButton: React.FC<ButtonProps> = ({ type = "priamry", props, text, suffix }) => {
  const { colors } = useTheme();
  const { fontFamily, language } = useLanguage();
  const isRTL = language === 'ar';
  const isPrimary = type == "priamry";
  const color = isPrimary ? colors.white : colors.black;


  return <Pressable
    style={({ pressed }) => {
      const primaryBackgroundColor = pressed ? colors.primaryLight : colors.primary;
      const secondaryBackgroundColor = pressed ? colors.text.muted : colors.white;
      return [{
        backgroundColor: isPrimary ? primaryBackgroundColor : secondaryBackgroundColor,
        ...style.container,
        flexDirection: isRTL ? 'row-reverse' : 'row',
      },];
    }}


    {...props}
  >
    {React.cloneElement(suffix as any, { fill: color },)}

    < Text style={{
      "fontFamily": fontFamily,
      "color": color,
      fontWeight: "semibold",
      fontSize: 16
    }}>
      {text}
    </Text >

  </Pressable >;
}

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 8,
    minHeight: 42
  }
});

export default PrimaryButton;