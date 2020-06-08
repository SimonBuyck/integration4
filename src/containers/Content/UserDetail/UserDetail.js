import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import ContentHeader from "../../../components/ContentHeader/ContentHeader.js";

import style from "./UserDetail.module.css";
import Empty from "../../../components/Empty/Empty";

const UserDetail = () => {
  const { id } = useParams();
  const { userStore } = useStores();
  const user = userStore.getUserById(id);
  if (!user) {
    return <Empty message="Contact not found" />;
  }
  return (
    <>
      <ContentHeader title={user.name} />
      <div className={style.container}>
        <section className={style.section}>
          <h3 className={style.subtitle}>Groups</h3>
          {user.groups.length > 0 ? (
            <ul className={style.groupsList}>
              {user.groups.map(group => (
                <li className={style.group} key={group.id}>
                  {group.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Not a member of a group</p>
          )}
        </section>
        <div className={style.container}>
          <img alt="Avatar" src={user.avatar} />
        </div>
      </div>
    </>
  );
};

export default UserDetail;
