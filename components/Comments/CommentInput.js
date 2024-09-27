import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import {
  ScrollView,
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { PostComment, RetrievePublicProfile } from "../../apis/Api";

const CommentInput = ({
  type,
  id,
  userId,
  addComment,
  scrollRef,
  autoFocus = true,
  refButton,
  page,
}) => {
  const [input, setInput] = useState(null);
  const [focused, setFocused] = useState(true);

  const handleChange = (text) => {
    setInput(text);
  };

  const handleFocus = () => {
    if (page === undefined) {
      scrollRef.current.scrollTo(0);
    }
  };

  const handleSubmit = () => {
    let requestBody = {
      commentType: type,
      commentBody: input,
      userId: userId,
      objectId: id,
    };

    PostComment(requestBody)
      .then(async (response) => {
        setInput("");
        RetrievePublicProfile(userId).then((response) => {
          let tempComment = {
            user: {
              name: response.data.name,
              user_img_xsmall: response.data.socialAvatarUrl,
            },
            body: input,
            timestamp: new Date().getTime(),
          };
          addComment(tempComment);
        });
      })
      .catch((error) => {
        console.log(requestBody);
        if (error.response) {
          console.log(error.response);
        } else if (error.request) {
          console.log(error.request);
        }
      });
  };

  const [t] = useTranslation("global");

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <TextInput
          placeholder={t("comments-page.message")}
          placeholderTextColor="#bdb7b5"
          autoFocus={autoFocus}
          style={styles.input}
          value={input}
          onChangeText={handleChange}
          onFocus={handleFocus}
          ref={refButton}
        />
        <TouchableOpacity
          style={styles.post}
          onPress={handleSubmit}
          disabled={!input}
        >
          <Text>{t("comments-page.post")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: 80,
    justifyContent: "center",
  },
  container: {
    backgroundColor: "#FFF",
    flexDirection: "row",
    borderWidth: 1.5,
    borderColor: "#EEE",
    borderRadius: 40,
    alignItems: "center",
    height: 50,
    width: "95%",
    marginLeft: "auto",
    marginRight: "auto",
  },
  input: {
    flex: 1,
    height: 40,
    fontSize: 15,
    paddingLeft: 15,
  },
  post: {
    height: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CommentInput;
