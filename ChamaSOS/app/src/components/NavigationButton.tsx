import React from 'react';
import { Button, ButtonProps } from 'react-native-paper';
import { useRouter, Href } from 'expo-router';

interface NavigationButtonProps extends Omit<ButtonProps, 'onPress'> {
  href: Href;
  replace?: boolean;
}

export function NavigationButton({ href, replace = false, ...buttonProps }: NavigationButtonProps) {
  const router = useRouter();

  const handlePress = () => {
    if (replace) {
      router.replace(href);
    } else {
      router.push(href);
    }
  };

  return (
    <Button 
      {...buttonProps} 
      onPress={handlePress}
    />
  );
}