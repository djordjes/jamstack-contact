import React, { useReducer } from "react";
import styles from "./form.module.css";
import { useLazyQuery, gql } from "@apollo/client";

const ALL_TODOS = gql`
  query {
    allTodos {
      data {
        _id
        text
        completed
      }
    }
  }
`;

const INITIAL_STATE = {
  name: "",
  email: "",
  subject: "",
  body: "",
  status: "IDLE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case "updateFieldValue":
      return { ...state, [action.field]: action.value };

    case "updateStatus":
      return { ...state, status: action.status };

    case "reset":
    default:
      return INITIAL_STATE;
  }
};

const Form = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const setStatus = (status) => dispatch({ type: "updateStatus", status });

  const [getData, { loading, error, data }] = useLazyQuery(ALL_TODOS);

  const updateFieldValue = (field) => (event) =>
    dispatch({
      type: "updateFieldValue",
      value: event.target.value,
      field,
    });

  const handleSubmit = (event) => {
    event.preventDefault();
    setStatus("SUCCESS");
    getData();
  };

  if (data && state.status !== "IDLE") {
    return (
      <p className={styles.success}>
        Message sent!
        <ul>
          {data.allTodos.data.map((todo) => {
            return (
              <li key={todo._id}>
                {todo.text} {todo.completed}
              </li>
            );
          })}
        </ul>
        <button
          type="reset"
          onClick={() => setStatus("IDLE")}
          className={`${styles.button} ${styles.centered}`}
        >
          Reset
        </button>
      </p>
    );
  }

  return (
    <>
      {error && (
        <p className={styles.error}>Something went wrong. Please try again.</p>
      )}
      <form
        className={`${styles.form} ${loading && styles.pending}`}
        onSubmit={handleSubmit}
      >
        <label className={styles.label}>
          Name
          <input
            className={styles.input}
            type="text"
            name="name"
            value={state.name}
            onChange={updateFieldValue("name")}
          />
        </label>
        <label className={styles.label}>
          Email
          <input
            className={styles.input}
            type="email"
            name="email"
            value={state.email}
            onChange={updateFieldValue("email")}
          />
        </label>
        <label className={styles.label}>
          Subject
          <input
            className={styles.input}
            type="text"
            name="subject"
            value={state.subject}
            onChange={updateFieldValue("subject")}
          />
        </label>
        <label className={styles.label}>
          Body
          <textarea
            className={styles.input}
            name="body"
            value={state.body}
            onChange={updateFieldValue("body")}
          />
        </label>
        <button className={styles.button}>Send</button>
      </form>
    </>
  );
};

export default Form;
