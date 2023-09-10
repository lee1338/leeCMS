import { useState, useEffect, createContext } from 'react';

interface User  {
  id: Number,
  username: String,
  real_name: String,
  mail: String,
  mail_verified: Number,
  account_created: Number,
  account_day_of_birth: Number,
  last_login: Number,
  last_online: Number,
  motto: String,
  look: String,
  gender: String,
  rank: Number,
  credits: Number,
  pixels: Number,
  points: Number,
  online: Number,
  auth_ticket: String,
  ip_register: String,
  ip_current: String,
  machine_id: String,
  home_room: Number,
  secret_key: String,
  pincode: String,
  extra_rank: String
}

const UserContext = createContext({
  user: {},
  setUser: () => {},
});

const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    fetch('/api/user/session', {method: 'GET'})
    .then(res => res.json())
    .then(data => {
      if (data.error) throw(data.error);
      setUser(data);
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  return (
    <UserContext.Provider value={{
      user: user,
      setUser: setUser,
    }}>{children}</UserContext.Provider>
  );
};
export { User, UserContext, UserProvider };
