import { useContext } from "react";
import { StatusBar, View, FlatList, StyleSheet } from "react-native";
import { RowItem, RowSeparator } from "../components/RowItem";
import colors from "../constants/colors";
import currencies from "../data/currensies.json";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Entypo } from "@expo/vector-icons";
import { ConversionContext } from "../utils/ConversionContext";

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ({ navigation, route = {} }) => {
  const insets = useSafeAreaInsets();
  const params = route.params || {};
  const { isBaseCurrency } = params;
  const { setBaseCurrency, setQuoteCurrency, baseCurrency, quoteCurrency } =
    useContext(ConversionContext);

  return (
    <View style={{ backgroundColor: colors.white }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <FlatList
        data={currencies}
        renderItem={(item) => {
          let selected = false;
          if (isBaseCurrency && item === baseCurrency) {
            selected = true;
          } else if (!isBaseCurrency && item === quoteCurrency) {
            selected = true;
          }

          <RowItem
            title={item}
            onPress={() => {
              if (isBaseCurrency) {
                setBaseCurrency(item);
              } else {
                setQuoteCurrency(item);
              }
              navigation.pop();
            }}
            rightIcon={
              selected && (
                <View style={styles.icon}>
                  <Entypo name="check" size={20} color={colors.white} />
                </View>
              )
            }
          />;
        }}
        ItemSeparatorComponent={RowSeparator}
        ListFooterComponent={() => {
          <View style={{ paddingBottom: insets.bottom }} />;
        }}
      />
    </View>
  );
};
