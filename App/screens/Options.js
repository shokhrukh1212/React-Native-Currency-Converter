import { Alert, Linking, SafeAreaView, ScrollView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../constants/colors";
import { RowItem } from "../components/RowItem";

export default () => {
  const openUrl = (url) => {
    return Linking.openURL(url).catch(() => {
      Alert.alert("Sorry, something went wrong.", "Please try again later");
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />

      <ScrollView>
        <RowItem
          onPress={() => alert("todo!")}
          text={"Themes"}
          rightIcon={
            <Entypo name="chevron-right" size={20} color={colors.blue} />
          }
        />

        <RowItem
          onPress={() =>
            openUrl("https://reactnative.dev/docs/getting-started")
          }
          text={"React Native Basics"}
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />

        <RowItem
          onPress={() => openUrl("https://reactnativebyexample.com")}
          text={"React Native by example"}
          rightIcon={<Entypo name="export" size={20} color={colors.blue} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
};
