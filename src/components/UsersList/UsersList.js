import React from "react";
import User from "../User/User";

import { useObserver } from "mobx-react-lite";

import { useStores } from "../../hooks/useStores";

const UsersList = () => {
  const { userStore } = useStores();
  return useObserver(() => (
    <>
      <ul>
        {userStore.users.map(user => (
          <User user={user} key={user.id} />
        ))}
      </ul>
    </>
  ));
};

export default UsersList;
