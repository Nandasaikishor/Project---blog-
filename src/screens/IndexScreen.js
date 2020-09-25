import React, { useContext, useEffect } from 'react';
import { View,Text,StyleSheet, FlatList, Button } from 'react-native';
import { Context } from '../context/BlogContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler'; 

const IndexScreen = ({ navigation }) => { 

 const {state, deleteBlogPost, getBlogPosts} = useContext(Context);

 useEffect(()=> {
  getBlogPosts();

  navigation.addListener('didFocus', ()=> {
    getBlogPosts();
  });

  return () => {
    listener.remove();
  };

},[]);

 return(
  <View> 
    <FlatList
       data={state}
       keyExtractor={blogPost => blogPost.title}
       renderItem={({item}) =>{
              return (
                        <TouchableOpacity onPress= {() => navigation.navigate('Show', {id: item.id})}>
                          <View style={styles.row}>
                            <Text style={styles.title}>{item.title}</Text>
                            <TouchableOpacity onPress={() => deleteBlogPost(item.id)}>
                            <MaterialCommunityIcons name="trash-can-outline" size={24} color="black" />
                            </TouchableOpacity>
                           </View>
                        </TouchableOpacity>
               );  
                     }
                        }
    />
   
  </View>
  );
}

  IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () =>  <TouchableOpacity onPress={() => navigation.navigate('Create')}>
                              <AntDesign name="pluscircleo" size={24} color="black" /> 
                            </TouchableOpacity>
    };
  }

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 13,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'gray'
    
  },
  title: {
    fontSize: 18
  }
});

export default IndexScreen;