import {OrderedMap} from 'immutable';
import {addItem} from '../../actions/simpleActions/addItem';
import {deleteItem} from '../../actions/simpleActions/deleteItem';
import {textUpdateChange} from '../../actions/simpleActions/textUpdateChange';
import {toggleEditing} from '../../actions/simpleActions/toggleEditing';
import {Item} from '../../models/Item.ts';
import {byId} from '../../reducers/items/byId.ts';


const mockId = () => '2';

describe('byId', () => {
  it('returns map filled with new item with correct text and id when called addItem', () => {
    const newId = mockId();
    const expectedState = new OrderedMap({
      [newId]: new Item({
        id: newId,
        text: 'tested item',
        isBeingEdited: false,
        isNotSynchronized: true,
      }),
    });
    const stateAfter = byId(undefined, addItem(mockId(), 'tested item'));

    expect(stateAfter).toEqual(expectedState);
  });

  it('returns map without selected item  when called deleteItem', () => {
    const itemId = mockId();
    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item is sad because it will be deleted soon',
        isBeingEdited: true,
      }),
    });
    const expectedState = new OrderedMap();

    const stateAfter = byId(stateBefore, deleteItem(itemId));

    expect(stateAfter).toEqual(expectedState);
  });

  it('switches isBeingEdited to opposite value than is set  when called toggleEditing', () => {
    const itemId = mockId();

    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item should obviously not be edited',
        isBeingEdited: true,
      }),
    });
    const expectedState = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'This item should obviously not be edited',
        isBeingEdited: false,
        textUpdate: '',
      }),
    });

    const stateAfter = byId(stateBefore, toggleEditing(itemId, false));

    expect(stateAfter).toEqual(expectedState);
  });

  it('returns given text in textUpdate  when called textUpdateChange', () => {
    const itemId = mockId();

    const stateBefore = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'Not important',
        isBeingEdited: true,
        textUpdate: 'Not this one',
      }),
    });
    const expectedState = new OrderedMap({
      [itemId]: new Item({
        id: itemId,
        text: 'Not important',
        isBeingEdited: true,
        textUpdate: 'This is correctly changed text',
      }),
    });

    const stateAfter = byId(stateBefore, textUpdateChange(itemId, 'This is correctly changed text'));

    expect(stateAfter).toEqual(expectedState);
  });
});
