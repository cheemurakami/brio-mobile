import React from "react";
import { View, Text, Image } from "react-native";
import { List } from "react-native-paper";
import styled from "styled-components/native";
import text from "../../../styles/TextStyle.js";
import bg from "../../../styles/ScreenStyle.js";
import Icon from "react-native-vector-icons/FontAwesome5";
import sArrow from "../../../../assets/Swipe_Arrow.png";
import arrow from "../../../styles/ArrowStyle.js"

function BlockerConvo() {
  const blockers = ["Do you...?", "Are you...?", "Do you have...?"];

  return (
    <View style={bg.grape}>
      <View>
        <Text style={text.header}>Conversation</Text>
      </View>
      <View>
        <Text style={text.text}>Here are 3 blockers for you</Text>
      </View>
      <ListContainer>
        {blockers.map((blocker) => {
          return (
            <List.Item
              key={blocker}
              title={blocker}
              left={(props) => (
                <Icon name="grin" size={30} color="#900" {...props} />
              )}
            />
          );
        })}
      </ListContainer>
      <View style={arrow.bottom}>
        <Image source={sArrow} />
      </View>
    </View>
  );
}

const ListContainer = styled.View`
  margin-top: 36;
  margin-bottom: 36;
  margin-left: 36;
  justify-content: center;
`;

export default BlockerConvo;
