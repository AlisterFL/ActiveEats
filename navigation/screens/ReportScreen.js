import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { TouchableOpacity } from "react-native-gesture-handler";

const screenWidth = Dimensions.get("window").width;

// Données prédéfinies pour la semaine
const weeklyCaloriesData = [2000, 2050, 1750, 2300, 2000, 2000, 1800];
const weeklyLipidsData = [80, 90, 77, 89, 68, 70, 102];
const weeklyCarbsData = [250, 200, 300, 320, 310, 330, 340];
const weeklyProteinData = [120, 100, 130, 140, 70, 120, 100];

const targetCalories = 2000; // Objectif calorique quotidien
const targetLipids = 80; // Objectif en grammes de lipides
const targetCarbs = 300; // Objectif en grammes de glucides
const targetProteins = 150; // Objectif en grammes de protéines

const ReportScreen = () => {
  const [weeklyCalories] = useState(weeklyCaloriesData);
  const [weeklyLipids] = useState(weeklyLipidsData);
  const [weeklyCarbs] = useState(weeklyCarbsData);
  const [weeklyProteins] = useState(weeklyProteinData);

  // Simulation d'une semaine de sport
  const [sportWeek, setSportWeek] = useState([true, true, true, false, true, false, true]);

  return (
    
    <ScrollView contentContainerStyle={styles.container}>
      {/* Titre principal */}
      <Text style={styles.title}>Rapport Hebdomadaire</Text>

      {/* Planning de la semaine avec indicateur de sport */}
      <Text style={styles.weekTitle}>Planning de la semaine (Sport)</Text>
      <View style={styles.weekContainer}>
        {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.dayBox,
              sportWeek[index] ? styles.dayActive : styles.dayInactive,
            ]}
          >
            <Text style={styles.dayText}>{day}</Text>
            {sportWeek[index] && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
        ))}
      </View>

      {/* Graphique des calories */}
      <Text style={styles.graphTitle}>Objectif de calories</Text>
      <BarChart
        data={{
          labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          datasets: [
            {
              data: weeklyCalories,
              color: (opacity = 1) => `rgba(163, 210, 136, ${opacity})`, // Couleur des calories
            },
            {
              data: Array(7).fill(targetCalories), // Ligne d'objectif pour les calories
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Couleur de la ligne d'objectif
              strokeDasharray: [5, 5], // Ligne en pointillé
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix=""
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f0f0f0",
          backgroundGradientTo: "#f0f0f0",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(163, 210, 136, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForBackgroundLines: {
            strokeDasharray: "4",
          },
        }}
        style={styles.chart}
      />

      {/* Graphique des lipides */}
      <Text style={styles.graphTitle}>Objectif de lipides (g)</Text>
      <BarChart
        data={{
          labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          datasets: [
            {
              data: weeklyLipids,
            },
            {
              data: Array(7).fill(targetLipids), // Ligne d'objectif pour les lipides
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Couleur de la ligne d'objectif
              strokeDasharray: [5, 5], // Ligne en pointillé
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="g"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f0f0f0",
          backgroundGradientTo: "#f0f0f0",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(163, 210, 136, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      {/* Graphique des glucides */}
      <Text style={styles.graphTitle}>Objectif de glucides (g)</Text>
      <BarChart
        data={{
          labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          datasets: [
            {
              data: weeklyCarbs,
              color: (opacity = 1) => `rgba(163, 210, 136, ${opacity})`, // Couleur des glucides
            },
            {
              data: Array(7).fill(targetCarbs), // Ligne d'objectif pour les glucides
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Couleur de la ligne d'objectif
              strokeDasharray: [5, 5], // Ligne en pointillé
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="g"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f0f0f0",
          backgroundGradientTo: "#f0f0f0",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(163, 210, 136, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />

      {/* Graphique des protéines */}
      <Text style={styles.graphTitle}>Objectif de protéines (g)</Text>
      <BarChart
        data={{
          labels: ["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
          datasets: [
            {
              data: weeklyProteinData,
            },
            {
              data: Array(7).fill(targetProteins), // Ligne d'objectif pour les protéines
              color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`, // Couleur de la ligne d'objectif
              strokeDasharray: [5, 5], // Ligne en pointillé
            },
          ],
        }}
        width={screenWidth - 40}
        height={220}
        yAxisSuffix="g"
        chartConfig={{
          backgroundColor: "#ffffff",
          backgroundGradientFrom: "#f0f0f0",
          backgroundGradientTo: "#f0f0f0",
          decimalPlaces: 1,
          showValuesOnTopOfBars: true,
          color: (opacity = 1) => `rgba(163, 210, 136, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
        style={styles.chart}
      />
    </ScrollView>
  );
};

// Styles de la page et des éléments
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2c3e50",
    textAlign: "center",
    marginBottom: 20,
  },
  graphTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 10,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  weekContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayBox: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  dayActive: {
    backgroundColor: "#A3D288",
  },
  dayInactive: {
    backgroundColor: "#d6d6d6",
  },
  dayText: {
    color: "#ffffff",
  },
  checkmark: {
    color: "#ffffff",
    marginTop: 2,
  },
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    padding: 5,
  },
});

export default ReportScreen;
