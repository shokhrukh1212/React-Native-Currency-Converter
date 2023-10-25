import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import colors from "../constants/colors";

const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: colors.white,
  },
  title: {
    color: colors.text,
    fontSize: 16,
  },
  seperator: {
    backgroundColor: colors.border,
    height: StyleSheet.hairlineWidth,
    marginLeft: 20,
  },
});

export default function RowItem({ rightIcon, text, onPress }) {
  return (
    <>
      <TouchableOpacity style={styles.row} onPress={onPress}>
        <Text style={styles.title}>{text}</Text>
        {rightIcon}
      </TouchableOpacity>

      <View style={styles.seperator}></View>
    </>
  );
}
