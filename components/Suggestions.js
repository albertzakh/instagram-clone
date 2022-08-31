import { useState, useEffect } from 'react'
import { faker } from '@faker-js/faker';

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);

  let fakeSuggestions = []

  useEffect(() => { 
    let unsubscribed = true;
    
    if(unsubscribed) {
      for(let i = 0; i < 2; i++) {
        const name = faker.name.firstName()
        const avatar = faker.image.abstract(0, 0, true);
        const company = faker.company.name();
        const randomId = Math.floor(Math.random() * 1000);
  
        const fakeUsers = {name, avatar, company, id:randomId};
        fakeSuggestions.push(fakeUsers)
  
        setSuggestions(fakeSuggestions)
      }
    }

    return () => unsubscribed = false;
  }, [])

  return (
    <div className="mt-4 ml-10 mb-15">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>

      {
        suggestions.map(profile => (
          <div key={profile.id} className="flex items-center justify-between mt-3">
            <img className="w-10 h-10 rounded-full border p-[2px]" src={profile.avatar} />

            <div className="flex-1 ml-4">
              <h2 className="font-semibold text-sm">{profile.name}</h2>
              <h3 className="text-xs text-gray-400">{profile.company}</h3>
            </div>
            <button className="text-blue-400 font-bold">Follow</button>
          </div>

        ))
      }
    </div>
  )
}

export default Suggestions