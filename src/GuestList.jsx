import { useState, useEffect } from 'react';

function GuestList({ guests, onUpdateGuest, onRemoveGuest }) {
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');

  // useEffect to respond to guests state changes
  useEffect(() => {
    console.log('✅ GuestList: Guests state updated!', guests);
    console.log('✅ GuestList: Total guests in list:', guests.length);
  }, [guests]);

  const handleConfirm = (guestId) => {
    const guest = guests.find(g => g.id === guestId);
    console.log('📝 BEFORE confirm - Guest confirmed status:', guest?.confirmed);
    onUpdateGuest(guestId, { confirmed: !guest.confirmed });
    // ❌ This will show OLD state
    console.log('❌ AFTER confirm (immediate) - Still shows old state:', guest?.confirmed);
  };

  const handleRSVP = (guestId) => {
    const guest = guests.find(g => g.id === guestId);
    console.log('📝 BEFORE RSVP update - Guest RSVP status:', guest?.rsvp);
    onUpdateGuest(guestId, { rsvp: !guest.rsvp });
    // ❌ Note: State won't be updated immediately here - it's asynchronous!
    console.log('❌ AFTER RSVP update (immediate) - Still shows old state:', guest?.rsvp);
    console.log('❌ Use useEffect to see the updated state!');
  };

  const startEdit = (guest) => {
    setEditingId(guest.id);
    setEditName(guest.name);
    setEditEmail(guest.email);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditName('');
    setEditEmail('');
  };

  const saveEdit = (guestId) => {
    if (editName.trim() === '' || editEmail.trim() === '') {
      alert('Please fill in all fields');
      return;
    }
    onUpdateGuest(guestId, { name: editName.trim(), email: editEmail.trim() });
    cancelEdit();
  };

  if (guests.length === 0) {
    return (
      <div className="guest-list">
        <h2>Guest List</h2>
        <p className="empty-message">No guests yet. Add your first guest above!</p>
      </div>
    );
  }

  return (
    <div className="guest-list">
      <h2>Guest List</h2>
      <div className="guests-container">
          {guests.map(guest => (
            <div 
              key={guest.id} 
              className={`guest-item ${guest.confirmed ? 'confirmed' : ''} ${guest.rsvp ? 'rsvp' : ''}`}
            >
              {editingId === guest.id ? (
                <div className="edit-mode">
                  <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="Name"
                />
                <input
                  type="email"
                  value={editEmail}
                  onChange={(e) => setEditEmail(e.target.value)}
                  placeholder="Email"
                />
                <div className="edit-actions">
                  <button type="button" onClick={() => saveEdit(guest.id)} className="btn btn-small">
                    Save
                  </button>
                  <button type="button" onClick={cancelEdit} className="btn btn-small btn-secondary">
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="guest-info">
                  <h3>{guest.name}</h3>
                  <p>{guest.email}</p>
                  <div className="guest-status">
                    {guest.confirmed && <span className="badge">Confirmed</span>}
                    {guest.rsvp && <span className="badge rsvp-badge">RSVP'd</span>}
                  </div>
                </div>
                <div className="guest-actions">
                  <button 
                    type="button"
                    onClick={() => handleConfirm(guest.id)} 
                    className="btn btn-small"
                  >
                    {guest.confirmed ? 'Unconfirm' : 'Confirm'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => handleRSVP(guest.id)} 
                    className="btn btn-small"
                  >
                    {guest.rsvp ? 'Cancel RSVP' : 'RSVP'}
                  </button>
                  <button 
                    type="button"
                    onClick={() => startEdit(guest)} 
                    className="btn btn-small btn-secondary"
                  >
                    Edit
                  </button>
                  <button 
                    type="button"
                    onClick={() => onRemoveGuest(guest.id)} 
                    className="btn btn-small btn-danger"
                  >
                    Remove
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GuestList;
