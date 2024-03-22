
export type Str = {
  display: string;
  data: {
    [key: string]:
      | { type: string; value: string | number; label?: string }
      | undefined;
    filename?: { type: string; value: string | number; label?: string };
    type?: { type: string; value: string | number; label?: string };
    id?: { type: string; value: string | number; label?: string };
    upgradeId?: { type: string; value: string | number; label?: string };
    err?: { type: string; value: string | number; label?: string };
    hostname?: { type: string; value: string | number; label?: string };
    tr?: { type: string; value: string | number; label?: string };
    n?: { type: string; value: string | number; label?: string };
    nb?: { type: string; value: string | number; label?: string };
    sn?: { type: string; value: string | number; label?: string };
    p?: { type: string; value: string | number; label?: string };
    url?: { type: string; value: string | number; label?: string };
  };
  v: number;
};

export type Notification = {
  id: string;
  insertedAt: string;
  level: string;
  str?: Str;
  read: boolean;
  pushed?: boolean;
};
export const typeRoute: TypeRoute[] = [
  { tag: 'profile', value: 'linguisticConfiguration/translationProfiles/' },
  { tag: 'tm', value: 'linguisticConfiguration/resources/translationMemory/' },
  { tag: 'tr', value: 'administration/translationResources/' },
  // { tag: 'node', value: 'administration/serverManagement/routes/' },  //on hold for the moment, not sure for the link
  // { tag: 'nodeView', value: 'administration/serverManagement/queues/' },//on hold for the moment, not sure for the link
  { tag: 'fileTranslation', value: 'translationTools/file/' }
];

export type TypeRoute = {
  tag: string;
  value: string;
};
