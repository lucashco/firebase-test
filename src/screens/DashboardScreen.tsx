import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TaskEmpty from '../components/TaskEmpty';

type Task = {
  id: string;
  description: string;
  is_complete: boolean;
  user_id: string;
};

const taskDocumentPath = firestore().collection('tasks');

export function DashboardScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsloading] = useState(false);
  const [isSubmiting, setIsSubmiting] = useState(false);

  const currentUser = auth().currentUser;

  async function handleAddTask() {
    if (task.trim() === '' || !currentUser) {
      return;
    }

    const taskToAdd = {
      description: task.trim(),
      user_id: currentUser?.uid,
      is_completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    };

    try {
      setIsSubmiting(true);
      await taskDocumentPath.add(taskToAdd);
      fetchTasks();
    } catch (err) {
      console.log('Add document error', err);
    } finally {
      setTask('');
      setIsSubmiting(false);
    }
  }

  async function handleLogout() {
    try {
      auth().signOut();
    } catch (err) {
      console.log('Logout error', err);
    }
  }

  function _renderItem({item}: ListRenderItemInfo<Task>) {
    const isComplete = item.is_complete ? 'Complete' : 'Incomplete';
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>{item.description}</Text>
        <Text style={styles.isComplete}>Status: {isComplete}</Text>
      </View>
    );
  }

  const fetchTasks = useCallback(() => {
    setIsloading(true);

    taskDocumentPath
      .where('user_id', '==', currentUser?.uid)
      .get()
      .then(snapshot => {
        const data: Task[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as Task[];

        setTasks(data);
      })
      .finally(() => {
        setIsloading(false);
      });
  }, [currentUser]);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    fetchTasks();
  }, [currentUser, fetchTasks]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logout}>
          <View>
            <Text style={styles.greets}>Welcome,</Text>
            <Text style={styles.email}>{currentUser?.email}</Text>
          </View>

          <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
            <Text style={styles.logoutButtonText}>X</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.content}>
        <View style={styles.newTask}>
          <TextInput
            style={styles.input}
            keyboardType="email-address"
            placeholder="Enter your task"
            onChangeText={setTask}
            value={task}
          />

          <TouchableOpacity
            onPress={handleAddTask}
            style={[styles.button, isSubmiting ? styles.buttonDisabled : {}]}
            disabled={isSubmiting}
            activeOpacity={0.8}>
            <Text style={styles.buttonText}>+</Text>
          </TouchableOpacity>
        </View>

        <FlatList
          data={tasks}
          keyExtractor={item => item.id}
          renderItem={_renderItem}
          contentContainerStyle={tasks.length === 0 ? styles.listContainer : {}}
          ListEmptyComponent={<TaskEmpty loading={isLoading} />}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f4',
  },
  header: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  greets: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    color: '#222',
    fontSize: 14,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 8,
    flex: 1,
  },
  button: {
    height: 56,
    width: 56,
    backgroundColor: '#074C4E',
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginLeft: 8,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  buttonDisabled: {
    backgroundColor: '#ddd',
  },
  newTask: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  item: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginBottom: 16,
  },
  itemText: {
    color: '#222',
    fontSize: 16,
    marginBottom: 4,
  },
  isComplete: {
    fontSize: 14,
  },
  listContainer: {
    flex: 1,
  },
  logout: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logoutButton: {
    height: 32,
    width: 32,
    backgroundColor: '#e03434',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
