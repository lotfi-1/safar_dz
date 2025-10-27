import React, { useState } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../contexts/ThemeProvider';
import { useLanguage } from '../contexts/LanguageProvider';

interface IconProps {
  element: React.ReactNode;
  rotateInRTL?: boolean;
}

interface TextFieldProps {
  textInputProps?: TextInputProps;
  prefixIcon?: IconProps;
  suffixIcon?: IconProps;
}

export const TextField: React.FC<TextFieldProps> = ({
  textInputProps,
  prefixIcon,
  suffixIcon,
}) => {
  const { colors } = useTheme();
  const { fontFamily, language } = useLanguage();
  const [isFocused, setIsFocused] = useState(false);

  const isRTL = language === 'ar';
  const borderColor = isFocused ? colors.text.primary : colors.border;
  const iconColor = isFocused ? colors.text.primary : colors.border;

  const renderIcon = (icon?: IconProps, onPress?: () => void) => {
    if (!icon?.element) return null;

    const style = [
      styles.iconContainer,
      icon.rotateInRTL && isRTL ? { transform: [{ scaleX: -1 }] } : null,
    ];

    return (
      <View
        style={style}
      >
        {React.cloneElement(icon.element as any, { fill: iconColor })}
      </View>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { borderColor, backgroundColor: colors.surface },
        { flexDirection: isRTL ? 'row-reverse' : 'row' },

      ]}
    >
      {renderIcon(prefixIcon)}

      <TextInput
        {...textInputProps}
        onFocus={(e) => {
          setIsFocused(true);
          textInputProps?.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          textInputProps?.onBlur?.(e);
        }}
        placeholderTextColor={colors.text.muted}
        style={[
          styles.input,
          {
            color: colors.text.primary,
            fontFamily,
            textAlign: isRTL ? 'right' : 'left',
          },
        ]}
      />

      {renderIcon(suffixIcon)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    gap: 8,
    height: 52
  },
  input: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 12,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',

  },
});
