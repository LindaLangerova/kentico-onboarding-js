import { OrderedMap } from 'immutable';
import { generateId } from '../utils/generateId';
import { Item } from '../models/Item';
import { IAppState } from '../stores/IAppState';

const defaultListItems = [
  'Make a coffee',
  'Master React',
  'Learn Redux',
  'Help making Draft awesome',
].map(text => {
  const id = generateId();
  return [
    id,
    new Item({
      id,
      text,
    }),
  ];
});

const defaultStateValues: IAppState = {
  items: {
    byId: OrderedMap(defaultListItems),
    newItemText: '',
  },
};

export { defaultStateValues };