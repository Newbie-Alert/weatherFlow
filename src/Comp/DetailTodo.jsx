import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function DetailTodo() {
  const [todo, setTodo] = useState("");
  const [item, setItem] = useState();
  const [editText, setEditText] = useState("");
  const [editUiToggle, setUiToggle] = useState(false);

  function getItems() {
    axios.get("http://localhost:8080/item").then((res) => setItem(res.data));
  }

  function uiToggle() {
    editUiToggle === false ? setUiToggle(true) : setUiToggle(false);
  }

  function postItem(e) {
    e.preventDefault();
    axios.post("http://localhost:8080/item/post", {
      id: Date.now().toString(),
      content: todo,
      created: Date.now().toString(),
      username: "choonsik",
      finish: false,
    });
    setTodo("");
  }

  function deleteItem(e) {
    axios.delete(`http://localhost:8080/item/delete/${e.target.dataset.id}`);
    e.target.parentNode.parentNode.parentNode.parentNode.style = "display:none";
  }

  function changeInput(e) {
    setTodo(e.target.value);
    console.log(todo);
  }

  useEffect(() => {
    getItems();
  }, [item, todo]);

  return (
    <div className="todo_section">
      <h3 className="todo_title">Todo List</h3>
      <div className="todo_list">
        <ul>
          <ItemList
            item={item}
            deleteItem={deleteItem}
            editUiToggle={editUiToggle}
            uiToggle={uiToggle}
            editText={editText}
            setEditText={setEditText}
          />
        </ul>
      </div>
      <div className="todo_form">
        <form
          action="/"
          onSubmit={(e) => {
            postItem(e);
          }}
        >
          <input
            placeholder="what is your today explore"
            type="text"
            onChange={(e) => changeInput(e)}
            value={todo}
          />
        </form>
      </div>
    </div>
  );
}

// small Comp
function ItemList({
  item,
  deleteItem,
  editUiToggle,
  uiToggle,
  editText,
  setEditText,
  setUiToggle,
}) {
  return (
    <>
      {item?.map((el) => {
        return (
          <div key={el.id}>
            <li className="todo_item">
              {el.content}
              <div className="list_icon">
                <button>
                  <FontAwesomeIcon
                    icon={faPencil}
                    className="edit_icon"
                    onClick={uiToggle}
                  />
                </button>
                <button>
                  <FontAwesomeIcon
                    className="delete_icon"
                    data-id={el.id}
                    icon={faTrash}
                    onClick={(e) => {
                      deleteItem(e);
                    }}
                  />
                </button>
              </div>
            </li>
            {editUiToggle === true ? (
              <EditUi
                el={el}
                editText={editText}
                setEditText={setEditText}
                uiToggle={uiToggle}
                editUiToggle={editUiToggle}
              />
            ) : null}
          </div>
        );
      })}
    </>
  );
}

function EditUi({ el, editText, setEditText, uiToggle }) {
  return (
    <div className="edit_ui">
      <input
        onChange={(e) => setEditText(e.target.value)}
        type="text"
        placeholder={el?.content}
      />
      <button
        data-id={el?.id}
        onClick={(e) => {
          e.stopPropagation();
          axios.put(`http://localhost:8080/item/edit/${e.target.dataset.id}`, {
            editedText: editText,
          });
          uiToggle();
        }}
      >
        edit
      </button>
    </div>
  );
}
