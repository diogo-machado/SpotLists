import React from 'react';

export default function Filter(props) {
  return (
    <div>
      <input
        type="text"
        placeholder="Search playlist..."
        onChange={e => props.onTextChange(e.target.value)}
      />
    </div>
  );
}
