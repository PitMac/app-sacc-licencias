import { View, Text } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";

export default function CustomAppBar({
  title,
  leftIcon,
  onPressLeftIcon,
  rightIcon,
  onPressRightIcon,
  onPressBackButton,
  center,
}) {
  return (
    <Appbar.Header mode={center && "center-aligned"}>
      {onPressBackButton && <Appbar.BackAction onPress={onPressBackButton} />}
      {onPressLeftIcon && (
        <Appbar.Action icon={leftIcon} onPress={onPressLeftIcon} />
      )}
      <Appbar.Content
        titleStyle={{ fontWeight: "bold", fontSize: 19 }}
        title={(title ?? "").toUpperCase()}
      />
      {onPressRightIcon && (
        <Appbar.Action icon={rightIcon} onPress={onPressRightIcon} />
      )}
    </Appbar.Header>
  );
}
