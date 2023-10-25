import { useState, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Text,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { ConversionInput } from "../components/ConversionInput";
import { format } from "date-fns";
import { Button } from "../components/Button";
import { KeyboardSpacer } from "../components/KeyboardSpacer";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ConversionContext } from "../utils/ConversionContext";

const screen = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue,
  },
  content: {
    paddingTop: screen.height * 0.1,
  },
  header: {
    margin: 10,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  logoBackground: {
    width: screen.width / 0.45,
    height: screen.width * 0.45,
  },
  logo: {
    position: "absolute",
    width: screen.width * 0.25,
    height: screen.width * 0.25,
  },
  textHeader: {
    fontSize: 30,
    color: colors.white,
    textAlign: "center",
    fontWeight: "bold",
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    textAlign: "center",
  },
});

export default ({ navigation }) => {
  const [value, setValue] = useState("100");
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const {
    baseCurrency,
    quoteCurrency,
    swapCurrencies,
    date,
    rates,
    isLoading,
  } = useContext(ConversionContext);
  const currencyRate = rates[quoteCurrency];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={colors.blue} />

      <SafeAreaView style={styles.header}>
        <TouchableOpacity onPress={() => navigation.push("Options")}>
          <Entypo name="cog" size={32} colors={colors.white} />
        </TouchableOpacity>
      </SafeAreaView>

      <ScrollView scrollEnabled={scrollEnabled}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logoBackground}
              source={require("../../assets/images/background.png")}
              resizeMode="contain"
            />
            <Image
              style={styles.logo}
              source={require("../../assets/images/logo.png")}
              resizeMode="contain"
            />
          </View>

          <Text style={styles.textHeader}>Currency Converter</Text>

          {isLoading ? (
            <ActivityIndicator color={colors.white} size="large" />
          ) : (
            <>
              <ConversionInput
                text={baseCurrency}
                value={value}
                onButtonPress={() =>
                  navigation.push("CurrencyList", {
                    title: "Base Currency",
                    isBaseCurrency: true,
                  })
                }
                keyboardType="numeric"
                onChangeText={(text) => setValue(text)}
              />
              <ConversionInput
                text={quoteCurrency}
                value={
                  value && `${(parseFloat(value) * currencyRate).toFixed(2)}`
                }
                onButtonPress={() =>
                  navigation.push("CurrencyList", {
                    title: "Quote Currency",
                    isBaseCurrency: false,
                  })
                }
                editable={false}
              />

              <Text style={styles.text}>
                {`1 ${baseCurrency} = ${currencyRate} ${quoteCurrency} as of ${
                  date && format(new Date(date), "MMM do, yyyy")
                }`}
              </Text>

              <Button
                text={"Reverse Currencies"}
                onPress={() => swapCurrencies()}
              />
            </>
          )}

          <KeyboardSpacer onToggle={(visible) => setScrollEnabled(visible)} />
        </View>
      </ScrollView>
    </View>
  );
};
