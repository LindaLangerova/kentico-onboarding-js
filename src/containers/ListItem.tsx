import { connect } from 'react-redux';
import { IListItemDataProps, ListItem as ListItemComponent } from '../components/ListItem';
import { IAppState } from '../stores/IAppState';
import { ComponentClass } from 'react';

export interface IListItemContainerProps {
  id: string;
}

const mapStateToProps = (state: IAppState, { id }: IListItemContainerProps): IListItemDataProps => ({
  id,
  isBeingEdited: state.items.byId.get(id).isBeingEdited,
});

export const ListItem: ComponentClass<IListItemContainerProps> = connect(mapStateToProps)(ListItemComponent);
