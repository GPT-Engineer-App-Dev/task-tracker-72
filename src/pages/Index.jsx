import { useState } from "react";
import { Container, VStack, HStack, Input, Button, Checkbox, Text, IconButton } from "@chakra-ui/react";
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingText, setEditingText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { text: newTask, completed: false }]);
      setNewTask("");
    }
  };

  const deleteTask = (index) => {
    const newTasks = tasks.filter((_, i) => i !== index);
    setTasks(newTasks);
  };

  const toggleTaskCompletion = (index) => {
    if (index === editingIndex) {
      setEditingIndex(null);
    }
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(newTasks);
  };

  const startEditing = (index) => {
    setEditingIndex(index);
    setEditingText(tasks[index].text);
  };

  const saveTask = (index) => {
    const newTasks = tasks.map((task, i) => 
      i === index ? { ...task, text: editingText } : task
    );
    setTasks(newTasks);
    setEditingIndex(null);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <HStack width="100%">
          <Input 
            placeholder="Add a new task" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
          />
          <Button onClick={addTask} colorScheme="teal">Add Task</Button>
        </HStack>
        <VStack spacing={2} width="100%">
          {tasks.map((task, index) => (
            <HStack key={index} width="100%" justifyContent="space-between">
              <Checkbox 
                isChecked={task.completed} 
                onChange={() => toggleTaskCompletion(index)}
              >
                {editingIndex === index ? (
                  <Input 
                    value={editingText} 
                    onChange={(e) => setEditingText(e.target.value)} 
                  />
                ) : (
                  <Text as={task.completed ? "s" : ""}>{task.text}</Text>
                )}
              </Checkbox>
              <HStack>
                {editingIndex === index ? (
                  <IconButton 
                    aria-label="Save task" 
                    icon={<FaSave />} 
                    onClick={() => saveTask(index)} 
                  />
                ) : (
                  <IconButton 
                    aria-label="Edit task" 
                    icon={<FaEdit />} 
                    onClick={() => startEditing(index)} 
                  />
                )}
                <IconButton 
                  aria-label="Delete task" 
                  icon={<FaTrash />} 
                  onClick={() => deleteTask(index)} 
                />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;