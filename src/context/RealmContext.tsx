import React from 'react';
import RealmDetails from 'src/models/realm-details';

type Realm = {
  realmData: RealmDetails | null;
  setRealm: (value: RealmDetails | null) => void;
};

export default React.createContext<Realm>({
  realmData: null,
  setRealm: (value: RealmDetails | null) => { alert(value); },
});