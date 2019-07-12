import React from 'react';

export default function Filter(props) {
  return (
    <div>
      <input type="text" onChange={e => props.onTextChange(e.target.value)} />
    </div>
  );
}
