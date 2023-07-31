import React from 'react';

function CreateTrip() {
  return (
    <div>
      <div className='page-title'>Create Trip</div>
      <form>
        <label htmlFor='trip-name'>Trip Name</label>
          <input
            required
            type='text'
            id='trip-name'
            name='trip-name'
          />
        <label htmlFor='trip-description'>Trip Description</label>
          <input
              required
              type='text'
              id='trip-description'
              name='trip-description'
            />
      </form>
    </div>
  );
}

export default CreateTrip;