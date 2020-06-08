import React from "react";
import { useParams } from "react-router-dom";
import { useStores } from "../../../hooks/useStores";
import { useObserver } from "mobx-react-lite";

import SearchUser from "../../../components/SearchUser/SearchUser.js";
import ContentHeader from "../../../components/ContentHeader/ContentHeader.js";
import Empty from "../../../components/Empty/Empty";
import style from "./GroupDetail.module.css";

const GroupDetail = () => {
  const { id } = useParams();
  const { groupStore } = useStores();
  const group = groupStore.getGroupById(id);

  const handleOnUserClick = async user => {
    try {
      //functie store oproepen
      await groupStore.addContactToGroup(user, group);
      group.linkUser(user);
      user.linkGroup(group);
    } catch (error) {
      console.log(error);
    }
  };
  
  return useObserver(() => {
    if (!group) {
      return <Empty message="Group not found" />;
    }
    return (
      <>
        <ContentHeader title={"Add group"} />
        <div className={style.container}>
          <section className={style.section}>
            <h3 className={style.subtitle}>Members</h3>
            <ul className={style.membersList}>
              {group.users.map((user) => (
                <li className={style.member} key={user.id}>
                  {user.id === group.ownerId
                    ? `${user.name} (owner)`
                    : user.name}
                </li>
              ))}
            </ul>
          </section>
          <section className={style.section}>
            <h3 className={style.subtitle}>Add member</h3>
            <SearchUser group={group} onUserClick={handleOnUserClick} />
          </section>
        </div>
      </>
    );
  });
};

export default GroupDetail;
