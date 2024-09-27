// Check also link 2020050608

import React, { useEffect, useState, useRef } from "react";
import { Formik } from "formik";
import { Form, Root, Text, View } from "native-base";
import _ from "lodash";
import NextButton from "../views/SignRegister/NextButton";
import { HandleError, isClear } from "./index";
import { SafeAreaView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BackButton from "../views/SingleActivity/WizardComponents/BackButton";
import UpcomingButton from "../views/SingleActivity/WizardComponents/UpcomingButton";
import MainColors from "../constants/MainColors";
import PageSkeleton from "./PageSkeleton";
export const PrepareBase = (props) => {
  const [state, setState] = useState({});
  const scrollViewRef = useRef(null);

  const HandleSubmit = (useValue, formActions) => {
    // Submit only on last page
    if (
      !isClear(props.wizardState) &&
      props.wizardState.currentPage !== props.wizardState.maxPages
    ) {
      formActions.setSubmitting(false);
      return;
    }

    const finalRedirect = (id) => {
      if (typeof props.finalCommand === "function") {
        props.finalCommand(id);
      }
    };

    const { dataMode } = useValue;
    if (typeof props.onSubmitTransform === "function") {
      useValue = props.onSubmitTransform(useValue);
    }

    if (dataMode === "insert") {
      props.externalApi
        .insertDocument(useValue)
        .then((response) => {
          finalRedirect(response.data.id);
        })
        .catch(HandleError)
        .finally(() => {
          formActions.setSubmitting(false);
        });
    } else if (dataMode === "update") {
      props.externalApi
        .updateDocument(useValue)
        .then((response) => {
          finalRedirect(response.data.id);
        })
        .catch(HandleError)
        .finally(() => {
          formActions.setSubmitting(false);
        });
    }
  };

  // Review any number value, undefined value, null values
  // {firstField: null, numberField: undefined, thirdField: 0} -> {firstField: '', numberField: '', thirdField: '0'}
  const NullToEmpty = (value) => {
    if (_.isNumber(value)) {
      return value.toString();
    }

    return _.isNil(value) ? "" : undefined;
  };

  const ModifyInfo = (data) => {
    if (typeof props.onStartTransform === "function") {
      data = props.onStartTransform(data);
    }
    setState(data);
  };

  const SetInsertMode = (data) => {
    data.precursory = _.cloneDeep(data);
    data.dataMode = "insert";
    ModifyInfo(data);
  };

  useEffect(() => {
    if (!isClear(props.id)) {
      props.externalApi
        .retrieveDocument(props.id)
        .then(
          /**
           *
           * @param {string} data.dataMode
           * @param {any} data.precursory
           */
          ({ data }) => {
            // console.log('beforeClone', data)
            data.precursory = _.cloneDeep(data);
            data.dataMode = "update";
            data = _.cloneDeepWith(data, NullToEmpty);
            // console.log('afterClone', data)
            ModifyInfo(data);
          }
        )
        .catch((error) => {
          setState({ dataMode: "error" });
          HandleError(error);
        });
    } else {
      const data = props.initialValues;
      if (typeof props.externalApi.initializeDocument === "function") {
        props.externalApi
          .initializeDocument()
          .then((allResponse) => {
            data.initialized = allResponse.data;
            SetInsertMode(data);
          })
          .catch((error) => {
            setState({ dataMode: "error" });
            HandleError(error);
          });
      } else {
        SetInsertMode(data);
      }
    }
  }, []);

  if (state.dataMode === "error") {
    return <Text>Error</Text>;
  } else if (state.dataMode === "insert" || state.dataMode === "update") {
    return (
      <Root>
        <SafeAreaView
          style={{ flex: 1, backgroundColor: MainColors.cleanWhite }}
        >
          <KeyboardAwareScrollView
            innerRef={(ref) => {
              scrollViewRef.current = ref;
            }}
            keyboardShouldPersistTaps="handled"
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <Formik
              initialValues={state}
              validationSchema={props.validationSchema}
              validate={props.validate}
              validateOnChange={!props.fastValidation}
              validateOnBlur={!props.fastValidation}
              onSubmit={HandleSubmit}
            >
              {(formProps) => (
                <Form style={{ marginBottom: 10 }}>
                  {props.children(formProps)}
                  {isClear(props.wizardState) && (
                    <NextButton
                      onHandleSubmit={formProps.handleSubmit}
                      isSubmitting={formProps.isSubmitting}
                      nextText={props.nextText}
                    />
                  )}
                  {!isClear(props.wizardState) && (
                    <View style={{ flexDirection: "row" }}>
                      <BackButton
                        wizardState={props.wizardState}
                        setWizardState={props.setWizardState}
                        scrollViewRef={scrollViewRef}
                      />
                      <UpcomingButton
                        wizardState={props.wizardState}
                        setWizardState={props.setWizardState}
                        onHandleSubmit={formProps.handleSubmit}
                        isSubmitting={formProps.isSubmitting}
                        nextText={props.nextText}
                        scrollViewRef={scrollViewRef}
                        {...formProps}
                      />
                    </View>
                  )}
                </Form>
              )}
            </Formik>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </Root>
    );
  } else {
    return <PageSkeleton isLoading />;
  }
};
