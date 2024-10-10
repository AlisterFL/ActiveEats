import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  StyleSheet,
  TextInput,
} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import recipeData from '../../data/recipes.json';

const RecipeScreen = () => {
  const [recipesWithAds, setRecipesWithAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [subRecipes, setSubRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    setRecipesWithAds(recipeData.recipes);
    setSubRecipes(recipeData.recipes);
    setLoading(false); 
  }, []);

  // Fonction pour naviguer vers les détails d'une annonce
  const navigateToAdDetails = (adId) => {
    console.log(adId)
    navigation.navigate("AdDetailsScreen", { adId });
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    if (text) {
      const filteredData = recipesWithAds.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredRecipes(filteredData);
    } else {
      setFilteredRecipes(recipesWithAds); // Réinitialiser si la recherche est vide
    }
  };

  // Fonction pour rendre un élément d'annonce
  const renderAdItem = ({ item }) => {
    const truncatedTitle = item.title.length > 50 ? item.title.slice(0, 35) + "..." : item.title;

    // Limite d'affichage des ingrédients
    const MAX_INGREDIENTS = 2;
    const ingredientsToShow = item.ingredients.slice(0, MAX_INGREDIENTS);
    const hasMoreIngredients = item.ingredients.length > MAX_INGREDIENTS;

    return (
      <TouchableOpacity onPress={() => navigateToAdDetails(item.id)}>
        <View style={styles.adContainer}>
          <Image
            source={{ uri: `${item.images[0].image}` }}
            style={styles.adImage}
          />
          <View style={styles.timeContainer}>
            <Text style={styles.timeText}>{item.time} min</Text>
          </View>
          <View style={styles.MoreInfoContainer}>
            <View style={styles.adTitleContainer}>
              <Text style={styles.adTitle}>{truncatedTitle}</Text>
              <View style={styles.ingredientsContainer}>
                {ingredientsToShow.map((ingredient, index) => (
                  <View key={index} style={styles.ingredientCapsule}>
                    <Text style={styles.ingredientText}>{ingredient}</Text>
                  </View>
                ))}
                {hasMoreIngredients && (
                  <View style={styles.ingredientCapsule}>
                    <Text style={styles.ingredientText}>...</Text>
                  </View>
                )}
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Fonction pour rendre un élément de catégorie
  const renderCategoryItem = ({ item }) => (
    <View style={{ padding: 10 }}>
      <Text style={{ fontWeight: "bold", fontSize: 18, color: "#767676", }}>{item.name}</Text>
      <Text style={{ fontWeight: "normal", fontSize: 14, color:"#989696", marginBottom: 20 }}>Plats qui peuvent vous intéresser ...</Text>
      <FlatList
        data={item.ads}
        renderItem={renderAdItem}
        keyExtractor={(ad) => ad.id.toString()}
        horizontal={true}
        contentContainerStyle={styles.scrollViewContent}
      />
    </View>
  );

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await fetchRecipesWithAds();
    } catch (error) {
      console.error("Erreur lors du rafraîchissement des données :", error);
    }
    setRefreshing(false);
  };

  // Affichage d'un indicateur de chargement si les données sont en cours de chargement
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#A3D288" />
      </View>
    );
  }

  // Rendu principal avec la liste des catégories et des annonces
  return (
    <View style={{ flex: 1 ,backgroundColor:"white"}}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#767676" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher une recette"
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={recipesWithAds}
        renderItem={renderCategoryItem}
        keyExtractor={(category) => category.id.toString()}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </View>
  );
};

export default RecipeScreen;

const styles = StyleSheet.create({
  adContainer:{
    width: 220,
    height: 280,
  },
  MoreInfoContainer:{
    flex: 1,
    justifyContent:"space-between"
  },
  searchContainer: {
    margin: 10,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal:10,
    backgroundColor: "#F0F0F0",
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  adImage:{
    width: 220,
    height: 170,
    borderRadius: 25,
  },
  adTitleContainer: {
    height: 100,
    justifyContent: "center",
  },
  adTitle:{
    fontSize: 18,
    fontWeight:"bold",
    color:"#767676",
    marginHorizontal: 5,
  },
  locationContainer:{
    flexDirection:"row", 
    alignItems: 'flex-end', 
    gap: 4,
    marginHorizontal: 5,
  },
  adCity:{
    fontSize: 16,
    fontWeight: 'medium',
    color:"#4A4A4A",
  },
  adPostaleCode:{
    color:"#4A4A4A"
  },
  dateContainer:{
    flexDirection: "row",
    marginHorizontal: 5,
  },
  adStartDate:{
    color:"#4A4A4A",
  },
  adEndDate:{
    color:"#4A4A4A",
  },
  ingredientsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
    gap: 5,
    marginHorizontal: 5,
  },
  ingredientCapsule: {
    backgroundColor: "#E0E0E0",
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginRight: 5,
  },
  ingredientText: {
    color: "#4A4A4A",
    fontSize: 14,
  },
  scrollViewContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  timeContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    borderRadius: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  timeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
