import React from 'react';

import {
  Button,
  MenuItem,
} from '@blueprintjs/core';

import {
  Select,
} from '@blueprintjs/select';

import highlightText from '../utility/highlightText';

const itemRenderer = (item, { modifiers, query, handleClick }) => {
  const { active, disabled, matchesPredicate } = modifiers;

  if (!matchesPredicate) {
    return null;
  }

  return (
    <MenuItem
      key={item.key}
      text={highlightText(item.value, query)}
      active={active}
      disabled={disabled}
      onClick={handleClick}
    />
  );
};

const itemPredicate = (query, { value }, _index, exactMatch) => {
  const normalizedTitle = value.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (exactMatch) {
    return normalizedTitle === normalizedQuery;
  }

  return normalizedTitle.indexOf(normalizedQuery) >= 0;
};

const SelectFilterable = ({ items, selectedItem, onSelect }) => {
  return (
    <Select
      items={items}
      itemsEqual={(a, b) => a.key === b.key}
      itemRenderer={itemRenderer}
      itemPredicate={itemPredicate}
      activeItem={selectedItem}
      onItemSelect={onSelect}
      noResults={<MenuItem disabled text="no result matching the search" />}
    >
      <Button
        rightIcon="double-caret-vertical"
        text={selectedItem ? selectedItem.value : '(no selection)'}
      />
    </Select>
  );
};

export default SelectFilterable;
