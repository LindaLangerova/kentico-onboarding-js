import React from 'react';
import PropTypes from 'prop-types';
import { ListItem } from '../containers/ListItem';

const List = ({ itemsMap }) => {
  return (
    <div>
      {itemsMap.keySeq().map((itemKey, index) =>
        <div
          className="list-group-item form-inline"
          key={itemKey}
        >
          {index + 1}
          .&nbsp;
          <ListItem
            itemId={itemKey}
          />
        </div>
      )}
    </div>
  );
};

List.displayName = 'List';

List.propTypes = {
  itemsMap: PropTypes.object.isRequired,
};

export { List };
