import * as React from 'react';
import {ReactElement} from 'react';
import * as PropTypes from 'prop-types';
import {EditedListItem} from '../../containers/Items/EditedListItem';
import {ItemErrorMessage} from '../../containers/Items/ItemErrorMessage';
import {UneditedListItem} from '../../containers/Items/UneditedListItem';
import {Markers} from '../../containers/Markers/Markers';
import {IItem, Item} from '../../models/Item';
import * as classNames from 'classnames';
import {IAction} from '../../actions/IAction';


export interface IListItemStateProps {
  item: IItem;
  index: number;
  isSynchronizing: boolean;
  areThereErrors: boolean;
}

export interface IListItemDispatchProps {
  onClick: () => IAction;
}

type IListItemProps = IListItemStateProps & IListItemDispatchProps;

const getListItemInCorrectMode = (item: IItem): ReactElement<any> => {
  if (item.isBeingEdited) {
    return <EditedListItem itemId={item.id} />;
  }
  return <UneditedListItem itemId={item.id} />;
};

export class ListItem extends React.PureComponent<IListItemProps> {

  static displayName = 'ListItem';

  static propTypes = {
    item: PropTypes.instanceOf(Item),
    index: PropTypes.number.isRequired,
    isSynchronizing: PropTypes.bool.isRequired,
    areThereErrors: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
  };

  _showEditedItem = (): void => {
    if (!this.props.item.isBeingEdited) {
      this.props.onClick();
    }
  };

  render() {
    const listItemClassName = classNames({
      'list__item': true,
      'item--synchronizing': this.props.isSynchronizing,
      'item--error': this.props.areThereErrors,
      'item--deleted': this.props.item.isBeingDeleted,
    });

    return (
      <div className={listItemClassName}>
        <div
          onClick={this._showEditedItem}
          className="list__item_content list__item_content--long"
          key={this.props.item.id}
        >
          <div className="list__item__inline_content">
            {this.props.index + 1}.&nbsp;
          </div>
          {getListItemInCorrectMode(this.props.item)}
        </div>
        {this.props.areThereErrors ? <ItemErrorMessage itemId={this.props.item.id} /> : null}
        <Markers id={this.props.item.id} />
      </div>);
  }
}
