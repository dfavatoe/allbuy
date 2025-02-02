import React from "react";
import useFetch from "../hooks/useFetch";

type Todo = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

type User = {
  id: number;
  name: string;
  username: string;
  email: string;
};

function TestCustomHook() {
  const { data } = useFetch<Todo[]>(
    "https://jsonplaceholder.typicode.com/todos"
  );

  const { data: data2 } = useFetch<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  return (
    <>
      {data && data[0].title}
      {data2 && data2[0].email}
    </>
  );
}

export default TestCustomHook;
