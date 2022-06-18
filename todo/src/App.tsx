import { useState } from "react";

type Todo = {
  value: string;
};

export const App = () => {
  // text = ステートの値
  // setText = ステートの値を更新するメソッド
  // useState の引数 = ステートの初期値(=空の文字列)
  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  return (
    <div>
      <form onSubmit={(e) => e.preventDefault()}>
        {/* 
        入力中テキストの値をtextステートが
        持っているのでそれをvalueとして表示

        onChangeイベント(=イベントテキストの変化)を
        textステートに反映する
        */}
        <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
        <input type="submit" value="追加" onSubmit={(e) => e.preventDefault} />
      </form>
    </div>
  );
};