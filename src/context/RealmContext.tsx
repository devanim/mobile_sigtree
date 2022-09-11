import React from 'react';
import RealmDetails from 'src/models/realm-details';

type Realm = {
  data: RealmDetails | null;
  setRealm: (value: RealmDetails) => void;
};

export default React.createContext<Realm>({
  data: null,
  setRealm: (value: RealmDetails) => {alert(value)},
});