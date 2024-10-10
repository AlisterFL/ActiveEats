import React, { useState, useEffect } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import coursesData from '../../data/courses.json';

export default function CourseScreen({ navigation }) {

    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text) {
          const filteredData = recipesWithAds.filter((item) =>
            item.title.toLowerCase().includes(text.toLowerCase())
          );
          setFilteredRecipes(filteredData);
        } else {
          setFilteredRecipes(recipesWithAds);
        }
      };

  const renderCourseItem = ({ item }) => (
    <TouchableOpacity style={styles.courseContainer} onPress={() => navigation.navigate('CourseDetails', { course: item })}>
      <Image source={{ uri: item.image }} style={styles.courseImage} resizeMode="cover"/>
      <View style={styles.courseInfo}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <Text style={styles.courseDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={styles.searchContainer}>
            <Icon name="search" size={20} color="#767676" style={styles.searchIcon} />
            <TextInput
            style={styles.searchInput}
            placeholder="Recherchez un cours"
            value={searchQuery}
            onChangeText={handleSearch}
            />
        </View>
        
        <FlatList
            data={coursesData}
            renderItem={renderCourseItem}
            keyExtractor={item => item.id.toString()}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  courseContainer: {
    flexDirection: 'row',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
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
  courseImage: {
    width: 100,
    height: '100%',
    borderRadius: 10,
  },
  courseInfo: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  courseDescription: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});
