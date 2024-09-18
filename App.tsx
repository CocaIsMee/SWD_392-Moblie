import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, FlatList, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ITodo {
  id: number;
  name: string
}

export default function App() {

  const [todo, setTodo] = useState("");
  const [listTodo, setListTodo] = useState<ITodo[]>([]);
  //  id: 1, name: "watching youtube"

  function radomInter(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const handleAddTodo = () => {
    if (!todo) {
      alert("empty todo")
      return;
    }
    setListTodo([...listTodo,
    { id: radomInter(2, 200000), name: todo }
    ]);
    setTodo("")
  }

  const deleteTodo = (id: number) => {
    const newTodo = listTodo.filter(item => item.id !== id);
    setListTodo(newTodo)
  }

  return (
    <View style={styles.container}>
      {/* header */}
      <Text style={styles.header}>To do app</Text>

      {/* form */}
      <View style={styles.body}>
        <TextInput
          value={todo}
          style={styles.todoInput}
          onChangeText={(value) => setTodo(value)}
        />
        <Button title='Add todo'
          onPress={handleAddTodo}
        />
      </View>

      {/* list todo */}
      <View style={styles.body}>
        <FlatList
          data={listTodo}
          renderItem={({ item }) => {
            return (
              <Pressable
                onPress={() => deleteTodo(item.id)}
                style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
              >
                <Text
                  style={styles.todoItem}>{item.name}</Text>
              </Pressable>
            )
          }
          }
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "orange",
    paddingHorizontal: 20,
    textAlign: "center",
    fontSize: 30
  },

  container: {
    paddingTop: 50,
    // paddingHorizontal: 20,
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },

  todoInput: {
    borderBottomWidth: 1,
    borderBottomColor: "black",
    padding: 5,
    margin: 15
  },

  body: {
    paddingHorizontal: 10,
    marginBottom: 20
  },

  todoItem: {
    fontSize: 20,
    borderWidth: 1,
    borderStyle: "dashed",
    marginBottom: 10,
    padding: 10
  }
});
