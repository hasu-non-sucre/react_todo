import React, { useState } from "react";

type Todo = {
  value: string;
  readonly id: number;
};

export const App = () => {
  // text = ステートの値
  // setText = ステートの値を更新するメソッド
  // useState の引数 = ステートの初期値(=空の文字列)
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // todosステートを更新する関数
  const handleOnSubmit = () => {
    // 何も入力さていなかったらリターン
    if (!text) {
      return;
    }

    // 新しいTodoを作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
    setText('');
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleOnEdit = (id: number, value: string) => {
    // ディープコピー
    const deepcopy = todos.map((todo) => ({...todo}));

    // idが一致するtodoを書き換える
    const newTodos = deepcopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // todoステートを更新
    setTodos(newTodos);
  };

  return (
    <div>
      <form onSubmit={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}>
        {/* 
        入力中テキストの値をtextステートが
        持っているのでそれをvalueとして表示

        onChangeイベント(=イベントテキストの変化)を
        textステートに反映する
        */}
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input type="submit" value="追加" onSubmit={(e) => e.preventDefault} />
      </form>
      <ul>
        {todos.map((todo) => {
          return <li key={todo.id}>
            <input type="text" value={todo.value} onChange={(e) => handleOnEdit(todo.id, e.target.value)} />
          </li>
        })}
      </ul>
    </div>
  );
};