export interface Home {
  title: string;
  actions: Actions[];
}

export interface Actions {
  [key: string]: string[];
}
