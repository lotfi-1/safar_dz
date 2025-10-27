import { PressableProps, StyleSheet, Text, Pressable } from "react-native";
import { useTheme } from "../contexts/ThemeProvider";
import { useLanguage } from "../contexts/LanguageProvider";
import React from "react";

interface ButtonProps {
  type?: "primary" | "secondary";
  props: PressableProps;
  text?: string;
  suffix?: React.ReactNode;
}

const PrimaryButton: React.FC<ButtonProps> = ({
  type = "primary",
  props,
  text,
  suffix,
}) => {
  const { colors } = useTheme();
  const { fontFamily, language } = useLanguage();

  const isRTL = language === "ar";
  const isPrimary = type === "primary";
  const color = isPrimary ? colors.white : colors.black;

  return (
    <Pressable
      style={({ pressed }) => {
        const primaryBackgroundColor = pressed ? colors.primaryLight : colors.primary;
        const secondaryBackgroundColor = pressed ? colors.text.muted : colors.white;

        return [
          {
            backgroundColor: isPrimary ? primaryBackgroundColor : secondaryBackgroundColor,
            ...style.container,
            flexDirection: isRTL ? "row-reverse" : "row",
          },
        ];
      }}
      {...props}
    >
      {suffix && React.cloneElement(suffix as any, { fill: color })}
      <Text
        style={{
          fontFamily,
          color,
          fontWeight: "600",
          fontSize: 16,
        }}
      >
        {text}
      </Text>
    </Pressable>
  );
};

const style = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 8,
    borderRadius: 8,
    minHeight: 42,
  },
});

export default PrimaryButton;
