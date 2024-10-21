import React, { useState } from 'react';
import { createMeterType, updateMeterType } from '../../api/api';

function MeterTypeForm({ meterType, onSave }) {
  const [type, setType] = useState(meterType ? meterType.type : '');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const meterTypeData = { type };
    try {
      if (meterType) {
        await updateMeterType(meterType.id, meterTypeData);
      } else {
        await createMeterType(meterTypeData);
      }
      onSave();
    } catch (error) {
      console.error('Error saving meter type:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Meter Type"
        value={type}
        onChange={(e) => setType(e.target.value)}
      />
      <button type="submit">Save Meter Type</button>
    </form>
  );
}

export default MeterTypeForm;
