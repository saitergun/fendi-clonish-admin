import React, { useState, useEffect, forwardRef } from 'react';
import classNames from 'classnames';
import { result } from 'lodash';

const ROW_HEIGHT = 36;

const HeadCell = ({ title, alignment }) => {
  return (
    <th
      className={classNames('text-13/16 font-600 bg-light-gray-5 border-b border-light-gray-3 px-4 first:pl-8 last:pr-8', {
        'text-left': !alignment || alignment === 'start',
        'text-center': alignment === 'center',
        'text-right': alignment === 'end',
      })}
      style={{
        height: ROW_HEIGHT,
      }}
    >{title}</th>
  );
};

const BodyCell = ({ value, alignment }) => {
  return (
    <td
      className={classNames('text-13/16 whitespace-nowrap border-b border-light-gray-4 px-4 first:pl-8 last:pr-8', {
        'text-left': !alignment || alignment === 'start',
        'text-center': alignment === 'center',
        'text-right': alignment === 'end',
      })}
      style={{
        height: ROW_HEIGHT,
      }}
    >{value}</td>
  );
};

const BodyRow = ({ columns, row, selected, onMouseDown }) => {
  return (
    <tr
      className={classNames({
        'hover:bg-light-gray-5 hover:bg-opacity-50 hover:cursor-pointer': !selected,
        'bg-light-gray-5': selected,
      })}
      onMouseDown={onMouseDown}
    >
      {columns.map((col) => {
        let value = result(row, col.renderProp);

        if (col.render !== undefined && typeof col.render === 'function') {
          value = col.render(value, row);
        }

        return (
          <BodyCell
            key={col.key}
            value={value}
            alignment={col.alignment}
          />
        );
      })}
    </tr>
  );
};

const Table = ({ rows, columns, selectedRowIndex, onMouseDownRow }, ref) => {
  return (
    <>
      <table
        tabIndex="-1"
        className={classNames('table-auto w-full')}
        ref={ref}
      >
        <thead>
          <tr>
            {columns.map((col) => (
              <HeadCell
                key={col.key}
                title={col.title}
                alignment={col.alignment}
              />
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, rowIndex) => {
            return (
              <BodyRow
                key={row.id}
                columns={columns}
                row={row}
                selected={rowIndex === selectedRowIndex}

                onMouseDown={(e) => onMouseDownRow(rowIndex, e)}
              />
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default forwardRef(Table);
