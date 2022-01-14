import React, { Component } from "react";

const MUITable = () => {
  const columns = [
    { label: 'Title', name: 'title' },
    { label: 'Author', name: 'authors' },
    { label: 'Page Count', name: 'num_pages', options: { sort: true } },
    { label: 'Rating', name: 'rating' }
  ];
  const options = {
    filterType: 'checkbox'
  };
  return (
    <div style={{ maxWidth: '100%' }}>
      <MUIDataTable
        columns={columns}
        data={data}
        title='Books Directory'
        options={options}
      />
    </div>
  );
};
export default MUITable;