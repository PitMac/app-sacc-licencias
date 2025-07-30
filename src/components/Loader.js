import React from "react";
import { StyleSheet, View, Modal } from "react-native";
import { PacmanIndicator } from "react-native-indicators";
import { PRIMARY_COLOR } from "../utils/colors";

const Loader = (props) => {
  const { loading, modalStyle, indicatorStyle } = props;
  return (
    <Modal
      transparent={true}
      animationType={"fade"}
      visible={loading}
      onRequestClose={() => {}}
    >
      <View style={[styles.modalBackground, modalStyle]}>
        <View style={[styles.activityIndicatorWrapper, indicatorStyle]}>
          <PacmanIndicator color={PRIMARY_COLOR} size={60} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "space-around",
    backgroundColor: "#00000080",
    zIndex: 1000,
  },
  activityIndicatorWrapper: {
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
  },
});

export default Loader;
