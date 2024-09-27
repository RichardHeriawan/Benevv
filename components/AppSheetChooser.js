import { HandleError, isClear } from "./index";
import produce from "immer";
import { Button, Icon, Spinner, Text } from "native-base";
import _ from "lodash";
import MainColors from "../constants/MainColors";
import React, { useRef, useState } from "react";
import { TouchableOpacity, ScrollView, View } from "react-native";
import CloseButton from "./CloseButton";
import SearchInput from "./SearchInput";
import AppSheet from "./AppSheet";
import { useDebouncedCallback } from "use-debounce";
import { Api } from "../apis/Api";
import MemberCardRemove from "./MemberCardRemove";
import MemberCardToggle from "./MemberCardToggle";
import { HeaderBase } from "../navigation/HeaderOptions";
import MainStyles from "../constants/MainStyles";
import NoSearchResult from "./NoSearchResult";

export default (props) => {
  const primaryLevel = 10;
  const refSheet = !isClear(props.refSheet) ? props.refSheet : useRef();
  const [state, SetState] = useState({});

  const [RemoteSearch] = useDebouncedCallback((searchText) => {
    Api.post(props.searchInterface, { ...props.searchParameters, searchText })
      .then((response) => {
        // To compare id property as int
        const responseIds = response.data.map(
          (actualItem) => actualItem.id * 1
        );

        const selectedItems = props.actualMembers.filter(
          (filterItem) => filterItem.isSelected
        );

        // To compare id property as int
        const memberIds = selectedItems.map((actualItem) => actualItem.id * 1);

        // Merge response data to existing selected members
        const unionItems = [
          ...selectedItems,
          ...props.interfaceTransform(
            response.data
              .filter((filterItem) => !memberIds.includes(filterItem.id * 1))
              .map((mapItem) => ({
                ...mapItem,
                isSelected: false,
              }))
          ),
        ];

        props.setMembers(
          unionItems.map((mapItem) => ({
            ...mapItem,
            isShown: responseIds.includes(mapItem.id * 1),
          }))
        );

        SetState(
          produce((draftState) => {
            draftState.isSearchLoading = false;
          })
        );
      })
      .catch(HandleError);
  }, 500);

  const PickMember = () => {
    StartPicking();
    SearchedChange("");
    refSheet.current.open();
  };

  const StartPicking = () => {
    if (isClear(props.searchInterface)) {
      // Show all elements
      props.setMembers(
        props.actualMembers.map((actualItem) => ({
          ...actualItem,
          isShown: true,
        }))
      );
    } else {
      // Show selected elements
      props.setMembers(
        props.actualMembers.map((actualItem) => ({
          ...actualItem,
          isShown: actualItem.isSelected,
        }))
      );
    }
  };

  const SearchedChange = (changedText) => {
    SetState(
      produce((draftState) => {
        draftState.searchText = changedText;
        draftState.isSearchLoading = true;
      })
    );
    if (isClear(props.searchInterface)) {
      // Local search
      const myText = new RegExp(changedText, "i");
      props.setMembers(
        props.actualMembers.map((mapItem) => ({
          ...mapItem,
          isShown:
            myText.test(mapItem.member_name) ||
            myText.test(mapItem.member_extra),
        }))
      );
      SetState(
        produce((draftState) => {
          draftState.isSearchLoading = false;
        })
      );
    } else {
      RemoteSearch(changedText);
    }
  };

  const ToggleMember = (currentMember) => {
    const duplicatedMembers = _.cloneDeep(props.actualMembers);
    duplicatedMembers.find(
      (actualItem) => actualItem.id === currentMember.id
    ).isSelected = !currentMember.isSelected;
    props.setMembers(duplicatedMembers);
  };

  const onBackToSearch = () => {
    // TODO: fix this and somehow clear the search text
    SetState(
      produce((draftState) => {
        draftState.searchText = "";
      })
    );

    SearchedChange("");
  };

  return (
    <>
      <TouchableOpacity
        style={{
          ...MainStyles.appTextItem,
          flexDirection: "row",
          alignItems: "center",
          paddingVertical: 3,
        }}
        onPress={PickMember}
      >
        <Icon
          type="Ionicons"
          name="ios-add-circle-outline"
          style={{ color: MainColors.primary }}
        />
        <Text
          style={{ paddingLeft: primaryLevel }}
        >{`Add related ${props.titleValue.split(" ").splice(-1)}`}</Text>
      </TouchableOpacity>
      {props.actualMembers
        .filter((actualItem) => actualItem.isSelected)
        .map((mapItem) => (
          <MemberCardRemove
            key={mapItem.id}
            imageUrl={mapItem.image_url}
            memberName={mapItem.member_name}
            onPress={() => ToggleMember(mapItem)}
          />
        ))}
      <AppSheet refSheet={refSheet}>
        <View style={{ flex: 1, paddingVertical: primaryLevel }}>
          <CloseButton OnButtonPress={() => refSheet.current.close()} />
          <View style={{ paddingHorizontal: primaryLevel }}>
            <Text style={HeaderBase}>{props.titleValue}</Text>
            <SearchInput onChangeText={SearchedChange} />
          </View>
          <ScrollView style={{ paddingHorizontal: primaryLevel }}>
            {state.isSearchLoading && <Spinner color={MainColors.primary} />}
            {!state.isSearchLoading && (
              <>
                {props.actualMembers.filter((actualItem) => actualItem.isShown)
                  .length === 0 && (
                  <View>
                    <NoSearchResult />
                    <Button
                      onPress={onBackToSearch}
                      style={{ marginTop: 40, alignSelf: "center" }}
                    >
                      <Text>Back to Search</Text>
                    </Button>
                  </View>
                )}
                {props.actualMembers
                  .filter((actualItem) => actualItem.isShown)
                  .map((mapItem) => (
                    <MemberCardToggle
                      key={mapItem.id}
                      imageUrl={mapItem.image_url}
                      memberName={mapItem.member_name}
                      memberSubtitle={mapItem.member_subtitle}
                      isSelected={mapItem.isSelected}
                      onPress={() => ToggleMember(mapItem)}
                    />
                  ))}
              </>
            )}
          </ScrollView>
          <View
            style={{
              justifyContent: "flex-end",
              paddingHorizontal: primaryLevel,
              paddingTop: primaryLevel,
            }}
          >
            {!state.searchText && (
              <Button
                onPress={() => {
                  if (typeof props.onDone === "function") {
                    props.onDone();
                  }

                  refSheet.current.close();
                }}
              >
                <Text>Done</Text>
              </Button>
            )}
          </View>
        </View>
      </AppSheet>
    </>
  );
};
