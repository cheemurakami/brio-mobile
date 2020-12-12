import * as React from "react";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import DashMainStackScreen from "./dashboard/dash_navigation/DashMainStackScreen";
import DashHomeStackScreen from "./dashboard/dash_navigation/DashHomeStackScreen";
import DashProfileStackScreen from "./dashboard/dash_navigation/DashProfileStackScreen";
import SvgStarMainIcon from "../../svg_assets/SvgStarMainIcon";
import SvgHomeIcon from "../../svg_assets/SvgHomeIcon";
import SvgProfileIcon from "../../svg_assets/SvgProfileIcon";

const Tab = createMaterialBottomTabNavigator();

export default function StandardNavigation() {
  return (
    <>
      <Tab.Navigator
        initialRouteName="dashboardMain"
        activeColor="#757272"
        inactiveColor="#ECC08D"
        barStyle={{ backgroundColor: "#D9FFFFFF" }}
      >
        <Tab.Screen
          name="dashboardMain"
          component={DashMainStackScreen}
          options={{
            tabBarLabel: "Overview",
            tabBarIcon: ({ color }) => (
              <SvgStarMainIcon name="star" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="dashboardHome"
          component={DashHomeStackScreen}
          options={{
            tabBarLabel: "Home",
            tabBarIcon: ({ color }) => (
              <SvgHomeIcon name="group" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name="profile"
          component={DashProfileStackScreen}
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color }) => (
              <SvgProfileIcon name="account" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
}
