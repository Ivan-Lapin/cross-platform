import React from 'react';
import TodoItem from './TodoItem';
function TodoList({ todos, toggleTodo }) {
  return (
    <div>
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} toggleTodo={toggleTodo} />
      ))}
    </div> 
  );
}
export default TodoList;