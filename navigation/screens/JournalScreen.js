import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, StyleSheet, Button, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


// Liste des plats avec leurs valeurs nutritionnelles et taille de portion
const mealsData = [
  { id: 1, name: 'Salade Niçoise', lipides: 20, glucides: 10, proteines: 15, calories: 250, portionSize: '200g' },
  { id: 2, name: 'Poulet rôti', lipides: 15, glucides: 5, proteines: 30, calories: 300, portionSize: '150g' },
  { id: 3, name: 'Lasagnes', lipides: 25, glucides: 40, proteines: 20, calories: 500, portionSize: '300g' },
  { id: 4, name: 'Saumon grillé', lipides: 12, glucides: 0, proteines: 25, calories: 220, portionSize: '180g' },
  { id: 5, name: 'Riz au curry', lipides: 10, glucides: 50, proteines: 5, calories: 350, portionSize: '250g' },
];

export default function JournalScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMeals, setSelectedMeals] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Filtrer les plats en fonction de la recherche
  const filteredMeals = mealsData.filter(meal =>
    meal.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Fonction pour ajouter un plat dans la liste quotidienne avec une portion par défaut de 1
  const handleAddMeal = (meal) => {
    setSelectedMeals([...selectedMeals, { ...meal, portion: 1 }]);
    setSearchQuery('');
    setIsModalVisible(false); // Fermer la modal après avoir ajouté un plat
  };

  // Fonction pour supprimer un plat de la liste
  const handleRemoveMeal = (mealId) => {
    setSelectedMeals(selectedMeals.filter(meal => meal.id !== mealId));
  };

  // Fonction pour ajuster la portion d'un plat
  const handlePortionChange = (mealId, newPortion) => {
    setSelectedMeals(selectedMeals.map(meal =>
      meal.id === mealId ? { ...meal, portion: newPortion } : meal
    ));
  };

  // Calcul des totaux des nutriments avec prise en compte des portions
  const totalLipides = selectedMeals.reduce((total, meal) => total + meal.lipides * meal.portion, 0);
  const totalGlucides = selectedMeals.reduce((total, meal) => total + meal.glucides * meal.portion, 0);
  const totalProteines = selectedMeals.reduce((total, meal) => total + meal.proteines * meal.portion, 0);
  const totalCalories = selectedMeals.reduce((total, meal) => total + meal.calories * meal.portion, 0);

  return (
    <View style={styles.container}>
      {/* Barre de recherche (ouvre la modal) */}
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)} style={{ flexDirection: 'row', flex: 1 }}>
          <Icon name="search" size={20} color="#767676" style={styles.searchIcon} />
          <Text style={styles.searchInput} placeholder="Rechercher un plat..." placeholderTextColor="#767676"/>
        </TouchableOpacity>
      </View>

      {/* Modal pour afficher les plats et la barre de recherche */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={false}
      >
        <View style={styles.modalContainer}>
          {/* Bouton pour fermer la modal */}
          <TouchableOpacity onPress={() => setIsModalVisible(false)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>

          {/* Barre de recherche */}
          <TextInput
            style={styles.modalSearchInput}
            placeholder="Rechercher un plat..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            autoFocus
          />

          {/* Liste des plats filtrés */}
          <FlatList
            data={filteredMeals}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.mealItem} onPress={() => handleAddMeal(item)}>
                <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.mealImage} />
                <View style={styles.mealDetailsContainer}>
                  <Text style={styles.mealName}>{item.name}</Text>
                  <Text style={styles.mealDetails}>Calories: {item.calories} kcal</Text>
                  <Text style={styles.mealDetails}>Lipides: {item.lipides}g, Glucides: {item.glucides}g, Protéines: {item.proteines}g</Text>
                  <Text style={styles.mealDetails}>Taille de portion: {item.portionSize}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>

      <View style={styles.dateContainer}>
        <Icon name="calendar" size={20} color="#767676" style={styles.calendarIcon} />
        <Text style={styles.dateText}>{new Date().toLocaleDateString()}</Text>
      </View>

      {/* Liste des plats sélectionnés */}
      <Text style={styles.selectedTitle}>Ce que vous avez mangé :</Text>
      <FlatList
        data={selectedMeals}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.selectedMealItem}>
            <View style={styles.selectedMealInfo}>
              <Text style={styles.selectedMealName}>{item.name}</Text>
              <Text style={styles.selectedMealDetails}>
                Calories: {item.calories * item.portion} kcal
              </Text>
              <Text style={styles.selectedMealDetails}>
                Lipides: {item.lipides * item.portion}g
              </Text>
              <Text style={styles.selectedMealDetails}>
                Protéines: {item.proteines * item.portion}g
              </Text>
              <Text style={styles.selectedMealDetails}>
                Glucides: {item.glucides * item.portion}g
              </Text>
              <Text style={styles.selectedMealDetails}>
                Portion: {item.portionSize}
              </Text>
            </View>
            <View style={styles.portionContainer}>
              <View style={styles.portionControl}>
                <TouchableOpacity 
                  style={styles.portionButton} 
                  onPress={() => handlePortionChange(item.id, item.portion - 1)}
                  disabled={item.portion <= 1} // Désactiver si la portion est 1 ou moins
                >
                  <Text style={styles.portionButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.portionCount}>{item.portion}</Text>
                <TouchableOpacity 
                  style={styles.portionButton} 
                  onPress={() => handlePortionChange(item.id, item.portion + 1)}
                >
                  <Text style={styles.portionButtonText}>+</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity 
                style={[styles.removeButton, styles.portionButton]} // Utilisation de la même longueur que les boutons + et -
                onPress={() => handleRemoveMeal(item.id)}
              >
                <Text style={styles.removeButtonText}>Retirer</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />





      {/* Totaux */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total Calories: {totalCalories} kcal</Text>
        <Text style={styles.totalText}>Total Lipides: {totalLipides}g</Text>
        <Text style={styles.totalText}>Total Glucides: {totalGlucides}g</Text>
        <Text style={styles.totalText}>Total Protéines: {totalProteines}g</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  searchContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
  },
  searchIcon: {
      marginRight: 10,
      justifyContent: 'center', 
      alignSelf: 'center',
  },
  searchInput: {
      flex: 1,
      height: 40,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  modalSearchInput: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    color: 'red',
    fontWeight: 'bold',
  },
  mealItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  mealImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  mealDetailsContainer: {
    flex: 1,
  },
  mealName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  mealDetails: {
    fontSize: 14,
    color: '#666',
  },
  selectedTitle: {
    marginTop: 20,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  selectedMealItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between', // Aligner les éléments à gauche et à droite
    padding: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    backgroundColor: '#f9f9f9', // Couleur de fond plus claire pour l'élément
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 3,
  },
  selectedMealInfo: {
    flex: 1,
    marginRight: 10,
  },
  selectedMealName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedMealDetails: {
    fontSize: 14,
    color: '#666',
    marginVertical: 2, // Aérer les détails
  },
  portionContainer: {
    flexDirection: 'column', // Disposition verticale pour les contrôles de portion
    alignItems: 'flex-end', // Aligner à droite
    justifyContent: 'space-between',
  },
  portionControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  portionButton: {
    backgroundColor: '#A3D288', // Couleur verte pour les boutons
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  portionButtonText: {
    color: '#fff', // Texte en blanc
    fontSize: 18,
    fontWeight: 'bold',
  },
  portionCount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: '#d9534f',
    borderRadius: 5,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, // Espace au-dessus du bouton Retirer
  },
  removeButtonText: {
    color: '#fff',
  },
  portionInput: {
    width: 50,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginHorizontal: 10,
    paddingHorizontal: 5,
  },
  totalContainer: {
    padding: 15,
    margin: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10, 
    shadowColor: '#000', 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.2, 
    shadowRadius: 4, 
    elevation: 3, 
  },
  totalText: {
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#333', 
    marginVertical: 5,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    marginHorizontal: 10,
    marginBottom: 10,
  },
  calendarIcon: {
      marginRight: 10,
  },
});
