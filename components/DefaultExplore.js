import React from "react";
import HeadText from "./HeadText";
import { TouchableOpacity, FlatList } from "react-native";
import AvatarImage from "./AvatarImage";
import { ActionSheet, Icon, View } from "native-base";
import MainStyles from "../constants/MainStyles";
import MainColors from "../constants/MainColors";
import moment from "moment";
import ScrollHorizontal from "./ScrollHorizontal";
import EventsList from "./EventsList";
import MainLayout from "../constants/MainLayout";
import { useTranslation } from "react-i18next";
import { useRoute } from "@react-navigation/native";
import CauseSquareCard from "./CauseSquareCard";

export default (props) => {
  const [t] = useTranslation("global");
  const route = useRoute();

  return (
    <>
      <ScrollHorizontal>
        {props.userList.map((data, key) => {
          return (
            <AvatarImage
              socialAvatarUrl={data.socialAvatarUrl}
              name={data.name}
              key={key}
              navigation={props.navigation}
              id={data.id}
              route={route}
            />
          );
        })}
      </ScrollHorizontal>
      {
        // Problematic region
      }
      <HeadText medium>{t("explore-page.causes")}:</HeadText>
      <FlatList
        data={props.causeList}
        horizontal
        renderItem={({ item }) => (
          <CauseSquareCard
            isSmall
            causeId={item.id}
            entityId={props.causeList.id}
            entityType={"cause"}
            templateType={props.templateType}
            isRelatedToYou={null}
            key={item.id}
            itemUrl={item.cause_image}
            itemName={item.cause_name}
            navigation={props.navigation}
          />
        )}
      />
      <HeadText medium>{t("explore-page.featured-non-profits")}:</HeadText>
      <ScrollHorizontal>
        {props.nonProfitList.map((data, key) => {
          return (
            <AvatarImage
              socialAvatarUrl={data.socialAvatarUrl}
              navigation={props.navigation}
              name={data.name}
              key={key}
              id={data.id}
              route={route}
            />
          );
        })}
      </ScrollHorizontal>
      <HeadText medium>{t("explore-page.featured-brands")}:</HeadText>
      <ScrollHorizontal>
        {props.testBrands.map((data, key) => {
          return (
            <AvatarImage
              socialAvatarUrl={data.socialAvatarUrl}
              navigation={props.navigation}
              name={data.name}
              key={key}
              id={data.id}
              route={route}
            />
          );
        })}
      </ScrollHorizontal>
      <HeadText medium>{t("explore-page.featured-influencers")}:</HeadText>
      <ScrollHorizontal>
        {props.influencerList.map((data, key) => {
          return (
            <AvatarImage
              socialAvatarUrl={data.socialAvatarUrl}
              name={data.name}
              key={key}
              navigation={props.navigation}
              id={data.id}
            />
          );
        })}
      </ScrollHorizontal>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 20 }}
      >
        <View style={{ flex: 1 }}>
          <HeadText medium noMargin>
            {t("explore-page.events")}:
          </HeadText>
        </View>
        <TouchableOpacity
          style={MainStyles.iconContainer}
          onPress={() => {
            ActionSheet.show(
              {
                options: props.filterOptions,
                title: "Filter by",
                cancelButtonIndex: 5,
              },
              (buttonIndex) => {
                const useDate = "Y-MM-D";
                const tomorrowDate = moment().add(1, "day").local();
                if (buttonIndex === 0) {
                  props.SearchStartEnd();
                } else if (buttonIndex === 1) {
                  props.SearchStartEnd(
                    moment().local().format(useDate),
                    tomorrowDate.format(useDate)
                  );
                } else if (buttonIndex === 2) {
                  const dayAfterDate = moment().add(2, "day").local();
                  props.SearchStartEnd(
                    tomorrowDate.format(useDate),
                    dayAfterDate.format(useDate)
                  );
                } else if (buttonIndex === 3) {
                  const startDate = moment().startOf("week").local();
                  const endDate = moment().endOf("week").add(1, "day").local();
                  props.SearchStartEnd(
                    startDate.format(useDate),
                    endDate.format(useDate)
                  );
                } else if (buttonIndex === 4) {
                  const startDate = moment().startOf("month").local();
                  const endDate = moment().endOf("month").add(1, "day").local();
                  props.SearchStartEnd(
                    startDate.format(useDate),
                    endDate.format(useDate)
                  );
                }
              }
            );
          }}
        >
          <Icon
            type="FontAwesome5"
            name="ellipsis-h"
            style={{
              color: MainColors.cleanWhite,
              fontSize: MainLayout.iconMedium,
            }}
          />
        </TouchableOpacity>
      </View>
      <EventsList
        navigation={props.navigation}
        actualEvents={props.feedItems}
        pageId={route.key}
        pageName={route.name}
      />
    </>
  );
};
