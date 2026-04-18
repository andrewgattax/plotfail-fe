import React from 'react';
import {useUser} from "@/context/UserContext.tsx";

function Profile() {

  const {user} = useUser()

  return (
    <div className={"w-full h-full flex justify-center items-center"}>
      <h1 className={"text-6xl text-foreground"}>Ciao {user?.username}</h1>
    </div>
  );
}

export default Profile;