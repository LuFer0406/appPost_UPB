import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SPACING } from "../config/spacing.js";
import { colors } from "../config/colors.js";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

export default function Post({ post }) {

  const navigation = useNavigation();
  return (
    <LinearGradient
      key={post._id}
      colors={[colors["dark-gray"], colors.black]}
      style={styles.gradient}
    >
      <Image
        style={styles.image}
        resizeMode="contain"
        source={{ uri: post.imgUrl }}
      />

      <Text style={styles.title}>{post.title}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonRadius}
          onPress={() => navigation.navigate("DetailScreen", post._id)}
        >
          <LinearGradient
            style={styles.gradientTwo}
            colors={[colors["dark-gray"], colors.dark]}
          >
            <Ionicons
              name="arrow-forward"
              color={colors.light}
              size={30}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    height: 250,
    borderRadius: SPACING * 2,
    padding: SPACING * 2,
    marginBottom: SPACING * 2,
  },
  image: {
    width: "100%",
    height: 160,
  },
  title: {
    color: colors.light,
    fontSize: SPACING * 1.7,
    fontWeight: "700",
    marginBottom: SPACING,
  },

  buttonContainer: { alignItems: "center" },
  buttonRadius: {
    overflow: "hidden",
    borderRadius: SPACING / 2,
  },
  gradientTwo: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
