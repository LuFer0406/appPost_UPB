import {
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { SPACING } from "../config/spacing.js";
import { colors } from "../config/colors.js";
import axios from "axios";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "@expo/vector-icons/Ionicons";
import Post from "../components/Post.jsx";

export default function PostScreen() {
  const isFocused = useIsFocused();
  const navigation = useNavigation();
  const { top } = useSafeAreaInsets();
  const [posts, setPosts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const getPosts = async () => {
    try {
      const { data } = await axios.get("/post");
      setPosts(data.data);
    } catch (error) {
      console.log("Error en la función getPosts", error.message);
    }
  };

  useEffect(() => {
    isFocused && getPosts();
  }, [isFocused]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await getPosts();
    setIsRefreshing(false);
  });

  return (
    <>
      <View style={{ ...styles.container, top: top + 10 }}>
        <Text style={styles.title}>Quiz</Text>
        <Text style={styles.subtitle}>Posts</Text>

        <TouchableOpacity
          style={{ ...styles.button, top }}
          onPress={() => navigation.navigate("PostActionScreen")}
        >
          <LinearGradient
            style={styles.gradient}
            colors={[colors["dark-gray"], colors.dark]}
          >
            <Ionicons
              name="add-circle-outline"
              color={colors.light}
              size={25}
            />
          </LinearGradient>
        </TouchableOpacity>
      </View>

      <FlatList
        data={posts}
        renderItem={({ item }) => <Post post={item} />}
        keyExtractor={(item) => item._id.toString()}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} colors={[colors.light]} progressBackgroundColor={colors["dark-gray"]}/>
        }
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 60,
  },
  title: {
    color: colors.white,
    fontSize: SPACING * 5,
    fontWeight: "700",
  },
  subtitle: {
    color: colors.light,
    margin: SPACING / 2,
  },
  button: {
    overflow: "hidden",
    borderRadius: 5,
    position: "absolute",
    right: 0,
  },
  gradient: {
    paddingHorizontal: SPACING,
    paddingVertical: SPACING / 3,
  },
});
