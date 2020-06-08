import React from "react";
import PropTypes from "prop-types";
import { useObserver } from "mobx-react-lite";
import { useStores } from "../../hooks/useStores";
import styles from "./Message.module.css";

const Message = ({ message }) => {
  const { uiStore } = useStores();
  return useObserver(() => (
    <li
      onClick={() => message.setUnread(false)}
      className={
        message.user.id === uiStore.currentUser.id ? styles.right : styles.left
      }
    >
      {message.user.id !== uiStore.currentUser.id && (
        <p className={styles.user}>{message.user.name}</p>
      )}
      <p className={message.unread ? styles.unread : ""}>{message.content}</p>
    </li>
  ));
};

Message.propTypes = {
  message: PropTypes.object.isRequired
};

export default Message;
