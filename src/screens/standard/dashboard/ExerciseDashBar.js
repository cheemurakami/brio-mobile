import React from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { ProgressBar } from "react-native-paper";
import SvgExercise from "../../../svg_assets/SvgExercise";

export const ExerciseDashBar = (props) => {
  const { allBlockers } = props;
  const exerciseBlockers = allBlockers.filter(
    (blocker) => blocker.category === "exercise"
  );
  const sortedBlockersByCompletedAt = exerciseBlockers.sort(function (a, b) {
    return b.completedAt - a.completedAt;
  });
  const mostRecentCompletedBlocker = sortedBlockersByCompletedAt[0];

  const mostRecentCompletedDate = mostRecentCompletedBlocker.completedAt;

  const totalExercisePtsArr = exerciseBlockers.map((blocker) => {
    return blocker.points;
  });
  const totalExercisePts = totalExercisePtsArr.reduce((acc, cur) => {
    return acc + cur;
  });

  const ExerciseProgress = () => {
    const completedBlockers = exerciseBlockers.filter(
      (blocker) => blocker.completedAt !== null
    );
    if (completedBlockers && completedBlockers.length > 0) {
      const currentexercisePtsArr = completedBlockers.map(
        (completedBlocker) => {
          return completedBlocker.points;
        }
      );
      const currentExercisePts = currentexercisePtsArr.reduce((acc, cur) => {
        return acc + cur;
      });

      const month = mostRecentCompletedDate.getMonth() + 1;
      const day = mostRecentCompletedDate.getDate();
      const year = mostRecentCompletedDate.getFullYear();

      return (
        <>
          <View>
            <SvgExercise />
            <Text>Exercise</Text>
            <ProgressBar
              progress={currentExercisePts / totalExercisePts}
              color={"#D8A1D5"}
              transform={[{ scaleX: 1.0 }, { scaleY: 4 }]}
            />
            <Text>
              {currentExercisePts} OUT OF {totalExercisePts} COMPLETE
            </Text>
          </View>
        </>
      );
    } else {
      return (
        <>
          <View>
            <SvgExercise />
            <Text>Exercise</Text>
            <ProgressBar
              progress={0}
              color={"#D8A1D5"}
              transform={[{ scaleX: 1.0 }, { scaleY: 4 }]}
            />
            <Text>0 OUT OF {totalExercisePts} COMPLETE</Text>
          </View>
        </>
      );
    }
  };

  return <>{ExerciseProgress()}</>;
};

const mapStateToProps = (state) => {
  return {
    allBlockers: state.blockersState.blockers,
  };
};

export default connect(mapStateToProps)(ExerciseDashBar);
