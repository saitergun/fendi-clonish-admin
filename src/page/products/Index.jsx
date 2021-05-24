import React, { useState, useEffect, useCallback } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import {
  Spinner,
  Button,
} from '@blueprintjs/core';

import API from '../../utility/api';
import columns from './_tableColumns';

import Layout, { Navbar, Main, Aside } from '../../component/layout/Layout1';

import Table from '../../component/Table';

import ProductDrawer from './ProductDrawer';

const PageProducts = ({ setTitle, categories, setCategories }) => {
  const [rows, setRows] = useState([]);

  const [selectedRowIndex, setSelectedRowIndex] = useState(-1);

  const [create, setCreate] = useState(false);

  // set title
  useEffect(() => {
    setTitle('Products');
  }, []);

  // set rows
  useEffect(() => {
    const config = {
      params: {
        _sort: 'created_at:desc',
      },
    };

    API('products', config)
      .then(({ data }) => setRows(data))
      .catch((error) => console.log('products error', error));
  }, []);

  // set categories
  useEffect(() => {
    if (categories.length === 0) {
      setCategories();
    }
  }, [categories]);

  const handleCreateRow = useCallback((product) => {
    setRows((prev) => [product, ...prev]);

    setSelectedRowIndex(0);
    setCreate(false);
  }, [selectedRowIndex]);

  const handleUpdateRow = useCallback((product) => {
    setRows((prev) => {
      const nextRows = [...prev];

      nextRows[selectedRowIndex] = product;

      return nextRows;
    });
  }, [selectedRowIndex]);

  const handleDeleteRow = useCallback(() => {
    setRows((prev) => {
      prev.splice(selectedRowIndex, 1);

      return prev;
    });

    setSelectedRowIndex(-1);
  }, [selectedRowIndex]);

  return (
    <Layout>
      <Navbar>
        <div className="w-full flex items-center justify-between gap-4">
          <div>
            <h1 className="font-700 text-16/16 leading-none">Products</h1>
          </div>

          <div>
            {!create && (
              <Button
                intent="primary"
                text="CREATE"
                onClick={() => {
                  setSelectedRowIndex(-1);
                  setCreate(true);
                }}
              />
            )}
          </div>
        </div>
      </Navbar>

      <Main noPadding>
        {rows.length === 0 && (
          <div className="inline-flex justify-start p-8">
            <Spinner size={24} />
          </div>
        )}

        {rows.length > 0 && (
          <div className="w-full overflow-auto">
            <Table
              rows={rows}
              columns={columns}

              selectedRowIndex={selectedRowIndex}
              onMouseDownRow={(index) => {
                setSelectedRowIndex(index);

                setCreate(false);
              }}
            />
          </div>
        )}
      </Main>

      <Aside open={selectedRowIndex >= 0 || create}>
        <ProductDrawer
          product={rows[selectedRowIndex] || null}
          categories={categories}
          create={create}

          onCreate={handleCreateRow}
          onUpdate={handleUpdateRow}
          onDelete={handleDeleteRow}

          onClose={() => {
            setSelectedRowIndex(-1);

            setCreate(false);
          }}
        />
      </Aside>
    </Layout>
  );
};

const { setCategories } = require('../../store/state/data');
const { setTitle } = require('../../store/state/app');

const mapStateToProps = (state) => ({
  categories: state.data.categories,
});

const mapDispatchToProps = {
  setTitle,

  setCategories,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageProducts));
