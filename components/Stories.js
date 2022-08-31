import { useState, useEffect } from "react";
import { faker } from '@faker-js/faker';
import Story from './Story';
import { useSession } from "next-auth/react";

function Stories() {
  const [suggestions, setSuggestions] = useState([]);

  const {data: session} = useSession();
  
  let fakeUsers = [];

    useEffect(() => {
      let unsubscribed = true;

      for(let i = 0; i <= 20; i++) {
        const name = faker.name.firstName()
        const avatar = faker.image.abstract(0, 0, true)
        const RandomId = Math.floor(Math.random() * 1000);

        if(unsubscribed) {
          const user = {name, avatar, id:RandomId}
          fakeUsers.push(user)
  
          setSuggestions(fakeUsers)
        }
      }

      return () => unsubscribed = false;
    }, [])

  return (
    <div className="flex space-x-2 p-6 mt-8 bg-white border rounded-sm overflow-x-scroll scrollbar-thumb-black">
      {session && (
        <Story key={session.user.uid} image={session.user.image} username={session.user.username} />
      )}

       {suggestions.map(profile => (
          <Story id={profile.id} key={profile.id} image={profile.avatar} username={profile.name} />
       ))}
    </div>
  )
}

export default Stories