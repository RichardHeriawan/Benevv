import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { View, Text, Spinner } from "native-base";
import CloseButton from "../CloseButton";
import Comment from "./Comment";
import CommentInput from "./CommentInput";
import { GetComments } from "../../apis/Api";
import produce from "immer";
import { useTranslation } from "react-i18next";
import MainColors from "../../constants/MainColors";

const CommentModal = ({ navigation, hide, onClose, type, id, userId }) => {
  if (hide) {
    return null;
  }
  const [state, setState] = useState({ comment: [] });
  const [loading, setLoading] = useState(true);

  const scrollRef = useRef();

  const addComment = (newComment) => {
    setState((prevState) => ({ comment: [...prevState.comment, newComment] }));
  };

  const getComments = () => {
    GetComments(id)
      .then((response) => {
        setState(
          produce((draft) => {
            draft.comment = response.data;
          })
        );
        setLoading(false);
      })
      .catch((error) => {
        console.log(JSON.stringify(error));
      });
  };
  //componentDidMount
  useEffect(() => {
    getComments();
  }, []);

  const [t] = useTranslation("global");

  return (
    <Modal transparent={true}>
      <View style={styles.modalViewWrapper}>
        <View style={styles.modalView}>
          <View style={styles.modalHeader}>
            <Text style={styles.title}>{t("comments-page.comments")}</Text>
            <CloseButton OnButtonPress={() => onClose()}></CloseButton>
          </View>
          <CommentInput
            style={{ marginTop: 0, backgroundColor: "white" }}
            type={type}
            id={id}
            userId={userId}
            addComment={addComment}
            scrollRef={scrollRef}
          />
          <ScrollView style={styles.modalContent} ref={scrollRef}>
            <KeyboardAvoidingView style={{ flex: 1 }}>
              {state.comment
                .slice(0)
                .reverse()
                .map((comment, index) => (
                  <Comment
                    navigation={navigation}
                    key={index}
                    username={comment.user.name}
                    userId={comment.user.user_id}
                    timestamp={comment.timestamp}
                    pic={comment.user.user_img_xsmall}
                  >
                    {comment.body}
                  </Comment>
                ))}
              <View style={{ paddingBottom: 10 * 2, alignItems: "center" }}>
                {loading ? <Spinner color={MainColors.primary} /> : <></>}
              </View>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalViewWrapper: {
    backgroundColor: "#00000080",
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    marginTop: "auto",
    height: "95%",
    backgroundColor: "white",
  },
  modalHeader: {
    flexDirection: "row",
    padding: 15,
  },
  title: {
    fontSize: 35,
    paddingTop: 15,
    fontWeight: "bold",
  },
  modalContent: {
    flexDirection: "column",
    marginHorizontal: 15,
  },
});

export default CommentModal;
